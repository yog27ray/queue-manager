import { KeyValue } from '../../../../typings/common';
import { EventItem } from '../model/event-item';
import { Publish } from '../model/publish';
import { Queue } from '../model/queue';
import { Subscription } from '../model/subscription';
import { Topic } from '../model/topic';
declare class AwsXmlFormat {
    static jsonToXML(rootName: string, keyValue: KeyValue): string;
    static errorResponse(requestId: string, code: string, message: string, details?: string): string;
    static createQueue(requestId: string, host: string, queue: Queue): string;
    static getQueueURL(requestId: string, host: string, queue: Queue): string;
    static getSubscription(requestId: string, host: string, subscription: Subscription): string;
    static deleteQueue(requestId: string): string;
    static listQueues(requestId: string, host: string, queues: Array<Queue>): string;
    static sendMessage(requestId: string, event: EventItem): string;
    static generateSendMessageResponse(event: EventItem): {
        [key: string]: any;
    };
    static sendMessageBatch(requestId: string, events: Array<EventItem>, batchIds: Array<string>): string;
    static findMessageById(requestId: string, eventItem: EventItem): string;
    static updateMessageById(requestId: string, eventItem: EventItem): string;
    static receiveMessage(requestId: string, messages: Array<any>, AttributeName: Array<string>, MessageAttributeName: Array<string>): string;
    static createTopic(requestId: string, topic: Topic): string;
    static listTopicsResult(requestId: string, topics: Array<Topic>, skip: number, total: number): string;
    static deleteTopic(requestId: string): string;
    static setTopicAttributes(requestId: string): string;
    static publish(requestId: string, publish: Publish): string;
    static subscribe(requestId: string, subscription: Subscription, ReturnSubscriptionArn?: boolean): string;
    static confirmSubscription(requestId: string, subscription: Subscription): string;
    static unSubscribeSubscription(requestId: string): string;
    static getPublish(requestId: string, publish: Publish): string;
    static markPublished(requestId: string): string;
    static getTopicAttributes(requestId: string, topic: Topic): string;
    static listSubscriptionsResult(requestId: string, subscriptions: Array<Subscription>, skip: number, total: number): string;
    static listSubscriptionsByTopicResult(requestId: string, subscriptions: Array<Subscription>, skip: number, total: number): string;
    static getSubscriptionARN(subscription: Subscription, ReturnSubscriptionArn?: boolean): string;
    private static transformNameValueArrayToMap;
    private static responseMessage;
    private static md5HashJSON;
    private static md5Hash;
    private static generateSQSURL;
}
export { AwsXmlFormat };
