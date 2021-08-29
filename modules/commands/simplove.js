module.exports.config = {
    name: "simplove",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "manhG",
    description: "simp",
    commandCategory: "noprefix",
    usages: "",
    cooldowns: 0,
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
    if (!fs.existsSync(dirMaterial + "simp.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/simp.mp4").pipe(fs.createWriteStream(dirMaterial + "simp.mp4"));
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
            body: `But I Love You ❤ `,
            attachment: fs.createReadStream(__dirname + `/cache/Noprefix/simp.mp4`)
        }
        // Gọi bot
    var arr = ["Simp", "simp"];
    arr.forEach(i => {
        if (body == i) return out(msg)
    });

};
module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}