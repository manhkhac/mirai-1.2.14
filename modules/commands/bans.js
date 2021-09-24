module.exports.config = {
    name: "bans",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "ManhG",
    description: "Cấm người dùng dành riêng cho QTV BOX chat",
    commandCategory: "group",
    usages: "[ID or text] hoặc tag@",
    cooldowns: 5
};

module.exports.languages = {
    "vi": {
        "reason": "Lý do",
        "at": "vào lúc",
        "allCommand": "toàn bộ lệnh",
        "commandList": "những lệnh",
        "banSuccess": "[ Ban User ] Đã xử lý thành công yêu cầu cấm người dùng: %1",
        "banCommandSuccess": "[ banCommand User ] Đã xử lý thành công yêu cầu cấm lệnh đối với người dùng: %1",
        "errorReponse": "%1 Không thể hoàn tất công việc bạn yêu cầu",
        "IDNotFound": "%1 ID người dùng bạn nhập không tồn tại trong cơ sở dữ liệu",
        "existBan": "[ Ban User ] Người dùng %1 đã bị ban từ trước %2 %3",
        "missingCommandInput": "%1 Phần command cần cấm không được để trống!",
        "returnBan": "[ Ban User ] Hiện tại bạn đang yêu cầu cấm người dùng:\n- ID và tên người dùng cần cấm: %1%2\n\n❮ Reaction tin nhắn này để xác thực ❯",
        "returnBanCommand": "[ banCommand User ] Hiện tại bạn đang yêu cầu cấm sử dụng lệnh đối với người dùng:\n - ID và tên người dùng cần cấm: %1\n- Các lệnh cần cấm: %2\n\n❮ Reaction tin nhắn này để xác thực ❯",
        "returnResult": "Đây là kết quả phù hợp: \n",
        "returnNull": "Không tìm thấy kết quả dựa vào tìm kiếm của bạn!",
        "returnList": "[ User List ]\nHiện tại đang có %1 người dùng bị ban, dưới đây là %2 người dùng\n\n%3",
        "returnInfo": "[ Info User ] Đây là một sô thông tin về người dùng bạn cần tìm:\n- ID và tên của người dùng: %1n- Có bị ban?: %2 %3 %4\n- Bị ban lệnh?: %5"
    },
    "en": {
        "reason": "Reason",
        "at": "At",
        "allCommand": "All commands",
        "commandList": "Commands",
        "banSuccess": "[ Ban User ] Banned user: %1",
        "banCommandSuccess": "[ banCommand User ] Banned command with user: %1",
        "errorReponse": "%1 Can't do what you request",
        "IDNotFound": "%1 ID you import doesn't exist in database",
        "existBan": "[ Ban User ] User %1 has been banned before %2 %3",
        "missingCommandInput": "%1 You have to import the command you want to ban!",
        "returnBan": "[ Ban User ] You are requesting to ban user:\n- User ID and name who you want to ban: %1%2\n\n❮ Reaction this message to complete ❯",
        "returnBanCommand": "[ banCommand User ] You are requesting to ban command with user:\n - User ID and name who you want to ban: %1\n- Commands: %2\n\n❮ Reaction this message to complete ❯",
        "returnResult": "This is your result: \n",
        "returnNull": "There is no result with your input!",
        "returnList": "[ User List ]\There are %1 banned user, here are %2 user\n\n%3",
        "returnInfo": "[ Info User ] Here is some information about the user who you want to find:\n- User ID and name: %1n- Banned?: %2 %3 %4\n- Command banned?: %5"
    }
}

module.exports.handleReaction = async({ event, api, Users, handleReaction, getText }) => {
    if (parseInt(event.userID) !== parseInt(handleReaction.author)) return;
    const moment = require("moment-timezone");
    const { threadID } = event;
    const { messageID, type, targetID, reason, nameTarget } = handleReaction;

    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
    global.client.handleReaction.splice(global.client.handleReaction.findIndex(item => item.messageID == messageID), 1);

    switch (type) {
        case "ban":
            {
                try {
                    let data = (await Users.getData(targetID)).data || {};
                    data.banned = true;
                    data.reason = reason || null;
                    data.dateAdded = time;
                    await Users.setData(targetID, { data });
                    global.data.userBanned.set(targetID, { reason: data.reason, dateAdded: data.dateAdded });
                    return api.sendMessage(getText("banSuccess", `${targetID} - ${nameTarget}`), threadID, () => {
                        return api.unsendMessage(messageID);
                    });
                } catch { return api.sendMessage(getText("errorReponse", "[ Ban User ]"), threadID) };
            }
    }
}

module.exports.run = async({ event, api, args, Users, getText }) => {
    const { threadID, messageID } = event;
    var targetID = String(args[0]);
    var reason = (args.slice(2, args.length)).join(" ") || null;

    if (isNaN(targetID)) {
        const mention = Object.keys(event.mentions);
        args = args.join(" ");
        targetID = String(mention[0]);
        reason = (args.slice(args.indexOf(event.mentions[mention[0]]) + (event.mentions[mention[0]] || "").length + 1, args.length)) || null;
    }

    if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ Ban User ]"), threadID, messageID);
    if (global.data.userBanned.has(targetID)) {
        const { reason, dateAdded } = global.data.userBanned.get(targetID) || {};
        return api.sendMessage(getText("existBan", targetID, ((reason) ? `${getText("reason")}: "${reason}"` : ""), ((dateAdded) ? `${getText("at")} ${dateAdded}` : "")), threadID, messageID);
    }
    const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
    return api.sendMessage(getText("returnBan", `${targetID} - ${nameTarget}`, ((reason) ? `\n- ${getText("reason")}: ${reason}` : "")), threadID, (error, info) => {
        global.client.handleReaction.push({
            type: "ban",
            targetID,
            reason,
            nameTarget,
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,

        });
    }, messageID);
}