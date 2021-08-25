module.exports.config = {
    name: "fbavt",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "manhIT",
    description: "Xem avatar của người dùng",
    commandCategory: "info",
    usages: "@tag hoặc [ID]",
    cooldowns: 3,
    dependencies: {
        "request": "",
        "fs": ""
    }
};

module.exports.run = async({ api, event, args }) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    switch (args[0]) {
        case "-u":
        case "u":
        case "user":
            {
                if (!args[1]) {
                    if (event.type == "message_reply") id = event.messageReply.senderID;
                    else id = event.senderID;
                    let data = await api.getUserInfo(id);
                    let name = await data[args[1]].name;
                    var callback = () => api.sendMessage({
                        body: `😚Tên: ${name}`,
                        attachment: fs.createReadStream(__dirname + "/cache/1.png")
                    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
                    return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
                } else {

                    if (args.join().indexOf('@') !== -1) {
                        var mentions = Object.keys(event.mentions)
                        let data = await api.getUserInfo(mentions);
                        let name = await data[mentions].name;
                        var callback = () => api.sendMessage({
                            body: `😚Tên: ${name}`,
                            attachment: fs.createReadStream(__dirname + "/cache/1.png")
                        }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
                        return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
                    } else {
                        let data = await api.getUserInfo(args[1]);
                        let name = await data[args[1]].name;
                        var callback = () => api.sendMessage({
                            body: `😚Tên: ${name}`,
                            attachment: fs.createReadStream(__dirname + "/cache/1.png")
                        }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
                        return request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
                    }

                }
            }


        default:
            {
                return api.sendMessage(`Bạn có thể dùng:\n\n${prefix}${this.config.name} user => nó sẽ lấy avatar của chính bạn.\n\n${prefix}${this.config.name} user @[Tag] => nó sẽ lấy avatar người bạn tag.`, event.threadID, event.messageID);
            }
    }

}