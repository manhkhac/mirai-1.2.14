module.exports.config = {
  name: "callad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang, ManhG Fix Get",
  description: "thông báo lỗi của bot đến admin hoặc góp ý",
  commandCategory: "group",
  usages: "[lỗi gặp phải hoặc ý kiến]",
  cooldowns: 5,
};
module.exports.handleReply = async function ({ api, args, event, Users, handleReply }) {
  var name = await Users.getNameUser(event.senderID);
  switch (handleReply.type) {
    case "reply":
      {
        var idad = global.config.ADMINBOT;
        for (let ad of idad) {
          api.sendMessage({
            body: "📩Phản hồi từ " + name + ":\n" + event.body,
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
            type: "calladmin"
          }))
        }
        break;
      }
    case "calladmin":
      {
        api.sendMessage({ body: `📩Phản hồi từ admin đến bạn:\n\n${event.body}\n\n»💬Phản hồi tin nhắn này để tiếp tục gửi báo cáo về admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
          name: this.config.name,
          author: event.senderID,
          messageID: data.messageID,
          type: "reply"
        }), handleReply.messID);
        break;
      }
  }
};

module.exports.run = async function ({ api, event, args, Users, Threads }) {
  var { threadID, messageID, body, senderID } = event; 
  if (!args[0]) return api.sendMessage("Bạn chưa nhập nội dung cần báo cáo",event.threadID,event.messageID);
  const nameT = await global.data.threadInfo.get(event.threadID).threadName || "Tên không tồn tại"; 
  let name = await Users.getNameUser(event.senderID);
  var idUser = event.senderID;
  var idbox = event.threadID;
  //let dataThread = await Threads.getData(event.threadID);
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
  api.sendMessage(
    `Vào lúc: ${gio} \nĐã gửi báo cáo của bạn đến các admin bot`,
    event.threadID,
    () => {
      var idad = global.config.ADMINBOT;
      for (let ad of idad) {
        api.sendMessage(`👤Báo cáo từ: ${name}\n👨‍👩‍👧‍👧Box: ${nameT}\n🔰ID box: ${idbox}\n😜ID Use: ${idUser}\n\n🤷‍♀️Nội dung: ${args.join(
          " "
        )}\n\nTime: ${gio}`,
          ad, (error, info) =>
            global.client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              messID: event.messageID,
              id: idbox,
              type: "calladmin"
            })
        );
      }
    }
  );
};