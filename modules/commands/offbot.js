module.exports.config = {
  name: "bot",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "manhIT",
  description: "sửa chữa bot ...",
  commandCategory: "system",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  switch (args[0]) {
    case "fix":
    case "fixdup":
      return api.sendMessage(`Repair fix dup done...`, event.threadID, () => api.listenMqtt().stopListening());

    case "stop":
    case "off":
      return api.sendMessage(`Goodbye...\nHẹn gặp lại bạn sau 10 phút nữa!`, event.threadID, () => api.listenMqtt().stopListening());

    case "start":
    case "on":
     return api.sendMessage(`Successful start...\nBạn có thể dùng bot ngay bây giờ`, event.threadID,
      console.log(event);
      break;

    default:
      return api.sendMessage("Syntax error, use : bot  [fixdup/stop/start]", event.threadID);
      break;
  }
}