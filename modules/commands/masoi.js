module.exports.config = {
	name: "masoi",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "ManhG",
	description: "Game Ma sói uwu",
	commandCategory: "game-mp",
	usages: "[create/start/join/info/leave]",
	cooldowns: 1
};


module.exports.run = async ({ api, event, args }) => {
	const { senderID, threadID, messageID } = event;
	
	if (!global.moduleData.masoi) global.moduleData.masoi = new Map();
	var values = global.moduleData.masoi.get(threadID) || {};

	if (args[0] == "create") {
		if (global.moduleData.masoi.has(threadID)) return api.sendMessage("Hiện tại nhóm này đang có game ma sói đang được mở", threadID, messageID);
		//global.moduleData.masoi.set(event.threadID, { "author": event.senderID, "start": 0, "chiabai": 0, "ready": 0, player: [ { "id": senderID, "card1": 0, "card2": 0, "card3": 0, "doibai": 2, "ready": false } ] });
		return api.sendMessage("Game ma sói của bạn đã được tạo thành công!, để tham gia bạn hãy nhập masoi join", threadID, messageID);
	}

	else if (args[0] == "join") {
		if (!values) return api.sendMessage("Hiện tại chưa có game ma sói nào, bạn có thể tạo bằng cách sử dụng masoi create", threadID, messageID);
		if (values.start == 1) return api.sendMessage("Hiện tại game ma sói đã được bắt đầu", threadID, messageID);
		//if (values.player.find(item => item.id == senderID)) return api.sendMessage("Bạn đã tham gia vào game ma sói này!", threadID, messageID);
		global.moduleData.masoi.set(threadID, values);
		return api.sendMessage("Bạn đã tham gia thành công!", threadID, messageID);
	}

	else if (args[0] == "list") {
		if (typeof values.player == "undefined") return api.sendMessage("Hiện tại chưa có game ma sói nào, bạn có thể tạo bằng cách sử dụng masoi create", threadID, messageID);
		return api.sendMessage(
			"=== game ma sói ===" +
			"\n Author: " + values.author +
			"\nTổng số người chơi: " + values.player.length + " Người"
		, threadID, messageID);
	}

	else if (args[0] == "leave") {
		if (typeof values.player == "undefined") return api.sendMessage("Hiện tại chưa có game ma sói nào, bạn có thể tạo bằng cách sử dụng masoi create", threadID, messageID);
		if (!values.player.some(item => item.id == senderID)) return api.sendMessage("Bạn chưa tham gia vào game ma sói trong nhóm này!", threadID, messageID);
		if (values.author == senderID) {
			global.moduleData.masoi.delete(threadID);
			api.sendMessage("Author đã rời khỏi bàn, đồng nghĩa với việc bàn sẽ bị giải tán!", threadID, messageID);
		}
		else {
			values.player.splice(values.player.findIndex(item => item.id === senderID), 1);
			api.sendMessage("Bạn đã rời khỏi game ma sói này!", threadID, messageID);
			global.moduleData.masoi.set(threadID, values);
		}
		return;
	}

	else if (args[0] == "start" && values.author == senderID) {
		if (!values) return api.sendMessage("Hiện tại chưa có game ma sói nào, bạn có thể tạo bằng cách sử dụng masoi create", threadID, messageID);
		if (values.player.length <= 1) return api.sendMessage("Hiện tại không có người chơi nào tham gia, bạn có thể mời người đấy tham gia bằng cách yêu cầu người chơi khác nhập masoi join", threadID, messageID);
		if (values.start == 1) return api.sendMessage("Hiện tại game đã được bắt đầu bởi chủ bàn", threadID, messageID);
		values.start = 1;
		return api.sendMessage("game ma sói của bạn được bắt đầu", threadID, messageID);
	}

	else if (args[0] == "info" && values.author == senderID) {
		if (!values) return api.sendMessage("Hiện tại chưa có game ma sói nào, bạn có thể tạo bằng cách sử dụng masoi create", threadID, messageID);
		if (!values.player.some(item => item.id == event.senderID)) return api.sendMessage("Bạn chưa tham gia vào game ma sói trong nhóm này!", threadID, messageID);
		if (values.player.length <= 1) return api.sendMessage("Hiện tại bàn của bạn không có người chơi nào tham gia, bạn có thể mời người đấy tham gia bằng cách yêu cầu người chơi khác nhập masoi join", threadID, messageID);
		values.player.forEach(info => { return api.sendMessage("Bạn có thấy tin nhắn này?", info.id) });
		return api.sendMessage("Bạn có thấy tin nhắn của bot gửi tới bạn? Nếu không, hãy kiểm tra phần tin nhắn chờ hoặc tin nhắn spam!", threadID, messageID);
	}

	else return global.utils.throwError(this.config.name, threadID, messageID);
}
