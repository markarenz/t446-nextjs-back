import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageSelectorItem from '../../../src/components/common/ImageSelectorItem';

const asset = {
  filename: 'testfile.jpg',
  fileDate: '2022-11-29',
  size: '12kb',
  url: 'https://www.domain.com/files/testfile.jpg',
  thumbnail: 'https://www.domain.com/files/thumbnail/testfile.jpg'
};
const defaultProps = {
  idx: 1,
  asset,
  allowSelection: true,
  handleSelection: jest.fn(),
  handleAssetDelete: jest.fn(),
  testId: 'test-item-1'
};

describe('ImageSelectorItem', () => {
  it('renders component', async () => {
    render(<ImageSelectorItem {...defaultProps} />);
    const element = await screen.findByTestId('test-item-1');
    expect(element).toBeInTheDocument();
  });
});
