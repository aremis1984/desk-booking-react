import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  z-index: 2;
  margin-bottom: 20px;
`;

StyledSelect.displayName = 'StyledSelect'

const StyledContainer = styled.div`
  margin-bottom: 40px;
`;

StyledContainer.displayName = 'StyledContainer'

class SelectElement extends React.Component {
    handleChange = selectedOption => {
        this.props.handleUserChange(selectedOption)
    };
    render() {
        const {selectOptions, selectedOption} = this.props
        return (
            <StyledContainer>
                <h4 className="text-info">Please choose your name from the list:</h4>
                <StyledSelect
                    className={'basic-single'}
                    classNamePrefix='select'
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={selectOptions}
                    isClearable={true}
                    isSearchable={true}
                />
                {selectedOption === null &&
                <h4 className='small text-danger'>The Open Calendar button will be enabled once you select your name.</h4>
                }
            </StyledContainer>
        );
    };
};

export default SelectElement;