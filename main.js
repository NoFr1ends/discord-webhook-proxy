const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());

// Static pages, like configuration ui
app.use(express.static(path.resolve(__dirname, 'public')));

// GitLab Converter
require("./converters/gitlab")(app);
require("./converters/bitbucket")(app);

var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log("Server started at port " + port);
});
