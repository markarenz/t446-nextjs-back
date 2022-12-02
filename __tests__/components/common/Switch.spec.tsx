import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Switch from '../../../src/components/common/Switch';

const defaultProps = {
  name: 'fieldName',
  tabIndex: 1,
  value: 'active',
  onChange: jest.fn(),
  options: [
    { label: 'On', value: 'active' },
    { label: 'Off', value: 'inactive' }
  ],
  testId: 'test-switch'
};
const defaultProps2 = {
  ...defaultProps,
  value: 'inactive'
};
const altProps = {
  ...defaultProps,
  value: 'inactive',
  options: [{ label: 'Off', value: 'inactive' }]
};
describe('Switch', () => {
  it('renders Switch', async () => {
    render(<Switch {...defaultProps} />);
    const element = await screen.findByTestId('test-switch');
    expect(element).toBeInTheDocument();
  });
  it('renders nothing when fewer than 2 options are provded', async () => {
    render(<Switch {...altProps} />);
    const element = screen.queryByTestId('test-switch');
    expect(element).toBe(null);
  });
  it('fires onChange when clicked - active', async () => {
    render(<Switch {...defaultProps} />);
    const button = await screen.findByTestId('test-switch-button');
    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(defaultProps.onChange).toHaveBeenCalled();
  });
  it('fires onChange when clicked - inactive', async () => {
    render(<Switch {...defaultProps2} />);
    const button = await screen.findByTestId('test-switch-button');
    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(defaultProps.onChange).toHaveBeenCalled();
  });
});
