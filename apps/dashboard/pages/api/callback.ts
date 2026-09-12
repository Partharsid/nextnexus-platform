import { NextApiHandler } from 'next';
import { callbackApiHandler } from '@nextnexus/sso-client';
import { getEnv } from '@nextnexus/env';

const handler: NextApiHandler = callbackApiHandler(
  getEnv().Next Nexus Platform.AppURL.portal
);

export default handler;
