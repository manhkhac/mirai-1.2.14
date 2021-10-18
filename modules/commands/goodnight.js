module.exports.config = {
  name: "goodnight",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "manhG",
  description: "Chuc ngu ngon",
  commandCategory: "noprefix",
  usages: "",
  cooldowns: 0,
  denpendencies: {
    "fs-extra": "",
    "request": ""
  }
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  const fs = global.nodemodule["fs-extra"];
  //let name = await Users.getNameUser(event.senderID);
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["goodnight"] !== "undefined" && thread["goodnight"] == false) return;

  var { threadID, messageID, body, senderID } = event;
  if (senderID == global.data.botID) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `Cậu ngủ ngon đi nhé.\nI miss you so much❤ `,
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