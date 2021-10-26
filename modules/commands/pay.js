module.exports.config = {
  name: "pay",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Chuyển tiền cho người khác",
  commandCategory: "economy",
  usages: "[tag người dùng] [Số tiền cần chuyển]",
  cooldowns: 5
};

module.exports.run = async ({ event, api, Currencies, args, Users }) => {
  let { threadID, messageID, senderID } = event;
  if (event.type == "message_reply") {
    mention = event.messageReply.senderID
    var name = (await Users.getData(mention)).name
    if (!isNaN(args[0])) {
      const tiền = parseInt(args[0]);
      let balance = (await Currencies.getData(senderID)).money;
      if (tiền <= 0) return api.sendMessage('Số tiền bạn muốn chuyển không hợp lệ', threadID, messageID);
      if (tiền > balance) return api.sendMessage('Số tiền bạn muốn chuyển lớn hơn số tiền bạn hiện có!', threadID, messageID);
      else {
        return api.sendMessage({ body: `Đã chuyển cho ${name} ${args[0]} tiền` }, threadID, async () => {
          await Currencies.increaseMoney(mention, parseInt(tiền));
          Currencies.decreaseMoney(senderID, parseInt(tiền));
        }, messageID);
      }
    } else return api.sendMessage('Vui lòng nhập số tiền muốn chuyển', threadID, messageID);
  }
  else {
    const mention = Object.keys(event.mentions)[0];
    let name = event.mentions[mention].split(" ").length
    if (!mention) return api.sendMessage('Vui lòng tag người muốn chuyển tiền cho!', threadID, messageID);
    else {
      if (!isNaN(args[0 + name])) {
        const tiền = parseInt(args[0 + name]);
        let balance = (await Currencies.getData(senderID)).money;
        if (tiền <= 0) return api.sendMessage('Số tiền bạn muốn chuyển không hợp lệ', threadID, messageID);
        if (tiền > balance) return api.sendMessage('Số tiền bạn muốn chuyển lớn hơn số tiền bạn hiện có!', threadID, messageID);
        else {
          return api.sendMessage({ body: 'Đã chuyển cho ' + event.mentions[mention].replace(/@/g, "") + ` ${args[0 + name]} tiền` }, threadID, async () => {
            await Currencies.increaseMoney(mention, parseInt(tiền));
            Currencies.decreaseMoney(senderID, parseInt(tiền));
          }, messageID);
        }
      } else return api.sendMessage('Vui lòng nhập số tiền muốn chuyển', threadID, messageID);
    }
  }
}