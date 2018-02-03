const lib = require('lib');
const out = require('./textOut.js');

/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @param {string} createdDatetime Datetime when the SMS was sent
 * @returns {any}
 */

var textOut =

function text
module.exports = async (sender, receiver, message, createdDatetime, context) => {


  out(sender, receiver, message); // call textOut.js and send text out

  return 'Received SMS!';
};
