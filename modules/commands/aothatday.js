module.exports.config = {
  name: "aothatday",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "manhG",
  description: "Ảo thật đấy",
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
  if (!fs.existsSync(dirMaterial + "Noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "aothatday.mp3")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp3/aothatday.mp3").pipe(fs.createWriteStream(dirMaterial + "aothatday.mp3"));
}
module.exports.handleEvent = async ({ event, api, Users }) => {
  const fs = global.nodemodule["fs-extra"];

  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `dmm, ảo thật đấy`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/aothatday.mp3`)
  }
  // Gọi bot
  var arr = ["ảo", "ảo ma", "ảo ma canada", "ảo thật", "ảo thật đấy", "dmm", "aothatday"];
  arr.forEach(i => {

    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });

};
module.exports.run = async ({ event, api }) => {
  return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}