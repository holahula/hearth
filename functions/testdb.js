const db = require('../util/dbhelper.js');
/**
* 
* @returns {any}
*/
module.exports = async (context) => {
  let out = "";
  out += await db.createCollection("listings");
  out += await db.createCollection("users");
  return out;
};