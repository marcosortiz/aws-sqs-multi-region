import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';


export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ordersTopic = new sns.Topic(this, 'OrdersTopic', {
      displayName: 'Customer orders topic',
    });

    const ordersQueue = new sqs.Queue(this, 'OrdersQueue');

    ordersTopic.addSubscription(new subscriptions.SqsSubscription(ordersQueue));

  }
}
