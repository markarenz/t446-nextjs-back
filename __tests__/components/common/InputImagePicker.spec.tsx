import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getAssetList } from '../../__fixtures__/assetList';
import InputImagePicker from '../../../src/components/common/InputImagePicker';

const assetList = getAssetList();
const defaultProps = {
  name: 'image',
  value: 'test.jpg',
  onChange: jest.fn(),
  baseImgUrl: 'https://www.domain.com/',
  assetList,
  handleTriggerRefresh: jest.fn()
};
const altProps = {
  ...defaultProps,
  value: ''
};
describe('InputImagePicker', () => {
  it('renders imagePicker with value', async () => {
    render(<InputImagePicker {...defaultProps} />);
    const element = await screen.findByTestId('input-image-picker');
    expect(element).toBeInTheDocument();
  });
  it('renders imagePicker without value', async () => {
    render(<InputImagePicker {...altProps} />);
    const element = await screen.findByTestId('input-image-picker');
    expect(element).toBeInTheDocument();
  });
  it('opens modal on click', async () => {
    render(<InputImagePicker {...defaultProps} />);
    const element = await screen.findByTestId('input-image-picker-opener');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    const modal = await screen.findByTestId('image-picker-modal');
    expect(modal).toBeInTheDocument();
  });

  it('handles image selection', async () => {
    render(<InputImagePicker {...defaultProps} />);
    const element = await screen.findByTestId('input-image-picker-opener');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    const item = await screen.findByTestId('asset-item-0');
    fireEvent(
      item,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(defaultProps.onChange).toHaveBeenCalled();
  });
});
