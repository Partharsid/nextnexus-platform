import { Next Nexus PlatformSupabaseClient } from '@nextnexus/nextnexus-supabase-client';
import { PostgrestError } from '@supabase/supabase-js';

export default async function addEvent(
  event_id: number,
  wristband_id: string,
  supabase: Next Nexus PlatformSupabaseClient
): Promise<PostgrestError | true> {
  const eventnameMatches = await supabase
    .getClient()
    .from('events')
    .select()
    .eq('id', `${event_id}`);

  const nameMatches = await supabase
    .getClient()
    .from('participants')
    .select()
    .eq('wristband_id', `${wristband_id}`);

  if (nameMatches.data.length === 0) {
    return {
      message: 'Wristband not assigned',
      details: '',
      hint: '',
      code: '',
    };
  }

  const resEvent = await supabase.addEvent(nameMatches.data[0].id, event_id);

  if (resEvent != null) {
    return resEvent;
  }

  const resLeaderboard = await supabase.addtoLeaderboard(
    nameMatches.data[0].id,
    eventnameMatches.data[0].points
  );

  if (resLeaderboard != null) {
    return resLeaderboard;
  }

  return true;
}
