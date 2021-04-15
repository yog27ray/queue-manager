// <reference path="./index.d.ts" />

export type ClientConfiguration = {
  endpoint: string;
  region?: string;
  accessKeyId: string;
  secretAccessKey: string;
};

export interface SQNSClientConfig {
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
}
