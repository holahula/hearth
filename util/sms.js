const lib = require('lib')({
  token: process.env.LIBRARY_TOKEN
});


const sms = {
    parseMessage: (message) => {
      //console.log(message);
      var i = message.indexOf(" ");
      //console.log(i);
      var result = [message.slice(0, i), message.slice(i+1)];
      //console.log(result);
      return result;
    },
    textOut: async (sender, receiver, message) => {
      let result = await lib.messagebird.tel.sms({
        originator: sender,
        recipient: receiver,
        body: message
      });
      return result;
    }
};

module.exports = sms;
