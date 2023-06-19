import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getAssetList } from '../../__fixtures__/assetList';
import InputPageBlockItem from '../../../src/components/common/InputPageBlockItem';

jest.mock('react-markdown', () => () => <div>This is my __markdown__.</div>);
jest.mock('../../../src/helpers/pages', () => ({
  ...jest.requireActual('../../../src/helpers/pages'),
  getBlockDefByType: jest.fn().mockImplementationOnce(() => ({
    title: null,
    fields: [
      {
        label: '',
        slug: 'html',
        type: 'markdownarea',
        colsize: 12
      },
      {
        label: 'Image',
        slug: 'photo',
        type: 'image',
        colsize: 12
      },
      {
        label: 'Text Alignment',
        slug: 'align',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ],
        colsize: 6
      },
      {
        label: 'Text on Left or Right',
        slug: 'tcol',
        type: 'select',
        options: null,
        colsize: 6
      }
    ]
  }))
}));
jest.mock('lodash', () => ({
  debounce: jest.fn((cb) => cb)
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const assetList = getAssetList();

const block = {
  type: '2-col-photo',
  align: 'left',
  class: '',
  html: 'test text',
  id: '',
  photo: 't446-caving-01.jpg',
  tcol: 'right'
};
const defaultProps = {
  idx: 1,
  block: block,
  isLastBlock: false,
  moveBlock: jest.fn(),
  removeBlock: jest.fn(),
  updateBlocks: jest.fn(),
  baseImgUrl: 'https://www.domain.dom/',
  assetList,
  handleTriggerRefresh: jest.fn()
};
describe('InputPageBlockItem - block defs', () => {
  it('handles malformed pageBlock', async () => {
    render(<InputPageBlockItem {...defaultProps} />);
    const element = await screen.findByTestId('input-page-block-item-1');
    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });
});
