import React from 'react';
import Router from 'next/router';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Layout from '../../src/components/Layout';
import { useAppContext } from '../../src/context/AppContext';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest
    .fn()
    .mockReturnValueOnce({
      data: {
        user: {
          role: 'admin'
        }
      }
    })
    .mockReturnValueOnce({
      data: {}
    })
    .mockReturnValue({
      data: {
        user: {
          role: 'admin'
        }
      }
    }),
  signIn: jest.fn()
}));
jest.mock('../../src/context/AppContext', () => ({
  useAppContext: jest
    .fn()
    .mockReturnValueOnce({
      isLoading: true,
      setLoading: jest.fn()
    })
    .mockReturnValueOnce({
      isLoading: false,
      setLoading: jest.fn()
    })
    .mockReturnValue({
      isLoading: false,
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
    render(
      <Layout {...defaultProps}>
        <div>Page</div>
      </Layout>
    );
    const element = await screen.findByTestId('layout');
    expect(element).toBeInTheDocument();
  });

  it('calls logout when button is clicked', async () => {
    render(
      <Layout {...defaultProps}>
        <div>Page</div>
      </Layout>
    );
    const element = screen.getByTestId('btn-signin');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(signIn).toHaveBeenCalled();
  });

  it('reacts to route change start', async () => {
    render(
      <Layout {...defaultProps}>
        <div>Page</div>
      </Layout>
    );
    Router.events.emit('routeChangeStart');
    expect(useAppContext().setLoading).toHaveBeenCalledWith(true);
  });

  it('reacts to route change complete', async () => {
    render(
      <Layout {...defaultProps}>
        <div>Page</div>
      </Layout>
    );
    Router.events.emit('routeChangeComplete');
    expect(useAppContext().setLoading).toHaveBeenCalledWith(false);
  });
  it('reacts to route change error', async () => {
    render(
      <Layout {...defaultProps}>
        <div>Page</div>
      </Layout>
    );
    Router.events.emit('routeChangeError');
    expect(useAppContext().setLoading).toHaveBeenCalledWith(false);
  });
});
