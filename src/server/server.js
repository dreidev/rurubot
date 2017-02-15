const mongoose = require('mongoose');
mongoose.Promise = Promise;

const config = require('../../config/config');
const app = require('./app');


mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.listen(config.SERVER_PORT || 8080, function () {
    console.log(`started server on port ${config.SERVER_PORT || 8080}`);
})
