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
  timeFormatter: function(time) {
    if (time < 60) {
      return time + ' seconds';
    } else if (time > 60 && time < 3600) {
      return Math.floor(time / 60) + ' minutes and ' + Math.floor(time%60) + ' seconds';
    } else {
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor((time%3600) / 60);
      return hours + ' hours, ' + minutes + ' minutes and ' + Math.floor(time%(60)) + ' seconds';
    }
  },
};
