module.exports.config = {
    name: "loli",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bố Thịnh",
    description: "Ảnh Loli cho mấy thằng ấu dâm",
    commandCategory: "18+",
    usages: "loli",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async({ api, event, Currencies }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];

    var data = await Currencies.getData(event.senderID);
    var money = data.money;
    const mention = Object.keys(event.mentions);
    if (!mention[0]) return api.sendMessage("Vui lòng tag 1 người.", event.threadID, event.messageID);
    else if (money < 969) return api.sendMessage("Bạn cần 969 đô để sử dụng lệnh này!", event.threadID, event.messageID);
    Currencies.setData(event.senderID, options = { money: money - 969 })
    axios.get('https://api.nekos.dev/api/v3/images/nsfw/img/smallboobs_lewd/').then(res => {
        let ext = res.data.data.response.url.substring(res.data.data.response.url.lastIndexOf(".") + 1);
        let callback = function() {
            api.sendMessage({
                body: `Ảnh loli lon to cực múp`,
                attachment: fs.createReadStream(__dirname + `/cache/1.${ext}`)
            }, event.threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 7000), event.messageID, () => fs.unlinkSync(__dirname + `/cache/1.${ext}`), event.messageID);
        };
        request(res.data.data.response.url).pipe(fs.createWriteStream(__dirname + `/cache/1.${ext}`)).on("close", callback);
    })
}