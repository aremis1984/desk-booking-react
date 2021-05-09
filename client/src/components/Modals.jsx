import React from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'
import { DateRangeSelect } from '../components/DateRangeSelect'

Modal.setAppElement('#root')

const StyledModal = styled(Modal)`
    color: black;
    width: 40%;
    margin: 1% auto;
    background-color: white;
    border: 1px solid #a4b3d6;
    padding: 2%;
    .close-btn {
        width: 100%;
    }

    @media (max-width: 1199px) {
        width: 80%;
    }
`
StyledModal.displayName = 'StyledModal'

const now = new Date()
export const Modals = (props) => {
    const { 
            showCalendar,
            showModalWarning,
            showModalBooked,
            showModalOperation,
            from,
            to,
            setDateRange,
            toggleCalendar,
            toggleModalWarning,
            toggleModalBooked,
            toggleModalOperation,
            verified,
            verifyIdentiy,
            update
        } = props
    return (
        <React.Fragment>
            <StyledModal
                isOpen={showCalendar}
                onRequestClose={toggleCalendar}
                contentLabel="Choose a date or range"
                style={{
                    overlay: {
                        zIndex: 3
                    }
                }}>
                <p className={'text-info'}>
                    To select a range click on the start day and in the end day you want or
                    type it in the inputs in the format "DD.MM.YYYY" and press Enter.
                </p>
                <DateRangeSelect
                    setDateRange={setDateRange}
                    startDate={(from && new Date (from)) || now}
                    endDate={(to && new Date (to)) || now}
                />
                <br/>
                <button onClick={toggleCalendar} className={'btn btn-lg btn-danger'}>Close</button>
            </StyledModal>
            <StyledModal
                isOpen={showModalWarning}
                onRequestClose={toggleModalWarning}
                contentLabel='Please select a Period'
                style={{
                    overlay: {
                        zIndex: 3
                    }
                }}>
                <h2 className="margin-top-20 text-center text-danger">Please select a Period or date!</h2>
                <br/>
                <h3 className="margin-top-20 text-center">
                    By selecting a desk the data will be saved, so FIRST you must choose a period or date.
                </h3>
                <br/>
                <button className={'btn btn-warning close-btn'} onClick={toggleModalWarning}>Close</button>
            </StyledModal>
            <StyledModal
                isOpen={showModalBooked}
                onRequestClose={toggleModalBooked}
                contentLabel='You have already a desk'
                style={{
                    overlay: {
                        zIndex: 3
                    }
                }}>
                <h2 className="text-center text-danger">You have already a desk!</h2>
                <br/>
                <h3 className="text-center">
                    First delete your current desk, then select a new one.
                </h3>
                <br/>
                <button className={'btn btn-warning close-btn'} onClick={toggleModalBooked}>Close</button>
            </StyledModal>
            <StyledModal
                isOpen={showModalOperation}
                onRequestClose={toggleModalOperation}
                contentLabel='You have already a desk'
                style={{
                    overlay: {
                        zIndex: 3
                    }
                }}>
                <h2 className="text-center text-danger">Please, verify your indentity</h2>
                <br/>
                <h4 className="text-center">
                    To perform this operation, please enter your employee key:
                </h4>
                <input placerholder='Insert your key here' onChange={verifyIdentiy} />
                {!verified && <span className='small text-danger'>Your key is incorrect, to enable the button introduce the correct one.</span>}
                <br/>
                <button className={'btn btn-success save-btn'} disabled={!verified} onClick={update}>Save Changes</button>
                <button className={'btn btn-warning close-btn'} onClick={toggleModalOperation}>Close</button>
            </StyledModal>
        </React.Fragment>
    )
}

export default Modals