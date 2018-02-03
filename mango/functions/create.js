const MongoClient = require('mongodb').MongoClient;

let cache = null;

/**
* @returns {any}
*/
module.exports = (context, callback) => {
  let text = context.params.text || '';
  let completed = context.params.completed || false;
  let todo = {
    text: text,
    completed: completed
  };

  let uri = process.env['MONGO_URI'];

  try {
    if (cache === null) {
      MongoClient.connect(uri, (error, db) => {
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        cache = db;
        createTodo(db, todo, callback);
      });
    } else {
      createTodo(cache, todo, callback);
    }
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const createTodo = (db, todo, callback) => {
  db.collection('qhacks2018').insertOne(todo, (error, result) => {
    if (error) {
      console.log(error);
      return callback(null, error);
    }
    return callback(null, result.insertedId);
  });
};
