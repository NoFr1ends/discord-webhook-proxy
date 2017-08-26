module.exports.short = function(text, max) {
  if(text.length > max) {
    return text.substring(0, 40) + "...";
  }
  return text;
};
