import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import { MainApp } from '../pages'

const StyledHeader = styled.div`
    text-align: center;
    background-color: #293FCA;
    color: white;
    padding: 15px;
`;
StyledHeader.displayName = 'StyledHeader'

function App() {
    return (
        <Router>
            <StyledHeader>
                <h1>Welcome to Desk Booking</h1>
                <h4 className="text-warning">Please select your name from the list, then choose a date/period and then, click on the desk you want booking.</h4>
            </StyledHeader>
            <Route
                path="/"
                exact
                component={MainApp}
            />
        </Router>
    )
}

export default App
