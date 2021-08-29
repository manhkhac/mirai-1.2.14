module.exports.config = {
    name: "bruh",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "manhG",
    description: "Ảo thật đấy",
    commandCategory: "noprefix",
    usages: "[bủh/bruh]",
    cooldowns: 0,
    denpendencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.onLoad = () => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const dirMaterial = __dirname + `/Noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "bruh.mp3")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp3/bruh.mp3").pipe(fs.createWriteStream(dirMaterial + "bruh.mp3"));
}
module.exports.handleEvent = async({ event, api, Users }) => {
    const fs = global.nodemodule["fs-extra"];

    var { threadID, messageID, body, senderID } = event;
    if (senderID == api.getCurrentUserID()) return;

    function out(data) {
        api.sendMessage(data, threadID, messageID)
    }
    //trả lời
    var msg = {
            body: `bủh ;))`,
            attachment: fs.createReadStream(__dirname + `/Noprefix/bruh.mp3`)
        }
        // Gọi bot
    var arr = ["brủh", "bủh", "bruh", "buh", "Bruh", "Bủh", "Buh"];
    arr.forEach(i => {
        if (body == i) return out(msg)
    });

};
module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}