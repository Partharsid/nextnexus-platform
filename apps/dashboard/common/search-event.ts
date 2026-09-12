import { NextNexusSupabaseClient } from '@nextnexus/nextnexus-supabase-client';

export default async function searchEvent(
  supabase: NextNexusSupabaseClient
): Promise<any[]> {
  const eventnameMatches = await supabase.getClient().from('events').select();

  return eventnameMatches.data;
}
