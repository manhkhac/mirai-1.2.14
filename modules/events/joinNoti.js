module.exports.config = {
    name: "join",
    eventType: ["log:subscribe"],
    version: "1.0.4",
    credits: "Mirai Team",
    description: "Thông báo bot hoặc người vào nhóm",
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.onLoad = async function() {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const path = resolve(__dirname, "cache/joinNoti");
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join2.mp4'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/join.mp4", resolve(__dirname, 'cache/joinNoti', 'join2.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join1.mp4'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/joinNoti.mp4", resolve(__dirname, 'cache/joinNoti', 'join1.mp4'));

}

module.exports.run = async function({ api, event, Users }) {
    const fs = global.nodemodule["fs-extra"];
    const { join, path } = global.nodemodule["path"];
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "♡ BoT  MạnhG ♡" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        return api.sendMessage(`🔱🪂Kết nối thành công! \n\n🍓Sử dụng !menu để biết toàn bộ lệnh có mặt trên bot này\n\n🔷🎭Admin điều hành BOT:\n https://www.facebook.com/100038379006171`, threadID);
    } else {
        try {
            const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);

            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinNoti");
            //random 
            let random = Math.floor(Math.random() * 2) + 1;
            var dirMp4 = path + "/join" + random + ".mp4";
            var rdMp4 = dirMp4.slice(-9);
            console.log(rdMp4)

            const pathNoti = join(path, rdMp4);

            var mentions = [],
                nameArray = [],
                memLength = [],
                i = 0;
            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);

                if (!global.data.allUserID.includes(id)) {
                    await Users.createData(id, { name: userName, data: {} });
                    global.data.userName.set(id, userName);
                    global.data.allUserID.push(id);
                }
            }
            memLength.sort((a, b) => a - b);

            (typeof threadData.customJoin == "undefined") ? msg = "Welcome aboard {name}.\nChào mừng đã đến với {threadName}.\n{type} là thành viên thứ {soThanhVien} của nhóm 🥳": msg = threadData.customJoin;
            msg = msg
                .replace(/\{name}/g, nameArray.join(', '))
                .replace(/\{type}/g, (memLength.length > 1) ? 'các bạn' : 'bạn')
                .replace(/\{soThanhVien}/g, memLength.join(', '))
                .replace(/\{threadName}/g, threadName);

            if (existsSync(path)) mkdirSync(path, { recursive: true });

            if (existsSync(pathNoti)) formPush = { body: msg, attachment: createReadStream(pathNoti), mentions }
            else formPush = { body: msg, mentions }

            return api.sendMessage(formPush, threadID);
        } catch (e) { return console.log(e) };
    }
}