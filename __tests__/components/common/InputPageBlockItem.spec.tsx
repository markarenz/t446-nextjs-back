import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getAssetList } from '../../__fixtures__/assetList';
import InputPageBlockItem from '../../../src/components/common/InputPageBlockItem';

jest.mock('react-markdown', () => () => <div>This is my __markdown__.</div>);
jest.mock('lodash', () => ({
  debounce: jest.fn((cb) => cb)
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const assetList = getAssetList();

const block1 = {
  type: 'cta-one',
  button_link: '/contact',
  button_text: 'Contact',
  class: '',
  headline: 'Adventure Awaits',
  id: '',
  text: 'Text goes here'
};
const block2 = {
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
  block: block1,
  isLastBlock: false,
  moveBlock: jest.fn(),
  removeBlock: jest.fn(),
  updateBlocks: jest.fn(),
  baseImgUrl: 'https://www.domain.dom/',
  assetList,
  handleTriggerRefresh: jest.fn()
};
const altProps = {
  ...defaultProps,
  block: block2
};
describe('InputPageBlockItem', () => {
  it('renders default component', async () => {
    render(<InputPageBlockItem {...defaultProps} />);
    const element = await screen.findByTestId('input-page-block-item-1');
    expect(element).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });
  it('toggles info', async () => {
    render(<InputPageBlockItem {...defaultProps} />);
    const info = screen.queryByTestId('page-block-info');
    const element = await screen.findByTestId('block-btn-info');
    expect(element).toBeInTheDocument();
    expect(info).not.toBeInTheDocument();
    await waitFor(() =>
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
    const info2 = screen.queryByTestId('page-block-info');
    expect(info2).toBeInTheDocument();
  });

  it('moves block up', async () => {
    render(<InputPageBlockItem {...defaultProps} />);
    const btnUp = await screen.findByTestId('block-btn-move-up');
    await waitFor(() =>
      fireEvent(
        btnUp,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
    expect(defaultProps.moveBlock).toHaveBeenCalled();
  });

  it('moves block down', async () => {
    render(<InputPageBlockItem {...defaultProps} />);
    const btnDown = await screen.findByTestId('block-btn-move-down');
    await waitFor(() =>
      fireEvent(
        btnDown,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
    expect(defaultProps.moveBlock).toHaveBeenCalled();
  });

  it('handles input updates', async () => {
    render(<InputPageBlockItem {...defaultProps} />);
    const input = await screen.findByTestId('block-0-headline');
    await waitFor(() =>
      fireEvent.change(input, {
        target: { value: 'New text' }
      })
    );
    expect(defaultProps.updateBlocks).toHaveBeenCalled();
  });
  it('handles value updates', async () => {
    render(<InputPageBlockItem {...altProps} />);
    //
    const input = await screen.findByTestId('input-image-picker-opener');
    await waitFor(() =>
      fireEvent(
        input,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
    const assetItem = await screen.findByTestId('asset-item-0');
    await waitFor(() =>
      fireEvent(
        assetItem,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
    expect(defaultProps.updateBlocks).toHaveBeenCalled();
  });

  it('calls remove function when remove button clicked', async () => {
    render(<InputPageBlockItem {...defaultProps} />);
    const element = await screen.findByTestId('block-btn-remove');
    await waitFor(() =>
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
    expect(defaultProps.removeBlock).toHaveBeenCalled();
  });
});
