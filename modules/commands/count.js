module.exports.config = {
  name: "count", // Tên lệnh, được sử dụng trong việc gọi lệnh
  version: "1.0.0", // phiên bản của module này
  hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
  credits: "BerVer", // Công nhận module sở hữu là ai
  description: "Đếm mọi thứ trong box chat", // Thông tin chi tiết về lệnh
  commandCategory: "group", // Thuộc vào nhóm nào
  usages: "count message/admin/member/male/female/gei/allgroup/alluser/boxdata/boxleave", // Cách sử dụng lệnh
  cooldowns: 5,  //Liệt kê các package module ở ngoài tại đây để khi load lệnh nó sẽ tự động cài!
  // Info là phần chi tiết thêm của cách sử dụng lệnh
  // Key: Từ khoá thuộc trong usages
  // prompt: Chi tiết dữ liệu đầu vào của key
  // type: Định dạng dữ liệu đầu vào của key

  envConfig: {
    //Đây là nơi bạn sẽ setup toàn bộ env của module, chẳng hạn APIKEY, ...
  }
};

module.exports.run = async function ({ api, Threads, Users, event, args, client, __GLOBAL }) {
  //Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
  const { threadID, messageID, participantIDs } = event;
  var input = args.join();
  var nameMen = [];
  var gendernam = [];
  var gendernu = [];
  var nope = [];
  let threadInfo = await api.getThreadInfo(threadID);
  for (let z in threadInfo.userInfo) {
    var gioitinhone = threadInfo.userInfo[z].gender;
    if (gioitinhone == "MALE") {
      gendernam.push(gioitinhone)
    } else {
      if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else { nope.push(gioitinhone) }
    }
  }
  ///////////////////////
      var threadList = [];
      var inbox = await api.getThreadList(150, null, ['INBOX']);
      let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

      for (var groupInfo of list) {
          threadList.push({
              id: groupInfo
          });
      } 
  ///////////////////////

  ///////////////////////
      var listLeave = [];
      var inbox = await api.getThreadList(100, null, ['ARCHIVED']);

      for (var groupInfo of inbox) {
          listLeave.push({
              id: groupInfo
          });
      } 
  ///////////////////////

  var threadData = (await Threads.getData(threadID)).threadInfo;
  var out = (msg) => api.sendMessage(msg, threadID, messageID);
  var boxget = await Threads.getAll(['threadID']);
  var userget = await Users.getAll(['userID']);
  if (input == "") { out(`Bạn chưa nhập thẻ, hãy sử dụng các thẻ sau: message/admin/member/male/female/gei/allgroup/alluser/boxdata/boxleave`) }
  if (input == "message") { out(`Nhóm này có ${threadInfo.messageCount} tin nhắn`) }
  if (input == "admin") { out(`Nhóm mày có ${threadData.adminIDs.length} quản tri viên`) }
  if (input == "member") { out(`Nhóm này có ${participantIDs.length} thành viên`) }
  if (input == "male") { out(`Nhóm này có ${gendernam.length} thành viên là nam`) }
  if (input == "female") { out(`Nhóm này có ${gendernu.length} thành viên là nữ`) }
  if (input == "gei") { out(`Nhóm này có ${nope.length} thành viên là Gei`) }
  if (input == "allgroup") { out(`Tổng có ${threadList.length} nhóm chat sử dụng bot`) }
  if (input == "alluser") { out(`Tổng có ${userget.length} người dùng sử dụng bot`) }
  if (input == "boxdata") { out(`Tổng có ${boxget.length} nhóm chat[data] sử dụng bot`) }
  if (input == "boxleave") { out(`Tổng có ${listLeave.length} nhóm đã rời`) }
}
