module.exports.config = {
  name: "hololive",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DuyVuong",
  description: "Kho Ảnh của Hà",
  commandCategory: "nsfw",
  usages: "[rushia/pekora/coco/gura/marine]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const request = global.nodemodule["request"];
	const fs = global.nodemodule["fs-extra"];
	const axios = global.nodemodule["axios"];
  const { threadID, messageID } = event;
  var type;
  switch (args[0]) {
    case "":
      type = "rushia";
      break;
    case "pekora":
      type = "pekora";
      break;
    case "coco":
      type = "coco";
      break;
    case "gura":
      type = "gura";
      break;
    case "marine":
      type = "marine";
      break;
    default:
      return api.sendMessage(`Wrong format! Use: hololive [rushia/pekora/coco/gura/marine]`, threadID, messageID);
      break;
  }
  axios.get(`https://img-hololive-api.up.railway.app/${type}`).then(res => {
    let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
    let callback = function() {
      api.sendMessage({
        body: "Holo ;))",
        
        attachment: fs.createReadStream(__dirname + `/cache/${type}.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${type}.${ext}`), event.messageID);
    };
    request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/${type}.${ext}`)).on("close", callback);
  })
}