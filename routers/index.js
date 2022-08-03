const { createTable } = require('./create');
const { addBook } = require('./addBook');
const { getBook } = require('./getBook');
const { getAllTables } = require('./getAllTables');

module.exports = (app) => {
  app.post('/createTable', createTable);
  app.post('/addBook', addBook);
  app.get('/getBook', getBook);
  app.get('/getAllTables', getAllTables);
}


// const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
// (async () => {
//   console.log("get");
//   const client = new DynamoDBClient({ region: "ap-northeast-1" });
//   const command = new ListTablesCommand({});
//   const start = Date.now();
//   console.log("get all tables start!");
//   try {
//     const results = await client.send(command);
//     console.log(results.TableNames.join("\n"));
//   } catch (err) {
//     console.error(err);
//   } finally {
//     const time = Date.now() - start;
//     console.log("get all tables time: ", time);
//   }
// })();

const  { ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("../utils/ddbClient.js");

(async () => {
  console.log('get start');
  const command = new ListTablesCommand({});
  try {
    const results = await ddbClient.send(command);
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
})();