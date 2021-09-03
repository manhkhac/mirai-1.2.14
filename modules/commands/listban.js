module.exports.config = {
    name: "listban",
    version: "1.0.3",
    hasPermssion: 2,
    credits: "CatalizCS",
    description: "Xem danh sách ban của nhóm hoặc của người dùng",
    commandCategory: "admin",
    usages: "[thread/user]",
    cooldowns: 5
};
module.exports.handleReply = async function({ api, args, Users, handleReply, event, Threads }) {
    const { threadID, messageID } = event;
    if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;
    var myString = handleReply.listBanned[event.body - 1];
    var uidx = myString.replace(/\D/g, '');
    var uid = uidx.slice(1);

    switch (handleReply.type) {

        case "unbanthread":
            {
                const data = (await Threads.getData(uid)).data || {};
                data.banned = 0;
                data.reason = null;
                data.dateAdded = null;
                await Threads.setData(uid, { data });
                global.data.threadBanned.delete(uid, 1);
                //api.sendMessage(`★★UnbanSuccess★★\n\n${myString}`, threadID , () =>  api.unsendMessage(handleReply.messageID));
                return api.sendMessage(`»Thông báo từ Admin«\n\n Nhóm Bạn Đã Được Gỡ Ban`, uid, () =>
                            api.sendMessage(`${api.getCurrentUserID()}`, () =>
                                  api.sendMessage(`★★UnbanSuccess★★\n\n${myString}`, threadID , () => 
                                       api.unsendMessage(handleReply.messageID))));
                break;
            }

        case 'unbanuser':
            {
                const data = (await Users.getData(uid)).data || {};
                data.banned = 0;
                data.reason = null;
                data.dateAdded = null;
                await Users.setData(uid, { data });
                global.data.userBanned.delete(uid, 1);
                //api.sendMessage(`★★UnbanSuccess★★\n\n${myString} `, threadID, () => api.unsendMessage(handleReply.messageID));
                return api.sendMessage(`»Thông báo từ Admin«\n\n Nhóm Bạn Đã Được Gỡ Ban`, uid, () =>
                            api.sendMessage(`${api.getCurrentUserID()}`, () =>
                                  api.sendMessage(`★★UnbanSuccess★★\n\n${myString}`, threadID , () => 
                                       api.unsendMessage(handleReply.messageID))));
                break;
            }

    }
};

module.exports.run = async function({ event, api, Users, args, Threads }) {
    const { threadID, messageID } = event;
    var listBanned = [],
        i = 1;
    var dataThread = [];

    switch (args[0]) {
        case "-t":
        case "t":
        case "thread":
            {
                const threadBanned = global.data.threadBanned.keys();
                console.log(threadBanned)
                for (const singleThread of threadBanned) {
                    dataThread = await Threads.getData(singleThread);
                    let threadInfo = dataThread.threadInfo;
                    let nameT = threadInfo.threadName;
                    console.log(nameT)
                    listBanned.push(`${i++}. ${nameT} \n🔰TID: ${singleThread}`)
                };

                return api.sendMessage(listBanned.length != 0 ? api.sendMessage(`❎Hiện tại đang có ${listBanned.length} nhóm bị ban\n\n${listBanned.join("\n")}` +
                    "\n\nReply tin nhắn này + số thứ tự để unban thread tương ứng",
                    threadID, (error, info) => {
                        client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: 'unbanthread',
                            listBanned
                        });
                    },
                    messageID
                ) : "Hiện tại không có nhóm nào bị ban!", threadID, messageID);
            }

        case "u":
        case "-u":
        case "user":
            {
                const userBanned = global.data.userBanned.keys();
                //console.log(userBanned)
                for (const singleUser of userBanned) {
                    const name = global.data.userName.get(singleUser) || await Users.getNameUser(singleUser);
                    listBanned.push(`${i++}. ${name} \n🔰UID: ${singleUser}`);
                }
                return api.sendMessage(listBanned.length != 0 ? api.sendMessage(`❎Hiện tại đang có ${listBanned.length} người dùng bị ban\n\n${listBanned.join("\n")}` +
                    "\n\nReply tin nhắn này + số thứ tự để unban user tương ứng",
                    threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: 'unbanuser',
                            listBanned
                        });
                    },
                    messageID
                ) : "Hiện tại không có người dùng bị ban", threadID, messageID);
            }

        default:
            {
                return global.utils.throwError(this.config.name, threadID, messageID);
            }
    }
}