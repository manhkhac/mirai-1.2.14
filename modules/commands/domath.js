module.exports.config = {
    name: "domath",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "loi",
    description: "",
    commandCategory: "game-mp",
    usages: "",
    cooldowns: 5,
    dependencies: { "request": "" },
};

module.exports.handleReply = async function({ api, args, Users, handleReply, event, Threads }) {
    if (!event.userID == handleReply.author) return;
    //let response = "";
    if (event.target == handleReply.fetch) api.sendMessage("ye, bạn trả lời đúng rồi đấy xD", event.threadID);
    else api.sendMessage("oops, bạn trả lời sai rồi :X", event.threadID);

};

module.exports.run = async function({ event, api, Users, args }) {
    const { threadID, messageID, senderID } = event;
    const content = args.join();
    let difficulty, answer, value1, value2;
    const difficulties = ['baby', 'easy', 'medium', 'hard', 'extreme', 'impossible'];
    (difficulties.some(item => content == item)) ? difficulty = content: difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const operations = ['+', '-', '*', '/'];
    const maxValues = { baby: 10, easy: 50, medium: 100, hard: 500, extreme: 1000, impossible: Number.MAX_SAFE_INTEGER };
    const operation = operations[Math.floor(Math.random() * operations.length)];
    value1 = Math.floor(Math.random() * maxValues[difficulty] - 1) + 1;
    value2 = Math.floor(Math.random() * maxValues[difficulty] - 1) + 1;
    switch (operation) {
        case '+':
            answer = value1 + value2;
            break;
        case '-':
            answer = value1 - value2;
            break;
        case '*':
            answer = value1 * value2;
            break;
        case '/':
            answer = value1 / value2;
            break;
    }
    let fetch = answer;
    console.log(fetch);

    return api.sendMessage(`⁂➻❥ Bạn có 15 giây để trả lời.\n ${value1} ${operation} ${value2} = ? \n\nReply tin nhắn này + Đáp án để trả lời"`, threadID, (err, info) => {
        global.client.handleReply.push({
            type: "domath",
            messageID: info.messageID,
            target: parseInt(threadID),
            answer,
            answer: fetch,
            author: senderID,
        });

    }, messageID);


}