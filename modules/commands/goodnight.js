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
  const dirMaterial = __dirname + `/Noprefix/`;
  if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "goodnight.gif")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/gif/goodnight.gif").pipe(fs.createWriteStream(dirMaterial + "goodnight.gif"));
}
module.exports.handleEvent = async ({ event, api, Users }) => {
  const fs = global.nodemodule["fs-extra"];
  let name = await Users.getNameUser(event.senderID);
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["goodnight"] !== "undefined" && thread["goodnight"] == false) return;

  var { threadID, messageID, body, senderID } = event;
  if (senderID == global.data.botID) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `${name}, cậu ngủ ngon đi nhé.
      I miss you so much!
      Hẹn gặp lại cậu vào sáng mai nha ❤`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/goodnight.gif`)
  }
  // Gọi bot
  var arr = ["ngủ", "ngủ đi ae", "ngủ thôi", "bye", "good night","nn","nngon"];
  arr.forEach(i => {
     let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });

};

module.exports.languages = {
  "vi": {"on": "Bật","off": "Tắt","successText": "goodnight thành công",},
  "en": {"on": "on","off": "off", "successText": "goodnight success!",}
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["goodnight"] == "undefined" || data["goodnight"] == true) data["goodnight"] = false;
  else data["goodnight"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["goodnight"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}