
const { DescribeTableCommand } = require("@aws-sdk/client-dynamodb");
const { ddbDocClient } = require("../../utils/ddbDocClient.js");

/* example */

/* example */

module.exports.describeTable = async (req, res) => {
  const { TableName } = req.query;
  const params = { TableName };
  console.log(params);
  console.log('describe table start!');
  const start = Date.now();
  try {
    const data = await ddbDocClient.send(new DescribeTableCommand(params));
    console.log("Success - describe table", data);
    res.send(data);
    return data;
  } catch(e) {
    console.log('error:', e);
  } finally {
    console.log("describe table success: ", (Date.now() - start) / 1000);
  }
}