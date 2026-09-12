import { render } from '@testing-library/react';

import Next NexusMemories from './nextnexus-memories';

describe('Next NexusMemories', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Next NexusMemories />);
    expect(baseElement).toBeTruthy();
  });
});
