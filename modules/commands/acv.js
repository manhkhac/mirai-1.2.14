module.exports.config = {
    name: "acv",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "manhG",
    description: "ACV",
    commandCategory: "noprefix",
    usages: "[ACV]",
    cooldowns: 5,
    denpendencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.onLoad = () => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "acv.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/acv.mp4").pipe(fs.createWriteStream(dirMaterial + "acv.mp4"));
}
module.exports.handleEvent = async({ event, api }) => {
    const fs = global.nodemodule["fs-extra"];

    var { threadID, messageID, body, senderID } = event;
    if (senderID == api.getCurrentUserID()) return;

    function out(data) {
        api.sendMessage(data, threadID, messageID)
    }
    //trả lời
    var msg = {
            body: `Mất em rồi anh mới biết bình yên là đâu 😥 `,
            attachment: fs.createReadStream(__dirname + `/noprefix/acv.mp4`)
        }
        // Gọi bot
    var arr = ["Acv", "acv"];
    arr.forEach(i => {
        if (body == i) return out(msg)
    });

};
module.exports.run = async({ event, api }) => {
    return api.sendMessage("Dùng sai cách rồi lêu lêu", event.threadID)
}