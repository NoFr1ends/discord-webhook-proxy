const utils = require("../utils");
const request = require("request");

module.exports = function(app) {
  app.post("/hooks/:id/:token/gitlab", function(req, res) {
    if(!req.body) return res.sendStatus(500);

    var description = "";

    req.body.commits.forEach(function(commit) {
      description += utils.short(commit.message.split("\n")[0], 80) + "\n";
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
      }
    );

    console.log(discord);
    res.send("");
  });
}
