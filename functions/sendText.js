const lib = require('lib')({
  token: "5yfYi_vPXHKsvUFnYnBUtEW6koQM4fp7jv7gV24zz_KYDex19Hm_W04Pn7Vp207j"
});

/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @returns {any}
 */

const helper = {
  text: function(sender, receiver, message){
    let result = await lib.messagebird.tel.sms({
      originator: sender,
      recipient: receiver,
      body: message
    });
  };
  return result;
};

module.exports = helper;
