module.exports.config = {
  name: "ngudot",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "ManhG",
  description: "ngu dot (Tiến bịp)",
  commandCategory: "noprefix",
  usages: "[ngudot/dốt/ngu dốt]",
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
  if (!fs.existsSync(dirMaterial + "ngudot.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/ngudot.mp4").pipe(fs.createWriteStream(dirMaterial + "ngudot.mp4"));
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
    body: `Ngu, ngu vcl`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/ngudot.mp4`)
  }
  // Gọi bot
  var arr = ["ngu dot", "ngu dốt", "ngu ngốc", "dốt", "ngudot", "ngu dốt vcl", "ngu"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });

};
module.exports.run = async ({ event, api }) => {
  return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}