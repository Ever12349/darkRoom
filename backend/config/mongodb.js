// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// const url = 'mongodb://localhost:27017';

// const dbName = 'myproject';

// MongoClient.connect(url, function(err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server",333);
   
//     const db = client.db(dbName);
   
//     client.close();
//   });


const mongoose = require('mongoose');


const mongodburl = `${process.env.MONGODBURL}`;
mongoose.set('useCreateIndex', true)
mongoose.connect(mongodburl,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('open')
});

import '../orm/mongodb/demo.js'

export default db;

module.exports = mongoose;
