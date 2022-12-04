import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PageDataHeader from '../../../src/components/common/PageDataHeader';

const defaultProps = {
  title: 'Test',
  defaultSearchText: '',
  setSearchFilter: jest.fn(),
  handleCreateNew: jest.fn(),
  handlePublish: jest.fn()
};
describe('PageDataHeader', () => {
  it('renders component', async () => {
    render(<PageDataHeader {...defaultProps} />);
    const element = await screen.findByTestId('page-data-header');
    expect(element).toBeInTheDocument();
  });
  it('handles search change', async () => {
    render(<PageDataHeader {...defaultProps} />);
    const input = await screen.findByTestId('page-header-search-input');
    const btn = await screen.findByTestId('page-header-search-btn');
    await waitFor(() => fireEvent.change(input, { target: { value: 'new' } }));
    await waitFor(() =>
      fireEvent(
        btn,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
    expect(defaultProps.setSearchFilter).toHaveBeenCalled();
  });
  it('handles search enter key', async () => {
    render(<PageDataHeader {...defaultProps} />);
    const input = await screen.findByTestId('page-header-search-input');
    await waitFor(() => fireEvent.change(input, { target: { value: 'new' } }));
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(defaultProps.setSearchFilter).toHaveBeenCalled();
  });
});
