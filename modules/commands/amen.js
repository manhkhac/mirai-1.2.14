
module.exports.config = {
  name: "amen",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "manhG",
  description: "Đạo phật của Trần dần",
  commandCategory: "Noprefix",
  usages: "[amen/amen]",
  cooldowns: 5,
};
/*module.exports.onLoad = () => {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const dirMaterial = __dirname + `/Noprefix/`;
  if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "amen.jpg")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/img/amen.jpg").pipe(fs.createWriteStream(dirMaterial + "amen.jpg"));
}*/
module.exports.handleEvent = function ({ api, event }) {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["amen"] !== "undefined" && thread["amen"] == false) return;
  if (senderID == global.data.botID) return;

  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  //trả lời
  var tl = [
  "Phúc cho những người không nghe thấy mà tin, vô phúc cho những người không nghe thấy mà tin\n -Tiếc diên là năm 2003, tự nhiên tui cầu ở trên nhà ở Phao sần palay, tự nhiên thấy 1 hiện tượng lạ, lúc đó tui mới thấy ủa sao kì vậy, 1 cái hình tượng mà tui là đạo Phật, tui nói quý dị nghe tui là đạo Phật, tự nhiên tui thấy có trái tim màu hồng và có ánh hào quang ra sao, đó là mắt thấy tại nghe chứ không phải là tui nằm chiêm bao,tui dụi mắt thêm 1 lần nữa thì tui thấy ông Chúa Giê Su ổng nói tiếng Việt.",
  "Cầu xin thượng đế \nHồn thiên .. sông núi \nCác bật siêu ... nhân \nAMEN \n\nAi mà chửi thề tôi sẽ lóc nha \nCòn những người mà chửi thề \nNếu thích thì dô \nCòn không thích thì dô \n\nNhân danh đạo chúa Jêsu \nAMEN .. AMEN \nTui là đạo phật mà ?",
  "Nhân danh đạo chúa Jêsu \nAMEN .. AMEN \nTui là đạo phật mà ?",
  "Cầu xin thượng đế \nHồn thiên .. sông núi \nCác bật siêu ... nhân \nAMEN \n\nAi mà chửi thề tôi sẽ lóc nha \nCòn những người mà chửi thề \nNếu thích thì dô \nCòn không thích thì dô \n\nNhân danh đạo chúa Jêsu \nAMEN .. AMEN"
  ];
  var rand = tl[Math.floor(Math.random() * tl.length)];
  var msg = {
    body: rand
    //attachment: fs.createReadStream(__dirname + `/Noprefix/amen.jpg`)
  }
  
  // Gọi bot
  var arr = ["amen","trần dần","tran dan"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | str === body | body === i  ) return out(msg)
  });
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "amen thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "amen success!",
  }
}
module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["amen"] == "undefined" || data["amen"] == true) data["amen"] = false;
  else data["amen"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["amen"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}