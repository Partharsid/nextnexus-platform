import { NextNexusSupabaseClient } from '@nextnexus/nextnexus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

@injectable()
export class Leaderboard {
  private client: SupabaseClient;
  constructor(private readonly hbc: NextNexusSupabaseClient) {
    this.client = hbc.getClient();
  }

  async getLeaderboard() {
    const { data, error } = await this.client.from('leaderboard').select();
    return { data, error };
  }

  async getUser(userId) {
    const { data, error } = await this.client
      .from('leaderboard')
      .select()
      .eq('user_id', userId);
    return { data, error };
  }
}
