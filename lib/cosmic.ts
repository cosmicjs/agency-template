// lib/cosmic.ts
import { createBucketClient } from '@cosmicjs/sdk';
export const cosmic = createBucketClient({
  bucketSlug: 'cosmic-blocks-production',
  readKey: 'zx5Xw1h4SjteAeKb8AsNGNiwGDErNSVXD79rVYL6H3In7zkDjx',
  writeKey: 'fjtVEz3Sh2PKCWO31u41MbLcGrp3bPW7FjnoJ0gHft0nBVJSSo',
});
