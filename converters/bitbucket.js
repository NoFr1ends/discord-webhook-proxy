const utils = require("../utils");
const request = require("request");

module.exports = function(app) {
  app.post("/hooks/:id/:token/bitbucket", function(req, res) {
    if(!req.body) return res.sendStatus(500);

    var description = "";

    console.log(req.body.push.changes[0].commits);

    var commits = 0;
    req.body.push.changes.forEach(function(change) {
      change.commits.forEach(function(commit) {
        description += utils.short(commit.message.split("\n")[0], 80) + "\n";
        commits++;
      });
    });


    var discord = {
      "embeds": [{
        "title": req.body.actor.display_name + " pushed " + commits + " commits",
        "type": "rich",
        "url": req.body.repository.links.html.href,
        "description": description
      }]
    };

    request.post("https://discordapp.com/api/webhooks/" + req.params.id + "/" + req.params.token)
      .json(discord)
      .on("response", function(response) {
        //console.log(response);
      }
    );

    //console.log(discord);
    res.send("");
  });
}
