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

module.exports.run = async ({ api, event }) => {
  const time = process.uptime(),
    days = Math.floor(time / (3600 * 24)),
    hours = Math.floor(time % (3600 * 24) / 3600),
    minutes = Math.floor((time / 60) % 60),
    seconds = Math.floor(time % 60);

  return api.sendMessage([days, hours, minutes, seconds].map(v => (v < 10 ? "0" + v : v)).filter((v, i) => v !== "00" || i > 0).join(":"), event.threadID, event.messageID);
}