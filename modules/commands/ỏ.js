module.exports.config = {
    name: "ỏ",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Ko làm mà đòi có ăn có àm ăn đb, ăn cứt",
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
    const dirMaterial = __dirname + `/cache/Noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "ỏ.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/ỏ.mp4").pipe(fs.createWriteStream(dirMaterial + "ỏ.mp4"));
}
module.exports.handleEvent = async({ event, api }) => {
    const fs = global.nodemodule["fs-extra"];

    var { threadID, messageID, body, senderID } = event;
    if (senderID == api.getCurrentUserID()) return;

    //trả lời
    var msg = {
            body: `Ăn đb, ăn cứt nhé`,
            attachment: fs.createReadStream(__dirname + `/cache/Noprefix/ỏ.mp4`)
        }
        // Gọi bot
    let arr = ["ỏ", "Ỏ"];
    for (const i of arr) {
        if (body == i && body.length == i.length) {
            return api.sendMessage(msg, threadID, messageID);
        }
    }
};
module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}