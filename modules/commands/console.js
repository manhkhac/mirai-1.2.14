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
  if (event.senderID == global.data.botID) return;
  var dataBox = global.data.threadInfo.get(event.threadID);
  var name = ["Mark⁡⁠⁢⁡⁠⁢ Zuckerberg", "Priscilla Chan", "Biden", "Putin", "Akihito", "Steve Jobs", "Bill Gates", "Jeff Bezos", "Larry Ellison", "Jack Dorsey", "David Wehner", "Elon Musk", "Mike Schroepfer"];
  const threadName = name[Math.floor(Math.random() * name.length)];
  if (undefined) {
     nameBox = threadName;
  }
  else nameBox = dataBox.threadName;

  var nameUser = await Users.getNameUser(event.senderID);
  var body = event.body || "Ảnh, video, ký tự đặc biệt";
  /////////////
  var color1 = ["\x1b[33m", "\x1b[34m", "\x1b[35m", '\x1b[36m', '\x1b[31m', '\x1b[1m'];
  var more1 = color1[Math.floor(Math.random() * color1.length)];
  //////////////
  var color2 = ["\x1b[34m", "\x1b[33m", "\x1b[31m", '\x1b[1m', '\x1b[34m', '\x1b[36m'];
  var more2 = color2[Math.floor(Math.random() * color2.length)];
  ///////////
  console.log('\x1b[32m' + 'Box:' + '\x1b[37m \x1b[' + more1 + '' + nameBox + '\x1b[37m ->\x1b[0m' + '' + '\x1b[37m \x1b[' + more2 + '' + nameUser + '\x1b[37m -> \x1b[0m' + body);
};

module.exports.languages = {
  "vi": { "on": "Bật", "off": "Tắt", "successText": "console thành công", },
  "en": { "on": "on", "off": "off", "successText": "console success!", }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  if ((this.config.credits) != "ManhG") { return api.sendMessage(`⚡Phát hiện credits đã bị thay đổi`, event.threadID, event.messageID)}
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
        api.sendMessage(`🌻DeveloperMode: ${modDev}\n🌻Vui lòng chỉnh về false để sử dụng!!!`, event.threadID)
    } else
        return api.sendMessage(`🌻DeveloperMode: ${modDev}\n🌻Console đang chạy...`, event.threadID)
}