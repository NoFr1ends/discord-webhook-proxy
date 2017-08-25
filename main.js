const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.json());

// Show generator page
app.get("/", function(req, res) {
  res.send("Hello World!");
});

function short(text, max) {
  if(text.length > max) {
    return text.substring(0, 40) + "...";
  }
  return text;
}

// GitLab Converter
app.post("/hooks/:id/:token/gitlab", function(req, res) {
  if(!req.body) return res.sendStatus(500);

  var description = "";

  req.body.commits.forEach(function(commit) {
    description += short(commit.message.split("\n")[0], 40) + "\n";
  });

  var discord = {
    "embeds": [{
      "title": req.body.user_name + " pushed " + req.body.commits.length + " commits",
      "type": "rich",
      "url": req.body.project.web_url,
      "description": description
    }]
  };

  request.post("https://discordapp.com/api/webhooks/" + req.params.id + "/" + req.params.token)
    .json(discord)
    .on("response", function(response) {
      console.log(response);
    });

  console.log(discord);
  res.send("");
});

app.listen(80, function() {
  console.log("Server started at port 80");
});
