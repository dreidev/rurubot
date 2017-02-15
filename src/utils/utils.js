'usestrict';

module.exports = {
  matchExactRegex: function(string) {
    return '(?:^|\s)(' + string + ')(?=\s|$)';
  },
  nothingBeforeRegex: function(string) {
    return '(?:^|\s)(' + string + ')';
  },
  nothingAfterRegex: function(string) {
    return '(' + string + ')(?=\s|$)';
  },
};
