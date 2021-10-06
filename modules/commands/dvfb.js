module.exports.config = {
  name: "dvfb",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "manhG",
  description: "Dịch vụ facebook, instagram... uy tín, chất lượng",
  commandCategory: "information",
  usages: "",
  cooldowns: 1,
  dependencies: {}
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage(`\n🍄DỊCH VỤ MXH 🍄\n\n🔰TĂNG LIKE PANPAGE\n🔰TĂNG THEO DÕI\n🔰TĂNG LIKE\n🔰TĂNG COMMENT\n🔰TĂNG MẮT LIVE\n🔰TĂNG FOLLOW, TIM TIKTOK\n🔰THEO DÕI INSTAGRAM\n🛑Kiếm tiền không kiếm chuyện\n📩Contact\n☎SĐT&ZALO: 0865983826\n❄Fb: Fb.com/manhict\n🌐Website:https://subvip48. online`, event.threadID, event.messageID);
}
