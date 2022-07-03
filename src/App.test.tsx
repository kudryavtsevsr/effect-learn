import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders logo', () => {
  render(<App />);
  const linkElement = screen.getByText(/effect learn/i);
  expect(linkElement).toBeInTheDocument();
});
