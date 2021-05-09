import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header element', () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to Desk Booking/i);
  expect(headerElement).toBeInTheDocument();
  const subHeaderElement = screen.getByText(/Please select your name from the list,/i);
  expect(subHeaderElement).toBeInTheDocument();
});