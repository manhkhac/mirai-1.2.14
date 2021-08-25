module.exports.config = {
    name: "aothatday",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "manhIT",
    description: "Ảo thật đấy",
    commandCategory: "noprefix",
    usages: "",
    cooldowns: 0,
    denpendencies: {
      "fs-extra": "",
      "request": ""
    }
  };
  module.exports.onLoad = () => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "aothatday.mp3")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp3/aothatday.mp3").pipe(fs.createWriteStream(dirMaterial + "aothatday.mp3"));
  }
  module.exports.handleEvent = async ({ event, api }) => {
    const fs = require("fs-extra");
    //let name = await Users.getNameUser(event.senderID);
  
    var { threadID, messageID, body, senderID } = event;
    if(senderID == api.getCurrentUserID()) return;
    function out(data){
        api.sendMessage(data, threadID, messageID)
    }
    //trả lời
    var msg = {
      body: `Đúng là ảo thật đấy`,
      attachment: fs.createReadStream(__dirname + `/noprefix/aothatday.mp3`)
    }
    // Gọi bot
    var arr = ["Ảo", "Ảo ma", "ảo", "ảo ma", "Ảo thật đấy", "ảo thật đấy"];
    arr.forEach(i=> {
        if(body == i) return out(msg)
     });
  
  };
  module.exports.run = async ({ event, api }) => {
    return api.sendMessage("Dùng sai cách rồi lêu lêu", event.threadID)
  }
  
