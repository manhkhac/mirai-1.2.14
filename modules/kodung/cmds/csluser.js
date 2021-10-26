module.exports.config = {
  name: "csluser",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "ManhG",
  description: "Bật tắt console user",
  commandCategory: "admin",
  depndencies: {  },
  usages: "",
  cooldowns: 2
};

module.exports.handleEvent = async ({ event, api, Users, Threads }) => {
  const thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["console"] !== "undefined" && thread["console"] == true) return;
  if (event.senderID == global.data.botID) return;
  var nameUser = await Users.getNameUser(event.senderID);
  var body = event.body || "Ảnh, video hoặc ký tự đặc biệt";
  var color = ["\x1b[33m", "\x1b[34m", "\x1b[35m", '\x1b[36m','\x1b[31m','\x1b[1m'];
  var more = color[Math.floor(Math.random() * color.length)];
 console.log('\x1b[32m'+'Tên:'+'\x1b[37m \x1b[' + more + '' + nameUser + '\x1b[37m -> \x1b[0m' + body);
};

module.exports.languages = {
  "vi": {"on": "Bật","off": "Tắt","successText": "console thành công",},
  "en": {"on": "on","off": "off","successText": "console success!",}
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["console"] == "undefined" || data["console"] == true) data["console"] = false;
  else data["console"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["console"] == false) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}