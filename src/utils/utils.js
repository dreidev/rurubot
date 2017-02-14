'usestrict'

module.exports = {
  matchExactRegex: function (string) {
    return "(?:^|\s)(" + string + ")(?=\s|$)";
  }
}
