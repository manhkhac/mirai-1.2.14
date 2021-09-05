module.exports.config = {
  name: "thamlam",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "manhIT",
  description: "Tham lam",
  commandCategory: "noprefix",
  usages: "[tham/thamlam/tiến]",
  cooldowns: 0,
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
  if (!fs.existsSync(dirMaterial + "thamlam.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/thamlam.mp4").pipe(fs.createWriteStream(dirMaterial + "thamlam.mp4"));
}
module.exports.handleEvent = async ({ event, api }) => {
  const fs = global.nodemodule["fs-extra"];

  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `Đúng! nó tham lắm`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/thamlam.mp4`)
  }
  // Gọi bot
  var arr = ["tham lam", "Tham lam", "tham", "Tham", "tiến", "Tiến", "thamlam", "Thamlam", "tham lam vcl"];
  arr.forEach(i => {
    if (body == i) return out(msg)
  });

};
module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}
