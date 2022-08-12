const  { QueryCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("../../utils/ddbClient.js");

// {
//   KeyConditionExpression: "Artist = :s",
//   FilterExpression: "contains (Subtitle, :topic)",
//   ExpressionAttributeValues: {
//     ":s": { S: "Acme Band" },
//   },
//   // 投影
//   ProjectionExpression: "Artist, SongTitle, Awards",
//   TableName: "Music",
// };

/* 只能用【分区键】进行查询 */
/* 【 _ 】是非法关键字，需要用别名 */
module.exports.queryBooks = async (req, res) => {
  const { TableName, KeyConditionExpression, ExpressionAttributeValues, FilterExpression, ProjectionExpression }= req.query;
  const params = {
    TableName,
    KeyConditionExpression,
    ExpressionAttributeValues: JSON.parse(ExpressionAttributeValues),
    ExpressionAttributeNames: {
      "#id": "_id"
    },
  };
  console.log(params);
  const start = Date.now();
  try {
    console.log("queryBooks start!");
    const data = await ddbClient.send(new QueryCommand(params));
    return res.send(data);
  } catch (err) {
    console.log("Error", err);
  } finally {
    const time = (Date.now() - start) / 1000;
    console.log("queryBooks: ", time);
  }
};
