module.exports.config = {
  name: "zz",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ManhG",
  description: "",
  commandCategory: "random-text",
  depndencies: {
  },
  usages: "",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
	  const { threadID, messageID } = event;
      var threadList = [];
      var data, msg = "";
      i = 1;
      /////////
      try {
		  //var listUserID = event.participantIDs.filter(ID => ID);
        data = global.data.allThreadID;
		
      } catch (e) {
        console.log(e);
      }
      for (const thread of data) {
        var nameThread = await global.data.threadInfo.get(thread).threadName || "Tên không tồn tại";
         threadList.push(`${i++}. ${nameThread} \n🔰UID: ${thread}`);
		  //console.log(`${nameThread}`);
      }
 
	   return api.sendMessage(threadList.length != 0 ? api.sendMessage(`🍄Hiện tại đang có ${threadList.length} nhóm\n\n${threadList.join("\n")}`,
          threadID,
          messageID
        ) : "Hiện tại không có nhóm nào!", threadID, messageID);
  
}
