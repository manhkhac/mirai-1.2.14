module.exports.config = {
  name: "o",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "o  o o o",
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
  if (typeof thread["o"] !== "undefined" && thread["o"] == false) return;

  var { threadID, messageID, body, senderID } = event;
  if (senderID == global.data.botID) return;

  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }

  var msg = {
    body: `Hôm nay trời đẹp thế nhờ... \no o o o`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/ooo.mp4`)
  }

  var arr = ["o", "oo", "ỏ"];
  for (const i of arr) {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
      return out(msg)
    }
  }

};
module.exports.languages = {
  "vi": {"on": "Bật","off": "Tắt","successText": "ỏ thành công",},
  "en": {"on": "on","off": "off","successText": "ỏ success!",}
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["o"] == "undefined" || data["o"] == true) data["o"] = false;
  else data["o"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["o"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}