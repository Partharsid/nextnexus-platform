import { getEnv } from '@nextnexus/env';

const {
  NextNexus: { AWS },
} = getEnv();

export const credentials = {
  accessKeyId: AWS.accessKeyID,
  secretAccessKey: AWS.secretAccessKey,
};

export const region = AWS.region;
