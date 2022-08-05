const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../../utils/ddbClient.js");

module.exports.getBookByKey = async (req,res) => {
  const { TableName, _id } = req.query;
  const params = {
    TableName,
    Key: {
      _id
    },
  };
  console.log(params);
  const start = Date.now();
  console.log('get start!');
  try {
    const data = await ddbClient.send(new GetCommand(params));
    console.log("Success", data.Item);
    res.send(data);
  } catch(err) {
    console.log(err);
    res.send(err);
  } finally {
    const time = Date.now() - start;
    console.log(time / 1000);
  }
};

/* 返回 */
// {
//   "$metadata": {
//       "httpStatusCode": 200,
//       "requestId": "4K9KPKABHLKEN6CGJPGF5240IFVV4KQNSO5AEMVJF66Q9ASUAAJG",
//       "attempts": 1,
//       "totalRetryDelay": 0
//   },
//   "Item": {
//       "num": {
//           "S": "100"
//       },
//       "_id": {
//           "S": "asdfjaklfka2344ragdsas"
//       },
//       "family": {
//           "M": {
//               "mother": {
//                   "S": "李妈"
//               },
//               "father": {
//                   "S": "李爸"
//               }
//           }
//       },
//       "description": {
//           "S": "不是李荣浩的歌"
//       },
//       "BookName": {
//           "S": "海底"
//       },
//       "author": {
//           "S": "凤凰传奇"
//       }
//   }
// }