import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../../src/components/Header';
import { signOut } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn().mockReturnValue({
    session: {}
  }),
  signOut: jest.fn()
}));
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

describe('Header', () => {
  it('renders component', async () => {
    render(<Header />);
    const element = await screen.findByTestId('header');
    expect(element).toBeInTheDocument();
  });
  it('calls logout when button is clicked', async () => {
    render(<Header />);
    const element = screen.getByTestId('btn-logout');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(signOut).toHaveBeenCalled();
  });
});
