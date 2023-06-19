import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Button from '../../../src/components/common/Button';

const defaultProps = {
  title: 'Test',
  variant: 'contained',
  color: 'primary',
  onClick: jest.fn(),
  size: 'large',
  disabled: false
};
const altProps = {
  ...defaultProps,
  variant: 'outlined',
  size: 'small',
  color: 'secondary',
  onClick: undefined
};
describe('Button', () => {
  it('renders default button', async () => {
    render(
      <Button {...defaultProps}>
        <span>Test</span>
      </Button>
    );
    const element = await screen.findByRole('button');
    expect(element).toMatchSnapshot();
  });
  it('renders button with secondary color and outlines', async () => {
    render(
      <Button {...altProps}>
        <span>Test</span>
      </Button>
    );
    const element = await screen.findByRole('button');
    expect(element).toBeInTheDocument();
  });
  it('fires onClick when clicked', async () => {
    render(
      <Button {...defaultProps}>
        <span>Test</span>
      </Button>
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

  it('does not fire onClick when no onClick prop provided', async () => {
    render(
      <Button {...altProps}>
        <span>Test</span>
      </Button>
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
