module.exports.config = {
  name: "hi",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Kanichi",
  description: "",
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
  const dirMaterial = __dirname + `/cache/Noprefix/`;
  if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "hi.gif")) request("https://media.discordapp.net/attachments/849164098024374283/859645612097798184/received_373965544066156.gif").pipe(fs.createWriteStream(dirMaterial + "hi.gif"));
}
module.exports.handleEvent = async ({ event, api, Users }) => {
  const fs = global.nodemodule["fs-extra"];
  let name = await Users.getNameUser(event.senderID);

  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `Chào , ${name} chúc bạn một ngày mới tốt lành ❤️`,
    attachment: fs.createReadStream(__dirname + `/cache/Noprefix/hi.gif`)
  }
  // Gọi bot
  var arr = ["hi","Hi", "hello","Hello", "lô", "hí lô","chào"];
  arr.forEach(i => {
    if (body == i) return out(msg)
  });

};
module.exports.run = async ({ event, api }) => {
  return api.sendMessage("Dùng sai cách rồi lêu lêu", event.threadID)
}