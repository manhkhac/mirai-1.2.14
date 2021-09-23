module.exports.config = {
  name: "nguquahtrua",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "ManhG",
  description: "cái loại ngủ quá giờ trưa đéo bao giờ khá lên được",
  commandCategory: "noprefix",
  usages: "[ngủ quá giờ trưa/huấn rose]",
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
  if (!fs.existsSync(dirMaterial + "nguquagiotrua.mp3")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp3/nguquagiotrua.mp3").pipe(fs.createWriteStream(dirMaterial + "nguquagiotrua.mp3"));
}
module.exports.handleEvent = async ({ event, api, Users }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["nguquahtrua"] !== "undefined" && thread["nguquahtrua"] == false) return;
  //trả lời
  var msg = {
    body: `cái loại ngủ quá giờ trưa đéo bao giờ khá lên được`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/nguquagiotrua.mp3`)
  }
  // Gọi bot
  var arr = ["huấn rose", "ngủ quá giờ trưa", "nguquagiotrua", "nguquahtruarose", "nguquahtrua", "nguquagiotrua", "nguquahtrua"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });

};

module.exports.languages = {
  "vi": { "on": "Bật", "off": "Tắt", "successText": "nguquahtrua thành công", },
  "en": { "on": "on", "off": "off", "successText": "nguquahtrua success!", }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["nguquahtrua"] == "undefined" || data["nguquahtrua"] == true) data["nguquahtrua"] = false;
  else data["nguquahtrua"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["nguquahtrua"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}