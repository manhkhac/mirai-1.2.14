module.exports.config = {
    name: "loli",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bố Thịnh",
    description: "Ảnh Loli cho mấy thằng ấu dâm",
    commandCategory: "random-img",
    usages: "loli",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async({ api, event }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    axios.get('https://api.nekos.dev/api/v3/images/nsfw/img/smallboobs_lewd/').then(res => {
        let ext = res.data.data.response.url.substring(res.data.data.response.url.lastIndexOf(".") + 1);
        let callback = function() {
            api.sendMessage({
                body: `Ảnh loli lồn to cực múp`,
                attachment: fs.createReadStream(__dirname + `/cache/wall.${ext}`)
            }, event.threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 15000), event.messageID, () => fs.unlinkSync(__dirname + `/cache/wall.${ext}`), event.messageID);
        };
        request(res.data.data.response.url).pipe(fs.createWriteStream(__dirname + `/cache/wall.${ext}`)).on("close", callback);
    })
}