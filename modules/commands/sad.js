module.exports.config = {
  name: "sad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "manhG",
  description: "Buồn chán",
  commandCategory: "noprefix",
  usages: "",
  cooldowns: 5,
  denpendencies: {
    "fs-extra": "",
    "request": ""
  }
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["sad"] !== "undefined" && thread["sad"] == false) return;

  if (senderID == global.data.botID) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `Chán quá đi, huhu`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/sad.mp4`)
  }
  // Gọi bot
  var arr = ["chán", "chán vãi", "chán quá", "chán v","chán vl", "buồn", "buồn vl", "buồn quá","sad","khóc"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });
};

module.exports.languages = {
  "vi": {"on": "Bật","off": "Tắt","successText": "buồn chán thành công",},
  "en": {"on": "on","off": "off","successText": "sad success!",}
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["sad"] == "undefined" || data["sad"] == true) data["sad"] = false;
  else data["sad"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["sad"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}