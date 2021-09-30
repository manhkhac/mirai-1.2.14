module.exports.config = {
  name: "bruh",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "manhG",
  description: "Bủh",
  commandCategory: "noprefix",
  usages: "[bủh/bruh]",
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
  if (!fs.existsSync(dirMaterial + "bruh.mp3")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp3/bruh.mp3").pipe(fs.createWriteStream(dirMaterial + "bruh.mp3"));
}
module.exports.handleEvent = async ({ event, api, Users }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  if (senderID == global.data.botID) return;
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["bruh"] !== "undefined" && thread["bruh"] == false) return;

  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `bủh ;))`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/bruh.mp3`)
  }
  // Gọi bot
  var arr = ["brủh", "bủh", "bruh", "buh"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });

};
module.exports.languages = {
  "vi": {"on": "Bật","off": "Tắt","successText": "bruh thành công",},
  "en": {"on": "on","off": "off","successText": "bruh success!",}
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["bruh"] == "undefined" || data["bruh"] == true) data["bruh"] = false;
  else data["bruh"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["bruh"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}