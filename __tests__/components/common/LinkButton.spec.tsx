import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LinkButton from '../../../src/components/common/LinkButton';

const defaultProps = {
  href: '/test'
};
const altProps = {
  href: '/test',
  variant: 'outlined',
  color: 'secondary',
  size: 'small'
};
describe('LinkButton', () => {
  it('renders link button', async () => {
    render(
      <LinkButton {...defaultProps}>
        <span>Test</span>
      </LinkButton>
    );
    const element = await screen.findByTestId('link-button-inner');
    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });
  it('renders link button', async () => {
    render(
      <LinkButton {...altProps}>
        <span>Test</span>
      </LinkButton>
    );
    const element = await screen.findByTestId('link-button-inner');
    expect(element).toBeInTheDocument();
  });
});
