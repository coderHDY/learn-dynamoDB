const express = require('express');
const app = new express();
const port = 8888;
const bodyParser = require("body-parser");
app.listen(port, () => {
    console.log(`listen ${port}`);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

require("./routers/index")(app);
