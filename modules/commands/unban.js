module.exports.config = {
  name: "unban",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ManhG",
  description: "Gỡ ban nhóm và người dùng trong 1 nốt nhạc",
  commandCategory: "admin",
  usages: "",
  cooldowns: 2,
  denpendencies: {}
};

module.exports.run = async ({ event, api, Users, Threads, args }) => {
  var { threadID, messageID, senderID } = event;
  
  const { commands } = global.client;
  const command = commands.get(("unban").toLowerCase());
  const credit = command.config.credits;
  var mangG = "ManhG";
  if(credit != mangG) return api.sendMessage(`Sai credit!`, event.threadID, event.messageID);
  
  const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  switch (args[0]) {
    case 'admin':
    case 'ad':
      {
        const listAdmin = global.config.ADMINBOT;
        for (var idad of listAdmin) {
          const data = (await Users.getData(idad)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(idad, { data });
          global.data.userBanned.delete(idad, 1);
        }
        api.sendMessage("Đã gỡ ban cho toàn bộ admin bot!", threadID, messageID)
        break;
      }


    case 'allbox':
    case 'allthread':
      {
        const threadBanned = global.data.threadBanned.keys();
        for (const singleThread of threadBanned) {
          const data = (await Threads.getData(singleThread)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Threads.setData(singleThread, { data });
          global.data.userBanned.delete(singleThread, 1);
        }
        api.sendMessage("Đã gỡ ban cho toàn nhóm trên server", threadID, messageID)
        break;
      }

    case 'box':
    case 'thread':
      {
        var idbox = event.threadID;
        var data = (await Threads.getData(idbox)).data || {};
        data.banned = 0;
        data.reason = null;
        data.dateAdded = null;
        await Threads.setData(idbox, { data });
        global.data.userBanned.delete(idbox, 1);
        api.sendMessage("Đã gỡ ban cho nhóm này!", threadID, messageID)
        break;
      }

    case 'allmember':
    case 'alluser':
      {
        const userBanned = global.data.userBanned.keys();
        for (const singleUser of userBanned) {
          const data = (await Users.getData(singleUser)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(singleUser, { data });
          global.data.userBanned.delete(singleUser, 1);
        }
        api.sendMessage("Đã gỡ ban cho toàn bộ người dùng trên server", threadID, messageID)
        break;
      }

    case 'qtvall':
    case 'Qtvall':
    case 'allqtv':
      {
        var data = [];
        data = await Threads.getAll();

        for (let i = 0; i < data.length; i++) {
          const idAdmins = (data[i].threadInfo).adminIDs;
          for (let i = 0; i < idAdmins.length; i++) {
            const idad = idAdmins[i].id;

            const data = (await Users.getData(idad)).data || {};
            data.banned = 0;
            data.reason = null;
            data.dateAdded = null;
            await Users.setData(idad, { data });
            global.data.userBanned.delete(idad, 1);
          }
        }
        api.sendMessage('Đã gỡ ban cho toàn bộ QTV Box trên sever!', threadID, messageID);
        break;
      }

    case 'qtv':
    case 'Qtv':
      {
        //var threadInfo = await api.getThreadInfo(event.threadID);
        var threadInfo = (await Threads.getData(event.threadID)).threadInfo;
        var listQTV = threadInfo.adminIDs;
        for (let i = 0; i < listQTV.length; i++) {
          const idQtv = listQTV[i].id;
          const data = (await Users.getData(idQtv)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(idQtv, { data });
          global.data.userBanned.delete(idQtv, 1);
        }
        api.sendMessage("Đã gỡ ban cho toàn bộ QTV Box này!", threadID, messageID)
        break;
      }

    case 'member':
    case 'mb':
    case 'user':
      {
        if (!args[1]) {
         // var threadInfo = await api.getThreadInfo(event.threadID);
          //var threadInfo = (await Threads.getData(event.threadID)).threadInfo;
          var listMember = event.participantIDs;
          for (let i = 0; i < listMember.length; i++) {
            const idMember = listMember[i];
            const data = (await Users.getData(idMember)).data || {};
            data.banned = 0;
            data.reason = null;
            data.dateAdded = null;
            await Users.setData(idMember, { data });
            global.data.userBanned.delete(idMember, 1);
          }
          return api.sendMessage("Đã gỡ ban cho toàn bộ thành viên trong nhóm này!", threadID, messageID);
        }
        if (args.join().indexOf('@') !== -1) {
          var mentions = Object.keys(event.mentions)
          var userID = (await Users.getData(mentions)).userID;
          var nameUser = (await Users.getData(mentions)).name;
          const data = (await Users.getData(userID)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(userID, { data });
          global.data.userBanned.delete(userID, 1);
          return api.sendMessage(`${nameUser} đã được gỡ ban!`, threadID, messageID)
        }
        break;
      }

    default:
      api.sendMessage(`Bạn có thể dùng:\n\n${prefix}${this.config.name} admin => gỡ ban cho toàn bộ admin bot\n\n${prefix}${this.config.name} allbox => gỡ ban cho toàn bộ nhóm trên sever\n\n${prefix}${this.config.name} box => gỡ ban cho nhóm hiện tại [1 nhóm ]\n\n${prefix}${this.config.name} alluser => gỡ ban cho toàn bộ người dùng trên sever\n\n${prefix}${this.config.name} allqtv => gỡ ban cho toàn bộ QTV Box trên sever\n\n${prefix}${this.config.name} qtv => gỡ ban cho toàn bộ QTV Box [1 box ]\n\n${prefix}${this.config.name} member => gỡ ban cho toàn bộ thành viên trong nhóm [1 nhóm ]\n\n${prefix}${this.config.name} member @[tag] => gỡ ban cho người được tag`, threadID, messageID);
      break;
  }
}