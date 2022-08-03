const { GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("../utils/ddbClient.js");

// export const params = {
//   TableName: "TABLE_NAME", //TABLE_NAME
//   Key: {
//     KEY_NAME: { N: "KEY_VALUE" },
//   },
//   ProjectionExpression: "ATTRIBUTE_NAME",
// };

module.exports.getBook = async (req,res) => {
  const { TableName, _id, name, author } = req.query;
  const Key = {};
  if (_id) Key._id = { S: _id };
  if (name) Key.name = { S: name };
  if (author) Key.author = { S: author };
  const params = {
    TableName,
    Key,
    ProjectionExpression: "author",
  };
  console.log(params);
  const start = Date.now();
  console.log('get start!');
  try {
    const data = await ddbClient.send(new GetItemCommand(params));
    console.log("Success", data.Item);
    res.send(data);
  } catch(err) {
    console.log(err);
  } finally {
    const time = Date.now() - start;
    console.log(time / 1000);
  }
};