module.exports.config = {
  name: "console",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "ManhG",
  description: "Bật tắt console từng nhóm",
  commandCategory: "admin",
  depndencies: { "chalk": "" },
  usages: "",
  cooldowns: 2
};

module.exports.handleEvent = async ({ event, api, Users, Threads }) => {
  const chalk = global.nodemodule["chalk"];
  const thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["console"] !== "undefined" && thread["console"] == true) return;
  if (event.senderID == global.data.botID) return;
  if (global.data.botID == event.body) return;
  let dataThread = (await Threads.getData(event.threadID)).threadInfo;
  // if (typeof(threadName) != 'undefined') return;
  if (typeof (nameT) == 'undefined') {
   
    var name = await Users.getNameUser(event.senderID);
    var names = chalk.yellow(name);
    var body = event.body || "Là ảnh, video hoặc ký tự đặc biệt nào đó";
    var red = chalk.red("|");

    setTimeout(function () {
       var nameT = global.data.threadInfo.get(event.threadID).threadName || dataThread.threadName || "Tên không tồn tại";
      var nameBox = chalk.magenta(nameT);
      console.log(chalk.green("BOX:") +""+ nameBox + red + names + red + body)
    }, 30000);
    //console.log(chalk.green("Người dùng: ") + names + red + body)
  }
};

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "console thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "console success!",
  }
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