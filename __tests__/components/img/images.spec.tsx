import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoaderArcs from '../../../src/components/img/LoaderArcs';
import {
  Block1Col,
  Block2Col,
  Block2ColPhoto,
  BlockAnnouncements,
  BlockCalendar,
  BlockContactForm,
  BlockContactList,
  BlockCta1,
  BlockGalleriesList,
  BlockGallery,
  BlockHeaderSlider,
  BlockHeaderStatic,
  BlockImgFull,
  BlockImgGrid1,
  BlockPullQuote,
  BlockSpacer
} from '../../../src/components/img/blockTypes';

import {
  IconAlerts,
  IconArrow,
  IconAssets,
  IconChevron,
  IconDelete,
  IconEdit,
  IconGalleries,
  IconPages,
  IconTools,
  IconView,
  IconNewItem,
  IconPublish,
  IconSearch,
  IconClose,
  IconRefresh,
  IconSettings,
  IconUp,
  IconDown,
  IconInfo
} from '../../../src/components/img/icons';
import LogoBsa from '../../../src/components/img/LogoBsa';
import T446Logo from '../../../src/components/img/T446Logo';

describe('SVG images', () => {
  const images = [
    Block1Col,
    Block2Col,
    Block2ColPhoto,
    BlockAnnouncements,
    BlockCalendar,
    BlockContactForm,
    BlockContactList,
    BlockCta1,
    BlockGalleriesList,
    BlockGallery,
    BlockHeaderSlider,
    BlockHeaderStatic,
    BlockImgFull,
    BlockImgGrid1,
    BlockPullQuote,
    BlockSpacer,
    IconAlerts,
    IconArrow,
    IconAssets,
    IconChevron,
    IconDelete,
    IconEdit,
    IconGalleries,
    IconPages,
    IconTools,
    IconView,
    IconNewItem,
    IconPublish,
    IconSearch,
    IconClose,
    IconRefresh,
    IconSettings,
    IconUp,
    IconDown,
    IconInfo,
    LogoBsa,
    T446Logo
  ];
  it('should display all images', () => {
    images.map((Img) => {
      const wrapper = render(<Img />);
      const { container } = wrapper;
      const element = container.querySelector('svg');
      expect(element).toBeInTheDocument();
    });
  });
  it('should load LoaderArcs do not show', () => {
    const wrapper = render(<LoaderArcs show={false} />);
    const { container } = wrapper;
    const element = container.querySelector('svg');
    expect(element).toBeInTheDocument();
  });
  it('should load LoaderArcs show', () => {
    const wrapper = render(<LoaderArcs show={true} />);
    const { container } = wrapper;
    const element = container.querySelector('svg');
    expect(element).toBeInTheDocument();
  });
});
