import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditItemHeader from '../../../src/components/common/EditItemHeader';

const defaultProps = {
  title: 'Test Title'
};

describe('EditItemHeader', () => {
  it('renders header', async () => {
    render(<EditItemHeader {...defaultProps} />);
    const element = await screen.findByText('Test Title');
    expect(element).toBeInTheDocument();
  });
});
