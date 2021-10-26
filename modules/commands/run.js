module.exports.config = {
    name: "run",
    version: "1.0.2",
    hasPermssion: 2,
    credits: "Mirai Team",
    description: "running shell",
    commandCategory: "system",
    usages: "[Script]",
    cooldowns: 5,
    dependencies: {
        "eval": ""
    }
};

module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {
    const eval = require("eval");
    var { threadID, messageID, senderID } = event;
    const listAdmin = global.config.ADMINBOT[0];
    if (senderID != listAdmin) return api.sendMessage("done -_-", threadID, messageID);
    if (args.length == 0) return api.sendMessage(`Thiếu dữ kiện!`, threadID, messageID);

    const out = function(a) {
        if (typeof a === "object" || typeof a === "array") {
            if (Object.keys(a).length != 0) a = JSON.stringify(a, null, 4);
            //else a = "done!";
        }

        if (typeof a === "number") a = a.toString();
        return api.sendMessage(a, threadID, messageID);
    }
    try {
        var botID = global.data.botID;
        var data = global.data;

        const response = await eval(args.join(" "), { out, api, event, args, Threads, Users, Currencies, models, global, data, botID, threadID, messageID, senderID }, true);
        return out(response);
    } catch (e) { return out(e) };
}