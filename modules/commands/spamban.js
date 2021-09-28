module.exports.config = {
  name: "spamban",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang",
  description: "tự động cấm người dùng nếu spam bot 6 lần/60s",
  commandCategory: "system",
  usages: "x",
  cooldowns: 5
};

module.exports.handleReply = async function ({ api, args, Users, event, handleReply }) {
  const { threadID, messageID } = event;
  const { reason } = handleReply;
  var name = await Users.getNameUser(event.senderID);
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
  var arg = event.body.split(" ");
  var uidUser = handleReply.author;
  var nameU = handleReply.nameU;
  //console.log(uidUser, nameU)
  switch (handleReply.type) {
    case "reply":
      {
        var idad = global.config.ADMINBOT;
        for (let ad of idad) {
          api.sendMessage({
            body: "⚡Reply từ " + name + ":\n" + event.body,
            mentions: [{
              id: event.senderID,
              tag: name
            }]
          }, ad, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            messageID: data.messageID,
            messID: event.messageID,
            author: event.senderID,
            id: event.threadID,
            nameU: name,
            type: "banU"
          }))
        }
        break;
      }

    case "banU":
      {
        if (arg[0] == "unban" || arg[0] == "Unban" || arg[0] == "gỡ ban" || arg[0] == "Gỡ ban" || arg[0] == "Đã gỡ ban" || arg[0] == "đã gỡ ban") {

          let data = (await Users.getData(uidUser)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(uidUser, { data });
          global.data.userBanned.delete(uidUser, 1);

          api.sendMessage(`»Thông báo từ Admin ${name}«\n\n ${nameU}\n- Bạn Đã Được Gỡ Ban\n- Có thể sử dụng bot ngay bây giờ`, uidUser, () =>
            api.sendMessage(`${api.getCurrentUserID()}`, () =>
              api.sendMessage(`★★UnBanSuccess★★\n\n🔷${nameU} \n🔰TID:${uidUser} `, threadID)));
        } else {
          api.sendMessage({ body: `🍄Phản hồi từ admin ${name}🍄\n\n${event.body}\n\n»»💬Reply tin nhắn này để trả lời tới admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
          break;
        }
      }

    case "mayspamxem":
      {
        api.sendMessage({ body: `🍄Phản hồi từ admin🍄\n\n${event.body}\n\n»»💬Reply tin nhắn này để trả lời tới admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
          name: this.config.name,
          author: event.senderID,
          messageID: data.messageID,
          type: "reply"
        }), handleReply.messID);
        break;
      }
  }
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
        `🍄 Người dùng đã bị ban 🍄\n\n🍳Tên: ${dataUser.name}\n🔰ID: ${senderID}\n⚡Lý do: ${reason}\n\nQTV callad để gỡ ban(kèm uid)\n💌Liên hệ Admin:\n1. https://fb.com/100038379006171\n2. https://fb.com/maithanh.dora.7545`, threadID,
        () => {
          var idad = global.config.ADMINBOT;
          for (let ad of idad) {
            let namethread = threadInfo.threadName;
            api.sendMessage(`=== Bot Notification ===\n\n🤷‍♀️Người vi phạm: ${dataUser.name}\n⚡ID: ${senderID}\n👨‍👩‍👧‍👧Box: ${namethread}\n🔰ID box: ${idbox}\n🤔Lý do: spam bot 6 lần/1 phút\n\n⏰Time: ${timeDate}`,
              ad, (error, info) =>
                global.client.handleReply.push({
                  name: this.config.name,
                  messageID: info.messageID,
                  author: event.senderID,
                  messID: event.messageID,
                  id: idbox,
                  type: "mayspamxem"
                }));
          }
        }
      )
    }
  }
};