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
  const thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["console"] !== "undefined" && thread["console"] == true) return;
  if (event.senderID == global.data.botID) return;
  var dataBox = global.data.threadInfo.get(event.threadID);
  var name = ["Mark⁡⁠⁢⁡⁠⁢ Zuckerberg", "Priscilla Chan", "Biden", "Putin", "Akihito", "Steve Jobs", "Bill Gates", "Jeff Bezos", "Larry Ellison", "Jack Dorsey", "David Wehner", "Elon Musk", "Mike Schroepfer"];
  const threadName = name[Math.floor(Math.random() * name.length)];
  if (dataBox.threadName == undefined) {
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
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["console"] == "undefined" || data["console"] == true) data["console"] = false;
  else data["console"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["console"] == false) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}