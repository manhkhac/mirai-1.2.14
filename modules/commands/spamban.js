module.exports.config = {
  name: "spamban",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang",
  description: "tự động cấm người dùng nếu spam bot 6 lần/60s bản ko reply",
  commandCategory: "system",
  usages: "x",
  cooldowns: 5
};


module.exports.run = ({ api, event, args, Users, Threads }) => {
  return api.sendMessage("Tự động cấm người dùng nếu spam bot 6 lần/1 phút", event.threadID, event.messageID);
};

module.exports.handleEvent = async function ({ api, event, args, Users, Threads }) {
  let { senderID, messageID, threadID } = event;
  if (!global.client.autoban) global.client.autoban = {};
  /////////////////////////   manhG start
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  //////////////////////////  manhG end
  if (!global.client.autoban[senderID]) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  };

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const idbox = event.threadID;
  var threadInfo = dataThread.threadInfo;
  /////////////////////////   manhG start
  //var prefix = data.PREFIX;
  //prefix == null ? prefix = `${prefixDefaut}` : prefix = `${prefix}`;
  //if (data.PREFIX == null) prefix = `${prefixDefaut}`
  //else prefix = `${data.PREFIX}`;
  //////////////////////////  manhG end
  //console.log(prefix);
  //if (typeof(prefix) == 'undefined') {
    //var prefix = data.PREFIX || prefixDefaut;
    //console.log(prefix);
  if (!event.body || event.body.indexOf(prefix) != 0) return;
  //}
  if ((global.client.autoban[senderID].timeStart + 60000) <= Date.now()) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  } else {
    global.client.autoban[senderID].number++;
    if (global.client.autoban[senderID].number >= 6) {

      const moment = require("moment-timezone");
      const timeDate = moment.tz("Asia/Ho_Chi_minh").format("DD/MM/YYYY HH:mm:ss");
      let dataUser = await Users.getData(senderID) || {};
      let data = dataUser.data || {};
      if (data && data.banned == true) return;
      var reason = "spam bot 6 lần/1 phút";
      data.banned = true;
      data.reason = reason || null;
      data.dateAdded = timeDate;
      await Users.setData(senderID, { data });
      global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
      global.client.autoban[senderID] = {
        timeStart: Date.now(),
        number: 0
      };
      return api.sendMessage(
        `🍄 Người dùng đã bị ban 🍄\n\n🍳Tên: ${dataUser.name}\n🔰ID: ${senderID}\n⚡Lý do: ${reason}\n\nQTV callad để gỡ ban(kèm uid)\n💌Liên hệ Admin:\n1. https://fb.com/100038379006171\n2. https://fb.com/maithanh.dora.7545`, threadID, messageID)
    }
  }
};