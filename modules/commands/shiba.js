module.exports.config = {
  name: "shiba",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG", //Giữ Credit tôn trọng thằng làm ra
  description: "request ảnh",
  commandCategory: "animals",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "axios": "",
  }
};
module.exports.run = async function ({ event, api, args }) {
  const { threadID, messageID } = event;

  var reply = {
    body: "",
    attachment: (await global.nodemodule["axios"]({
      url: (await global.nodemodule["axios"]('https://shiba.demngayyeu.repl.co')).data.data, 
      method: "GET",
      responseType: "stream"
    })).data

  }
  return api.sendMessage(reply, threadID, messageID);
}