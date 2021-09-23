module.exports.config = {
  name: "huấn",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Ko làm mà đòi có ăn có àm ăn đb, ăn cứt",
  commandCategory: "noprefix",
  usages: "",
  cooldowns: 5,
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
  if (!fs.existsSync(dirMaterial + "kolammadoicoan.mp4")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/kolammadoicoan.mp4").pipe(fs.createWriteStream(dirMaterial + "kolammadoicoan.mp4"));
}
module.exports.handleEvent = async ({ event, api }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["huan"] !== "undefined" && thread["huan"] == false) return;

  var msg = {
    body: `Ăn đb, ăn cứt nhé`,
    attachment: fs.createReadStream(__dirname + `/Noprefix/kolammadoicoan.mp4`)
  }

  var arr = ["ăn cứt", "ăn cut", "huấn đạo lý", "huandaoly", "ko làm mà đòi có ăn", "ăn db", "ăn đb", "andb", "ancut", "ancut", "ănđb", "ăncut", "kolammadoicoan","huấn"];
  for (const i of arr) {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
      return out(msg)
    }
  }

};

module.exports.languages = {
  "vi": {"on": "Bật","off": "Tắt","successText": "huan thành công",},
  "en": {"on": "on","off": "off","successText": "huan success!",}
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["huan"] == "undefined" || data["huan"] == true) data["huan"] = false;
  else data["huan"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["huan"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}