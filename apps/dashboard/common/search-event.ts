import { Next Nexus PlatformSupabaseClient } from '@nextnexus/nextnexus-supabase-client';

export default async function searchEvent(
  supabase: Next Nexus PlatformSupabaseClient
): Promise<any[]> {
  const eventnameMatches = await supabase.getClient().from('events').select();

  return eventnameMatches.data;
}
