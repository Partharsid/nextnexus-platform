import { getEnv } from '@nextnexus/env';

const {
  Next Nexus Platform: { AWS },
} = getEnv();

export const credentials = {
  accessKeyId: AWS.accessKeyID,
  secretAccessKey: AWS.secretAccessKey,
};

export const region = AWS.region;
