module.exports.config = {
  name: "checktt",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Kiểm tra lượt tương tác trong nhóm",
  commandCategory: "general",
  usages: "[page/all/tag]",
  cooldowns: 5,
  envConfig: {
    "maxColumn": 300
  }
};

module.exports.languages = {
  "vi": {
    "all": "%1. %2 với %3 tin nhắn\n",
    "mention": "%1 đứng hạng %2 với %3 tin nhắn",
    "myself": "Bạn đang đứng hạng %1 với %2 tin nhắn"
  },
  "en": {
    "all": "%1/ %2 with %3 messages\n",
    "mention": "%1 on top %2 with %3 messages",
    "myself": "You are on top %1 with %2 messages "
  }
}

module.exports.run = async function ({ args, api, event, Currencies, getText, Users, Threads }) {
  var mention = Object.keys(event.mentions);
  try {
    //const data = await api.getThreadInfo(event.threadID);
    var { participantIDs } = (await Threads.getData(event.threadID)).threadInfo;
    const listUserID = await event.participantIDs;
    var id = listUserID;

    switch (args[0]) {
      case "all": {
          storage = [],
          exp = [];
          for (const value of listUserID) storage.push({ "id": value, "name": await global.data.userName.get(value) || await Users.getNameUser(value) });
          for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({ "name": user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp });
          }
          exp.sort(function (a, b) { return b.exp - a.exp });

          var page = 1;
          page = parseInt(args[0]) || 1;
          page < -1 ? page = 1 : "";
          var limit = 300;
          var msg = "🎭Độ tương tác trong box🎭\n\n";
          var numPage = Math.ceil(exp.length / limit);

          for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
            if (i >= exp.length) break;
            let infoUser = exp[i];
            msg += `${i + 1}. ${infoUser.name}: ${infoUser.exp} tin nhắn\n`
          }

          msg += `--Trang ${page}/${numPage}--\nDùng ${global.config.PREFIX}checktt all + số trang`
          return api.sendMessage(msg, event.threadID);
      }

      default: {
        if(event.type == "message_reply") { mention[0] = event.messageReply.senderID }
        if (mention[0]) {
          var storage = [],
            exp = [];
          for (const value of listUserID) storage.push({ "id": value, "name": global.data.userName.get(value) || await Users.getNameUser(value) });

          for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({ "name": user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": user.id });
          }
          exp.sort(function (a, b) { return b.exp - a.exp });
          const rank = exp.findIndex(info => parseInt(info.uid) == parseInt(mention[0])) + 1;
          const infoUser = exp[rank - 1];
          return api.sendMessage(getText("mention", infoUser.name, rank, infoUser.exp), event.threadID);
        }
        else if (args[0]) {
          var number = 0,
            storage = [],
            exp = [];
          for (const value of listUserID) storage.push({ "id": value, "name": global.data.userName.get(value) || await Users.getNameUser(value) });
          for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({ "name": user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp });
          }
          exp.sort(function (a, b) { return b.exp - a.exp });

          var page = 1;
          page = parseInt(args[0]) || 1;
          page < -1 ? page = 1 : "";
          var limit = 15;
          var msg = "🎭Độ tương tác trong box🎭\n\n";
          var numPage = Math.ceil(exp.length / limit);

          for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
            if (i >= exp.length) break;
            let infoUser = exp[i];
            msg += `${i + 1}. ${infoUser.name}: ${infoUser.exp} tin nhắn\n`
          }

          msg += `--Trang ${page}/${numPage}--\nDùng ${global.config.PREFIX}checktt + số trang/all`
          return api.sendMessage(msg, event.threadID);
        }
        else {
          var storage = [],
            exp = [];
          for (const value of listUserID) storage.push({ "id": value, "name": global.data.userName.get(value) || await Users.getNameUser(value) });
          for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({ "name": user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": user.id });
          }
          exp.sort(function (a, b) { return b.exp - a.exp });
          const rank = exp.findIndex(info => parseInt(info.uid) == parseInt(event.senderID)) + 1;
          const infoUser = exp[rank - 1];
          return api.sendMessage(getText("myself", rank, infoUser.exp), event.threadID);
        }
      }
    }
  } catch (e) { return console.log(e) }
}
