const db = require('../util/dbhelper.js');
/**
* 
* @returns {any}
*/
module.exports = async (context) => {
  try {
    let test = await db.addListing(12345678, 'food', 'This is a description', {address: "address", name: "sampletext"});
    return test;
  }catch(err){
    return err;
  }
  
};