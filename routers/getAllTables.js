
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

module.exports.getAllTables = async (req, res) => {
    const client = new DynamoDBClient({ region: "ap-northeast-1" });
    const command = new ListTablesCommand({});
    const start = Date.now();
    console.log("get all tables start!");
    try {
      const results = await client.send(command);
      console.log(results.TableNames.join("\n"));
      res.send(results)
    } catch (err) {
      console.error(err);
    } finally {
      const time = Date.now() - start;
      console.log("get all tables time: ", time / 1000);
    }
};