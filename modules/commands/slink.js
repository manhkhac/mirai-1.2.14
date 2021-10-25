module.exports.config = {
	name: "slink",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "ManhG",
	description: "Lấy url rút gọn, download từ video, audio được gửi từ nhóm",
	commandCategory: "other",
	usages: "",
	cooldowns: 5,
	dependencies: {
		"tinyurl": ""
	}
};

module.exports.run = async ({ api, event }) => {
	let { messageReply, threadID } = event;
	if (event.type !== "message_reply") return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
	else {
        let msg = `${messageReply.attachments.length}\n\n`
				var shortLink = await global.nodemodule["tinyurl"].shorten(messageReply.attachments[0].url);
        api.sendMessage(`${shortLink}\n`,threadID);
        }
}