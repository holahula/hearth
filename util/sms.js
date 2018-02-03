const lib = require('lib')({
  token: process.env.LIBRARY_TOKEN
});


const sms = {
    parseMessage: (message) => {
      var i = indexOf(" ");
      var result = [message.splice(0, i), message.slice(i+1)];
      return result;
    },
    textOut: async (sender, receiver, message)=>{
      let result = await lib.messagebird.tel.sms({
        originator: sender,
        recipient: receiver,
        body: message
      });
      return result;
    }
};

module.exports = sms;
