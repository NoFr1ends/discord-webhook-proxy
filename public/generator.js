// Discord URL parse regex
const regex = /http[s]?:\/\/discordapp\.com\/api\/webhooks\/([\d]+)\/([a-zA-Z0-9\_\-]+)/g;

function buildUrl() {
  var url = window.location.protocol + "//" + window.location.host + "/hooks/";
  var error = false;

  var discordUrl = $("#discord-webhook-url").val();
  if(discordUrl != "") {
    var matches = regex.exec(discordUrl);
    regex.lastIndex = 0;
    if(matches != null) {
      $("#discord-webhook-url").removeClass("is-invalid");

      url += matches[1] + "/" + matches[2];
    } else {
      url = "";
      error = true;
      $("#discord-webhook-url").addClass("is-invalid");
    }
  } else {
    url = "";
    error = true;
    $("#discord-webhook-url").addClass("is-invalid");
  }

  var selected = $(".output-type:checked");
  if(selected.length > 0) {
    url += "/" + selected.val();
  } else {
    $(".output-type").addClass("is-invalid");
    url = "";
    error = true;
  }

  return url;
}

$(document).ready(function() {
  $(".refresh").change(function() {
    $("#webhook-url").val(buildUrl());
  });

  $("#webhook-url").val(buildUrl());
});
