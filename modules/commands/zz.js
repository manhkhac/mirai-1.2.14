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
     /* var threadList = [];
      var data, msg = "";
      i = 1;
      /////////
      var inbox = await api.getThreadList(150, null, ['PENDING']);
      let list = [...inbox].filter(group => group.name && group.isSubscribed && group.isGroup);

      for (var groupInfo of list) {
        
          threadList.push({
              id: groupInfo
          });
      } 
       console.log(threadList.length);
      */
    const a = global.data.threadBanned;
    const threadBanned = global.data.threadBanned.keys();
     for (const singleThread of threadBanned) {
                    var reason = await global.data.threadBanned.get(singleThread).reason;
                    var date = await global.data.threadBanned.get(singleThread).dateAdded;
                    //const data = (await api.getThreadInfo(singleThread));
                    //const nameT = data.name;
                };
	   console.log(a, reason, date);
  
}
