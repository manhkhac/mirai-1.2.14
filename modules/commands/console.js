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
  const rdThread = name[Math.floor(Math.random() * name.length)];
  var nameBox = dataBox.threadName || rdThread;

  var nameUser = await Users.getNameUser(event.senderID);
  var body = event.body || "Ảnh, video, ký tự đặc biệt";
  ///////////
  console.log('Box: ' + '' + nameBox + '->' + nameUser + '->' + body);
};

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
