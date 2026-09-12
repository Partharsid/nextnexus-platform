import { Colors2023 } from '@nextnexus/styles';
import { Next Nexus PlatformRole } from '@nextnexus/types';

export const getColorsForRole = (role: Next Nexus PlatformRole) => {
  return Colors2023.roleColors[role];
};
