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
            body: "Phản hồi từ " + name + ":\n" + event.body,
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
        api.sendMessage({ body: `📩Phản hồi từ admin đến bạn:\n--------\n${event.body}\n--------\n»💬Phản hồi tin nhắn này để tiếp tục gửi báo cáo về admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
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
  function _0x1d0c(){const _0x335c75=['440SfRpRl','sendMessag','credits','console','2136514vttvpg','12739905GCmnUn','11708gJpomO','284627JGUXVU','1OdqxlU','666UmqsqQ','config','NTKhang,\x20M','Thay\x20credi','get',',\x20đmm','threadID','17113572JJcZrD','toLowerCas','messageID','8mRnfWw','418550qqGZGz','ts\x20con\x20cặc','anhG\x20Fix\x20G','4519765IdzbtO','client','36LacMgt'];_0x1d0c=function(){return _0x335c75;};return _0x1d0c();}const _0x2c2f25=_0x131c;(function(_0x205672,_0x1c32c4){const _0x11cb8f=_0x131c,_0x384a17=_0x205672();while(!![]){try{const _0x5661d3=parseInt(_0x11cb8f(0x1d3))/(-0x5c*0x45+0x543*-0x1+0x1e10)*(parseInt(_0x11cb8f(0x1cf))/(-0x1*0x2133+-0xa27*-0x1+0xb87*0x2))+parseInt(_0x11cb8f(0x1d4))/(0x810+0x8*0xde+-0x3*0x4ff)*(-parseInt(_0x11cb8f(0x1d1))/(-0x201+-0x2*-0xa63+-0x12c1))+-parseInt(_0x11cb8f(0x1c8))/(0x100a*0x1+-0x723+-0x8e2)+-parseInt(_0x11cb8f(0x1ca))/(-0x6da*0x4+-0x2361+-0x1*-0x3ecf)*(parseInt(_0x11cb8f(0x1d2))/(0x1*0x1a2c+-0x1bf*-0x12+-0x3993))+parseInt(_0x11cb8f(0x1de))/(0x161c+-0x17d9+0x1c5)*(parseInt(_0x11cb8f(0x1d0))/(0x1*0x2e7+-0xb12+-0x41a*-0x2))+-parseInt(_0x11cb8f(0x1c5))/(-0x7*0x251+0x1c8f+-0xc4e)*(-parseInt(_0x11cb8f(0x1cb))/(-0x2*-0x1261+-0x21dc+-0x2db))+-parseInt(_0x11cb8f(0x1db))/(-0x10*0x85+-0x1168+0x19c4);if(_0x5661d3===_0x1c32c4)break;else _0x384a17['push'](_0x384a17['shift']());}catch(_0xe59c17){_0x384a17['push'](_0x384a17['shift']());}}}(_0x1d0c,0x27*-0x901+-0x86451+0x180486));const {commands}=global[_0x2c2f25(0x1c9)],command=commands[_0x2c2f25(0x1d8)](_0x2c2f25(0x1ce)[_0x2c2f25(0x1dc)+'e']());var manhG=_0x2c2f25(0x1d6)+_0x2c2f25(0x1c7)+'et';function _0x131c(_0x5981f7,_0x5a07d7){const _0x214882=_0x1d0c();return _0x131c=function(_0x42bf0c,_0x586427){_0x42bf0c=_0x42bf0c-(0x661+0xe0b+-0xbf*0x19);let _0x4af33b=_0x214882[_0x42bf0c];return _0x4af33b;},_0x131c(_0x5981f7,_0x5a07d7);}const credit=command[_0x2c2f25(0x1d5)][_0x2c2f25(0x1cd)];if(credit!=manhG)return api[_0x2c2f25(0x1cc)+'e'](_0x2c2f25(0x1d7)+_0x2c2f25(0x1c6)+_0x2c2f25(0x1d9),event[_0x2c2f25(0x1da)],event[_0x2c2f25(0x1dd)]);

  if (!args[0])
    return api.sendMessage("Bạn chưa nhập nội dung cần báo cáo",event.threadID,event.messageID);
  let name = await Users.getNameUser(event.senderID);
  var idUser = event.senderID;
  var idbox = event.threadID;
  let dataThread = await Threads.getData(event.threadID);
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
  api.sendMessage(
    `Vào lúc: ${gio} \nĐã gửi báo cáo của bạn đến các admin bot`,
    event.threadID,
    () => {
      var idad = global.config.ADMINBOT;
      for (let ad of idad) {
        let nameT = (dataThread.threadInfo).threadName;
        api.sendMessage(`👤Báo cáo từ: ${name}\n👨‍👩‍👧‍👧Box: ${nameT}\n🔰ID box: ${idbox}\n😜ID Use: ${idUser}\n------------\n⚠️Lỗi: ${args.join(
          " "
        )}\n------------\nTime: ${gio}`,
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