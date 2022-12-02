import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProtectedByRole from '../../../src/components/common/ProtectedByRole';

jest.mock('next-auth/react', () => ({
  useSession: jest
    .fn()
    .mockReturnValueOnce({
      data: {
        user: {
          role: ''
        }
      }
    })
    .mockReturnValueOnce({})
    .mockReturnValue({
      data: {
        user: {
          role: 'admin'
        }
      }
    })
}));

describe('ProtectedByRole', () => {
  it('renders warning when unauthorized', async () => {
    render(
      <ProtectedByRole>
        <div>OK</div>
      </ProtectedByRole>
    );
    const element = screen.queryByTestId('unauthorized');
    expect(element).toBeInTheDocument();
  });
  it('renders warning when session is null', async () => {
    render(
      <ProtectedByRole>
        <div>OK</div>
      </ProtectedByRole>
    );
    const element = screen.queryByTestId('unauthorized');
    expect(element).toBeInTheDocument();
  });

  it('renders component when authorized', async () => {
    render(
      <ProtectedByRole>
        <div>OK</div>
      </ProtectedByRole>
    );
    const element = screen.queryByTestId('unauthorized');
    expect(element).toBe(null);
  });
});
