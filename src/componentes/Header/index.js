import React, { useState } from 'react';

import { Container } from './styles';
import { useUsuario } from '../../context/UsuarioContext';
import { Link } from 'react-router-dom';
import { MdPerson, MdAccountCircle, MdSpeakerNotes, MdSpeakerNotesOff, MdAlarmOn, MdLockOpen, MdAddBox  } from 'react-icons/md';

function Header({title}) {
  const { codigo, nome } = useUsuario();
  const [showMenu, setshowMenu] = useState(true);
  return (
    <Container>
        <Link to={'/ocorrencias'}><h1>{title}</h1></Link>        
        <div className={showMenu ? "menu-section" : "menu-section on"}>
          <div className="menu-toogle" onClick={()=> setshowMenu(!showMenu)}>
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>
          <nav>
              <ul>
                <li><Link to={'/ocorrencias'} onClick={()=> setshowMenu(!showMenu)}><MdSpeakerNotes /> Ocorrências</Link></li>
                <li><Link to={'/ocorrenciasFinalizadas'} onClick={()=> setshowMenu(!showMenu)}><MdSpeakerNotesOff /> Ocorrências Fin.</Link></li>
                <li><Link to={'/clientes'} onClick={()=> setshowMenu(!showMenu)}><MdPerson /> Clientes</Link></li>
                <li><Link to={'/ordensAndamento'} onClick={()=> setshowMenu(!showMenu)}><MdAlarmOn /> Ordens</Link></li>
                <li><Link to={'/licencas'} onClick={()=> setshowMenu(!showMenu)}><MdLockOpen /> Licenças</Link></li>
                <li><Link to={'/scrum'} onClick={()=> setshowMenu(!showMenu)}><MdAddBox /> SCRUM</Link></li>
                {codigo !== 0 ? <li><MdAccountCircle /> {nome}</li> : <li><MdAccountCircle /> Não logado</li>}
              </ul>             
          </nav>
        </div>
    </Container>
  );
}

export default Header;