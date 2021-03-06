import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;  
  .lista{
      color: black; 
      article{
        display: flex;
        align-content: space-between;
        flex-direction: column;
        background-color: #323540;
        box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.2), 0px 10px 20px -10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #B2D9A0;             
        margin: 10px 5px 10px 5px;
        padding: 10px;          
        p{
          font-size: 1rem;
        }
        h1{
            color: white;
        }
        :hover{
          transform: translateY(-2px);
        }
      }
  }
`;

export const Pesquisa = styled.div`
    #form{
        max-width: 800px;
        padding-top: 10px;
        margin: 0 auto;       

        label{
            margin: 0px 15px 0px 0px;
        }
        input[type=text] {
            height: 46px;
            margin-bottom: 15px;
            padding: 0 20px;
            color: #777;
            font-size: 15px;
            width: 100%;
            border: 1px solid #ddd;
            &::placeholder {
                color: #999;
            }                        
        }  

        .form-group input[type=checkbox]{                        
            height: 20px;
        }
        .form-group{
            padding: 0px 10px;        
        }  

        .form-group select {
            width: 100%;
            font-size: 1.1em;
            margin-top: 5px;
            margin-bottom: 5px;
            height: 40px;
        }  
    }
`;