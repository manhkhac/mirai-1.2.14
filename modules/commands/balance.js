module.exports.config = {
  name: "balance",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Kiểm tra số tiền của bản thân hoặc người được tag",
  commandCategory: "economy",
  usages: "[Tag]",
  cooldowns: 5
};

module.exports.languages = {
  "vi": {
    "sotienbanthan": "Số tiền bạn đang có: %1$",
    "sotiennguoikhac": "Số tiền của %1 hiện đang có là: %2$"
  },
  "en": {
    "sotienbanthan": "Your current balance: %1$",
    "sotiennguoikhac": "%1's current balance: %2$."
  }
}

module.exports.run = async function ({ api, event, args, Currencies, getText }) {
  const { threadID, messageID, senderID, mentions } = event;

  if (event.type == "message_reply") {
    var uid = event.messageReply.senderID;
    var name  = global.data.userName.get(uid);
    var money = (await Currencies.getData(uid)).money;
    if (!money) money = 0;
    return api.sendMessage({
     body: getText("sotiennguoikhac", name, money)
    }, threadID, messageID);
  }
  else if (!args[0]) {
    const money = (await Currencies.getData(senderID)).money;
    return api.sendMessage(getText("sotienbanthan", money), threadID);
  }
  else if (Object.keys(event.mentions).length == 1) {
    var mention = Object.keys(mentions)[0];
    var money = (await Currencies.getData(mention)).money;
    if (!money) money = 0;
    return api.sendMessage({
      body: getText("sotiennguoikhac", mentions[mention].replace("@", ""), money),
      mentions: [{
        tag: mentions[mention].replace("@", ""),
        id: mention
      }]
    }, threadID, messageID);
  }

  else return global.utils.throwError(this.config.name, threadID, messageID);
}
