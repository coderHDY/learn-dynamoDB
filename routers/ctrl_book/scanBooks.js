const  { ScanCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("../../utils/ddbClient.js");

// {
//   FilterExpression: "Subtitle = :topic AND Season = :s AND Episode = :e",
//   ExpressionAttributeValues: {
//     ":topic": { S: "SubTitle2" },
//     ":s": { N: "1" },
//     ":e": { N: "2" },
//   },
//   ProjectionExpression: "Season, Episode, Title, Subtitle",
//   TableName: "EPISODES_TABLE",
// };

/* 只能用分区键进行查询 */
/* 【 _ 】是关键字，需要用别名 */
module.exports.scanBooks = async (req, res) => {
  const { TableName, FilterExpression, ExpressionAttributeValues, ExpressionAttributeNames, ProjectionExpression }= req.query;
  const params = {
    TableName,
    FilterExpression,
    ExpressionAttributeValues: JSON.parse(ExpressionAttributeValues),
  };
  if (ExpressionAttributeNames) params.ExpressionAttributeNames = JSON.parse(ExpressionAttributeNames);
  console.log(params);
  const start = Date.now();
  try {
    console.log("scanBooks start!");
    const data = await ddbClient.send(new ScanCommand(params));
    return res.send(data);
  } catch (err) {
    console.log("Error", err);
  } finally {
    const time = (Date.now() - start) / 1000;
    console.log("scanBooks: ", time);
  }
};


/* 返回 */
// {
//   "$metadata": {
//       "httpStatusCode": 200,
//       "requestId": "ICGU2EFDRDN41ITQHD6V92FD9VVV4KQNSO5AEMVJF66Q9ASUAAJG",
//       "attempts": 1,
//       "totalRetryDelay": 0
//   },
//   "Count": 2,
//   "Items": [
//       {
//           "num": {
//               "S": "202"
//           },
//           "_id": {
//               "S": "23adfha548387733"
//           },
//           "family": {
//               "M": {
//                   "mother": {
//                       "S": "歌王刘若英妈妈"
//                   },
//                   "father": {
//                       "S": "刘若英爸爸"
//                   }
//               }
//           },
//           "description": {
//               "S": "刘若英的老书"
//           },
//           "BookName": {
//               "S": "百年孤独"
//           },
//           "author": {
//               "S": "刘若英"
//           }
//       },
//       {
//           "num": {
//               "S": "100"
//           },
//           "_id": {
//               "S": "sadfa23222"
//           },
//           "family": {
//               "M": {
//                   "mother": {
//                       "S": "发撒的"
//                   },
//                   "father": {
//                       "S": "发生实施"
//                   }
//               }
//           },
//           "description": {
//               "S": "这是一本好书"
//           },
//           "BookName": {
//               "S": "百年孤独"
//           },
//           "author": {
//               "S": "阿斯蒂芬"
//           }
//       }
//   ],
//   "ScannedCount": 6
// }