import React, { Component } from 'react'
import * as api from "../api";

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import styled from 'styled-components'
import { DesktopApp } from './index'

import { SelectElement, Modals } from '../components'

const StyledDate = styled.div`
    margin-top: 7%;
    padding: 0;
`;
StyledDate.displayName = 'StyledDate'

const StyledSelectors = styled.div`
    padding: 70px;
    @media (max-width: 1199px) {
        padding: 3% 10%;
    }
`;
StyledSelectors.displayName = 'StyledSelectors'

const StyledContainer = styled.div`
    background-color: #F8FAB7;
    @media (max-width: 1199px) {
        display: flex;
        flex-direction: column-reverse;
    }
    .plans-cls {
        border-right: 3px solid #293FCA;
        display: inline-flex;
        @media (max-width: 1199px) {
            border-right: none;
            border-top: 3px solid #293FCA;
        }
    }
`;
StyledContainer.displayName = 'StyledContainer'

const now = new Date()

class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: null,
            to: null,
            selectOptions: [],
            selectedUser: null,
            desks: [],
            introducedKey: '',
            verified: true
        }
        this.setDateRange = this.setDateRange.bind(this)
        this.handleUserChange = this.handleUserChange.bind(this)
        this.toggleCalendar = this.toggleCalendar.bind(this)
        this.getPeriodText = this.getPeriodText.bind(this)
        this.chooseDesk = this.chooseDesk.bind(this)
        this.update = this.update.bind(this)
        this.toggleModalWarning = this.toggleModalWarning.bind(this)
        this.toggleModalBooked = this.toggleModalBooked.bind(this)
        this.toggleModalOperation = this.toggleModalOperation.bind(this)
        this.verifyIdentiy = this.verifyIdentiy.bind(this)
        this.checkKey = this.checkKey.bind(this)
    }

     componentDidMount() {
         this.getEmployees()
         setTimeout(this.getDesks, 3000);
     }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedUser && this.state.selectedUser &&
            (prevState.selectedUser.value !== this.state.selectedUser.value)) {
        }
    }

    getEmployees = () => {
        return api.getAllEmployees().then(users => {
            let selectOptions = users.map(user => {
                return { value: user.id, label: user.firstname + ' ' + user.surname }
            })
            this.setState({
                users,
                selectOptions,
                loading: false
            })
        }).catch((err)=>{
                NotificationManager.error('Error', 'Can not get employees', 5000)
                this.setState({fatalError: true})
        })
    }

    getDesks = () => {
        return api.getDesks().then(desks => {
            this.setState({
                desks,
                loading: false
            })
        }).catch((err)=>{
                NotificationManager.error('Error', 'Can not get Desks list', 5000)
                this.setState({fatalError: true})
        })
    }

    setDateRange (from, to) {
        this.setState({ from, to })
    }

    handleUserChange (selectedUser) {
        const { desks } = this.state
        let deskData = selectedUser && desks.find((desk, i) => {
            return desk.booked_by === selectedUser.value
        })

        this.setState({ selectedUser, from: deskData && deskData.from,  to: deskData && deskData.to })
    }

    toggleCalendar () {
        this.setState({showCalendar: !this.state.showCalendar})
    }

    getPeriodText() {
        const { from, to } = this.state
        const start = new Date(from)
        const end = new Date(to)
        const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24))
        if (diffDays === 0) {
            return start.toLocaleDateString()
        }
        return(
               <React.Fragment>
                    <strong>From: </strong>
                        {new Date(start).toLocaleDateString()}
                    <strong> - To: </strong>
                        {new Date(end).toLocaleDateString()}
                </React.Fragment>     
            )
    }

    update () {
        const { desks, selectedUser, from, to, deskId, isFree } = this.state

        if(this.checkKey()) {
            let desk = null
            if(deskId){
                desk = desks.find((desk, i) => {
                    return desk.id === deskId
                })
            }else {
                desk = desks.find((desk, i) => {
                    return desk.booked_by === selectedUser.value
                })
            }

            const update = Object.assign({}, desk)
            update.booked_by = isFree ? -1 : selectedUser.value
            update.from = from
            update.to = to
            
            return api.updateDesk(desk.id, update).then(() => {
                NotificationManager.success('Success', 'Desktop reservation updated')
                this.toggleModalOperation()
                this.getDesks()
            }).catch((err)=>{
                    NotificationManager.error('Error', 'Can not get Desks list', 5000)
            })
        } else {
            this.setState({ verified: false })
        }
    }

    checkKey() {
        const { selectedUser, users, introducedKey } = this.state
        const currentUser = users.find((user, i) => 
            user.id === selectedUser.value
        )
        return (introducedKey === currentUser.key)
    }

    chooseDesk (deskId) {
        const { from, to, desks, selectedUser } = this.state
        let deskUser = desks.find((desk, i) => {
            return desk.booked_by === selectedUser.value
        })

        if(deskUser) {
            this.toggleModalBooked()
        } else if(!from && !to && !deskUser) {
            this.toggleModalWarning()
        } else {
            this.setState({ deskId })
            this.toggleModalOperation()
        }
    }

    verifyIdentiy (ev) {
        this.setState({ introducedKey: ev.target.value })
    }

    toggleModalOperation (isFree = false) {
        this.setState({ showModalOperation: !this.state.showModalOperation, isFree, introducedKey: '' })
    }

    toggleModalWarning () {
        this.setState({ showModalWarning: !this.state.showModalWarning })
    }

    toggleModalBooked () {
        this.setState({ showModalBooked: !this.state.showModalBooked })
    }

    render() {
        const {
            from,
            to,
            selectOptions,
            selectedUser,
            desks,
            users,
            showCalendar,
            showModalWarning,
            showModalBooked,
            showModalOperation,
            verified,
            deskId,
            introducedKey
        } = this.state;
        let haveDesk = selectedUser && desks.find((desk, i) => {
            return desk.booked_by === selectedUser.value
        })
        let deskUpdated = haveDesk && (from !== now && haveDesk.from !== from && to !== now && haveDesk.to !== to)
        let deskFree = desks.find((desk, i)=> desk.id === deskId && desk.booked_by === -1 )
        return (
            <StyledContainer className={'row'}>
                <NotificationContainer/>
                <div className={'plans-cls col-xl-8 col-xs-12'}>
                    <DesktopApp
                        desks={desks}
                        users={users}
                        selectedUser={selectedUser}
                        chooseDesk={this.chooseDesk}
                    />
                </div>
                <StyledSelectors className={'col-xl-4 col-xs-12'}>
                    <SelectElement
                        selectedOption={selectedUser}
                        selectOptions={selectOptions}
                        handleUserChange={this.handleUserChange}
                    />
                    {(from && to && selectedUser && !deskFree) &&
                        <div className={'bg-info text-center col-md-12 p-3'}>
                            <h3>Date selected:</h3>
                            <p>{this.getPeriodText()}</p>
                        </div>
                    }
                    <br/>
                    <h4 className="text-info">Choose a day or a range in the calendar, then click on a desk: </h4>
                    <br/>
                    <div className="row">
                        <button onClick={this.toggleCalendar} disabled={selectedUser ? false : true} className={'btn btn-primary m-1'}>Open Calendar</button>
                        <button onClick={() => this.toggleModalOperation(true)} disabled={!haveDesk} className={'btn btn-danger m-1'}>Delete your current Desk</button>
                        <button onClick={() => this.toggleModalOperation(false)} disabled={!deskUpdated} className={'btn btn-dark m-1'}>Update your current Desk</button>
                    </div>
                </StyledSelectors>
                <Modals
                    showCalendar={showCalendar}
                    showModalBooked={showModalBooked}
                    showModalWarning={showModalWarning}
                    showModalOperation={showModalOperation}
                    from={from}
                    to={to}
                    setDateRange={this.setDateRange}
                    toggleModalWarning={this.toggleModalWarning}
                    toggleModalBooked={this.toggleModalBooked}
                    toggleCalendar={this.toggleCalendar}
                    verified={verified}
                    update={this.update}
                    introducedKey={introducedKey}
                    toggleModalOperation={this.toggleModalOperation}
                    verifyIdentiy={this.verifyIdentiy}
                />
            </StyledContainer>
        )
    }
}

export default MainApp