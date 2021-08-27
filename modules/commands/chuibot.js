module.exports.config = {
    name: "chuibot",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "manhG",
    description: "Chửi bot đi",
    commandCategory: "noprefix",
    usages: "Chửi bot đi",
    cooldowns: 0,
    denpendencies: {}
};

module.exports.handleEvent = async({ event, api, Users }) => {
    const moment = require("moment-timezone");
    var time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
    let name = await Users.getNameUser(event.senderID);
    let idBox = `${event.threadID}`;
    let uidUser = `${event.senderID}`;
    var { threadID, messageID, body, senderID } = event;
    const listAdmin = global.config.ADMINBOT;
    if (senderID == api.getCurrentUserID()) return;

    var msg = `Chào , ${name}. \n- Bạn đã chửi bot vào ${time}.\n- Tin nhắn này sẽ được gửi về cho admin. Thêm lần nữa ăn ban nhé bạn.`;

    var arr = ["Bot ngu", "bot ngu", "bot oc", "dm bot", "Dm bot", "Đm bot", "bot nhu lon", "Bot nhu lon", "bot như cc", "Bot như cc", "Đmm bot", "đb bot", "bot điên", "Bot điên", "bot dở", "Bot dở", "Bot khùng", "bot khùng", "đĩ bot", "Đĩ bot", "Bot paylac rồi", "con bot lòn", "Con bot lòn", "cmm bot", "Cmm bot", "Clap bot", "bot như cc", "Bot như cc", "bot óc chó", "Bot óc chó", "cc bot", "Cc bot", "mạnh ngu", "Mạnh ngu"];
    for (const i of arr) {
        if (event.body == i && event.body.length == i.length) {
            api.sendMessage(msg, threadID, messageID);
            var idad = listAdmin;
            for (var idad of listAdmin) {
                return api.sendMessage(`💬 Box ID: ${idBox} \n🆘 Tên tội nhân: ${name} \n👤 ID tội nhân: ${uidUser} \n🕒 Vào thời gian: ${time}\n❌ Chửi bot: ${i} `, idad)
            }
        }
    }
}

module.exports.run = async({ event, api }) => {
    return api.sendMessage("Dùng sai cách rồi lêu lêu", event.threadID)
}