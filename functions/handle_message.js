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
  let command = sms.parseCommand(message);
  let number = sms.parseNumber(message);
  if (command) {
    let closest = await db.addUser(sender, command.command, command.query);
    console.log(command);
    await sms.textOut(receiver, sender, JSON.stringify(closest));
  } else if (number) {
    try {
      let response = await db.getNearbyLocation(sender, number);
      let directions = await lib.shun.directions(response.from.address, response.to.address);
      await sms.textOut(receiver, sender, directions);
    } catch (err) {
      await sms.textOut(receiver, sender, "bad request. heres how u do it properly u pleb");
    }
  }
  return 'Message sent to ' + sender;
};