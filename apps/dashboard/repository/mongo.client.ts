import { singleton } from 'tsyringe';
import { getEnv } from '@nextnexus/env';
import { MongoClient } from 'mongodb';

@singleton()
export class NextNexusMongoClient {
  private readonly mongo: MongoClient;
  constructor() {
    this.mongo = new MongoClient(getEnv().NextNexus.FeatureFlag.MongoURI);
  }

  getClient() {
    return this.mongo;
  }
}
