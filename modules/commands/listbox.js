module.exports.config = {
    name: 'listbox',
    version: '1.0.0',
    credits: '😂',
    hasPermssion: 2,
    description: 'List thread bot đã tham gia',
    commandCategory: 'Admin',
    usages: '',
    cooldowns: 5
};


module.exports.handleReply = async function({ api, event, args, Threads, handleReply }) {
    if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
    var arg = event.body.split(" ");
    var idgr = handleReply.groupid[arg[1] - 1];
    switch (handleReply.type) {
        case "reply":
            {
                if (arg[0] == "ban" || arg[0] == "Ban") {
                    const data = (await Threads.getData(idgr)).data || {};
                    data.banned = 1;
                    data.dateAdded = time;
                    await Threads.setData(idgr, { data });
                    global.data.threadBanned.set(idgr, { dateAdded: data.dateAdded });
                    api.sendMessage(`[${idgr}] banSuccess!`, event.threadID, event.messageID);
                    break;
                }
                if (arg[0] == "out" || arg[0] == "Out") {
                    api.removeUserFromGroup(`${api.getCurrentUserID()}`, idgr);
                    api.sendMessage("Đã out thread có id: " + idgr + "\n" + (await Threads.getData(idgr)).name, event.threadID, event.messageID);
                    break;
                }
            }
    }
};


module.exports.run = async function({ api, event, args }) {

    switch (args[0]) {
        case "thread1":
        case "-t1":
        case "t1":
            {
                var option = parseInt(args[1] || 11);
                var inbox = await api.getThreadList(option, null, ['INBOX']);
                let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
                var listthread = [];
                /////////

                for (var groupInfo of list) {
                    let data = (await api.getThreadInfo(groupInfo.threadID));

                    listthread.push({
                        id: groupInfo.threadID,
                        name: groupInfo.name,
                        sotv: data.userInfo.length,
                    });

                } //for

                var listbox = listthread.sort((a, b) => {
                    if (a.sotv > b.sotv) return -1;
                    if (a.sotv < b.sotv) return 1;
                });

                let msg = '',
                    i = 1;
                var groupid = [];
                for (var group of listbox) {
                    if (i == option) break;
                    msg += `${i++}. ${group.name}\n🧩TID: ${group.id}\n🐸Thành viên: ${group.sotv}\n\n`;
                    groupid.push(group.id);
                }
                api.sendMessage(msg + 'Reply "out" hoặc "ban" + số thứ tự để out hoặc ban thread đó!!', event.threadID, (e, data) =>
                    global.client.handleReply.push({
                        name: this.config.name,
                        author: event.senderID,
                        messageID: data.messageID,
                        groupid,
                        type: 'reply'
                    })
                );

                break;
            }

        case "thread2":
        case "-t2":
        case "t2":
            {
                var option = parseInt(args[12] || 22);
                var inbox = await api.getThreadList(option, null, ['INBOX']);
                let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
                var listthread = [];
                /////////

                for (var groupInfo of list) {
                    let data = (await api.getThreadInfo(groupInfo.threadID));

                    listthread.push({
                        id: groupInfo.threadID,
                        name: groupInfo.name,
                        sotv: data.userInfo.length,
                    });

                } //for

                var listbox = listthread.sort((a, b) => {
                    if (a.sotv > b.sotv) return -1;
                    if (a.sotv < b.sotv) return 1;
                });

                let msg = '',
                    i = 1;
                var groupid = [];
                for (var group of listbox) {
                    if (i == option) break;
                    msg += `${i++}. ${group.name}\n🧩TID: ${group.id}\n🐸Thành viên: ${group.sotv}\n\n`;
                    groupid.push(group.id);
                }

                api.sendMessage(msg + 'Reply "out" hoặc "ban" + số thứ tự để out hoặc ban thread đó!!', event.threadID, (e, data) =>
                    global.client.handleReply.push({
                        name: this.config.name,
                        author: event.senderID,
                        messageID: data.messageID,
                        groupid,
                        type: 'reply'
                    })
                );

                break;
            }




        default:
            api.sendMessage("Sai cách", event.threadID)
            break;
    }
};