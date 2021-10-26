module.exports.config = {
  name: "locmem",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "",
  commandCategory: "try it",
  depndencies: {
  },
  usages: "",
  cooldowns: 5
};

module.exports.handleReply = async function ({ api, args, Users, handleReply, event, Threads }) {
  const { threadID, messageID } = event;
  //let name = await Users.getNameUser(event.senderID);
  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;

  switch (handleReply.type) {
    case 'reply':
      {
        var arrnum = event.body.split(" ");
        var i = 1, msg = "";
        var modules = "------- Lọc mem -------\n"
        var nums = arrnum.map(n => parseInt(n));

        ////////////////////////////
        var { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);    
        adminIDs = adminIDs.map(e => e.id).some(e => e == global.data.botID);
        //console.log(adminIDs);
        ////////////////////////////

        //var threadInfo = (await Threads.getData(event.threadID)).threadInfo;
        //var adminIDs = threadInfo.adminIDs;
        //var botID = global.data.botID;
        if (!adminIDs) {return api.sendMessage("Cần cấp quyền quản trị viên cho bot thì mới lọc được.", threadID)}
        for (let num of nums) {
          var uidUser = handleReply.idLoc[num - 1];
          var nameID = handleReply.idName[num - 1];
          //console.log(uidUser, nameID);

          var typef = await api.removeUserFromGroup(parseInt(uidUser), threadID);  
          msg += i++ +'. '+ nameID + '\n🔰uid: ' + uidUser + "\n";
        }
        //console.log(modules,msg);
            api.sendMessage(`🍄 Lọc mấy con lợn(true/false) 🍄\n\n${msg}`, event.threadID, () =>
              api.unsendMessage(handleReply.messageID));
      } break;
  }
};

module.exports.run = async function ({ api, event, args, Users, Threads, Currencies }) {
    const { threadID, messageID } = event;
    if ((this.config.credits) != "ManhG") { return api.sendMessage(`⚡️Phát hiện credits đã bị thay đổi`, event.threadID, event.messageID)}
    var allMem, die=[], userLoc=[],idLoc=[],idName=[];
    i=1,j=1;
    ///////// ///////// ///////// /////////
    allMem = event.participantIDs;
    ///////// ///////// ///////// /////////
    
    for (let i of allMem) {
    let gov = await global.data.userName.get(i);
    //console.log(gov);
    
    if (gov == "Người dùng Facebook") die.push(`${j++}. ${i}\n`);
    ///////// ///////// ///////// /////////
    }
    //console.log(die);

    /////////////////////////////////////////////

    var number = 0, storage = [], exp = [];
    for (const value of allMem) storage.push({ "id": value, "name": global.data.userName.get(value) || await Users.getNameUser(value) });
    for (const user of storage) {
      const countMess = await Currencies.getData(user.id);
      exp.push({ "idUser": user.id, "name": user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp });
    }
    exp.sort(function (a, b) { return a.exp - b.exp });

    var page = 1;
    page = parseInt(args[0]) || 1;
    page < -1 ? page = 1 : "";
    var limit = 10;
    var msg = `🍄Top seen chùa và ${die.length} người dùng facebook cần phải lọc ngay\n\n`;
    var numPage = Math.ceil(exp.length / limit);

    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
      if (i >= exp.length) break;
      let infoUser = exp[i];
      //msg += `${i++}. ${infoUser.name}: ${infoUser.exp}\n`
      userLoc.push(`${i+1}. ${infoUser.name}: ${infoUser.exp} tin nhắn\n`);
      idLoc.push(`${infoUser.idUser}`);
      idName.push(`${infoUser.name}`);
    }
    //console.log(idLoc);

    msg += `${userLoc.join("")}\n`;

    if (die.length > 0) {msg += `FbuserID:\n${die.join("")}\n`};

    msg += `--Trang ${page}/${numPage}--\nDùng ${global.config.PREFIX}locmem + số trang\n\n`
    //return api.sendMessage(msg, event.threadID);

    return api.sendMessage(msg + '🎭Reply số thứ tự, có thể rep nhiều số, cách nhau bằng dấu cách để lọc con chim lợn đó!', event.threadID, (e, data) =>
          global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            idLoc,
            idName,
            type: 'reply'
          })
        )
        


    /////////////////////////////////////////////

    //if (die.length > 0) return api.sendMessage(`Nhóm bạn đang có ${die.length} người dùng facebook\nGồm: ${die.join("\n")}`, event.threadID, event.messageID);
  
    //return api.sendMessage(die.length != 0 ? api.sendMessage(`🍄Hiện tại nhóm có ${die.length} người dùng facebook\n\n${die.join("\n")}\n\nSử dụng fbuser để lọc`,threadID,messageID) : "Hiện tại không có người dùng facebook!", threadID, messageID);
}
