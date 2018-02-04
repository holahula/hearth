const ejs = require('ejs');
const fs = require('fs');
const templatePath = __dirname + '/../static/manage.ejs';
const lib = require('lib');
/**
 * Post page
 * @param {string} uuid Unique identifier corresponding to the listing
 * @returns {Buffer} Web page returned as a buffer
 */
module.exports = (uuid, context, callback) => {

  lib.shun.hearth["@dev"].manage_listing(uuid)
  .then((listingObj) => {
    ejs.renderFile(
      templatePath, {
        SERVICE_PATH: context.service.identifier,
        listing: listingObj
      }, {},
      (err, response) =>
      callback(err, new Buffer(response || ''), {
        'Content-Type': 'text/html'
      })
    );
  })
  
};