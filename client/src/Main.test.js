import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MainApp } from '../../client/src/pages/index';
import * as api from '../../client/src/api/index'

import { SelectElement } from '../../client/src/components'

const employees = [
  { id: 1, firstname: 'Bill', surname: 'Gates', key: 'Test1234' },
  { id: 2, firstname: 'Homer', surname: 'Simpson', key: 'Test1234' },
  { id: 3, firstname: 'Tonny', surname: 'Stark', key: 'Test1234' },
  { id: 4, firstname: 'Test', surname: 'Test', key: 'Test1234' }
]

const selectOptions = [
    { value: 1, label: 'Bill Gates' },
    { value: 2, label: 'Homer Simpson' },
    { value: 3, label: 'Tonny Stark' },
    { value: 4, label: 'Test Test' }
  ]

const desks = [
  [
    { id: 1, floor: 0, position: 1, booked_by: -1, from: null, to: null },
    {
      id: 2,
      floor: 0,
      position: 2,
      booked_by: -1,
      from: '2021-05-08T22:00:00.000Z',
      to: '2021-05-08T22:00:00.000Z'
    },
    {
      id: 3,
      floor: 0,
      position: 3,
      booked_by: 1,
      from: '2021-05-09T01:37:50.404Z',
      to: '2021-09-08T22:00:00.000Z'
    },
    { id: 4, floor: 1, position: 1, booked_by: -1, from: null, to: null },
    { id: 5, floor: 1, position: 2, booked_by: -1, from: null, to: null },
    { id: 6, floor: 1, position: 3, booked_by: -1, from: null, to: null }
  ]
]

describe("Desk booking main page", () => {
  beforeAll(() => {
    jest.spyOn(api, "getAllEmployees")
    jest.spyOn(api, "getDesks")
  });

  it("shows desks and employees", async () => {
    api.getAllEmployees.mockResolvedValueOnce({
      ok: true,
      json: async () => employees,
    });

    api.getDesks.mockResolvedValueOnce({
      ok: true,
      json: async () => desks,
    });
    render(<MainApp />);

    expect(screen.getByText('Select...')).toBeInTheDocument();
    expect(screen.getByText('Open Calendar')).toBeInTheDocument();
    expect(screen.getByText('Open Calendar')).toHaveAttribute('disabled')
    expect(screen.getByText('Update your current Desk')).toBeInTheDocument();
    expect(screen.getByText('Delete your current Desk')).toBeInTheDocument();
    const {getByText} = render(<SelectElement
        selectedOption={selectOptions[0]}
        selectOptions={selectOptions}
        handleUserChange={jest.fn()}
    />)
    expect(getByText('Bill Gates')).toBeInTheDocument();

  })

})