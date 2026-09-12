import styled from 'styled-components';
import Image from 'next/image';
import { Link, Text } from '@nextnexus/ui';
import { GlowSpan } from '@nextnexus/ui-kit-2023';
import { Next Nexus PlatformRole } from '@nextnexus/types';
import { Colors2023 } from '@nextnexus/styles';
import { logout } from '@nextnexus/sso-client';
import Next NexusLogo from '../svg/nextnexus-logo';

/* eslint-disable-next-line */
export interface TopBarProps {
  userTag: string;
  role: Next Nexus PlatformRole; // TODO: replace this with role type/enum
}

export function TopBar(props: TopBarProps) {
  const userColors = Colors2023.roleColors[props.role ?? Next Nexus PlatformRole.HACKER];
  return (
    <StyledTopBar>
      <Link href="/" anchortagpropsoverride={{ target: '_self' }}>
        {/* <Image
          style={{ margin: '5px 0 0 20px' }}
          width="200"
          height="100"
          src="/nextnexus-logo.svg"
          alt="Next Nexus logo"
        /> */}
        <Next NexusLogo />
      </Link>
      <RightUtilityContainer>
        <UserText>{props.userTag}</UserText>
        <RoleText style={{ color: '#FF6347' }}>{props.role}</RoleText>
        <LogoutButton onClick={logout}>
          <Image
            style={{ position: 'relative' }}
            width="18"
            height="18"
            src="/log-out.svg"
            alt="Log out of Next Nexus Platform"
          />
        </LogoutButton>
      </RightUtilityContainer>
    </StyledTopBar>
  );
}

export default TopBar;

const StyledTopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2rem 3rem;
  flex-wrap: wrap;
`;

const UserText = styled(Text)``;

const LogoutButton = styled.button`
  cursor: pointer;
  background: none;
  padding: 0;
`;

const RoleText = styled(Text)`
  font-weight: bold;
  letter-spacing: 3px;
`;

const RightUtilityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
