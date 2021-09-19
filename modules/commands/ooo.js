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
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["ỏ"] !== "undefined" && thread["ỏ"] == false) return;
  
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

};
module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "ỏ thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "ỏ success!",
  }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["ỏ"] == "undefined" || data["ỏ"] == true) data["ỏ"] = false;
  else data["ỏ"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["ỏ"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}