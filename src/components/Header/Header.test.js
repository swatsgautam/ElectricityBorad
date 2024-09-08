import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders the header text', () => {
    render(<Header />);
    const headerElement = screen.getByText(/Electricity Board/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('header has correct class', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');
  });
});
