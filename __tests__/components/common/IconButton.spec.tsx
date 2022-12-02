import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IconButton from '../../../src/components/common/IconButton';

const defaultProps = {
  onClick: jest.fn(),
  title: 'Test',
  color: 'primary',
  disabled: false
};
const altProps = {
  ...defaultProps,
  color: 'secondary'
};
describe('Button', () => {
  it('renders default button', async () => {
    render(
      <IconButton {...defaultProps}>
        <span>Test</span>
      </IconButton>
    );
    const element = await screen.findByRole('button');
    expect(element).toBeInTheDocument();
  });
  it('renders button with secondary color and outlines', async () => {
    render(
      <IconButton {...altProps}>
        <span>Test</span>
      </IconButton>
    );
    const element = await screen.findByRole('button');
    expect(element).toBeInTheDocument();
  });

  it('fires onClick when clicked', async () => {
    render(
      <IconButton {...defaultProps}>
        <span>Test</span>
      </IconButton>
    );
    const element = await screen.findByRole('button');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
