import styled from 'styled-components'

export const StyledClickPoints = styled.div`
    position: static;
    margin: 0;
    padding: 0;
    .point {
        position: absolute;
        cursor: pointer;
        border: 2px solid black;
        background-color: yellow;
    }

        #d1 {
            width: 5.2%;
            left: 14%;
            top: 5.5%;
            height: 3.6%;
        }
        #d2 {
            width: 5.2%;
            left: 14%;
            top: 34.2%;
            height: 3.6%;
        }
        #d3 {
            height: 8.8%;
            left: 8%;
            top: 41%;
            width: 2.8%;
        }
        #d4 {
            height: 6.8%;
            left: 54.1%;
            top: 16.8%;
            width: 3%;
        }
        #d5 {
            height: 6.8%;
            left: 54.2%;
            top: 42.4%;
            width: 3%;
        }
        #d6 {
            height: 7.8%;
            left: 54.3%;
            top: 67.3%;
            width: 3%;
        }


    .mobile {
        #d1 {
            width: 5.2%;
            left: 14%;
            top: 5.5%;
            height: 3.6%;
        }
        #d2 {
            width: 5.2%;
            left: 14%;
            top: 34.2%;
            height: 3.6%;
        }
        #d3 {
            height: 8.8%;
            left: 8%;
            top: 41%;
            width: 2.8%;
        }
        #d4 {
            height: 6.8%;
            left: 54.1%;
            top: 16.8%;
            width: 3%;
        }
        #d5 {
            height: 6.8%;
            left: 54.2%;
            top: 42.4%;
            width: 3%;
        }
        #d6 {
            height: 7.8%;
            left: 54.3%;
            top: 67.3%;
            width: 3%;
        }
    }
    
    .taken {
        text-align: center;
        color: white;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: red;
        cursor: not-allowed;
    }
`;

StyledClickPoints.displayName = 'StyledClickPoints'

export default StyledClickPoints