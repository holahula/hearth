const lib = require('lib');

const db = require('../util/dbhelper');
/**
* Get and return listing object
* @param {number} uuid Unique identifier of listing to be deleted
* @returns {Object} 
*/
module.exports = async (uuid) => {
  let status = await db.getListing(uuid);
  return status;
};