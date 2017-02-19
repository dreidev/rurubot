const mongoose = require('mongoose');
const {MONGO_TEST_URI} = require('../../../config/config');

mongoose.Promise = Promise;
mongoose.connection.on('error', function() {
  console.log('error');
});

function clearDB(done) {
  for (let i = 0; i < mongoose.connection.collections.length; i++) {
    mongoose.connection.collections[i].remove(()=>{});
  }
  return done();
}

// eslint-disable-next-line
before(function(done) {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGO_TEST_URI, function(err) {
      if (err) {
        throw err;
      }
      return clearDB(done);
    });
  } else {
    clearDB(done);
  }
});

// eslint-disable-next-line
after(function(done) {
  mongoose.disconnect();
  return done();
});

exports.clearDB = clearDB;
