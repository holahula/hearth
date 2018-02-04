const lib = require('lib');
const md5 = require('md5');

const db = require('../util/dbhelper');
/**
* A basic todo app
* @param {number} id
* @param {string} type
* @param {string} description
* @param {string} locationString
* @returns {string}
*/
module.exports = async (id, type, description, locationString, context) => {
  let uuid = md5(id);
  let locationObj = await lib.shun.directions.locate(locationString);
  console.log(locationObj.address);
  if (type != 'food' && type != 'shelter'){
    throw "Unrecognized listing type";
  }
  await db.addListing(uuid, type, description, locationObj);
  return "This is a link to a listing page";
};