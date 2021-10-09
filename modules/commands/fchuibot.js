module.exports.config = {
    name: "fchuibot",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "ManhG",
    description: "Người chửi bot sẽ tự động bị ban khỏi hệ thống <3 bản ko reply/send admin",
    commandCategory: "noprefix",
    usages: "",
    cooldowns: 0,
    denpendencies: {}
  };
  
  module.exports.handleEvent = async ({ event, api, Users, Threads }) => {
    var { threadID, messageID, body, senderID, reason } = event;
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
    
      var { threadID, messageID, body, senderID } = event; const thread = global.data.threadData.get(threadID) || {};
      if (typeof thread["fixspam"] !== "undefined" && thread["fixspam"] == false) return;
  
    if (senderID == global.data.botID) return;
    let name = await Users.getNameUser(event.senderID);
    var idbox = event.threadID;
    var threadInfo = (await Threads.getData(threadID)).threadInfo;
    //trả lời
    var msg = {
      body: `» Thông báo từ Admin «\n\n${name}, Bạn thật ngu ngok khi chửi bot vì vậy bot đã tự động ban bạn khỏi hệ thống\n\nThả tym cho bạn nè <3`
    }
    // Gọi bot
    const arr = ["botngu", "bot ngu", "bot gà", "con bot lol", "bot ngu lol", "bot chó", "dm bot", "đm bot", "dmm bot", "dmm bot", "đmm bot", "đb bot", "bot điên", "bot dở", "bot khùng", "đĩ bot", "bot paylac rồi", "con bot lòn", "cmm bot", "clap bot", "bot ncc", "bot oc", "bot óc", "bot óc chó", "cc bot", "bot tiki", "lozz bottt", "lol bot", "loz bot", "lồn bot", "bot lồn", "bot lon", "bot cac", "bot nhu lon", "bot như cc", "bot như bìu", "bot sida", "bot fake", "mạnh ngu", "bot shoppee", "bot đểu", "bot dỡm"];
  
    arr.forEach(i => {
      let str = i[0].toUpperCase() + i.slice(1);
      if (body === i.toUpperCase() | body === i | str === body) {
        const uidUser = event.senderID;
        modules = "chui bot:"
        console.log(name, modules, i);
        const data = Users.getData(uidUser).data || {};
        Users.setData(uidUser, { data });
        data.banned = 1;
        data.reason = i || null;
        data.dateAdded = time;
        global.data.userBanned.set(uidUser, { reason: data.reason, dateAdded: data.dateAdded });
  
        api.sendMessage(msg, threadID);
      }
    });
  
  };
  
  module.exports.languages = {
    "vi": {"on": "Bật","off": "Tắt","successText": "fixspam nhóm này thành công",},
    "en": {"on": "on","off": "off","successText": "fixspam success!",}
  }
  
  module.exports.run = async function ({ api, event, Threads, getText }) {
    const { threadID, messageID } = event;
    let data = (await Threads.getData(threadID)).data;
  
    if (typeof data["fixspam"] == "undefined" || data["fixspam"] == true) data["fixspam"] = false;
    else data["fixspam"] = true;
  
    await Threads.setData(threadID, { data });
    global.data.threadData.set(threadID, data);
    return api.sendMessage(`${(data["fixspam"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
  }