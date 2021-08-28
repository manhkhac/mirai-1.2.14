module.exports.config = {
    name: "huandaoly",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Ko làm mà đòi có ăn có àm ăn đb, ăn cứt",
    commandCategory: "noprefix",
    usages: "huandaoly",
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
    if (!fs.existsSync(dirMaterial + "huandaoly.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/kolammadoicoan.mp4").pipe(fs.createWriteStream(dirMaterial + "huandaoly.mp4"));
}
module.exports.handleEvent = async({ event, api }) => {
    const fs = global.nodemodule["fs-extra"];

    var { threadID, messageID, body, senderID } = event;
    if (senderID == api.getCurrentUserID()) return;

    //trả lời
    var msg = {
            body: `Ăn đb, ăn cứt nhé`,
            attachment: fs.createReadStream(__dirname + `/noprefix/huandaoly.mp4`)
        }
        // Gọi bot
    let arr = ["ăn cứt", "ăn cut", "huấn đạo lý", "huandaoly", "ko làm mà đòi có ăn", "ăn db", "ăn đb", "Ăn db", "Ăn đb", "Ăn cut", "Huandaoly"];
    for (const i of arr) {
        if (body == i && body.length == i.length) {
            return api.sendMessage(msg, threadID, messageID);
        }
    }
};
module.exports.run = async({ event, api }) => {
    return api.sendMessage("Dùng sai cách rồi lêu lêu", event.threadID)
}