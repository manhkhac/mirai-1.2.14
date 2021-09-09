module.exports.config = {
    name: "oidoioi",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Ối dồi ôi",
    commandCategory: "noprefix",
    usages: "",
    cooldowns: 5,
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
    if (!fs.existsSync(dirMaterial + "oidoioi.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/oidoioi.mp4").pipe(fs.createWriteStream(dirMaterial + "oidoioi.mp4"));
}
module.exports.handleEvent = async({ event, api }) => {
    const fs = global.nodemodule["fs-extra"];

    var { threadID, messageID, body, senderID } = event;
    if (senderID == api.getCurrentUserID()) return;

    //trả lời
    var msg = {
            body: `Ối dồi ôi`,
            attachment: fs.createReadStream(__dirname + `/Noprefix/oidoioi.mp4`)
        }
        // Gọi bot
    let arr = ["oidoioi","ối dồi ôi"];
    for (const i of arr) {
        if (body === i.toUpperCase() | body === i) {
            return api.sendMessage(msg, threadID, messageID);
        }
    }
};
module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}