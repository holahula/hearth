const lib = require('lib')({
  token: process.env.LIBRARY_TOKEN
});

const sms = {
  parseCommand: (message) => {
    console.log(message);
    let i = message.indexOf(" ");
    let command = message.slice(0, i);
    let query = message.slice(i + 1);
    if (!query || (command != 'food' && command != 'shelter')) {
      return null;
    } else {
      return {
        command: command,
        query: query
      };
    }
  },
  parseNumber: (message) => {
    let command = message.slice(0, 1);
    if (!command || isNaN(command)) return null;
    return parseInt(command);
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