module.exports.config = {
  name: "goodnight",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "manhIT",
  description: "Chuc ngu ngon",
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
  if (!fs.existsSync(dirMaterial + "goodnight.gif")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/gif/goodnight.gif").pipe(fs.createWriteStream(dirMaterial + "goodnight.gif"));
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
    body: `${name}, cậu ngủ ngon đi nhé.
      I miss you so much!
      Hẹn gặp lại cậu vào sáng mai nha ❤`,
    attachment: fs.createReadStream(__dirname + `/cache/Noprefix/goodnight.gif`)
  }
  // Gọi bot
  var arr = ["ngủ","Ngủ", "ngủ đi ae", "ngủ thôi","Ngủ thôi", "bye","Bye", "good night","nn","Nn","nngon"];
  arr.forEach(i => {
    if (body == i) return out(msg)
  });

};
module.exports.run = async ({ event, api }) => {
  return api.sendMessage("Dùng sai cách rồi lêu lêu", event.threadID)
}
