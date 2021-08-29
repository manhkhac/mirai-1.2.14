module.exports.config = {
    name: "banlanhat",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "manhIT",
    description: "Lê Bảo (Bạn là Nhất)",
    commandCategory: "noprefix",
    usages: "banlanhat",
    cooldowns: 0,
    denpendencies: {
      "fs-extra": "",
      "request": ""
    }
  };
  module.exports.onLoad = () => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const dirMaterial = __dirname + `/cache/Noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "banlanhat.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/banlanhat.mp4").pipe(fs.createWriteStream(dirMaterial + "banlanhat.mp4"));
  }
  module.exports.handleEvent = async ({ event, api }) => {
    const fs = global.nodemodule["fs-extra"];

    var { threadID, messageID, body, senderID } = event;
    if(senderID == api.getCurrentUserID()) return;
    function out(data){
        api.sendMessage(data, threadID, messageID)
    }
    //trả lời
    var msg = {
      body: `Bạn là nhất, bạn là siêu nhân`,
      attachment: fs.createReadStream(__dirname + `/cache/Noprefix/banlanhat.mp4`)
    }
    // Gọi bot
    var arr = ["bạn là nhất","Bạn là nhất", "bạn là siêu nhân", "lê bảo", "banlanhat","Banlanhat", "nhất bạn","nhất bạn nhá"];
    arr.forEach(i=> {
        if(body == i) return out(msg)
     });
  
  };
 module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}