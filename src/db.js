// db.js
const mongo = require('mongodb').MongoClient;
// const assert = require('assert');
let DB;
// Connection URL
const DB_URL = 'mongodb://localhost:27017/rurubot';


// // Use connect method to connect to the server
// MongoClient.connect(DB_URL, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to DATABASE server");
//
//   db.close();
// });

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */

console.log(DB);


module.exports.connect = function(cb) {
  mongo.connect(DB_URL, function(err, db) {
    if(err)
    console.log(err);
    else{
      console.log('Connected successfully to DATABASE server');
      DB=db;
      cb(err, db);
    }
   });
};
