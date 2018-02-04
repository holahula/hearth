const lib = require('lib');

const db = require('../util/dbhelper');
/**
* Get and return listing object
* @param {string} uuid Unique identifier of listing to be deleted
* @returns {object} 
*/
module.exports = async (uuid) => {
  let status = await db.getListing(uuid);
  return status;
};