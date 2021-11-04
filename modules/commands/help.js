module.exports.config = {
    name: "help",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Các lệnh thường xuyên được sử dụng",
    commandCategory: "General",
    usages: "",
    cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
    const { commands } = global.client;
    if (!event.body) return;
    const { threadID, messageID, body } = event;

    if (body.indexOf("help") != 0) return;
    const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
    if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const command = commands.get(splitBody[1].toLowerCase());

    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    return api.sendMessage(`╭──────╮\n   ${command.config.name}\n╰──────╯\n📜Mô tả: ${command.config.description}\n\n❯📄 Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯🌟 Thuộc nhóm: ${command.config.commandCategory}\n❯⏱ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯👥 Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n❯ Prefix: ${prefix}\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n\n💥Điều hành bởi SuperTeam💥`, threadID, messageID);
};

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const command = commands.get((args[0] || "").toLowerCase());
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    if (!command) {
        const command = commands.values();
        var vip = `🍄➻❥ Đây là 15 lệnh thường hay sử dụng\n-------------------------\n💔Không cần dấu lệnh:\n[hug/kiss/feed/pat/slap/poke] @tag\n[ôm/hôn/hun/đút/mớm/banh họng ra/xoa đầu/tát/vả/chọc] @tag\n-------------------------\n1. Ping: Tag toàn bộ thành viên\n2. Callad: Liên lạc với admin\n3. Xsmb: Xem kqxs miền bắc\n4. Resend: Xem lại tin nhắn bị gỡ\n5. Ghepdoi: Ghép đôi\n6. Baucua: Chơi game bầu cua\n7. Boy: Random ảnh trai\n8. Girl: Random ảnh gái xinh\n9. Taglientuc: Tag liên tục\n10. Trump: Edit cmt ảnh trump\n11. Checktt: Xem số tin nhắn của thành viên\n12. Rank: Random rankcard\n13. Work: Làm việc kiếm tiền\n14. Sing: Nghe nhạc youtube\n15. Random: Random số theo giới hạn max min`;
        return api.sendMessage(vip + "\n\n🎭Sử dụng !menu để xem toàn bộ lệnh trên bot này", event.threadID, event.messageID);
    }
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    return api.sendMessage(`╭──────╮\n   ${command.config.name}\n╰──────╯\n📜Mô tả: ${command.config.description}\n\n❯📄 Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯🌟 Thuộc nhóm: ${command.config.commandCategory}\n❯⏱ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯👥 Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n❯ Prefix: ${prefix}\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n\n💥Điều hành bởi SuperTeam💥`, threadID, messageID);
};