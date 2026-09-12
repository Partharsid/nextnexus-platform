import styled from 'styled-components';
import Image from 'next/image';
import { Link, Text } from '@nextnexus/ui';
import { GlowSpan } from '@nextnexus/ui-kit-2023';
import { NextNexusRole } from '@nextnexus/types';
import { Colors2023 } from '@nextnexus/styles';
import { logout } from '@nextnexus/sso-client';
import NextNexusLogo from '../svg/nextnexus-logo';
import NextNexusLogoNoWords from '../svg/nextnexus-logo-nowords';

export function BottomBar() {
  return (
    <StyledBottomBar>
      <NextNexusLogoNoWords />
      <UserText>
        Powered by <span style={{ fontWeight: 700 }}>NextNexus</span>
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
