module.exports.config = {
  name: "banlanhat",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "manhIT",
  description: "Lê Bảo (Bạn là Nhất)",
  commandCategory: "noprefix",
  usages: "banlanhat",
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
  if (!fs.existsSync(dirMaterial + "banlanhat.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/banlanhat.mp4").pipe(fs.createWriteStream(dirMaterial + "banlanhat.mp4"));
}
module.exports.handleEvent = async ({ event, api }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["banlanhat"] !== "undefined" && thread["banlanhat"] == false) return;
  
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var msg = {
    body: `Bạn là nhất, bạn là siêu nhân`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/banlanhat.mp4`)
  }
  // Gọi bot
  var arr = ["bạn là nhất", "bạn là siêu nhân", "lê bảo", "banlanhat", "nhất bạn", "nhất bạn nhá"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) return out(msg)
  });

};
module.exports.languages = {
  "vi": { "on": "Bật", "off": "Tắt", "successText": "banlanhat thành công", },
  "en": { "on": "on", "off": "off", "successText": "banlanhat success!", }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["banlanhat"] == "undefined" || data["banlanhat"] == true) data["banlanhat"] = false;
  else data["banlanhat"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["banlanhat"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}