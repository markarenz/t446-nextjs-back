import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageUploader from '../../../src/components/common/ImageUploader';
import { act } from 'react-dom/test-utils';

global.URL;
jest.mock('../../../src/context/AppContext', () => ({
  useAppContext: jest.fn().mockReturnValue({
    setLoading: jest.fn(),
    isSidebarOpen: true,
    setSidebarOpen: jest.fn()
  })
}));

global.fetch = jest
  .fn()
  .mockImplementationOnce(() =>
    Promise.resolve({ json: () => Promise.resolve({ filename: 'foobar.png' }) })
  )
  .mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ filename: 'foobar2.png' })
    })
  ) as jest.Mock;

let file: File;
let file2: File;
let file3: File;

beforeEach(() => {
  file = new File(['foo-bar'], 'foobar.png', { type: 'image/png' });
  file2 = new File(['foo2-bar2'], 'foobar2.png', { type: 'image/png' });
  file3 = new File(['foo-bar'], 'foobar.png', { type: 'image/png' });
  global.URL.createObjectURL = jest.fn();
});

const defaultProps = {
  handleTriggerRefresh: jest.fn()
};

describe('ImageUploader', () => {
  it('renders component', async () => {
    render(<ImageUploader {...defaultProps} />);
    const element = await screen.findByTestId('image-uploader');
    expect(element).toBeInTheDocument();
  });

  it('handles file input onchange & removal', async () => {
    render(<ImageUploader {...defaultProps} />);
    const uploader = await screen.findByTestId('file-upload-input');
    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] }
      })
    );
    await waitFor(
      () =>
        expect(screen.getByTestId('btn-upload-staged-0')).toBeInTheDocument(),
      {
        timeout: 2000
      }
    );
    const btnRemoveId = 'btn-upload-remove-0';
    await waitFor(
      () => expect(screen.getByTestId(btnRemoveId)).toBeInTheDocument(),
      {
        timeout: 2000
      }
    );
    const btnRemove = await screen.findByTestId(btnRemoveId);
    await waitFor(() =>
      fireEvent(
        btnRemove,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      )
    );
    const item = screen.queryByTestId('btn-upload-staged-0');
    expect(item).not.toBeInTheDocument();
  });

  it('calls fetch when uploading', async () => {
    render(<ImageUploader {...defaultProps} />);

    const uploader = await screen.findByTestId('file-upload-input');
    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file, file2] }
      })
    );
    await waitFor(
      () =>
        expect(screen.getByTestId('btn-upload-staged-0')).toBeInTheDocument(),
      {
        timeout: 2000
      }
    );
    const btnUpload = await screen.findByTestId('btn-upload');
    await act(async () => {
      await waitFor(() =>
        fireEvent(
          btnUpload,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true
          })
        )
      );
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('allows only one file per filename', async () => {
    render(<ImageUploader {...defaultProps} />);

    const uploader = await screen.findByTestId('file-upload-input');
    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file, file2] }
      })
    );
    expect(screen.queryByTestId('btn-upload-staged-0')).toBeInTheDocument();
    expect(screen.queryByTestId('btn-upload-staged-1')).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file3] }
      })
    );
    expect(screen.queryByTestId('btn-upload-staged-2')).not.toBeInTheDocument();
  });
});
