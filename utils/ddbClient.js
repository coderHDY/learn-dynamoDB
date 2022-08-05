/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-examples.html.

Purpose:
ddbClient.js is a helper function that creates an Amazon DynamoDB service client.

INPUTS:
- REGION

*/
// snippet-start:[dynamodb.JavaScript.tables.createclientv3]
// Create service client module using ES6 syntax.
// const AWS  = require("aws-sdk");
const {fromIni} = require("@aws-sdk/credential-providers");

const https = require('https');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { NodeHttpHandler } = require("@aws-sdk/node-http-handler");
// Set the AWS Region.
// const REGION = "ap-northeast-1"; //e.g. "us-east-1"
// const REGION = "us-east-1"; //e.g. "us-east-1"
const REGION = "ap-east-1"; //e.g. "us-east-1"

const agent = new https.Agent({
  maxSockets: 25
});
const ddbClient = new DynamoDBClient({
  region: REGION,

  // 长连接，提速
  httpOptions: {
    agent: new https.Agent({
      rejectUnauthorized: true,
      keepAlive: true
    }),
    connectTimeout: 5000,
    timeout: 5000
  },

  // 选取配置文件
  credentials: fromIni({profile: 'default'}),
  requestHandler: new NodeHttpHandler({
    httpsAgent: agent
  }),

  // 超时配置
  connectionTimeout: 5000,
  socketTimeout: 5000,
});
module.exports =  { ddbClient };