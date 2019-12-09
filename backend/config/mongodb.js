
const mongoose = require('mongoose');


const mongodburl = `${process.env.MONGODBURL}`;
console.log(process.env.MONGODBURL,'process.env.MONGODBURL')
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

// import '../orm/mongodb/demo.js'

export default db;

module.exports = mongoose;
