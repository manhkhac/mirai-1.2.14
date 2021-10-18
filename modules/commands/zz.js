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
      var inbox = await api.getThreadList(150, null, ['PENDING']);
      let list = [...inbox].filter(group => group.name && group.isSubscribed && group.isGroup);

     

      for (var groupInfo of list) {
        
          threadList.push({
              id: groupInfo
          });
        
      } 

       console.log(threadList.length);

	   
  
}
