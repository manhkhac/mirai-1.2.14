module.exports.config = {
  name: "ngudot",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "ManhG",
  description: "ngu dot (Tiến bịp)",
  commandCategory: "noprefix",
  usages: "[ngudot/dốt/ngu dốt]",
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
  if (typeof thread["ngudot"] !== "undefined" && thread["ngudot"] == false) return;

  if (senderID == global.data.botID) return;

  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `Ngu, ngu vcl`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/ngudot.mp4`)
  }
  // Gọi bot
  var arr = ["ngu dot", "ngu dốt", "ngu ngốc", "dốt", "ngudot", "ngu dốt vcl", "ngu"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });

};
module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "ngudot thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "ngudot success!",
  }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["ngudot"] == "undefined" || data["ngudot"] == true) data["ngudot"] = false;
  else data["ngudot"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["ngudot"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}