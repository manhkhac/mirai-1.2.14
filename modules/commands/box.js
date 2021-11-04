module.exports.config = {
  name: "box",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "HungCho (Khánh Milo Fix)",
  description: "Các cài đặt của nhóm chat.",
  commandCategory: "group",
  usages: "[id/name/setname/emoji/admin/image/info]",
  cooldowns: 1,
  dependencies: {
    "request": "",
    "fs-extra": ""
  }
};

module.exports.run = async ({ api, event, args, Threads }) => {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  if (args.length == 0) return api.sendMessage(`Bạn có thể dùng:\nbox emoji [icon]\n\nbox name [tên box cần đổi]\n\nbox image [rep một ảnh bất kì cần đặt thành ảnh box]\n\nbox admin [tag] => nó sẽ đưa qtv cho người được tag\n\nbox info => Toàn bộ thông tin của nhóm !
`, event.threadID, event.messageID);

  if (args[0] == "id") {
    return api.sendMessage(`${event.threadID}`, event.threadID, event.messageID);
  }

  if (args[0] == "name") {
    var nameThread = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;
    return api.sendMessage(nameThread, event.threadID, event.messageID);
  }

  if (args[0] == "setname") {
    var content = args.join(" ");
    var c = content.slice(7, 99) || event.messageReply.body;
    api.setTitle(`${c} `, event.threadID);
  }

  if (args[0] == "emoji") {
    const name = args[1] || event.messageReply.body;
    api.changeThreadEmoji(name, event.threadID)

  }

  if (args[0] == "me") {
    if (args[1] == "admin") {
      const threadInfo = await api.getThreadInfo(event.threadID)
      const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
      if (!find) api.sendMessage("BOT cần ném quản trị viên để dùng ?", event.threadID, event.messageID)
      else if (!global.config.ADMINBOT.includes(event.senderID)) api.sendMessage("Quyền hạn lồn ?", event.threadID, event.messageID)
      else api.changeAdminStatus(event.threadID, event.senderID, true);
    }
  }

  if (args[0] == "admin") {
    if (args.join().indexOf('@') !== -1) {
      namee = Object.keys(event.mentions)
    }
    else namee = args[1]
    if (event.messageReply) { namee = event.messageReply.senderID }

    const threadInfo = await api.getThreadInfo(event.threadID)
    const findd = threadInfo.adminIDs.find(el => el.id == namee);
    const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
    const finddd = threadInfo.adminIDs.find(el => el.id == event.senderID);

    if (!finddd) return api.sendMessage("Mày đéo phải quản trị viên box ?", event.threadID, event.messageID);
    if (!find) { api.sendMessage("Không ném quản trị viên dùng con cặc ?", event.threadID, event.messageID) }
    if (!findd) { api.changeAdminStatus(event.threadID, namee, true); }
    else api.changeAdminStatus(event.threadID, namee, false)
  }

  if (args[0] == "image") {
    if (event.type !== "message_reply") return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
    if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
    if (event.messageReply.attachments.length > 1) return api.sendMessage(`Vui lòng reply chỉ một audio, video, ảnh!`, event.threadID, event.messageID);
    var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/cache/1.png"), event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
    return request(encodeURI(event.messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
  };

  if (args[0] == "info") {
    let threadInfo = await api.getThreadInfo(event.threadID);
    var dataThread = (await Threads.getData(event.threadID)).threadInfo;
    var nameThread = dataThread.threadName || "Tên không tồn tại";
    //console.log(dataThread)
    let img = threadInfo.imageSrc;
    var gendernam = [];
    var gendernu = [];
    for (let z in threadInfo.userInfo) {
      var gioitinhone = threadInfo.userInfo[z].gender;
      if (gioitinhone == "MALE") {
        gendernam.push(gioitinhone)
      } else {
        gendernu.push(gioitinhone)
      }
    };

    var nam = gendernam.length;
    var nu = gendernu.length;
    let sex = threadInfo.approvalMode;
    var pd = sex == false ? "tắt" : sex == true ? "bật" : "Kh";
    if (img) {
      var callback = () => api.sendMessage({ body: `👀 Tên nhóm: ${nameThread}\n🧩 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n🐤 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n👻 ${event.participantIDs.length} thành viên và ${dataThread.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
    } else { api.sendMessage(`👀 Tên nhóm: ${nameThread}\n🐧 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n💸 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n🤨 Có ${event.participantIDs.length} thành viên và ${dataThread.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, event.threadID, event.messageID) }

  }
}