module.exports.config = {
    name: "chuibot",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Chửi Bot Version 4",
    commandCategory: "Noprefix",
    usages: "",
    cooldowns: 2,
    dependencies: ""
};

module.exports.handleReply = async function({ api, args, Users, event, handleReply }) {
    var name = await Users.getNameUser(event.senderID);
    switch (handleReply.type) {
        case "reply":
            {
                var idad = global.config.ADMINBOT;
                for (let ad of idad) {
                    api.sendMessage({
                        body: "📄Lời chăng chối từ " + name + ":\n " + event.body,
                        mentions: [{
                            id: event.senderID,
                            tag: name
                        }]
                    }, ad, (e, data) => global.client.handleReply.push({
                        name: this.config.name,
                        messageID: data.messageID,
                        messID: event.messageID,
                        author: event.senderID,
                        id: event.threadID,
                        type: "calladmin"
                    }))
                }
                break;
            }
        case "calladmin":
            {
                api.sendMessage({ body: `Admin ❤ ${name} thông tin đến bạn:\n\n${event.body}\n\n»»💬Reply tin nhắn này để nói lời chăng chối cuối cùng tới admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
                    name: this.config.name,
                    author: event.senderID,
                    messageID: data.messageID,
                    type: "reply"
                }), handleReply.messID);
                break;
            }
    }
};

module.exports.handleEvent = async({ event, api, Users, Threads }) => {
    const moment = require("moment-timezone");
    var time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
    let name = await Users.getNameUser(event.senderID);
    var idbox = event.threadID;
    let uidUser = event.senderID;
    //var datathread = await api.getThreadInfo(event.threadID);
    //var namethread = datathread.name;
    let dataThread = await Threads.getData(event.threadID);
    let threadInfo = dataThread.threadInfo;
    let nameT = threadInfo.threadName;
    const listAdmin = global.config.ADMINBOT;

    var msg = `Chào , ${name}. \n- Bạn đã chửi bot vào ${time}.\n- Tin nhắn này đã được gửi về cho admin.\n- Thêm lần nữa ăn ban bạn nhé :)))`;
    var arr = ["Bot ngu", "bot ngu", "bot oc", "dm bot", "Dm bot", "Đm bot", "bot nhu lon", "Bot nhu lon", "bot như cc", "Bot như cc", "Đmm bot", "đb bot", "bot điên", "Bot điên", "bot dở", "Bot dở", "Bot khùng", "bot khùng", "đĩ bot", "Đĩ bot", "Bot paylac rồi", "con bot lòn", "Con bot lòn", "cmm bot", "Cmm bot", "Clap bot", "bot như cc", "Bot như cc", "bot óc chó", "Bot óc chó", "cc bot", "Cc bot", "mạnh ngu", "Mạnh ngu"];

    for (const i of arr) {
        if (event.body == i && event.body.length == i.length) {
            api.sendMessage(msg, event.threadID, () => {
                var idad = listAdmin;
                for (var idad of listAdmin) {
                    api.sendMessage(`👥Tên Box: ${nameT}\n⛔ ID box: ${idbox}\n🆘 Tên tội nhân: ${name} \n👤 ID tội nhân: ${uidUser}\n🕒 Vào thời gian: ${time}\n❌ Chửi bot: ${i}`,
                        idad, (error, info) =>
                        global.client.handleReply.push({
                            name: this.config.name,
                            author: event.senderID,
                            messageID: info.messageID,
                            messID: event.messageID,
                            id: idbox,
                            type: "calladmin"
                        })
                    );
                }
            });
        }
    }
};

module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}