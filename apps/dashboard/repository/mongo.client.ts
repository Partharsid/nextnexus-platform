import { singleton } from 'tsyringe';
import { getEnv } from '@nextnexus/env';
import { MongoClient } from 'mongodb';

@singleton()
export class Next Nexus PlatformMongoClient {
  private readonly mongo: MongoClient;
  constructor() {
    this.mongo = new MongoClient(getEnv().Next Nexus Platform.FeatureFlag.MongoURI);
  }

  getClient() {
    return this.mongo;
  }
}
