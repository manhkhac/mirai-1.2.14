module.exports.config = {
    name: "chuilt",
    version: "1.0.3",
    hasPermssion: 1,
    credits: "ManhG demo NTKhang",
    description: "Tag liên tục người bạn tag trong nhiều lần\nCó thể gọi là gọi hồn người đó",
    commandCategory: "General",
    usages: "@mention",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event }) {
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn gọi hồn", event.threadID);
    if (global.client.chuilt == true) return api.sendMessage("Hệ thống đang xử lý yêu cầu từ box khác, vui lòng quay lại sau", event.threadID, event.messageID);
    global.client.chuilt = true;
    //let name = (await Users.getData(mention)).name;
    let name = event.mentions[mention];
    console.log("Chuilt: ",name)
    var arraytag = [];
    arraytag.push({ id: mention, tag: name });
    var a = function(a) { api.sendMessage(a, event.threadID) }
    a("Bắt đầu chửi !");
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 3000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 5000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 7000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 9000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 12000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 15000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 17000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 20000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 23000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 25000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 28500);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 31000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 36000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 39000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 40000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 65000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 70000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 75000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 80000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 85000);
    setTimeout(() => { a("Tao mệt rồi đéo chửi nữa") }, 90000);
    setTimeout(() => { a({ body: "Chóa" + " " + name, mentions: arraytag }) }, 95000);
    setTimeout(() => { a({ body: "Cảm ơn bạn đã nghe mình chửi nha" + " " + name, mentions: arraytag }) }, 100000);
    setTimeout(() => { a({ body: "Xin chào và hẹn gặp lại bạn ở chương trình lần sau nha" + " " + name, mentions: arraytag }) }, 105000);
    setTimeout(() => { a("Chào tạm biệt 🥺"); global.client.chuilt = false}, 110000);
    

}