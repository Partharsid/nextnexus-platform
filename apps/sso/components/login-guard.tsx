import { useEffect, PropsWithChildren, useState } from 'react';
import { NextNexusSupabaseClient } from '@nextnexus/nextnexus-supabase-client';
import * as SSOClient from '@nextnexus/sso-client';
import { getCookie } from 'cookies-next';
import { getEnv } from '@nextnexus/env';
import { Session } from '@supabase/supabase-js';
import { useNextNexusSupabase } from '@nextnexus/nextnexus-supabase-context';

interface LoginGuardProps extends PropsWithChildren {
  callback: string;
}

export function LoginGuard({ callback, children }: LoginGuardProps) {
  const [authorized, setAuthorized] = useState(false);
  const { supabase } = useNextNexusSupabase();

  useEffect(() => {
    async function fetchData() {
      if (callback != null) {
        const access_token = getCookie(
          getEnv().NextNexus.Cookies.accessTokenName
        );
        const refresh_token = getCookie(
          getEnv().NextNexus.Cookies.refreshTokenName
        );
        let session: Session | null = null;
        if (access_token != null && refresh_token != null) {
          const { data } = await supabase.verifyToken(
            access_token.toString(),
            refresh_token.toString()
          );
          session = data.session;
        }
        if (session != null) {
          NextNexusSupabaseClient.setTokenCookieClientSide(
            session.access_token,
            session.refresh_token
          );
          const res = await SSOClient.ssoCallback(
            callback,
            session.access_token
          );
          window.location.replace(
            res?.redirect ?? process.env.NEXT_PUBLIC_SSO_DEFAULT_REDIRECT_URL
          );
        } else {
          setAuthorized(true);
        }
      }
    }
    fetchData();
  }, [callback]);

  return authorized && <>{children}</>;
}
