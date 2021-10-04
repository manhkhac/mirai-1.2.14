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

module.exports.run = async function ({ event, api, Users, args, Threads }) {
  var threadList = [];
  var data, msg = "";
  /////////
  try {
    //data = await api.getThreadList(1000, null, ["INBOX"]);
    //data =  Threads.getAll(["threadID"]);
    data = global.data.allThreadID;
    //console.log(data);
  } catch (e) {
    console.log(e);
  }
  for (const thread of data) {

    var nameThread = await global.data.threadInfo.get(thread).threadName || "Tên không tồn tại";
    var idBox = thread;
    
  }
  api.sendMessage(`🎭DS NHÓM [Data]🎭\n\n ${nameThread}\r\n: ${idBox}`, event.threadID, event.messageID)
  
}