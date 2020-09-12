import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import api from '../../services/api';
import Header from '../../componentes/Header';
import { MdAssignment, MdSave } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useUsuario } from '../../context/UsuarioContext';
import Button from '../../componentes/Button';
import { MdAlarmAdd } from 'react-icons/md';
import swal from '@sweetalert/with-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from 'react-datepicker';
import pt_br from 'date-fns/locale/pt-BR';
import Modal from '../../componentes/Modal';

registerLocale('pt-BR', pt_br);

function OrdensAndamento() {
    const [ordens, SetOrdens] = useState([]);
    const { cod_funcionario } = useUsuario();
    const [dataPrazoEntrega, setDataPrazoEntrega] = useState(new Date());
    const [dataAlterada, setDataAlterada] = useState(false);
    const [modalAtivo, setModalAtivo] = useState(false);
    const [ordCodigo, setOrdCodigo] = useState(0);
    const [dataAntiga, setDataAntiga] = useState('');

    async function CarregaDadosOcorrencias() {
        let response = await api.get('/Ordens');
        SetOrdens(response.data);
    }

    function changePrazoEntrega(data) {
        setDataPrazoEntrega(new Date(data));
    }

    function modalPrazoEntrega(ord_codigo, prazoAnterior) {
        setOrdCodigo(ord_codigo);
        setDataAntiga(new Date(prazoAnterior).toLocaleDateString());
        setModalAtivo(true)       
    }

    async function atualizarPrazoEntrega(e) {
        e.preventDefault();
        if (ordCodigo === 0) { swal('Codigo da Ordem é obrigatório!', 'Click em uma ordem de serviço', 'warning'); return; }
        let data = {
            Funcionario: cod_funcionario,
            Ordem: ordCodigo,
            PrazoAnterior: dataAntiga,
            PrazoNovo: dataPrazoEntrega.toLocaleDateString()
        }
        let response = await api.put(`/Ordens/${ordCodigo}`, data);
        if (response.status === 200) {                
            swal('Prazo entrega atualizado com sucesso!', `Código histórico ${response.data.Historico}`, 'success')
            setDataAlterada(true)
        }else{
            swal('Erro ao atualizar prazo de entrega!', `erro ${response.data.error}`, 'error')             
        }
    }

    useEffect(() => {
        CarregaDadosOcorrencias()
    }, [dataAlterada])

    return (
        <>
            <Header title={'Em Andamento'} />
            {                    
                <Modal activate={modalAtivo} setActivate={setModalAtivo} altura={350} largura={350}>
                    <form id="form" onSubmit={atualizarPrazoEntrega}>
                        <div className="form-group">
                            <label htmlFor="prazo-entrega">Novo prazo de Entrega</label>
                            <div>
                                <DatePicker dateFormat="dd/MM/yyyy" locale='pt-BR' selected={dataPrazoEntrega} onChange={changePrazoEntrega} />
                                <Button color="black" corTexto="white" nome="Salvar" Icon={MdSave} tamanho_icone={20} borderRadius="10px" />
                            </div>
                        </div>
                    </form>
                </Modal>

            }
            <Container>
                <div className="card">
                    <h1>Ordens de Serviço em Andamento</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Data Entrega</th>
                                <th>Ordem</th>
                                <th>Cliente</th>
                                <th>Data Abertura</th>
                                <th>Situação</th>
                                <th>Prioridade</th>
                                <th>Programador</th>
                                <th>Quem Abriu</th>
                                <th>Ação</th>
                                {cod_funcionario === 19 && <th>Novo Prazo</th>}
                            </tr>
                        </thead>
                        {
                            ordens.length > 0 ?
                                ordens.map((ordem) => (
                                    <tbody>
                                        <tr>
                                            <th>{new Date(ordem.novo_prazoe).toLocaleDateString()}</th>
                                            <td>{ordem.ord_codigo}</td>
                                            <td>{ordem.cli_nome}</td>
                                            <td>{new Date(ordem.dataAbertura).toLocaleDateString()}</td>
                                            <td>{ordem.estado}</td>
                                            <td>{ordem.prioridade}</td>
                                            <td>{ordem.programador}</td>
                                            <td>{ordem.quemAbriu}</td>
                                            <td><Link to={{ pathname: '/ordemDetalhe', state: { ordem: ordem } }}><MdAssignment color={'black'} /> Ver Detalhes</Link></td>
                                            {cod_funcionario === 19 && <td><Button click={() => modalPrazoEntrega(ordem.ord_codigo, ordem.prazoEntrega)} Icon={MdAlarmAdd} nome="Novo Prazo" borderRadius={"18px"} color={"black"} corTexto={"white"} /></td>}
                                        </tr>
                                    </tbody>
                                ))
                                : <h1>Carregando Ordens...</h1>
                        }

                    </table>
                </div>                
            </Container>
        </>
    );
}

export default OrdensAndamento;