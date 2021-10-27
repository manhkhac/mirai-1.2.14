module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.4",
    credits: "Mirai Team",
    description: "Thông báo bot hoặc người vào nhóm",
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.run = async function({ api, event, Users }) {
    const { join } = global.nodemodule["path"];
    const { threadID, senderID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == global.data.botID)) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "♡ BoT  MạnhG ♡" : global.config.BOTNAME}`, threadID, global.data.botID);
        return api.sendMessage(`🔱🪂Kết nối thành công! \n\n🍓Sử dụng !menu để biết toàn bộ lệnh có mặt trên bot này\n\n🔷🎭Admin điều hành bot:\n Fb.com/ manhict`, threadID);
    } else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
            const thread = global.data.threadData.get(threadID) || {};
            if (typeof thread["joinNoti"] != "undefined" && thread["joinNoti"] == false) return;

            const path = join(__dirname, "cache", "joinNoti");
            const pathRandom = readdirSync(join(__dirname, "cache", "joinNoti"));
            //random 
            if (senderID == global.data.botID) return;
            var randomNoti = `${pathRandom[Math.floor(Math.random() * pathRandom.length)]}`;
            //console.log(randomNoti);

            ///////////////////////////////
            const pathNoti = join(path, randomNoti);

            var mentions = [],
                nameArray = [],
                memLength = [],
                i = 0;
                ///////////////////////////////////
                let type = false;
                const dataAddedParticipants = event.logMessageData.addedParticipants;
                if (dataAddedParticipants.length > 1) type = true;
                //////////////////////////////////

            for (id in dataAddedParticipants) {
                const userName = dataAddedParticipants[id].fullName;
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

            (thread) ? msg = "Welcome aboard {name}.\nChào mừng đã đến với {threadName}.\n{type} là thành viên thứ {soThanhVien} của nhóm 🥳": msg = thread;
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

module.exports.onLoad = async function({ api }) {
    if (!global.data.botID) global.data.botID = api.getCurrentUserID();
    return;
}