module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người rời khỏi nhóm",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};


module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID,senderID } = event;
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đá";
	const path = join(__dirname, "cache", "leaveNoti");
  //random 
  let random = Math.floor(Math.random() *2) + 1;
  var dirNoti = path + "/leave" + random + ".gif";
  var rdNoti = dirNoti.slice(-10);
  if (senderID == api.getCurrentUserID()) return;
  //console.log(rdNoti)
	const gifPath = join(path, rdNoti);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg = "{name} đã {type} khỏi nhóm." : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}

/*module.exports.onLoad = async function () {
  const { resolve } = global.nodemodule["path"];
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { downloadFile } = global.utils;
  const path = resolve(__dirname, "cache/leaveNoti");
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
  if (!existsSync(resolve(__dirname, 'cache/leaveNoti', 'leave1.gif'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/gif/leave.gif", resolve(__dirname, 'cache/leaveNoti', 'leave1.gif'));
  if (!existsSync(resolve(__dirname, 'cache/leaveNoti', 'leave2.gif'))) await downloadFile("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/gif/byebye.gif", resolve(__dirname, 'cache/leaveNoti', 'leave2.gif'));
}*/