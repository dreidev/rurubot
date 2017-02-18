'usestrict';
module.exports = function(controller) {
  // my-name-is listener
  require('./my-name-is-listener')(controller);
  // who-am-i-listener listener
  require('./who-am-i-listener')(controller);
  // toggl start listener
  require('./toggl-start-listener')(controller);
  // toggl stop listener
  require('./toggl-stop-listener')(controller);
  // dreidev address listener
  require('./dreidev-address-listener')(controller);
  // grocery-list listener
  require('./grocery-list-listener')(controller);
  // private listeners
  // pants-listener listener
  require('./innerCircle/pants-listener')(controller);
  // NOTE for testing purposes testing listener
  require('./testruru-listener')(controller);
  // FALLBACKS
  // FALLBACK to cleverbot
  require('./fallback-cleverbot-listener')(controller);
};
