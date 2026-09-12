import { getEnv } from '@nextnexus/env';

const {
  NextNexus: { AWS },
} = getEnv();

export const credentials = {
  accessKeyId: AWS.accessKeyID,
  secretAccessKey: AWS.secretAccessKey,
};

export const region = AWS.region;

// Allows pointing at a self-hosted DynamoDB (e.g. dynamodb-local) instead of real AWS
export const endpoint = AWS.endpoint || undefined;
