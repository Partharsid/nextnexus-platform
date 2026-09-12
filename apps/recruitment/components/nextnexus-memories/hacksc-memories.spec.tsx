import { render } from '@testing-library/react';

import NextNexusMemories from './nextnexus-memories';

describe('NextNexusMemories', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextNexusMemories />);
    expect(baseElement).toBeTruthy();
  });
});
