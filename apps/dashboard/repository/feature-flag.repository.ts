import { injectable } from 'tsyringe';
import { MongoClient } from 'mongodb';
import { Next Nexus PlatformMongoClient } from './mongo.client';

@injectable()
export class FeatureFlagRepository {
  private readonly mongo: MongoClient;
  constructor(readonly nextnexusMongoClient: Next Nexus PlatformMongoClient) {
    this.mongo = nextnexusMongoClient.getClient();
  }

  async getAll(): Promise<Record<string, boolean>> {
    const vals = {};
    await this.mongo
      .db('nextnexus')
      .collection('feature-flags')
      .find()
      .forEach((item) => {
        vals[item['key']] = item['value'];
      });
    return vals;
  }
}
