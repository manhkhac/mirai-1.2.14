module.exports.config = {
  name: "sing",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "Phát audio thông qua link YouTube hoặc từ khoá tìm kiếm",
  commandCategory: "media",
  usages: "[searchVideos]",
  cooldowns: 10,
  dependencies: {
    "ytdl-core": "",
    "simple-youtube-api": ""
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const axios = global.nodemodule['axios'];
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const res = await axios.get(`https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/json/sing.json`);
  const length_KEY = res.data.keySing.length
  const randomAPIKEY = res.data.keySing[Math.floor(Math.random() * length_KEY)]
  const { createReadStream, createWriteStream, unlinkSync, statSync } = global.nodemodule["fs-extra"];
  var rqx = event.body;
  function number(x) {
    if (isNaN(x)) {
      return 'Not a Number!';
    }
    return (x < 1 || x > 6);
  }
  if (number(rqx)) return api.sendMessage('Chọn từ 1 -> 6 thôi baby. iu uwu ❤️', event.threadID, event.messageID);
  
  try {
    var options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {
        id: `${handleReply.link[event.body - 1]}`
      },
      headers: {
        'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
        'x-rapidapi-key': `${randomAPIKEY.API_KEY}`
      }
    };
    const data = await axios.request(options);
    var status = data.data.status;
    if(status == "fail") return api.sendMessage('Không thể gửi file này.', event.threadID);
    path1 = __dirname + `/cache/${event.senderID}.m4a`
    const getms = (await axios.get(`${data.data.link}`, {
      responseType: "arraybuffer"
    })).data;
    fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
    api.unsendMessage(handleReply.messageID);
    if (fs.statSync(__dirname + `/cache/${event.senderID}.m4a`).size > 26000000) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID);
    else return api.sendMessage({
      body: `${data.data.title}`,
      attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.m4a`)
    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID)
  } catch {
    return api.sendMessage('Không thể gửi file này!', event.threadID, event.messageID);
  }
}

module.exports.run = async function ({ api, event, args }) {
  const axios = global.nodemodule['axios'];
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const res = await axios.get(`https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/json/sing.json`);
  const length_KEY = res.data.keySing.length
  const randomAPIKEY = res.data.keySing[Math.floor(Math.random() * length_KEY)]
  const ytdl = global.nodemodule["ytdl-core"];
  const YouTubeAPI = global.nodemodule["simple-youtube-api"];
  const {
    createReadStream,
    createWriteStream,
    unlinkSync,
    statSync
  } = global.nodemodule["fs-extra"];
  
  var keyapiYtb = ["AIzaSyB5A3Lum6u5p2Ki2btkGdzvEqtZ8KNLeXo", "AIzaSyAyjwkjc0w61LpOErHY_vFo6Di5LEyfLK0","AIzaSyBY5jfFyaTNtiTSBNCvmyJKpMIGlpCSB4w","AIzaSyCYCg9qpFmJJsEcr61ZLV5KsmgT1RE5aI4"];
  const keyapi = keyapiYtb[Math.floor(Math.random() * keyapiYtb.length)];
  const youtube = new YouTubeAPI(keyapi);
  //console.log(keyapi);
  //const keyapi = global.configModule[this.config.name].YOUTUBE_API;
  if (args.length == 0 || !args) return api.sendMessage('» Phần tìm kiếm không được để trống!', event.threadID, event.messageID);
  const keywordSearch = args.join(" ");
  if (args.join(" ").indexOf("https://") == 0) {
    var url = args.join(" ")
    var urlsplit = url.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/);
    const linkUrlSing = urlsplit[3]
    var options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {
        id: `${linkUrlSing}`
      },
      headers: {
        'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
        'x-rapidapi-key': `${randomAPIKEY.API_KEY}`
      }
    };
    const data = await axios.request(options);
    var status = data.data.status;
    if(status == "fail") return api.sendMessage('Không thể gửi file này.', event.threadID);
    //console.log(status);
    path1 = __dirname + `/cache/${event.senderID}.m4a`
    const getms = (await axios.get(`${data.data.link}`, {
      responseType: "arraybuffer"
    })).data;
    fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
    if (fs.statSync(__dirname + `/cache/${event.senderID}.m4a`).size > 26000000) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID);
    else return api.sendMessage({
      body: `» ${data.data.title}`,
      attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.m4a`)
    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID)
  }
  else {
    try {
      var link = [],
        msg = "",
        num = 0,
        numb = 0;
      var imgthumnail = [];
      var results = await youtube.searchVideos(keywordSearch, 6);
      for (let value of results) {
        if (typeof value.id == 'undefined') return;
        link.push(value.id);
        var idd = value.id;
        let datab = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${value.id}&key=${keyapi}`)).data;
        let gettime = datab.items[0].contentDetails.duration;
        let timeee = (gettime.slice(2));
        let timee = timeee.replace('S', '')
        let time = timee.replace('M', ':')
        let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=${keyapi}`)).data;
        let channel = datac.items[0].snippet.channelTitle;

        num = num += 1;
        if (num == 1) var num1 = "⓵";
        if (num == 2) var num1 = "⓶";
        if (num == 3) var num1 = "⓷";
        if (num == 4) var num1 = "⓸";
        if (num == 5) var num1 = "⓹";
        if (num == 6) var num1 = "⓺";
        msg += (`${num1} 《${time}》 ${value.title}\n\n`);
      }
      var body = `»🔎 Có ${link.length} kết quả trùng với từ khoá tìm kiếm của bạn:\n\n${msg}» Hãy reply(phản hồi theo số thứ tự) chọn một trong những tìm kiếm trên`;
      return api.sendMessage({
        body: body
      }, event.threadID, (error, info) => global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        link
      }),
        event.messageID);
    }
    catch (error) {
      return api.sendMessage("Không thể xử lý request do đã phát sinh lỗi: " + error.message, event.threadID, event.messageID);
    }
  }
}
