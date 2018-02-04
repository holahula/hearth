const lib = require('lib');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = process.env.MONGO_CONNECTION_STRING;

const nClosest = 5;

const dbhelper = {
  addUser: (id, type, locationString) => {
    //set user object (called by handle_message)
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl, async (err, db) => {
        if (err) reject(err);
        let dbo = db.db("qhacks2018");
        let locationObj = await lib.shun.directions.locate(locationString);
        let closestObj = await lib.shun.directions.closest(locationObj.address, await getAllListings(type), nClosest);
        console.log(closestObj);
        var userObj = {
          id: id,
          location: locationObj,
          type: type,
          closest: closestObj
        }
        dbo.collection("users").insertOne(userObj, (err, res) =>{
          if (err) reject(err);
          db.close();
          resolve(closestObj);
        });
      });
    });
  },
  addListing: (uuid, type, description, locationObj) => {
    //set user object (called by handle_message)
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl, async (err, db) => {
        if (err) reject(err);
        let dbo = db.db("qhacks2018");
        var listingObj = {
          uuid: uuid,
          type: type,
          description: description,
          location: locationObj
        }
        console.log(listingObj)
        dbo.collection("listings").insertOne(listingObj, (err, res) =>{
          if (err) reject(err);
          db.close();
          resolve("Success!");
        });
      });
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
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, async (err, db) => {
      if (err) reject(err);
      let dbo = db.db("qhacks2018");
      let toReturn = await dbo.collection("listings").find({type: type}).toArray();
      console.log(toReturn);
      db.close();
      resolve(toReturn);
    });
  });
}

module.exports = dbhelper;