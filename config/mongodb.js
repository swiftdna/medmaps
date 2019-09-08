const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'medmaps';
 
// Use connect method to connect to the server
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to mongo server");
 
  APP.mongoClient = client;
  APP.mongoDB = client.db(dbName);
 
  // client.close();
});
