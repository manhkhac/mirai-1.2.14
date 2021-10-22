module.exports.config = {
    name: "taglt",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "ManhG",
    description: "Tag liên tục người bạn tag trong nhiều lần\nCó thể gọi là gọi hồn người đó",
    commandCategory: "general",
    usages: "@mention",
    cooldowns: 5,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event }) {
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn gọi hồn", event.threadID);
    if (global.client.taglt == true) return api.sendMessage("Hệ thống đang xử lý yêu cầu từ box khác, vui lòng quay lại sau", event.threadID, event.messageID);
        global.client.taglt = true;
    //let name = (await Users.getData(mention)).name;
    let name = event.mentions[mention];
    console.log("Taglt: ",name)
    var arraytag = [];
    arraytag.push({ id: mention, tag: name });
    var a = function(a) { api.sendMessage(a, event.threadID) }
    a("Bắt đầu gọi hồn!");
    setTimeout(() => { a({ body: "Ôi bạn ôi" + " " + name, mentions: arraytag }) }, 3000);
    setTimeout(() => { a({ body: "Bạn ở đâu" + " " + name, mentions: arraytag }) }, 7000);
    setTimeout(() => { a({ body: "Bạn là nhất" + " " + name, mentions: arraytag }) }, 11000);
    setTimeout(() => { a({ body: "Nhất bạn rồi" + " " + name, mentions: arraytag }) }, 15000);
    setTimeout(() => { a({ body: "Bạn ra đây đi" + " " + name, mentions: arraytag }) }, 20000);
    setTimeout(() => { a({ body: "Bạn ra đây nào" + " " + name, mentions: arraytag }) }, 24000);
    setTimeout(() => { a({ body: "Bạn là siêu nhân" + " " + name, mentions: arraytag }) }, 28000);
    setTimeout(() => { a({ body: "Bạn là đỉnh" + " " + name, mentions: arraytag }) }, 32000);
    setTimeout(() => { a({ body: "Ra đây đây nào bạn ơi" + " " + name, mentions: arraytag }) }, 36000);
    setTimeout(() => { a({ body: "Nhất bạn rồi" + " " + name, mentions: arraytag }) }, 40000);
    setTimeout(() => { a({ body: "Ôi bạn ôi" + " " + name, mentions: arraytag }) }, 44000);
    setTimeout(() => { a({ body: "Bạn ra đây nào" + " " + name, mentions: arraytag }) }, 48000);
    setTimeout(() => { a({ body: "Bạn ra đây đi" + " " + name, mentions: arraytag }) }, 52000);
    setTimeout(() => { a({ body: "Bạn là nhất" + " " + name, mentions: arraytag }) }, 56000);
    setTimeout(() => { a({ body: "Bạn là siêu nhân" + " " + name, mentions: arraytag }) }, 60000);
    setTimeout(() => { a({ body: "Bạn là đỉnh" + " " + name, mentions: arraytag }) }, 64000);
    setTimeout(() => { a({ body: "Bạn là hàng hiệu" + " " + name, mentions: arraytag }) }, 67000);
    setTimeout(() => { a({ body: "Bạn ra đây đi nào" + " " + name, mentions: arraytag }) }, 69000);
    setTimeout(() => { a({ body: "Bạn ôi" + " " + name, mentions: arraytag }) }, 71000);
    setTimeout(() => { 
        a({ body: "😢Ra đây đây chơi nào bạn😢😢😢😢😢" + " " + name, mentions: arraytag });
        global.client.taglt = false;
     }, 73000);

    
}