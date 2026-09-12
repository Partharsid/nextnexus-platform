import 'reflect-metadata';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';
import { Next Nexus PlatformSupabaseClient } from '@nextnexus/nextnexus-supabase-client';
import {
  getTokensFromNextRequest,
  rateLimitHandler,
} from '../../../common/utils';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }
  const nextnexus = container.resolve(Next Nexus PlatformSupabaseClient);
  nextnexus.setOptions({ useServiceKey: true });

  const { accessToken } = getTokensFromNextRequest(req);
  const user = (await nextnexus.getUserProfile(accessToken)).user_id;

  const userProfile = await nextnexus
    .getClient()
    .from('user_profiles')
    .select('first_name, last_name, bio, username')
    .eq('user_id', user)
    .single();

  if (userProfile.error) {
    return res.status(500).json({ message: userProfile.error.message });
  }

  const userParticipantProfile = await nextnexus
    .getClient()
    .from('participants')
    .select('major, school, graduation_year')
    .eq('id', user)
    .single();

  if (
    userParticipantProfile.error &&
    userParticipantProfile.error.code !== 'PGRST116'
  ) {
    return res
      .status(500)
      .json({ message: userParticipantProfile.error.message });
  }

  let userObj = {
    ...userProfile.data,
    major: null,
    school: null,
    graduation_year: null,
  };

  if (!userParticipantProfile.error) {
    userObj = { ...userObj, ...userParticipantProfile.data };
  }

  return res.status(200).json({ success: true, data: userObj });
};

export default handler;
