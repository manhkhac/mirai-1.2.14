
module.exports.config = {
  name: "trandan",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "manhG",
  description: "Đạo phật của Trần dần",
  commandCategory: "Noprefix",
  usages: "[trandan/amen]",
  cooldowns: 5,
};
module.exports.onLoad = () => {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const dirMaterial = __dirname + `/Noprefix/`;
  if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "amen.jpg")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/img/amen.jpg").pipe(fs.createWriteStream(dirMaterial + "amen.jpg"));
}
module.exports.handleEvent = function ({ api, event }) {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  var { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;

  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var tl = ["Phúc cho những người không nghe thấy mà tin, vô phúc cho những người không nghe thấy mà tin\n -Tiếc diên là năm 2003, tự nhiên tui cầu ở trên nhà ở Phao sần palay, tự nhiên thấy 1 hiện tượng lạ, lúc đó tui mới thấy ủa sao kì vậy, 1 cái hình tượng mà tui là đạo Phật, tui nói quý dị nghe tui là đạo Phật, tự nhiên tui thấy có trái tim màu hồng và có ánh hào quang ra sao, đó là mắt thấy tại nghe chứ không phải là tui nằm chiêm bao,tui dụi mắt thêm 1 lần nữa thì tui thấy ông Chúa Giê Su ổng nói tiếng Việt.\n\nCầu xin thượng đế \nHồn thiên .. sông núi \nCác bật siêu ... nhân \nAMEN \n\nAi mà chửi thề tôi sẽ lóc nha \nCòn những người mà chửi thề \nNếu thích thì dô \nCòn không thích thì dô \n\nNhân danh đạo chúa Jêsu \nAMEN .. AMEN \nTui là đạo phật mà ?","Nhân danh đạo chúa Jêsu \nAMEN .. AMEN \nTui là đạo phật mà ?","Cầu xin thượng đế \nHồn thiên .. sông núi \nCác bật siêu ... nhân \nAMEN \n\nAi mà chửi thề tôi sẽ lóc nha \nCòn những người mà chửi thề \nNếu thích thì dô \nCòn không thích thì dô \n\nNhân danh đạo chúa Jêsu \nAMEN .. AMEN"];
  var rand = tl[Math.floor(Math.random() * tl.length)];
  var msg = {
    body: rand,
    attachment: fs.createReadStream(__dirname + `/Noprefix/amen.jpg`)
  }
  
  // Gọi bot
  var arr = ["trandan","Trandan","Trần dần","trần dần","tran dan","Amen","amen"];
  arr.forEach(i => {
    if (body == i) return out(msg)
  });
}

module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}