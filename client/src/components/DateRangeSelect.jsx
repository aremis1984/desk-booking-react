import React, {useEffect, useState} from 'react';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range'
import styled from "styled-components";

const StyledContainer = styled.div`
    margin-top: 20px;
    display: block;
    margin-bottom: 20px;
    
    .rdrCalendarWrapper {
        font-size: 100%;
        width: 100%;
    }
    .rdrMonth {
        width: 100%;
        height: 100%;
    }
    .rdrDay {
        height: 4em;
    }
    .rdrDateInput, .rdrMonthAndYearPickers, .rdrWeekDays, .rdrDayNumber {
        font-size: 20px;
    }
    .rdrDays {
        height: 100%;
    }
    
    @media (max-width: 1199px) {
        .rdrDay {
            height: 3em;
        }
        .rdrDateInput, .rdrMonthAndYearPickers, .rdrWeekDays, .rdrDayNumber {
            font-size: 15px;
        }
    }
`;

StyledContainer.displayName = 'StyledContainer'

const now = new Date()
export const DateRangeSelect = (props) => {
    let {startDate, endDate, setDateRange} = props
    const [state, setState] = useState([
        {
            startDate: now,
            endDate: now,
            key: 'selection'
        }
    ])

    useEffect(() => {
        setState([
            {
                startDate: startDate,
                endDate: endDate,
                key: 'selection'
            }
        ]);
    }, [startDate, endDate])

    const onChange = range => {
        setState(range)
        setDateRange(range[0].startDate, range[0].endDate)
        props.callBack && props.callBack()
    }

    return (
        <StyledContainer>
            <DateRange
                editableDateInputs={true}
                showSelectionPreview={true}
                onChange={item => onChange([item.selection])}
                moveRangeOnFirstSelection={false}
                months={1}
                minDate={now}
                ranges={state}
                locale={locales['de']}
                dateDisplayFormat={'dd.MM.yyyy'}
            />
        </StyledContainer>
    )
}





