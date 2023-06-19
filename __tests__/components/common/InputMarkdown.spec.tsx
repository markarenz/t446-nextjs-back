import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InputMarkdown from '../../../src/components/common/InputMarkdown';
import ReactMarkdown from 'react-markdown';

jest.mock('react-markdown', () => () => <div>This is my __markdown__.</div>);

const defaultProps = {
  value: 'this is my value',
  name: 'testField',
  tabIndex: 1,
  rows: 4,
  onChange: jest.fn(),
  testId: 'input-markdown'
};
describe('Button', () => {
  it('renders default button', async () => {
    render(<InputMarkdown {...defaultProps} />);
    const element = await screen.findByTestId('input-markdown');
    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });
  it('toggles preview display', async () => {
    render(<InputMarkdown {...defaultProps} />);
    const element = await screen.findByTestId('input-markdown-toggle-preview');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    const preview = await screen.findByTestId('input-markdown-preview');
    expect(preview).toBeInTheDocument();
  });
});
