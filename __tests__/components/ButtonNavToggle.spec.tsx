import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BtnNavToggle from '../../src/components/ButtonNavToggle';
import { useAppContext } from '../../src/context/AppContext';

jest.mock('../../src/context/AppContext', () => ({
  useAppContext: jest
    .fn()
    .mockReturnValueOnce({
      isSidebarOpen: false,
      setSidebarOpen: jest.fn()
    })
    .mockReturnValue({
      isSidebarOpen: true,
      setSidebarOpen: jest.fn()
    })
}));

describe('BtnNavToggle', () => {
  it('renders component', () => {
    render(<BtnNavToggle />);

    const element = screen.getByTestId('btn-nav-toggle');
    expect(element).toBeInTheDocument();
  });

  it('calls context function when clicked', async () => {
    render(<BtnNavToggle />);
    const element = screen.getByTestId('btn-nav-toggle');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(useAppContext().setSidebarOpen).toHaveBeenCalled();
  });
});
