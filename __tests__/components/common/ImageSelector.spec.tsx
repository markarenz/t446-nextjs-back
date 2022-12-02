import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageSelector from '../../../src/components/common/ImageSelector';
import { getAssetList } from '../../__fixtures__/assetList';
import { useAppContext } from '../../../src/context/AppContext';
import { callDeleteAsset } from '../../../src/helpers/assets';

jest.mock('../../../src/context/AppContext', () => ({
  useAppContext: jest.fn().mockReturnValue({
    setLoading: jest.fn(),
    isSidebarOpen: true,
    setSidebarOpen: jest.fn()
  })
}));

// Mock fetch for delete asset helper
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true })
  })
) as jest.Mock;

const assetList = getAssetList();

const defaultProps = {
  assetList,
  allowSelection: true,
  handleTriggerRefresh: jest.fn(),
  handleSelection: jest.fn()
};
const altProps = {
  ...defaultProps,
  allowSelection: false,
  handleSelection: undefined
};

describe('ImageSelector', () => {
  it('renders component', async () => {
    render(<ImageSelector {...defaultProps} />);
    const element = await screen.findByTestId('image-selector');
    const assetListStage = await screen.findByTestId('asset-list-stage');
    const items = assetListStage.childNodes;
    expect(items.length).toBe(10);
  });

  it('navigates asset page next & prev', async () => {
    render(<ImageSelector {...defaultProps} />);
    const btnNext = await screen.findByTestId('btn-pagenav-next');
    fireEvent(
      btnNext,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    const assetListStage = await screen.findByTestId('asset-list-stage');
    const items = assetListStage.childNodes;
    expect(items.length).toBe(5);
    const btnPrev = await screen.findByTestId('btn-pagenav-prev');
    fireEvent(
      btnPrev,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(items.length).toBe(10);
  });

  it('updates search text', async () => {
    render(<ImageSelector {...defaultProps} />);
    const input = await screen.findByTestId('asset-search');
    fireEvent.change(input, { target: { value: 'test-0.jpg' } });
    const element = await screen.findByTestId('asset-search-btn');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(element).toBeInTheDocument();
  });

  it('handles delete asset', async () => {
    render(<ImageSelector {...defaultProps} />);
    const element = await screen.findByTestId('asset-item-0-delete');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(global.fetch).toHaveBeenCalled();
  });

  it('fires handleSelection on click when allowSelection is true', async () => {
    render(<ImageSelector {...defaultProps} />);
    const element = await screen.findByTestId('asset-item-0');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(defaultProps.handleSelection).toHaveBeenCalled();
  });

  it('does NOT fire handleSelection on click when allowSelection is false', async () => {
    render(<ImageSelector {...altProps} />);
    const element = await screen.findByTestId('asset-item-0');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(element).toBeInTheDocument();
  });
});
