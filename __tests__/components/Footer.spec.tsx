import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from '../../src/components/Footer';

describe('Footer', () => {
  it('renders component', async () => {
    render(<Footer />);
    const element = await screen.findByTestId('footer');
    expect(element).toBeInTheDocument();
  });
});
