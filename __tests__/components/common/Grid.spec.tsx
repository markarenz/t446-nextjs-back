import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Grid from '../../../src/components/common/Grid';

const defaultProps = {
  columns: 3
};

describe('Grid', () => {
  it('renders grid wrapper', async () => {
    render(
      <Grid {...defaultProps}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Grid>
    );
    const element = await screen.findByTestId('grid-wrap');
    expect(element).toBeInTheDocument();
  });
});
