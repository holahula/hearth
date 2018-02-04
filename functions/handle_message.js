const lib = require('lib');
const sms = require('../util/sms');
const db = require('../util/dbhelper');

/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @param {string} createdDatetime Datetime when the SMS was sent
 * @returns {any}
 */

module.exports = async (sender, receiver, message, createdDatetime, context) => {
  let parsedInput = sms.parseCommand(message);
  if (parsedInput) {
    let closest = await db.addUser(sender, parsedInput.command, parsedInput.query);
    console.log(parsedInput);
    let sentText = await sms.textOut(receiver, sender, JSON.stringify(closest));
  }
  return 'Message sent to ' + sender;
};