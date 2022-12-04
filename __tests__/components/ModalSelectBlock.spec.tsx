import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ModalSelectBlock from '../../src/components/ModalSelectBlock';

const defaultProps = {
  handleCancel: jest.fn(),
  handleOk: jest.fn()
};

describe('ModalSelectBlock', () => {
  it('renders component', async () => {
    render(<ModalSelectBlock {...defaultProps} />);
    const element = await screen.findByTestId('modal-select-block');
    expect(element).toBeInTheDocument();
  });
  it('handles block selection', async () => {
    render(<ModalSelectBlock {...defaultProps} />);
    const element = await screen.findByTestId('btn-block-type-1-col');
    await waitFor(() =>
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
  });
  it('handles block selection Cancel', async () => {
    render(<ModalSelectBlock {...defaultProps} />);
    const element = await screen.findByTestId('modal-select-block-cancel');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(defaultProps.handleCancel).toHaveBeenCalled();
  });
  it('handles block selection OK', async () => {
    render(<ModalSelectBlock {...defaultProps} />);
    const element = await screen.findByTestId('btn-block-type-1-col');
    await waitFor(() =>
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
    const btnOk = await screen.findByTestId('modal-select-block-ok');
    fireEvent(
      btnOk,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(defaultProps.handleOk).toHaveBeenCalled();
  });
});
