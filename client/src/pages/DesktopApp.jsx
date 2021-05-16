import React , { useState } from 'react';
import styled from 'styled-components'
import first from "../assets/first.png";
import ground from "../assets/ground.png"
import { OverlayDesks, StyledClickPoints } from "../components"
import { renderPoints } from '../components/RenderPoints'

const StyledNav = styled.nav`
    position: absolute;
    width: 100%;
    .btn-info {
        width: 49%;
    }
`;
StyledNav.displayName = 'StyledNav'

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
    margin: 30px auto;
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

    const switchFloor = (floor) => {
        switch(floor) {
            case 0:
                setState({ showGround: true, showFirst: false })
                break;
            case 1:
                setState({ showGround: false, showFirst: true })
                break;
            default:
                setState({ showGround: true, showFirst: false })
                break
        }
    }
    const { desks, chooseDesk, users, selectedUser } = props
    const groundFloorDesks = desks.filter(desk => desk.floor === 0 )
    const firstFloorDesks = desks.filter(desk => desk.floor === 1 )

    return(
        <React.Fragment>
            <StyledNav className="navbar navbar-light bg-light d-xs-block d-sm-block d-md-block d-lg-block d-xl-none">
                <div className="container-fluid">
                    <button className='btn btn-info me-1' onClick={() => switchFloor(0)}>Ground Floor</button>
                    <button className='btn btn-info' onClick={() => switchFloor(1)}>First Floor</button>
                </div>
            </StyledNav>
            <StyledClickPointsContainer className={'col-xs-12'}>
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

                <div className={'m-5 img-container d-xs-block d-sm-block d-md-block d-lg-block d-xl-none'}>
                    <OverlayDesks
                        loadingDesks={desks.length === 0}
                        notUserSelected={selectedUser === null}
                    />

                    {(state.showGround) &&
                        <>
                            <StyledImg>
                                <img className="img-fluid" src={ground} alt='Ground Floor' />
                            </StyledImg>
                            <StyledClickPoints>
                                {  renderPoints(groundFloorDesks, chooseDesk, users, "mobile") }
                            </StyledClickPoints>
                        </>
                        
                    }
                    {(state.showFirst) &&
                        <>
                            <StyledImg>
                                <img className="img-fluid" src={first} alt='First Floor' />
                            </StyledImg>
                            <StyledClickPoints>
                                {  renderPoints(firstFloorDesks, chooseDesk, users, "mobile") }
                            </StyledClickPoints>
                        </>
                    }
                </div>
            </StyledClickPointsContainer>
        </React.Fragment>
    )
}
export default DesktopApp
