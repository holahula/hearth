const MongoClient = require('mongodb').MongoClient;
const dbUrl = process.env.MONGO_CONNECTION_STRING;

const nClosest = 5;

const dbhelper = {
  setUser: (id, type, locationString) => {
    //set user object (called by handle_message)
    MongoClient.connect(dbUrl, function(err, db) {
      if (err) throw err;
      let dbo = db.db("qhacks2018");
      let locationObj = lib.shun.directions.locate(locationString);
      let closestObj = lib.shun.directions.closest(locationObj, getAllListings(type), nClosest);
      var userObj = {
        id: id,
        location: locationObj,
        type: type,
        closest: closestObj
      }
      db.close();
    });
  }
  
  // getUser: (id) => {
  //   MongoClient.connect(url, function(err, db) {
  //     if (err) throw err;
      
  //     db.close();
  //   });
  // },
  // createCollection: (collectionstr) => {
  //   return new Promise((resolve)=>{
  //     MongoClient.connect(dbUrl, function(err, db) {
  //       if (err) throw err;
  //       let dbo = db.db("qhacks2018");
  //       dbo.createCollection(collectionstr, (err, res) => {
  //         if (err) throw err;
  //         db.close();
  //         resolve("CREATED!");
  //       });
  //     });
  //   });
  // }
  


}

function getAllListings(type){
  //return all listings matching type parameter
}

module.exports = dbhelper;