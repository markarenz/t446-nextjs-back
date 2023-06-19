import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PageDataTable from '../../../src/components/common/PageDataTable';
import { Alert } from '@prisma/client';

const replaceMock = jest.fn();
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    replace: replaceMock
  }))
}));

const tableActions = ['edit', 'view', 'delete'];
const tableFields = [
  {
    title: 'Title',
    slug: 'title'
  },
  {
    title: 'Modified',
    slug: 'dateModified'
  },
  {
    title: 'Status',
    slug: 'status'
  }
];
const defaultDate = new Date('2022-12-01');
const items: Alert[] = [
  {
    id: 'abcd123',
    title: 'test 1',
    status: 'active',
    content: 'This is test **content**.',
    alwaysOn: false,
    dateStart: defaultDate,
    dateEnd: defaultDate,
    dateCreated: defaultDate,
    dateModified: defaultDate
  },
  {
    id: 'abcd124',
    title: 'test 2',
    status: 'active',
    content: 'This is test **content**.',
    alwaysOn: false,
    dateStart: defaultDate,
    dateEnd: defaultDate,
    dateCreated: defaultDate,
    dateModified: defaultDate
  }
];

const defaultProps = {
  tableFields,
  slug: 'alerts',
  tableActions,
  items,
  handleDelete: jest.fn(),
  viewPrefix: 'https://'
};
describe('PageDataTable', () => {
  it('renders component', async () => {
    render(<PageDataTable {...defaultProps} />);
    const element = await screen.findByTestId('page-data-table');
    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });
  it('redirects to edit page when btn clicked', async () => {
    render(<PageDataTable {...defaultProps} />);
    const element = await screen.findByTestId('page-table-item-abcd124');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(replaceMock).toHaveBeenCalled();
  });

  it('calls delete function when delete btn clicked', async () => {
    render(<PageDataTable {...defaultProps} />);
    const btnView = await screen.findByTestId('page-table-view-item-abcd124');
    fireEvent(
      btnView,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    const element = await screen.findByTestId('page-table-delete-item-abcd124');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(defaultProps.handleDelete).toHaveBeenCalled();
  });
});
