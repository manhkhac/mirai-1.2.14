module.exports.config = {
  name: "oidoioi",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Ối dồi ôi",
  commandCategory: "noprefix",
  usages: "",
  cooldowns: 5,
  denpendencies: {
    "fs-extra": "",
    "request": ""
  }
};

module.exports.handleEvent = async ({ event, api }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["oidoioi"] !== "undefined" && thread["oidoioi"] == false) return;

  if (senderID == global.data.botID) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `Ối dồi ôi`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/oidoioi.mp4`)
  }
  // Gọi bot
  let arr = ["oidoioi", "ối dồi ôi"];
  for (const i of arr) {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
      return out(msg);
    }
  }

};

module.exports.languages = {
  "vi": { "on": "Bật", "off": "Tắt", "successText": "oidoioi thành công", },
  "en": { "on": "on", "off": "off", "successText": "oidoioi success!", }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["oidoioi"] == "undefined" || data["oidoioi"] == true) data["oidoioi"] = false;
  else data["oidoioi"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["oidoioi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}
