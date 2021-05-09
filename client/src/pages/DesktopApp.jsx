import React , { useState } from 'react';
import styled from 'styled-components'
import first from "../assets/first.png";
import ground from "../assets/ground.png"
import { OverlayDesks, StyledClickPoints } from "../components"
import { renderPoints } from '../components/RenderPoints'

const StyledImg = styled.div`
    text-align: center;
    img {
        width: 50%;
        @media (max-width: 1199px) {
            width: 100%;
        }
    }
    h2 {
        position: absolute;
    }
`;
StyledImg.displayName = 'StyledImg'

const StyledClickPointsContainer = styled.div`
    margin: 0 auto;
    padding: 70px;
    .img-container {
        position: relative;
    }
`;
StyledClickPointsContainer.displayName = 'StyledClickPointsContainer'

export const DesktopApp = (props) => {
    const [state, setState] = useState(
        {
            showGround: true,
            showFirst: false
        }
    )

    const switchFloor = () => {
        if(state.showGround) {
            setState({
                showGround: false,
                showFirst: true                
            })
        } else {
            setState({
                showGround: true,
                showFirst: false           
            })
        }
    }
    const { desks, chooseDesk, users, selectedUser } = props;
    return(
        <StyledClickPointsContainer className={'col-xs-12'}>
            <div className={'d-xs-block d-sm-block d-md-block d-lg-block d-xl-none'}>
                <button className='btn btn-info' onClick={switchFloor}>Ground Floor</button>
                <button className='btn btn-info' onClick={switchFloor}>First Floor</button>
            </div>

            <div className={'img-container d-none d-xl-block'}>
                <OverlayDesks
                    loadingDesks={desks.length === 0}
                    notUserSelected={selectedUser === null}
                />
                <StyledClickPoints>
                    { renderPoints(desks, chooseDesk, users, "desktop") }
                </StyledClickPoints>
                <StyledImg>
                    <img className="img-fluid" src={ground} alt='Ground Floor' />
                    <img className="img-fluid" src={first} alt='First Floor' />
                </StyledImg>
            </div>

            <div className={'img-container d-xs-block d-sm-block d-md-block d-lg-block d-xl-none'}>
                <OverlayDesks
                    loadingDesks={desks.length === 0}
                    notUserSelected={selectedUser === null}
                />
                <StyledClickPoints>
                    {  renderPoints(desks, chooseDesk, users, "mobile") }
                </StyledClickPoints>
                {(state.showGround) &&
                    <StyledImg>
                        <img className="img-fluid" src={ground} alt='Ground Floor' />
                    </StyledImg>
                }
                {(state.showFirst) &&
                    <StyledImg>
                        <img className="img-fluid" src={first} alt='First Floor' />
                    </StyledImg>
                }
            </div>
        </StyledClickPointsContainer>
    )
}
export default DesktopApp
