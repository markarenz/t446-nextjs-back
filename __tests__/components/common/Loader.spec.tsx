import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Loader from '../../../src/components/common/Loader';

describe('Loader', () => {
  it('renders loader', async () => {
    render(<Loader show />);
    const element = await screen.findByTestId('loader');
    expect(element).toHaveClass('active');
    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });
  it('renders not loading', async () => {
    render(<Loader show={false} />);
    const element = await screen.findByTestId('loader');
    expect(element).toHaveClass('false');
    expect(element).toMatchSnapshot();
  });
});
