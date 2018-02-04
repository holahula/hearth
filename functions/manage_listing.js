const lib = require('lib');

const db = require('../util/dbhelper');
/**
* Delete listing with given uuid
* @param {number} uuid Unique identifier of listing to be deleted
*/
module.exports = async (uuid) => {
  let status = await db.getListing(uuid);
  //Return a page buffer with info and dellisting link
};