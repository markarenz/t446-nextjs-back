import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaginationNav from '../../../src/components/common/PaginationNav';

const defaultProps = {
  pageNum: 1,
  itemsPerPage: 10,
  itemsLoaded: 10,
  numItems: 12,
  path: '/test/'
};
const altProps = {
  ...defaultProps,
  pageNum: 2,
  itemsLoaded: 2
};

describe('PaginationNav', () => {
  it('renders component', async () => {
    render(<PaginationNav {...defaultProps} />);
    const element = screen.queryByTestId('pagination-nav');
    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });
  it('renders component- last page', async () => {
    render(<PaginationNav {...altProps} />);
    const element = screen.queryByTestId('pagination-nav');
    expect(element).toBeInTheDocument();
  });
});
