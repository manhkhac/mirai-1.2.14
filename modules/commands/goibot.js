const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "manhIT",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
  

  var { threadID, messageID, body, senderID } = event;
  if(senderID == api.getCurrentUserID()) return;
  function out(data){
  	api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var tl = ["chào bạn tôi là bot", "bạn gọi tôi có việc gì?", "tôi yêu bạn vai lon", "Yêu em <3", "Hi, chào con vợ bé:3", "Vợ gọi có việc gì không?", "Sử dụng callad để liên lạc với admin!","Dạ, có em đây, yêu em không mà gọi <3. hmm..."];
  var rand = tl[Math.floor(Math.random() * tl.length)];
  // Gọi bot
  var ar = ["bot","Bot","Bot ơi", "bot ơi"];
  ar.forEach(i=> {
  	if(body == i) return out(rand)
   });

}

module.exports.run = function({ api, event}) { }