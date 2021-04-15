// <reference path="./index.d.ts" />

export interface ListQueuesRequest {
  QueueNamePrefix?: string;
  NextToken?: string;
}

export interface ListQueuesResponse {
  QueueUrls?: Array<string>;
  NextToken?: string;
}
