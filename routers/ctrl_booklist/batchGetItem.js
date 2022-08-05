/* 批量获取 */

const { BatchGetItemCommand } = require("@aws-sdk/client-dynamodb");
const { ddbDocClient } = require("../../utils/ddbDocClient.js");

/* example */

/* example */

module.exports.batchGetItem = async (req, res) => {
  const { BooksId, BookListsId } = req.query;
  const params = {
    RequestItems: {
      Books: {
        Keys: [
          {
            _id: { S: BooksId },
          },
        ],
        // ProjectionExpression: "ATTRIBUTE_NAME",
      },
      BookLists: {
        Keys: [
          {
            _id: { S: BookListsId },
          },
        ],
        // ProjectionExpression: "ATTRIBUTE_NAME",
      },
    },
  }
  console.log(params);
  console.log('batch get start!');
  const start = Date.now();
  try {
    const data = await ddbDocClient.send(new BatchGetItemCommand(params));
    console.log("Success - batch get", data);
    res.send(data);
    return data;
  } catch(e) {
    console.log('error:', e);
  } finally {
    console.log("batch get success: ", (Date.now() - start) / 1000);
  }
}