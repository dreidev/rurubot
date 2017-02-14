'usestrict';
module.exports = function(controller) {
  // my-name-is listener
  require('./my-name-is-listener')(controller);
  // who-am-i-listener listener
  require('./who-am-i-listener')(controller);
  // testing listener
  require('./testruru-listener')(controller);
  // grocery-list listener
  require('./grocery-list-listener')(controller);
  // private listeners
  // pants-listener listener
  require('./innerCircle/pants-listener')(controller);
  // FALLBACKS
  // FALLBACK to cleverbot
  require('./fallback-cleverbot-listener')(controller);
};
