import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PageSeo from '../../src/components/PageSeo';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    }
  };
});

const defaultProps = {
  pageMeta: {
    title: 'test title',
    metedesc: 'test meta'
  }
};
const altProps = {
  pageMeta: {
    title: null,
    metadesc: 'test meta'
  }
};

describe('PageSeo', () => {
  it('renders component', async () => {
    render(<PageSeo {...defaultProps} />, {
      container: document.head
    });
    await waitFor(() => {
      expect(document.title).toEqual('test title | Troop 446');
    });
  });
});
