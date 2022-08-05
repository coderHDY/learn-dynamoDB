
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("../../utils/ddbDocClient.js");

/* example */

/* example */

module.exports.addBookList = async (req, res) => {
  const { _id, listName, author, books, description} = req.query;
  const params = {
    TableName: "BookLists",
    Item: {
      _id,
      listName,
      author,
      books,
      description,
    }
  }
  console.log(params);
  console.log('create booklist start!');
  const start = Date.now();
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success - item added to booklist", data);
    res.send(data);
    return data;
  } catch(e) {
    console.log('error:', e);
  } finally {
    console.log("add booklist success: ", (Date.now() - start) / 1000);
  }
}