const lib = require('lib');

const db = require('../util/dbhelper');
/**
* Delete listing with given uuid
* @param {string} uuid Unique identifier of listing to be deleted
* @returns {string}
*/
module.exports = async (uuid) => {
  let status = await db.delListing(uuid);
  console.log(status);
  return "Removed listing!";
};