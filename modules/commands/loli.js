module.exports.config = {
  name: "loli",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HTHB",
  description: "FBI =))",
  commandCategory: "img",
  usages: "",
  cooldowns: 3
};

module.exports.run = async ({ api, event, Currencies, Users }) => {
  const axios = global.module['axios'];
  const request = global.module['request'];
  const fs = global.module["fs-extra"];
  let name = (await api.getUserInfo(event.senderID))[event.senderID].name;
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
    axios.get('https://www.api-adreno.tk/loli').then(res => {
      let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
      var callback = function () {
        api.sendMessage({
          body: `Bỏ mẹ mày rồi con chó ` + name + ` FBI đến rồi xD`,
          mentions: [{ tag: name, id: event.senderID }],
          attachment: fs.createReadStream(__dirname + `/cache/2.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/2.${ext}`), event.messageID);
      };
      request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/2.${ext}`)).on("close", callback).then(Currencies.setData(event.senderID, options = { money: money - 1000 }));
    })
  } else return api.sendMessage("Bạn cần 1000 đô để xem ảnh ?", event.threadID, event.messageID);
}