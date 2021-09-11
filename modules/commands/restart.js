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
	return api.sendMessage(`⏳ 😇 Em đang khởi động lại. \nXin mời Admin uống chén trà rồi sử dụng tiếp nhé❤️`, threadID, () => process.exit(1));
}