var mongo = require('mongodb').MongoClient;

var URL = process.env.MONGODB_URL;
if (!global.db) {
  mongo.connect(URL, function (err, db) {
    global.db = db;
  });
}
