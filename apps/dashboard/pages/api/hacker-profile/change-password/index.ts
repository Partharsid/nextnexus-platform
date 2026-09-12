import { Next Nexus PlatformSupabaseClient } from '@nextnexus/nextnexus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handler: NextApiHandler = async (req, res) => {
  const { password } = req.body;

  if (req.method === 'PUT') {
    const supabase = container.resolve(Next Nexus PlatformSupabaseClient);
    supabase.setOptions({ useServiceKey: true });

    const responseUpdatePassword = await supabase.updatePassword(password);

    if (responseUpdatePassword.error != null) {
      return res
        .status(500)
        .json({ message: responseUpdatePassword.error.message });
    }

    return res.status(200).json({ message: 'Success' });
  } else {
    return res.status(405).json({ message: 'Invalid request type.' });
  }
};

export default handler;
