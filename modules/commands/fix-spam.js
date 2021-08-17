const fs = global.nodemodule['fs-extra'];
module.exports.config = {
  name: "fix-spam",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "manhIT",
  description: "fix-spam chửi bot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;
  var userID = `${event.senderID}`;
 

  if ((event.body.toLowerCase() == "bot ngu") || (event.body.toLowerCase() == "bot như cc") || (event.body.toLowerCase() == "bot nhu cc") || (event.body.toLowerCase() == "bot củ lồn") || (event.body.toLowerCase() == "bot như lon") || (event.body.toLowerCase() == "bot ngu lon") || (event.body.toLowerCase() == "bot này như bìu")) {
    data.banned = 1;
    global.data.userBanned.set(parseInt(userID), 1);
    return out(`Bạn đã bị ban, không thể sử dụng bot!, lý do: chửi bot `)
  };

  if ((event.body.toLowerCase() == "bot lồn") || (event.body.toLowerCase() == "bot lon")) {
    return out("dm con ml rác rưỡi");
  };

  if ((event.body.toLowerCase() == "bot óc chó") || (event.body.toLowerCase() == "bot oc")) {
    return out("óc chó mới chửi bot, cmm súc vật học");
  };

  if ((event.body.toLowerCase() == "bot ơi") || (event.body.toLowerCase() == "bot oi")) {
    return out("Dạ, có em đây, yêu em không mà gọi <3. hmm...");
  };

  if ((event.body.toLowerCase() == "yêu bot") || (event.body.toLowerCase() == "yeu bot")) {
    return out("Hmm... Bot ko biết yêu, yêu admin bot kia kìa :))");
  };

  if ((event.body.toLowerCase() == "yêu anh") || (event.body.toLowerCase() == "yeu anh")) {
    return out("Anh cũng yêu em <3");
  };

  if ((event.body.toLowerCase() == "bot có yêu em không") || (event.body.toLowerCase() == "bot yeu em khong")) {
    return out("Hi, Bot yêu em hơn cả ny em cơ, yêu bot đi <3");
  };
}

module.exports.run = function({ api, event }) { }