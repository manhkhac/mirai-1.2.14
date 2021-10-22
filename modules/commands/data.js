module.exports.config = {
  name: "data",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Tìm kiếm thông tin qua id của box hoặc người dùng",
  commandCategory: "Info",
  usages: "[box ID] [user ID]",
  cooldowns: 5,

};
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];

module.exports.run = async ({ event, api, args, Currencies, Users, Threads }) => {
  switch (args[0]) {
    case "thread":
    case "-t":
    case "box":
      {
        let threadInfo = await api.getThreadInfo(args[1]);
        var dataThread = (await Threads.getData(args[1])).threadInfo;
        var nameThread = dataThread.threadName || "Tên không tồn tại";
        let imgg = threadInfo.imageSrc;
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
        if (imgg) {
          var callback = () => api.sendMessage({ body: `👀 Tên nhóm: ${nameThread}\n🧩 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n🐤 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n👻 ${event.participantIDs.length} thành viên và ${dataThread.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
          return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
        } else { api.sendMessage(`👀 Tên nhóm: ${nameThread}\n🐧 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n💸 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n🤨 Có ${event.participantIDs.length} thành viên và ${dataThread.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, event.threadID, event.messageID) }
        break;
      }


    case "-u":
    case "user":
      {
        var user = args[0];
        var idd = args[1];
        let data = await api.getUserInfo(idd);
        let name = data[idd].name;
        let sex = data[idd].gender;
        var gender = sex == 2 ? "Nam" : sex == 1 ? "Nữ" : "Ái";
        let isFriend = data[idd].isFriend == false ? "Chưa kết bạn với BOT" : data[idd].isFriend == true ? "Đã kết bạn với BOT" : "???";
        let vanity = data[idd].vanity;
        let token = data[idd].searchTokens;
        let url = data[idd].profileUrl;
        var callback = () => api.sendMessage({ body: `Tên: ${name} \nUID: ${idd}\nGiới tính: ${gender}\nTình trạng: ${isFriend}\nUrl: ${vanity}\nLink FB: ${url}`, attachment: fs.createReadStream(__dirname + "/cache/2.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2.png"));
        return request(encodeURI(`https://graph.facebook.com/${idd}/picture?width=512&height=512&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(fs.createWriteStream(__dirname + '/cache/2.png')).on('close', () => callback());
      }

    default:
      return api.sendMessage("Syntax error, use : data user/thread [ID]", event.threadID);
  }
}