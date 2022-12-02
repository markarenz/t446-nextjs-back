import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InputDropdown from '../../../src/components/common/InputDropdown';

const defaultProps = {
  name: 'fieldName',
  testId: 'test-dropdown',
  value: 'val1',
  onChange: jest.fn(),
  options: [
    { label: 'option 1', value: 'val1' },
    { label: 'option 2', value: 'val2' }
  ]
};
describe('InputDropdown', () => {
  it('renders default dropdown', async () => {
    render(<InputDropdown {...defaultProps} />);
    const element = await screen.findByTestId('test-dropdown');
    expect(element).toBeInTheDocument();
  });

  it('handles value change', async () => {
    render(<InputDropdown {...defaultProps} />);
    const element = await screen.findByTestId('test-dropdown');
    fireEvent.change(element, { target: { value: 'val2' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });
});
