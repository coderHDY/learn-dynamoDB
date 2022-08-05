const  { DeleteTableCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("../../utils/ddbClient.js");

module.exports.deleteTable = async (req, res) => {
  const {TableName }= req.query;
  const params = {
    TableName
  };
  console.log(params);
  const start = Date.now();
  try {
    console.log("Table Delete start!");
    const data = await ddbClient.send(new DeleteTableCommand(params));
    return res.send(data);
  } catch (err) {
    console.log("Error", err);
  } finally {
    const time = (Date.now() - start) / 1000;
    console.log("Table Delete: ", time);
  }
};
