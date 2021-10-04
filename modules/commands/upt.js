module.exports.config = {
    name: "upt",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Kiểm tra thời gian bot đã online",
    commandCategory: "system",
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async({ api, event }) => {
    const time = process.uptime(),
        hours = Math.floor(time / (60 * 60)),
        minutes = Math.floor((time % (60 * 60)) / 60),
        seconds = Math.floor(time % 60);

    return api.sendMessage(`${hours}:${minutes}:${seconds}`, event.threadID, event.messageID);
}
