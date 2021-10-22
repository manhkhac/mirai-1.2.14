module.exports.config = {
  name: "zalgo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang",
  description: "Converts your text to Zalgo",
  commandCategory: "random-text",
  depndencies: {
    "to-zalgo": ""
  },
  usages: "<text>",
  cooldowns: 5
};

module.exports.run = ({ api, event, args }) => {
   var zalgo = require('to-zalgo')
   return api.sendMessage(zalgo(args.join(" ")), event.threadID, event.messageID);
}