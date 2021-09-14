module.exports.config = {
  name: "tagadmin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ZyrosGenZ, ManhG Fix",
  description: "Bot sẽ rep ng tag admin hoặc rep ng tagbot ",
  commandCategory: "Other",
  usages: "[on/off]",
  cooldowns: 3,
  dependencies: {}
};
module.exports.handleEvent = function ({ api, event }) {
  var { threadID, messageID, senderID } = event;
  if (!global.data.botID) global.data.botID = api.getCurrentUserID();
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["tagadmin"] !== "undefined" && thread["tagadmin"] == false) return;
  if (senderID !== global.data.botID) {
    try {
      const listAdmin = global.config.ADMINBOT;
        for (const id of listAdmin) {
          if (Object.keys(ok.mentions) == id) {
            var msg = ["Tag lần nữa bố ban khỏi dùng", " lần nữa tao đấm cho đấy", "Đã bảo đừng tag mà, thích ăn đấm hả😠", "Đĩ mẹ mày thích tag không con chó 😏"];
            return api.sendMessage({ body: msg[Math.floor(Math.random() * msg.length)] }, threadID, messageID);
          }
        }
    } catch (e) {
    console.log(e);
  }
}
};

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "tagadmin thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!",
  }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["tagadmin"] == "undefined" || data["tagadmin"] == false) data["tagadmin"] = true;
  else data["tagadmin"] = false;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["tagadmin"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}