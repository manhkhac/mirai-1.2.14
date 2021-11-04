module.exports.config = {
    name: "fuck",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng 🥀",
    description: "Địt người bạn tag",
    commandCategory: "18+",
    usages: "[tag người bạn cần địt]",
    cooldowns: 10,
    dependencies: {
        "request": "",
        "fs": ""
    }
};

module.exports.run = function({ api, event, args, Currencies }) {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    var data = await Currencies.getData(event.senderID);
    var money = data.money;
    var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
    if (!args.join(" ")) return out("Bạn chưa nhập tin nhắn");
    else if (money < 969) return out("Bạn cần 969 để sử dụng!");
    else
        Currencies.setData(event.senderID, options = { money: money - 969 })
        return request('https://nekos.life/api/v2/img/classic', (err, response, body) => {
            let picData = JSON.parse(body);
            var mention = Object.keys(event.mentions)[0];
            let getURL = picData.url;
            let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
            let tag = event.mentions[mention].replace("@", "");
            let callback = function() {
                api.sendMessage({
                    body: tag + " Bị Anh Địt Đã Lồn Không Em 🥀",
                    mentions: [{
                        tag: tag,
                        id: Object.keys(event.mentions)[0]
                    }],
                    attachment: fs.createReadStream(__dirname + `/cache/1.${ext}`)
                }, event.threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 10000), event.messageID, () => fs.unlinkSync(__dirname + `/cache/1.${ext}`), event.messageID);
            };
            request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/1.${ext}`)).on("close", callback);
        });
}