module.exports.config = {
  name: "fixspam",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Người chửi bot sẽ tự động bị ban khỏi hệ thống <3",
  commandCategory: "noprefix",
  usages: "",
  cooldowns: 0,
  denpendencies: {}
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
            body: "Lời chăng chối từ " + name + ":\n " + event.body,
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
          api.sendMessage({ body: `Admin ❤ ${name} thông tin đến bạn:\n\n${event.body}\n\n»»💬Reply tin nhắn này gửi lời cảm ơn của bạn tới admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
          break;
        }
      }

    case "chuibot":
      {
        api.sendMessage({ body: `Admin ❤ ${name} thông tin đến bạn:\n\n${event.body}\n\n»»💬Reply tin nhắn này để nói lời chăng chối của bạn tới admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
          name: this.config.name,
          author: event.senderID,
          messageID: data.messageID,
          type: "reply"
        }), handleReply.messID);
        break;
      }
  }
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  var { threadID, messageID, body, senderID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
  if (senderID == api.getCurrentUserID()) return;
  let name = await Users.getNameUser(event.senderID);
  var idbox = event.threadID;
  //trả lời
  var msg = {
    body: `»Thông báo từ Admin«\n\n${name}, Bạn thật ngu ngok khi chửi bot vì vậy bot đã tự động ban bạn khỏi hệ thống\n\n💌Liên hệ Admin:\nhttps://facebook.com/100038379006171 \nđể được gỡ ban bạn nhé \n\n🎭Thả tym cho bạn nè <3`
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

      api.sendMessage(msg, threadID, () => {
        var listAdmin = global.config.ADMINBOT;
        for (var idad of listAdmin) {
          api.sendMessage(`=== Bot Notification ===\n\n🆘Tội nhân: ${name}\n🔰Uid: ${uidUser}\n😥Chửi bot: ${i}\n\nĐã bị ban khỏi hệ thống`, idad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                author: senderID,
                messageID: info.messageID,
                messID: messageID,
                id: idbox,
                type: "chuibot"
              })
          );
        }
      });
    }
  });

};
module.exports.run = async ({ event, api }) => {
  return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}