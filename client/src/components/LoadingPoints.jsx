import React from 'react'
import styled from 'styled-components'

const StyledLoading = styled.span`
    position: absolute;
    
    .dot-flashing {
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #a4b3d6;
        color: #a4b3d6;
        animation: dotFlashing 1s infinite linear alternate;
        animation-delay: 1s;
    }
    
    .dot-flashing::before, .dot-flashing::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
    }
    
    .dot-flashing::before {
        left: -80px;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #a4b3d6;
        color: #a4b3d6;
        animation: dotFlashing 1s infinite alternate;
        animation-delay: .5s;
    }
    
    .dot-flashing::after {
        left: 80px;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #a4b3d6;
        color: #a4b3d6;
        animation: dotFlashing 1s infinite alternate;
        animation-delay: 1.5s;
    }

    @keyframes dotFlashing {
        0% {
            background-color: #a4b3d6;
        }
        50%,
        100% {
            background-color: rgba(0,0,0,0.5);
            width: 15px;
            height: 15px;
        }
    }
`;

StyledLoading.displayName = 'StyledLoading'

export const LoadingPoints = () => {
    return (
        <StyledLoading>
            <p className="dot-flashing"/>
        </StyledLoading>
    )
}

