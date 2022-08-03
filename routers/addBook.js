
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("../utils/ddbDocClient.js");

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

module.exports.addBook = async (req, res) => {
  const {TableName, _id, name, author, num,  description, mother, father} = req.query;
  const params = {
    TableName,
    Item: {
      _id,
      name,
      author,
      num,
      description,
      family: {
        mother,
        father
      }
    }
  }
  console.log('create start!');
  const start = Date.now();
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success - item added or updated", data);
    res.send(data);
    return data;
  } catch(e) {
    console.log('error:', e);
  } finally {
    console.log((Date.now() - start) / 1000);
  }
}