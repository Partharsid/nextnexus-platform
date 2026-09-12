import { Colors2023 } from '@nextnexus/styles';
import { NextNexusRole } from '@nextnexus/types';

export const getColorsForRole = (role: NextNexusRole) => {
  return Colors2023.roleColors[role];
};
