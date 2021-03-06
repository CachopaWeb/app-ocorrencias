import React from 'react';

import { Container } from './styles';

function Modal({activate, setActivate, children, altura = 600, largura = 800, left = 0}) {    
    return (
        <Container altura={altura === 'auto' ? '80vh' : `${altura}px`} largura={largura === 'auto' ? '80vw' : `${largura}px`} left={left}>
            <div className={!activate ? "modal-overlay" : "modal-overlay active"}>
                <div className={!activate ? "modal" : "modal active"}>
                    <a className="close-modal" onClick={() => setActivate(false)}>
                        <svg viewBox="0 0 20 20">
                            <path
                                fill="#000000"
                                d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
                            ></path>
                        </svg>
                    </a>
                    <div className="modal-content">
                        {children}                      
                    </div>
                </div>
            </div>
        </Container>);
}

export default Modal;