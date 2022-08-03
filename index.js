const express = require('express');
const app = new express();
const bodyParser = require("body-parser");
app.listen(8888, () => {
    console.log('listen 8888');
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

require("./routers/index")(app);