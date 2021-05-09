import React from 'react'
import styled from 'styled-components'
import { LoadingPoints } from "./LoadingPoints"

const StyledOverlay = styled.div`
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.1);
    z-index: 2;
    cursor: pointer;
`;
StyledOverlay.displayName = 'StyledOverlay'

const StyledTextOverlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 50px;
    color: white;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    text-align: center;
`;
StyledTextOverlay.displayName = 'StyledTextOverlay'

class OverlayDesks extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.loadingDesks &&
                    <StyledOverlay>
                        <StyledTextOverlay>
                            <h1>Please wait, loading desks</h1>
                            <LoadingPoints />
                        </StyledTextOverlay>
                    </StyledOverlay>
                }
                {this.props.notUserSelected && !this.props.loadingDesks &&
                    <StyledOverlay>
                        <StyledTextOverlay>Please choose an user in order to proceed.</StyledTextOverlay>
                    </StyledOverlay>
                }
            </React.Fragment>
        )
    }
}

export default OverlayDesks

