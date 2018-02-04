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
        let dbo = db.db('qhacks2018');
        try {
          let locationObj = await lib.shun.directions['@dev'].locate(locationString);
          let closestObj = await lib.shun.directions['@dev'].closest(nClosest, locationObj, await getAllListings(type));
          let userObj = {
            id: id,
            location: locationObj,
            type: type,
            closest: closestObj
          };
          dbo.collection('users').replaceOne({
            id: id
          }, userObj, {
            upsert: true
          }, (err, res) => {
            if (err) reject(err);
            db.close();
            resolve(closestObj);
          });
        } catch(err) {
          reject(err);
        }
      });
    });
  },
  addListing: (uuid, type, description, locationObj) => {
    //set user object (called by handle_message)
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl, async (err, db) => {
        if (err) reject(err);
        let dbo = db.db('qhacks2018');
        let listingObj = {
          uuid: uuid,
          type: type,
          description: description,
          location: locationObj
        }
        dbo.collection('listings').insertOne(listingObj, (err, res) => {
          if (err) reject(err);
          db.close();
          resolve('Success!');
        });
      });
    });
  },
  getListing: (uuid) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl, async (err, db) => {
        if (err) reject(err);
        let dbo = db.db('qhacks2018');
        //console.log(listingObj)
        let listing = await dbo.collection('listings').findOne({
          uuid: uuid
        });
        resolve(listing)
      });
    });
  },
  delListing: (uuid) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl, async (err, db) => {
        if (err) reject(err);
        let dbo = db.db('qhacks2018');
        console.log(listingObj)
        dbo.collection('listings').remove({
          uuid: uuid
        }, (err, res) => {
          if (err) reject(err);
          db.close();
          resolve(res);
        });
      });
    });
  },
  getNearbyLocation: (id, index) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl, async (err, db) => {
        if (err) throw err;
        let dbo = db.db('qhacks2018');
        let search = await dbo.collection('users').findOne({
          id: id
        });
        db.close();
        if (!search) {
          reject("No request made.");
        } else if (index > search.closest.length) {
          reject("Index out of range");
        }
        resolve({
          from: search.location,
          to: search.closest[index - 1]
        });
      });
    });
  }
}

function getAllListings(type) {
  //return all listings matching type parameter
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, async (err, db) => {
      if (err) reject(err);
      let dbo = db.db('qhacks2018');
      let listings = await dbo.collection('listings').find({
        type: type
      }).toArray();
      let toReturn = [];
      for (listing of listings) {
        toReturn.push(listing.location);
      }
      db.close();
      resolve(toReturn);
    });
  });
}

module.exports = dbhelper;