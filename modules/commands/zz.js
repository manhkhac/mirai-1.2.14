module.exports.config = {
  name: "zz",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Test code",
  description: "test code",
  commandCategory: "random-text",
  depndencies: {
    
  },
  usages: "",
  cooldowns: 5
};

module.exports.run = ({ api, event, args }) => {
  var a = api.getCurrentUserID();
  var b = global.data.botID;

  console.log(a,b)
   //return api.sendMessage(a, event.threadID, event.messageID);
}