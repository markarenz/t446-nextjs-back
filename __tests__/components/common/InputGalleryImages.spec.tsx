import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import InputGalleryImages from '../../../src/components/common/InputGalleryImages';
import { getAssetList } from '../../__fixtures__/assetList';

const defaultProps = {
  value: JSON.stringify(['test1.jpg', 'test2.jpg']),
  onChange: jest.fn(),
  baseImgUrl: 'https://www.domain.com/',
  assetList: getAssetList(),
  handleTriggerRefresh: jest.fn()
};

describe('Button', () => {
  it('renders default button', async () => {
    render(<InputGalleryImages {...defaultProps} />);
    const element = await screen.findByTestId('input-gallery-images');
    expect(element).toBeInTheDocument();
  });

  it('handles drag & drop', async () => {
    render(<InputGalleryImages {...defaultProps} />);
    const element = await screen.findByTestId('sortable-0');
    await act(async () => {
      fireEvent.mouseDown(element);
    });
    await act(async () => {
      fireEvent.mouseMove(element, { delta: { x: 200, y: 0 } });
    });
    await act(async () => {
      fireEvent.mouseUp(element);
    });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('handles removal', async () => {
    render(<InputGalleryImages {...defaultProps} />);
    const element = await screen.findByTestId('btn-remove-gallery-img-0');
    await act(async () => {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
    });
    const item = screen.queryByTestId('sortable-item-test1.jpg');
    expect(item).not.toBeInTheDocument();
  });

  it('handles add', async () => {
    render(<InputGalleryImages {...defaultProps} />);
    const btnAdd = await screen.findByTestId('btn-add');
    await act(async () => {
      fireEvent(
        btnAdd,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
    });

    const btnClose = await screen.findByTestId('btn-add-close');
    await act(async () => {
      fireEvent(
        btnClose,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
    });
    await act(async () => {
      fireEvent(
        btnAdd,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
    });
    const imageItem = await screen.findByTestId('asset-item-0');
    await act(async () => {
      fireEvent(
        imageItem,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
    });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });
});
