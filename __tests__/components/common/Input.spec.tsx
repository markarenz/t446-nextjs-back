import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../src/components/common/Input';

const defaultProps = {
  name: 'test',
  type: 'text',
  value: 'foo',
  onChange: jest.fn(),
  onEnterkey: jest.fn(),
  tabIndex: 1,
  autoFocus: false,
  maxLen: 100,
  testId: 'test-input'
};

const textAreaProps = {
  ...defaultProps,
  rows: 4
};

const noEnterKeyProps = {
  ...defaultProps,
  onEnterKey: null
};
describe('Input', () => {
  it('renders component', async () => {
    render(<Input {...defaultProps} />);
    const element = await screen.findByTestId('test-input');
    expect(element).toBeInTheDocument();
  });
  it('handles onChange', async () => {
    render(<Input {...defaultProps} />);
    const element = await screen.findByTestId('test-input');
    fireEvent.change(element, { target: { value: 'new' } });
    expect(defaultProps.onChange).toHaveBeenCalled;
  });
  it('renders textarea with change', async () => {
    render(<Input {...textAreaProps} />);
    const element = await screen.findByTestId('test-input');
    fireEvent.change(element, { target: { value: 'new' } });
    expect(defaultProps.onChange).toHaveBeenCalled;
  });

  it('handles keyDown enter key', async () => {
    render(<Input {...defaultProps} />);
    const element = await screen.findByTestId('test-input');
    fireEvent.keyDown(element, { key: 'Enter', code: 13, charCode: 13 });
    expect(defaultProps.onEnterkey).toHaveBeenCalled;
  });
  it('handles keyDown non-enter key', async () => {
    render(<Input {...noEnterKeyProps} />);
    const element = await screen.findByTestId('test-input');
    fireEvent.keyDown(element, { key: 'A', code: 65, charCode: 65 });
    expect(defaultProps.onEnterkey).not.toHaveBeenCalled;
  });
});
