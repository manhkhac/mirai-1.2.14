module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhG",
	description: "Khởi động lại Bot",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	const time = process.uptime();

	return api.sendMessage(`⏳ Em đang khởi động lại...\n${time}`, threadID, () => process.exit(1));
	
}