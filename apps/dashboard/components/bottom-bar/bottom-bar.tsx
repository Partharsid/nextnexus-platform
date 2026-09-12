import styled from 'styled-components';
import Image from 'next/image';
import { Link, Text } from '@nextnexus/ui';
import { GlowSpan } from '@nextnexus/ui-kit-2023';
import { Next Nexus PlatformRole } from '@nextnexus/types';
import { Colors2023 } from '@nextnexus/styles';
import { logout } from '@nextnexus/sso-client';
import Next NexusLogo from '../svg/nextnexus-logo';
import Next NexusLogoNoWords from '../svg/nextnexus-logo-nowords';

export function BottomBar() {
  return (
    <StyledBottomBar>
      <Next NexusLogoNoWords />
      <UserText>
        Powered by <span style={{ fontWeight: 700 }}>Next Nexus</span>
      </UserText>
    </StyledBottomBar>
  );
}

export default BottomBar;

const StyledBottomBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2rem 3rem;
  gap: 0.5rem;
`;

const UserText = styled(Text)`
  color: #ff6347;
`;
