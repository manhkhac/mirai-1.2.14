module.exports.config = {
    name: "donate",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Donate cho ADMIN BOT.",
    commandCategory: "information",
    usages: "",
    cooldowns: 1,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};

module.exports.onLoad = () => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const dirMaterial = __dirname + `/Noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "donate.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/gif/donate.gif").pipe(fs.createWriteStream(dirMaterial + "donate.gif"));
    if (!fs.existsSync(dirMaterial + "donate2.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/gif/donate2.gif").pipe(fs.createWriteStream(dirMaterial + "donate2.gif"));
}

module.exports.handleEvent = async({ event, api, Users }) => {
    let name = await Users.getNameUser(event.senderID);
    var { threadID, messageID, body, senderID } = event;
    if (senderID == api.getCurrentUserID()) return;

    function out(data) {
        api.sendMessage(data, threadID, messageID)
    }

    var tl = [`${name}` + " chúc bạn một ngày tốt lành ❤️\n-  \n★😍★Thông Tin Donate Cho Admin BOT★😍★\n🌸ADMIN NAME : ManhG\n👉Biệt Danh: manhG ~~\n🔰 STK: 1. ACB: 1819957 NGUYENKHACMANH\n🔰 STK: 2. MOMO: 0865983826 NGUYENKHACMANH\n🔰 STK: 3. ZALOPAY: 0865983826 NGUYENKHACMANH\nChúc bạn sử dụng vui vẻ <3`"];
    var rand = tl[Math.floor(Math.random() * tl.length)];
    //Random ảnh 
    var images = [
        fs.createReadStream(__dirname + `/Noprefix/donate.gif`),
        fs.createReadStream(__dirname + `/Noprefix/donate2.gif`)
    ];
    var randAtt = images[Math.floor(Math.random() * images.length)];
    //trả lời
    var msg = {
            body: rand,
            attachment: randAtt
        }
        // Gọi bot
    var arr = ["donate", "Donate", "donated ", "Donated ", "donates", "Donates", "Stk", "stk"];
    arr.forEach(i => {
        if (body == i) return out("ok")
    });
};

module.exports.run = ({ event, api }) => {
    api.sendMessage(`
        \n★😍★Thông Tin Donate Cho Admin BOT★😍★
        \n🌸ADMIN NAME : ManhG\n👉Biệt Danh: manhG ~~
        \n🔰 STK: 1. ACB: 1819957 NGUYENKHACMANH
        \n🔰 STK: 2. MOMO: 0865983826 NGUYENKHACMANH
        \n🔰 STK: 3. ZALOPAY: 0865983826 NGUYENKHACMANH
        \nChúc bạn sử dụng vui vẻ <3
        \n===  ManhG  ===`,
        event.threadID, event.messageID);
}