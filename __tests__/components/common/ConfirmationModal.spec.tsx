import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConfirmationModal from '../../../src/components/common/ConfirmationModal';

const defaultProps = {
  handleOk: jest.fn(),
  handleCancel: jest.fn(),
  title: 'Test Modal'
};

describe('ConfirmationModal', () => {
  it('renders modal', async () => {
    render(
      <ConfirmationModal {...defaultProps}>
        <span>Test</span>
      </ConfirmationModal>
    );
    const element = await screen.findByText('Test');
    expect(element).toBeInTheDocument();
  });
});
