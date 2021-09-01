module.exports.config = {
  name: "goibotoi",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "manhIT",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "",
  cooldowns: 5,
};
module.exports.handleEvent = async ({ event, api, Users }) => {
  var { threadID, messageID, body, senderID } = event;
  var name = await Users.getNameUser(event.senderID);

  if(senderID == api.getCurrentUserID()) return; 
  function out(data){
  	api.sendMessage(data, threadID, messageID)
  }

  //trả lời
  var tl = [
    "Yêu em <3", "Hi, chào con vợ bé:3", "Vợ gọi có việc gì không?",
    "Dạ, có em đây, yêu em không mà gọi <3. hmm...",
    `${name}` + ", sử dụng callad để liên lạc với admin!",
    `${name}` + ", gọi em có việc gì thế",
    `${name}` + ", yêu em ko mà gọi😢",
    `${name}` + ", tôi yêu bạn vl ❤",
    `${name}` + ", bạn có yêu tôi không❤",
    `${name}` + ", dạ có em đây:3",
    `${name}` + ", yêu Admin bot đi rồi hãy gọi",
    `${name}` + ", yêu em ❤",
    `${name}` + ", [Góc Donate] Bạn có thể donate cho tôi chứ?",
    `${name}` + " Tao đây"
  ];
  //trả lời
  /*var tl = ["chào bạn tôi là bot", "bạn gọi tôi có việc gì?", "tôi yêu bạn vai lon", "Yêu em <3", "Hi, chào con vợ bé:3", "Vợ gọi có việc gì không?", "Sử dụng callad để liên lạc với admin!","Dạ, có em đây, yêu em không mà gọi <3. hmm...","[Góc Donate] Bạn có thể donate cho tôi chứ?","Bot yêu em ❤"];
  */
  var rand = tl[Math.floor(Math.random() * tl.length)];
  // Gọi bot
  var ar = ["bot","Bot","bot ơi","Bot ơi","yêu bot","Yêu bot","bot đâu","Bot đâu"];
  ar.forEach(i=> {
  	if(body == i) return out(randj)
   });
}

module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}