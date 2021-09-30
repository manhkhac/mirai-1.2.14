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
module.exports.onLoad = () => {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const dirMaterial = __dirname + `/Noprefix/`;
  if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "simp.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/simp.mp4").pipe(fs.createWriteStream(dirMaterial + "simp.mp4"));
}
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
  var arr = ["Simp", "simp"];
  arr.forEach(i => {
    if (body === i.toUpperCase() | body === i) return out(msg)
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