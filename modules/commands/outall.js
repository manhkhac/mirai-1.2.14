module.exports.config = {
    name: "outall",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "manhG",
    description: "out all box",
    commandCategory: "Admin",
    usages: "outall [Text]",
    cooldowns: 5,
};
module.exports.handleReaction = async({ event, api, Users, handleReaction, getText }) => {
    if (parseInt(event.userID) !== parseInt(handleReaction.author)) return;
    const { threadID } = event;
    const { messageID, type } = handleReaction;
    global.client.handleReaction.splice(global.client.handleReaction.findIndex(item => item.messageID == messageID), 1);

    switch (type) {
        case "outall":
            list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ?
                api.removeUserFromGroup(global.data.botID, item.threadID) : '');
            api.sendMessage(' Đã out all box thành công', event.threadID);
            break;

        default:
            break;
    }
}
module.exports.run = async({ api, event, args }) => {
        const { threadID, messageID } = event;
        var list = [];
        list = await api.getThreadList(100, null, ['INBOX']);
        list.push(list);
            return api.sendMessage("Reaction tin nhắn này để xác nhận out all box", threadID, (err, list) => {
                global.client.handleReaction.push({
                    type: "outall",
                    name: this.config.name,
                    messageID: list.messageID,
                    author: event.senderID,
                    list
                });
            }, messageID);
        }