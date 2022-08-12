
const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("../../utils/ddbDocClient.js");

/* example */
// TableName: "Books",
// Item: {
//   name: "双截棍", // For example,  'Episode': 2 (only required if table has sort key)
//   author: "周杰伦", // For example, 'Season': 2
//   _id: "asdfasdf34asdf43rtggsgasdgg", //For example 'Title': 'The Beginning'
//   num: 70,
//   description: "好看好看好看好看好看好看",
//   Family: {
//     mother: { S: "小李" },
//     father: { S: "小黄" },
//   }
// },
/* example */

module.exports.updateBook = async (req, res) => {
  const { _id, UpdateExpression, ExpressionAttributeValues } = req.query;
  const params = {
    TableName: "Books",
    Key: { _id },
    UpdateExpression,
    ExpressionAttributeValues: JSON.parse(ExpressionAttributeValues),
    ReturnValues: "ALL_NEW",
  }
  console.log(params);
  console.log('update start!');
  const start = Date.now();
  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    console.log("Success - item updated", data);
    res.send(data);
    return data;
  } catch(e) {
    console.log('error:', e);
  } finally {
    console.log("update book success: ", (Date.now() - start) / 1000);
  }
}


/* 创建，如果有同名主键会更改 */
// {
//   "$metadata": {
//       "httpStatusCode": 200,
//       "requestId": "D4EU116PJ4DNOK128C0TOKV637VV4KQNSO5AEMVJF66Q9ASUAAJG",
//       "attempts": 1,
//       "totalRetryDelay": 0
//   }
// }