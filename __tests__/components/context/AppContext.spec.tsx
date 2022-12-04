import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  AppContextProvider,
  useAppContext
} from '../../../src/context/AppContext';

const TestComponent = () => {
  const { isLoading, setLoading, isSidebarOpen, setSidebarOpen } =
    useAppContext();
  return (
    <div>
      <button onClick={() => setLoading(!isLoading)} data-testid="btn-1">
        Test
      </button>
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        data-testid="btn-2"
      >
        Test2
      </button>
    </div>
  );
};

describe('Footer', () => {
  it('renders component', async () => {
    render(
      <AppContextProvider>
        <div data-testid="children">
          <TestComponent />
        </div>
      </AppContextProvider>
    );
    const element = await screen.findByTestId('children');
    expect(element).toBeInTheDocument();
  });

  it('handles setLoad', async () => {
    render(
      <AppContextProvider>
        <div data-testid="children">
          <TestComponent />
        </div>
      </AppContextProvider>
    );
    const element = await screen.findByTestId('btn-1');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(element).toBeInTheDocument();
  });

  it('handles setSidebarOpen', async () => {
    render(
      <AppContextProvider>
        <div data-testid="children">
          <TestComponent />
        </div>
      </AppContextProvider>
    );
    const element = await screen.findByTestId('btn-2');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(element).toBeInTheDocument();
  });
});
