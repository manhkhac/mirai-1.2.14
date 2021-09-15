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

module.exports.handleEvent = async ({ event, api, Users }) => {
  var { threadID, messageID, body, senderID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
  if (senderID == api.getCurrentUserID()) return;
  let name = await Users.getNameUser(event.senderID);
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
          api.sendMessage(`=== Bot Notification ===\n\n🆘Tội nhân: ${name}\n🔰Uid: ${uidUser}\n😥Chửi bot: ${i}\n\nĐã bị ban khỏi hệ thống`, idad);
        }
      });
    }
  });

};
module.exports.run = async ({ event, api }) => {
  return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}