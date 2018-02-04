const lib = require('lib');
const md5 = require('md5');

const db = require('../util/dbhelper');
/**
* A basic todo app
* @param {number} id Phone number of listing poster
* @param {string} type Type of listing (food or shelter)
* @param {string} description A brief description of what is being offered (availability, times, etc)
* @param {string} locationString String detailing the location (to be fed into Google Maps API)
* @returns {string} A string with a link to a page to manage the posted listing
*/
module.exports = async (id, type, description, locationString, context) => {
  let uuid = md5(id);
  let locationObj = await lib.shun.directions.locate(locationString);
  console.log(locationObj.address);
  if (type != 'food' && type != 'shelter'){
    throw "Unrecognized listing type";
  }
  await db.addListing(uuid, type, description, locationObj);
  return "https://shun.lib.id/hearth@dev/manage/?uuid=" + uuid;
};