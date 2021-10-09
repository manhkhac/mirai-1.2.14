module.exports.config = {
  name: "simplove",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "manhG",
  description: "simp",
  commandCategory: "noprefix",
  usages: "",
  cooldowns: 0,
  denpendencies: {
    "fs-extra": "",
    "request": ""
  }
};

module.exports.handleEvent = async ({ event, api }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["simplove"] !== "undefined" && thread["simplove"] == false) return;

  if (senderID == global.data.botID) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `But I Love You ❤ `,
    attachment: fs.createReadStream(__dirname + `/Noprefix/simp.mp4`)
  }
  // Gọi bot
  var arr = ["simp","simplove"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });

};

module.exports.languages = {
  "vi": { "on": "Bật", "off": "Tắt", "successText": "simplove thành công", },
  "en": { "on": "on", "off": "off", "successText": "simplove success!", }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["simplove"] == "undefined" || data["simplove"] == true) data["simplove"] = false;
  else data["simplove"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["simplove"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}