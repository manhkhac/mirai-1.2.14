module.exports.config = {
  name: "ỏ",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Ỏ  Ỏ Ỏ Ỏ",
  commandCategory: "noprefix",
  usages: "",
  cooldowns: 5,
  denpendencies: {
    "fs-extra": "",
    "request": ""
  }
};
module.exports.onLoad = () => {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const dirMaterial = __dirname + `/Noprefix/`;
  if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "ooo.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/ooo.mp4").pipe(fs.createWriteStream(dirMaterial + "ooo.mp4"));
}
module.exports.handleEvent = async ({ event, api }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;

  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }

  var msg = {
    body: `Hôm nay trời đẹp thế nhờ... \nỎ Ỏ Ỏ Ỏ`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/ooo.mp4`)
  }

  var arr = ["ỏ", "Ỏ", "oo", "Oo"];
  for (const i of arr) {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
      return api.sendMessage(msg, threadID, messageID);
    }
  }


  /*if (event.body.indexOf("ỏ")==0 || (event.body.indexOf("Ỏ")==0)) {
 var msg = {
     body: "HÔM NAY TRỜI ĐẸP THẾ NHỜ... Ỏ Ỏ Ỏ Ỏ",
     attachment: fs.createReadStream(__dirname + `/Noprefix/ooo.mp4`)
   }
   return api.sendMessage(msg, threadID, messageID);
 }*/

};
module.exports.run = async ({ event, api }) => {
  return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}