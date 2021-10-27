module.exports.config = {
    name: "bot",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "ManhG",
    description: "sửa chữa/bật/tắt bot ...",
    commandCategory: "system",
    usages: "[fix/off/on]",
    cooldowns: 5
};

module.exports.run = async({ api, event, args }) => {
  const time = process.uptime();
    switch (args[0]) {
        case "fix":
        case "fixdup":
            return api.sendMessage(`Repair fix dup done...`, event.threadID, () => api.listenMqtt().stopListening());

        case "restart":
        case "r":
        case "-r":
            return api.sendMessage(`⏳ Em đang khởi động lại...\n${time}`, event.threadID, () => process.exit(1));

        case "stop":
        case "off":
            return api.sendMessage(`Goodbye...\nHẹn gặp lại bạn sau nhé!`, event.threadID, () => () => process.exit(0));

        case "start":
        case "on":
            return api.sendMessage(`Successful start...\nBạn có thể dùng bot ngay bây giờ`, event.threadID);

        default:
            return api.sendMessage("Syntax error, use : bot  [fixdup/stop/start]", event.threadID);
    }
}