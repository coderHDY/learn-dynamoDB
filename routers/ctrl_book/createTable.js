const  { CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("../../utils/ddbClient.js");

/* example */
// const params = {
//   "KeySchema": [
//       {
//           "AttributeName": "_id",
//           "KeyType": "HASH"
//       },
//       {
//           "AttributeName": "_id",
//           "KeyType": "RANGE"
//       }
//   ],
//   "AttributeDefinitions": [
//       {
//           "AttributeName": "_id",
//           "KeyType": "S"
//       },
//       {
//           "AttributeName": "name",
//           "KeyType": "S"
//       },
//       {
//           "KeyType": "num",
//           "AttributeName": "N"
//       },
//       {
//           "AttributeName": "description",
//           "KeyType": "S"
//       },
//       {
//           "KeyType": "Author",
//           "AttributeName": "S"
//       }
//   ],
//   "TableName": "Books"
// };
/* example */

module.exports.createTable = async (req, res) => {
  console.log(req.body);
  const configPms = req.body; 
  const { TableName, AttributeDefinitions, KeySchema } = configPms;
  const params = {
    TableName,
    AttributeDefinitions,
    KeySchema,
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    StreamSpecification: {
      StreamEnabled: false,
    },
  };
  console.log(params);
  const start = Date.now();
  try {
    console.log("Table Created start!");
    const data = await ddbClient.send(new CreateTableCommand(params));
    return res.send(data);
  } catch (err) {
    console.log("Error", err);
  } finally {
    const time = (Date.now() - start) / 1000;
    console.log("Table Created: ", time);
  }
};
