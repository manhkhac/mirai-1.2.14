module.exports.config = {
  name: "nocache",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "NTKhang",
  description: "Xóa file hoặc folder trong thư mục",
  commandCategory: "Admin",
  usages: "\nnocahe start <text>\nnocahe ext <text>\nnocahe <text>\nnocahe [để trống]\nnocahe help\nNOTE: <text> là ký tự bạn điền vào tùy ý",
  cooldowns: 5
};

module.exports.handleReply = ({ api, event, args, handleReply }) => {
  if (event.senderID != handleReply.author) return;
  const fs = require("fs-extra");
  var arrnum = event.body.split(" ");
  var msg = "";
  var nums = arrnum.map(n => parseInt(n));

  for (let num of nums) {
    var target = handleReply.files[num - 1];
    msg += target + ' ' + "\n";
    api.unsendMessage(handleReply.messageID);
    api.sendMessage("Đã xóa các file sau trong thư mục Noprefix:\n\n" + msg, event.threadID, event.messageID);
    var fileOrdir = fs.statSync(__dirname+'/Noprefix/'+target);

    function delNo() {
      if(fileOrdir.isDirectory() == true) {
    	  var typef = "[Folder🗂️]";
    	  fs.rmdirSync(__dirname+'/Noprefix/'+target, {recursive: true});
    	}
    	else if(fileOrdir.isFile() == true) {
    	  var typef = "[File📄]";
    	  fs.unlinkSync(__dirname+"/Noprefix/"+target);
    	}
    }
    setTimeout(delNo, 1000);
  }
}

module.exports.run = async function ({ api, event, args, Threads }) {

  const fs = require("fs-extra");
  var files = fs.readdirSync(__dirname + "/Noprefix") || [];
  var msg = "", i = 1;
  if (args[0] == 'help') {
    //❎ko edit tên tác giả❎
    var msg = `
  👉Module code by NTKhang👈
Cách dùng lệnh:
•Key: start <text>
•Tác dụng: Lọc ra file cần xóa có ký tự bắt đầu tùy chọn
•Ví dụ: nocahe rank
•Key: ext <text>
•Tác dụng: Lọc ra file cần xóa có đuôi tùy chọn
•Ví dụ: nocahe png
•Key: <text>
•Tác dụng: lọc ra các file trong tên có text tùy chỉnh
•Ví dụ: nocahe a
•Key: để trống
•Tác dụng: lọc ra tất cả các file trong nocahe
•Ví dụ: nocahe
•Key: help
•Tác dụng: xem cách dùng lệnh
•Ví dụ: nocahe help`;

    return api.sendMessage(msg, event.threadID, event.messageID);
  }
  else if (args[0] == "start" && args[1]) {
    var word = args.slice(1).join(" ");
    var files = files.filter(file => file.startsWith(word));

    if (files.length == 0) return api.sendMessage(`Không có file nào trong nocahe có ký tự bắt đầu bằng: ${word}`, event.threadID, event.messageID);
    var key = `Có ${files.length} file có ký tự bắt đầu là: ${word}`;
  }

  //đuôi file là..... 
  else if (args[0] == "ext" && args[1]) {
    var ext = args[1];
    var files = files.filter(file => file.endsWith(ext));

    if (files.length == 0) return api.sendMessage(`Không có file nào trong nocahe có ký tự kết thúc bằng: ${ext}`, event.threadID, event.messageID);
    var key = `Có ${files.length} file có đuôi là: ${ext}`;
  }
  //all file
  else if (!args[0]) {
    if (files.length == 0) return api.sendMessage("nocahe của bạn không có file hoặc folder nào", event.threadID, event.messageID);
    var key = "Tất cả các file trong thư mục Noprefix:";
  }
  //trong tên có ký tự.....
  else {
    var word = args.slice(0).join(" ");
    var files = files.filter(file => file.includes(word));
    if (files.length == 0) return api.sendMessage(`Không có file nào trong tên có ký tự: ${word}`, event.threadID, event.messageID);
    var key = `Có ${files.length} file trong tên có ký tự: ${word}`;
  }

  files.forEach(file => {
    var fileOrdir = fs.statSync(__dirname + '/Noprefix/' + file);
    if (fileOrdir.isDirectory() == true) var typef = "[Folder🗂️]";
    if (fileOrdir.isFile() == true) var typef = "[File📄]";
    msg += (i++) + '. ' + typef + ' ' + file + '\n';
  });

  api.sendMessage(`Reply tin nhắn bằng số để xóa file tương ứng, có thể rep nhiều số, cách nhau bằng dấu cách.\n${key}\n\n` + msg, event.threadID, (e, info) => global.client.handleReply.push({
    name: this.config.name,
    messageID: info.messageID,
    author: event.senderID,
    files
  }))

}