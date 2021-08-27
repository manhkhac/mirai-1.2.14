module.exports.config = {
  name: "tagadmin",
  version: "1.0.0-beta-fixbyDungUwU",
  hasPermssion: 0,
  credits: "ZyrosGenZ-fixbyDungUwU",
  description: "Bot sẽ rep ng tag admin hoặc rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 5,
   dependencies: {}
};
module.exports.handleEvent = function({ api, event }) {
  var { threadID, messageID, senderID } = event;
  if(senderID == api.getCurrentUserID()) return;
  const listAdmin = global.config.ADMINBOT;
  var idad = listAdmin;
  if (event.senderID !== `${api.getCurrentUserID()}`) {//id bot
    for (const id of idad) {
    if ( Object.keys(event.mentions) == id) {
        var msg = ["Tag lần nữa bố ban khỏi dùng", " lần nữa tao đấm cho đấy", "Đã bảo đừng tag mà, thích ăn đấm hả😠", "Đĩ mẹ mày thích tag không con chó 😏"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, threadID, messageID);
    }
    }}
};
module.exports.run = function({ api, event}) {
  return api.sendMessage("Dùng sai cách rồi lêu lêu", event.threadID)
}