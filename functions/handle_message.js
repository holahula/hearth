const lib = require('lib');
const sms = require('../util/sms.js');
/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @param {string} createdDatetime Datetime when the SMS was sent
 * @returns {any}
 */

module.exports = async (sender, receiver, message, createdDatetime, context) => {
    let parsedInput = sms.parseMessage(message);
    //console.log(parsedInput);
    let sentText = await sms.textOut(receiver, sender, parsedInput[0]);
    //console.log(sentText);
    return;
};
