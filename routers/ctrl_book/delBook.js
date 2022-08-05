
const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
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

module.exports.delBook = async (req, res) => {
  const { _id} = req.query;
  const params = {
    TableName: "Books",
    Key: { _id }
  }
  console.log('delete item start!');
  const start = Date.now();
  try {
    const data = await ddbDocClient.send(new DeleteCommand(params));
    console.log("Success - item delete", data);
    res.send(data);
    return data;
  } catch(e) {
    console.log('error:', e);
  } finally {
    console.log("delete book end: ", (Date.now() - start) / 1000);
  }
}

/* 成功返回 */
// {
//   "$metadata": {
//       "httpStatusCode": 200,
//       "requestId": "MM6269DFRP5BBGFSVK2117920VVV4KQNSO5AEMVJF66Q9ASUAAJG",
//       "attempts": 1,
//       "totalRetryDelay": 0
//   }
// }

/* 失败返回一样 */
