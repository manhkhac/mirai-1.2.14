'use strict'
module.exports.config = {
  name: "console",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "ManhG",
  description: "Bật tắt console",
  commandCategory: "admin",
  depndencies: {},
  usages: "",
  cooldowns: 2
};

module.exports.handleEvent = async ({ event, api, Users, Threads }) => {
  const { senderID, threadID } = event;
  if (senderID == global.data.botID) return;
  var nameBox = (global.data.threadInfo.get(threadID)).threadName;
  var nameUser = await Users.getNameUser(senderID);
  var body = body || "Ảnh, video, ký tự đặc biệt";
  ///////////// cloooooooooooooooooooooooo 1
  var color1 = ["\x1b[33m", "\x1b[34m", "\x1b[35m", '\x1b[36m', '\x1b[31m', '\x1b[1m'];
  var more1 = color1[Math.floor(Math.random() * color1.length)];
  ////////////// clooooooooooooooooooooooo 2
  var color2 = ["\x1b[34m", "\x1b[33m", "\x1b[31m", '\x1b[1m', '\x1b[34m', '\x1b[36m'];
  var more2 = color2[Math.floor(Math.random() * color2.length)];
  ///////////-----> Log <----------///////////
  console.log('\x1b[32m' + 'Box:' + '\x1b[37m \x1b[' + more1 + '' + nameBox + '\x1b[37m ->\x1b[0m' + '' + '\x1b[37m \x1b[' + more2 + '' + nameUser + '\x1b[37m -> \x1b[0m' + body);
};

module.exports.languages = {
  "vi": { "on": "Bật", "off": "Tắt", "successText": "console thành công", },
  "en": { "on": "on", "off": "off", "successText": "console success!", }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  if ((this.config.credits) != "ManhG") { return api.sendMessage(`⚡Phát hiện credits đã bị thay đổi`, threadID, messageID) }
  const {
    configPath
  } = global.client;
  const {
    DeveloperMode
  } = global.config;
  delete require.cache[require.resolve(configPath)];
  var config = require(configPath);
  const modDev = config.DeveloperMode

  if (modDev == true) {
    api.sendMessage(`🌻DeveloperMode: ${modDev}\n🌻Vui lòng chỉnh về false để sử dụng!!!`, threadID)
  } else
    return api.sendMessage(`🌻DeveloperMode: ${modDev}\n🌻Console đang chạy...`, threadID)
}