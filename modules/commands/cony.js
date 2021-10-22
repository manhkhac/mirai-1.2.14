const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "cony",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "manhIT",
  description: "Tỉ lệ có Ny của bạn trong năm nay",
  commandCategory: "roleplay",
  usages: "cony",
  cooldowns: 0,
  dependencies: []
};

module.exports.onLoad = () => {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const dirMaterial = __dirname + `/cache/`;
  if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "chucmung.gif")) request("https://anhdepfree.com/wp-content/uploads/2020/05/anh-dong-gif-dep-va-de-thuong.gif").pipe(fs.createWriteStream(dirMaterial + "chucmung.gif"));
}

module.exports.run = async function({ api, event, args, Users, Threads, Currencies }) {
  var tl = ['21%', '67%', '19%', '37%', '17%', '96%', '52%', '62%', '76%', '83%', '100%', '99%', "0%", "48%", `1%`, `10%`, `99,9%`];
  var tle = tl[Math.floor(Math.random() * tl.length)];
  let name = await Users.getNameUser(event.senderID);

  var msg = {
    body: `Chúc mừng bạn ${name}.\nBot đã dự đoán tỉ lệ có người yêu của bạn trong năm nay là ${tle} ❤❤`,
    attachment: fs.createReadStream(__dirname + `/cache/chucmung.gif`)
    
  }
  api.sendMessage(msg, event.threadID, event.messageID);
}