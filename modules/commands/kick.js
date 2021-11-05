module.exports.config = {
	name: "kick",
	version: "1.0.1", 
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "Xoá người bạn cần xoá khỏi nhóm bằng cách tag",
	commandCategory: "other", 
	usages: "[tag]", 
	cooldowns: 0,
};

module.exports.languages = {
	"vi": {
		"error": "Đã có lỗi xảy ra, vui lòng thử lại sau",
		"needPermssion": "Cần quyền quản trị viên nhóm\nVui lòng thêm và thử lại!",
		"missingTag": "Bạn phải tag người cần kick"
	},
	"en": {
		"error": "Error! An error occurred. Please try again later!",
		"needPermssion": "Need group admin\nPlease add and try again!",
		"missingTag": "You need tag some person to kick"
	}
}

module.exports.run = function({ api, event, getText }) {
	var mention = Object.keys(event.mentions);
	if(event.type == "message_reply") { mention = event.messageReply.senderID }
  
	return api.getThreadInfo(event.threadID, (err, info) => {
		if (err) return api.sendMessage(getText("error"),event.threadID);
		if (!info.adminIDs.some(item => item.id == global.data.botID)) return api.sendMessage(getText("needPermssion"), event.threadID, event.messageID);
		
	if(!mention[0]) return api.sendMessage(getText("missingTag"),event.threadID,event.threadID);
		
		if (info.adminIDs.some(item => item.id == event.senderID)) {
			for (let o in mention) {
				setTimeout(() => {
					api.removeUserFromGroup(mention[o],event.threadID) 
				},3000)
			}
		}
	})
}
