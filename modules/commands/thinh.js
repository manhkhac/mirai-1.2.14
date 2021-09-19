module.exports.config = {
	name: "thính",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "VĐT&NTH",
	description: "Thả thính",
	commandCategory: "love",
	usages: "thính",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const axios = global.nodemodule["axios"];
const res = await axios.get(`http://le31.glitch.me/poem`);
var thinh = res.data.data;
return api.sendMessage(` ${thinh} `, event.threadID, event.messageID)
}