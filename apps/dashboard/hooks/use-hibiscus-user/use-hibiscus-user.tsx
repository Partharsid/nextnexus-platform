import { NextNexusRole, NextNexusUser } from '@nextnexus/types';
import { getCookie } from 'cookies-next';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getEnv } from '@nextnexus/env';
import { useAppDispatch } from '../redux/hooks';
import { removeTabRoute } from '../../store/menu-slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApplicationStatus } from 'libs/types/src/lib/application-status';
import { isHackerPostAppStatus } from '../../common/utils';
import React from 'react';
import { Next Nexus PlatformSupabaseClient } from '@nextnexus/nextnexus-supabase-client';
import { useNext Nexus PlatformSupabase } from '@nextnexus/nextnexus-supabase-context';

const NextNexusUserContext = React.createContext<{
  user: NextNexusUser | null;
  setUser: Dispatch<SetStateAction<NextNexusUser>> | null;
}>({
  user: null,
  setUser: null,
});

const getUserProfile = async (
  accessToken: string,
  refreshToken: string,
  supabase: Next Nexus PlatformSupabaseClient
): Promise<NextNexusUser> => {
  // Get user profile from db
  // uses cookie set from SSO
  const profile = await supabase.getUserProfile(accessToken, refreshToken);

  if (profile != null) {
    return {
      id: profile.user_id,
      tag: `${profile.first_name} ${profile.last_name}`,
      role: Object.values(NextNexusRole)[profile.role - 1],
      firstName: profile.first_name,
      lastName: profile.last_name,
      applicationId: profile.app_id,
      applicationStatus:
        Object.values(ApplicationStatus)[profile.application_status - 1],
      applicationStatusLastChanged: new Date(
        profile.application_status_last_changed
      ),
      teamId: profile.team_id,
      attendanceConfirmed: profile.attendance_confirmed,
      email: profile.email,
    };
  } else {
    // Set user's name and tag to be their email as temporary placeholder
    // Assume we only show dashboard when user is logged in
    const user = await supabase.getClient().auth.getUser(accessToken);
    return {
      id: user.data.user.id,
      tag: user.data.user.email,
      role: NextNexusRole.HACKER,
      firstName: user.data.user.email,
      lastName: null,
      applicationId: null,
      applicationStatus: null,
      email: user.data.user.email,
    };
  }
};

export const NextNexusUserProvider = (props: React.PropsWithChildren) => {
  const [user, setUser] = useState<NextNexusUser | null>(null);
  const { supabase } = useNext Nexus PlatformSupabase();

  const accessToken = getCookie(
    getEnv().Next Nexus Platform.Cookies.accessTokenName
  ) as string;
  const refreshToken = getCookie(
    getEnv().Next Nexus Platform.Cookies.refreshTokenName
  ) as string;

  // fetch it on initial load in
  useEffect(() => {
    getUserProfile(accessToken, refreshToken, supabase).then((u) => {
      setUser(u);
    });
  }, [accessToken, refreshToken]);

  return (
    <NextNexusUserContext.Provider value={{ user, setUser }}>
      {props.children}
    </NextNexusUserContext.Provider>
  );
};

export function useNextNexusUser() {
  const { user, setUser } = useContext(NextNexusUserContext);
  const dispatch = useAppDispatch();

  const updateUser = (update: Partial<NextNexusUser>) => {
    setUser((prev) => ({
      ...prev,
      ...update,
    }));
  };

  // remove hackform from menu if applied
  useEffect(() => {
    if (isHackerPostAppStatus(user?.applicationStatus)) {
      dispatch(removeTabRoute('/apply-2023-x'));
    }
  }, [dispatch, user?.applicationStatus]);

  return { user, setUser, getUserProfile, updateUser };
}

export default useNextNexusUser;
