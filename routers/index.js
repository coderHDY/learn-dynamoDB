const { createTable } = require('./ctrl_book/createTable');
const { addBook } = require('./ctrl_book/addBook');
const { getBookByKey } = require('./ctrl_book/getBookByKey');
const { getAllTables } = require('./ctrl_book/getAllTables');
const { deleteTable } = require('./ctrl_book/deleteTable');
const { delBook } = require('./ctrl_book/delBook');
const { queryBooks } = require('./ctrl_book/queryBooks');
const { scanBooks } = require('./ctrl_book/scanBooks2');


const { addBookList } = require("./ctrl_booklist/addBookList");

const { batchGetItem } = require('./ctrl_booklist/batchGetItem');

module.exports = (app) => {
  app.post('/createTable', createTable);
  app.post('/addBook', addBook);
  app.get('/getBookByKey', getBookByKey);
  app.get('/getAllTables', getAllTables);
  app.post('/deleteTable', deleteTable);
  app.post('/delBook', delBook);
  app.get('/queryBooks', queryBooks);
  app.get('/scanBooks', scanBooks);
  
  app.post('/addBookList', addBookList);

  app.get('/batchGetItem', batchGetItem);
}
