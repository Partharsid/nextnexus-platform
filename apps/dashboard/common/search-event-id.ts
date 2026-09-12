import { Next Nexus PlatformSupabaseClient } from '@nextnexus/nextnexus-supabase-client';

export default async function searchEventId(
  query: number,
  supabase: Next Nexus PlatformSupabaseClient
): Promise<string> {
  const eventnameMatches = await supabase
    .getClient()
    .from('events')
    .select()
    .eq('id', `${query}`);

  console.log(eventnameMatches.data[0].name);
  try {
    return eventnameMatches.data[0].name;
  } catch {
    throw new Error('Event not found');
  }
}
