const lib = require('lib');
const sms = require('../util/sms.js');
const db = require('../util/dbhelper.js');
const nClosest = 5;
/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @param {string} createdDatetime Datetime when the SMS was sent
 * @returns {any}
 */

module.exports = async (sender, receiver, message, createdDatetime, context) => {
    let parsedInput = sms.parseMessage(message);
    //let identifier = sms.findType(parsedInput[0].toString());
    db.addUser(sender, parsedInput[0], parsedInput[1]);

    //console.log(parsedInput);
    let sentText = await sms.textOut(receiver, sender, parsedInput[0]);
    //console.log(sentText);
    return;
};
