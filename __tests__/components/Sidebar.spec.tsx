import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '../../src/components/Sidebar';

const replaceMock = jest.fn();
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    replace: replaceMock
  }))
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn().mockReturnValue({
    data: {
      user: {
        role: 'admin'
      }
    }
  })
}));
jest.mock('../../src/context/AppContext', () => ({
  useAppContext: jest
    .fn()
    .mockReturnValueOnce({
      isSidebarOpen: true,
      setLoading: jest.fn()
    })
    .mockReturnValueOnce({
      isSidebarOpen: false,
      setLoading: jest.fn()
    })
}));

const defaultProps = {
  pageMeta: {
    title: 'Test Title',
    metedesc: 'Test metadesc'
  }
};

describe('Layout', () => {
  it('renders component', async () => {
    render(<Sidebar />);
    const element = await screen.findByTestId('sidebar');
    expect(element).toBeInTheDocument();
  });

  it('redirects on image click', async () => {
    render(<Sidebar />);
    const element = await screen.findByTestId('sidebar-img');
    await waitFor(() =>
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
    expect(replaceMock).toHaveBeenCalled();
  });
});
