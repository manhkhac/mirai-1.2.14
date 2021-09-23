module.exports.config = {
  name: "thamlam",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "manhIT",
  description: "Tham lam",
  commandCategory: "noprefix",
  usages: "[tham/thamlam/tiến]",
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
  if (!fs.existsSync(dirMaterial + "thamlam.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/thamlam.mp4").pipe(fs.createWriteStream(dirMaterial + "thamlam.mp4"));
}
module.exports.handleEvent = async ({ event, api }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["thamlam"] !== "undefined" && thread["thamlam"] == false) return;
  //trả lời
  var msg = {
    body: `Đúng! nó tham lắm`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/thamlam.mp4`)
  }
  // Gọi bot
  var arr = ["tham lam", "tham", "tiến",  "thamlam", "tham lam vcl"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });
};

module.exports.languages = {
  "vi": { "on": "Bật", "off": "Tắt", "successText": "thamlam thành công", },
  "en": { "on": "on", "off": "off", "successText": "thamlam success!", }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["thamlam"] == "undefined" || data["thamlam"] == true) data["thamlam"] = false;
  else data["thamlam"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["thamlam"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}