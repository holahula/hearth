const lib = require('lib');
const sms = require('../util/sms');
const db = require('../util/dbhelper');

/**
 * Handles all SMS functions: receive, parse, send 
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @param {string} createdDatetime Datetime when the SMS was sent
 * @returns {any}
 */

module.exports = async (sender, receiver, message, createdDatetime, context) => {
  let command = sms.parseCommand(message);
  let number = sms.parseNumber(message);
  //console.log(command, number);
  if (command) {
    try {
      let closest = await db.addUser(sender, command.command, command.query);
      let response = 'Here\'s what I found for ' + command.command + ' nearby! Reply with a number to choose where to go:\n\n';
      for (let i = 0; i < closest.length; i++) {
        response += '<'+(i+1)+'> ' + closest[i].name + '\n';
        response += (closest[i].description) ? closest[i].description + '\n' : '';
        response += closest[i].duration + ' away (' + closest[i].distance +')';
        if (i < closest.length - 1) response += '\n\n';
      }
      //console.log(command);
      await sms.textOut(receiver, sender, response);
    } catch(err) {
      await sms.textOut(receiver, sender, 'Sorry! We couldn\'t find ' + command.command + ' near \'' + command.query+'\'');
    }
  } else if (number) {
    try {
      let response = await db.getNearbyLocation(sender, number);
      let directions = await lib.shun.directions['@dev']('walking', response.from, response.to);
      await sms.textOut(receiver, sender, directions);
    } catch (err) {
      await sms.textOut(receiver, sender, 'Please choose a destination or use \'food <your address>\' or \'shelter <your address>\'');
    }
  } else {
    await sms.textOut(receiver, sender, 'Welcome to Hearth! Use \'food <your address>\' or \'shelter <your address>\'');
  }
  return 'Message sent to ' + sender;
};
