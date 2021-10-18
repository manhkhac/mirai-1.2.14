module.exports.config = {
    name: "info",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hung cho",
    description: "Xem thông tin của nhóm/người dùng",
    commandCategory: "info",
    usages: "[box/user] @tag hoặc [ID]",
    cooldowns: 3,
    dependencies: {
        "request": "",
        "fs": ""
    }
};

module.exports.run = async({ api, event, args, Users, Threads, Currencies }) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    switch (args[0]) {
        case "thread":
        case "-t":
        case "-b":
        case "box":
            {
                if (args[1]) {
                    let threadInfo = await api.getThreadInfo(args[1]);
                    var dataThread = (await Threads.getData(args[1])).threadInfo;
                    var nameThread = dataThread.threadName || "Tên không tồn tại";
                    let imgg = threadInfo.imageSrc;
                    var gendernam = [];
                    var gendernu = [];
                    for (let z in threadInfo.userInfo) {
                        var gioitinhone = threadInfo.userInfo[z].gender;
                        if (gioitinhone == "MALE") {
                            gendernam.push(gioitinhone)
                        } else {
                            gendernu.push(gioitinhone)
                        }
                    };
                    var nam = gendernam.length;
                    var nu = gendernu.length;
                    let sex = threadInfo.approvalMode;
                    var pd = sex == false ? "tắt" : sex == true ? "bật" : "Kh";
                    if (imgg) {
                        var callback = () => api.sendMessage({ body: `👀 Tên nhóm: ${nameThread}\n🧩 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n🐤 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n👻 ${event.participantIDs.length} thành viên và ${threadInfo.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
                        return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
                    } else { api.sendMessage(`👀 Tên nhóm: ${nameThread}\n🐧 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n💸 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n🤨 Có ${event.participantIDs.length} thành viên và ${dataThread.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, event.threadID, event.messageID) }
                break;
                }

                let threadInfo = await api.getThreadInfo(event.threadID);
                var dataThread = (await Threads.getData(event.threadID)).threadInfo;
                var nameThread = dataThread.threadName || "Tên không tồn tại";
                //console.log(dataThread)
                let img = threadInfo.imageSrc;
                var gendernam = [];
                var gendernu = [];
                for (let z in threadInfo.userInfo) {
                    var gioitinhone = threadInfo.userInfo[z].gender;
                    if (gioitinhone == "MALE") {
                        gendernam.push(gioitinhone)
                    } else {
                        gendernu.push(gioitinhone)
                    }
                };

                var nam = gendernam.length;
                var nu = gendernu.length;
                let sex = threadInfo.approvalMode;
                var pd = sex == false ? "tắt" : sex == true ? "bật" : "Kh";
                if (img) {
                    var callback = () => api.sendMessage({ body: `👀 Tên nhóm: ${nameThread}\n🧩 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n🐤 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n👻 ${threadInfo.participantIDs.length} thành viên và ${threadInfo.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
                    return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
                } else { api.sendMessage(`👀 Tên nhóm: ${nameThread}\n🐧 TID: ${event.threadID}\n🦋 Phê duyệt: ${pd}\n💸 Emoji: ${threadInfo.emoji}\n🍳 Thông tin: \n🤨 Có ${threadInfo.participantIDs.length} thành viên và ${threadInfo.adminIDs.length} quản trị viên.\n🤷‍♀️ Gồm ${nam} nam và ${nu} nữ.\n📩 Tổng số tin nhắn: ${threadInfo.messageCount}.`, event.threadID, event.messageID) }
                break;
            }
        case "-u":
        case "u":
        case "user":
            {
                if (!args[1]) {
                    if (event.type == "message_reply") id = event.messageReply.senderID
                    else id = event.senderID;
                    //let data = await api.getUserInfo(id);
                    var urlfake = "https://facebook.com/"
                    let url = urlfake + `${id}`;
                    //let b = data[id].isFriend == false ? "không !" : data[id].isFriend == true ? "có !" : "Đéo";
                    //let sn = data[id].vanity;
                    let name = await Users.getNameUser(id);
                    var sexrd = ['1', '2'];
                    var sex = sexrd[Math.floor(Math.random() * sexrd.length)];
                    //var sex = await data[id].gender;
                    var gender = sex == 2 ? "Nam" : sex == 1 ? "Nữ" : "Trần Đức Bo";
                    let money = (await Currencies.getData(id)).money;
                    var callback = () => api.sendMessage({ body: `💦Tên: ${name}` + `\n🏝URL cá nhân: ${url}` + `\n🐧UID: ${id}\n🦋Giới tính: ${gender}\n🤑 Số tiền: ${money} đô.`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
                    return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
                } else {

                    if (args.join().indexOf('@') !== -1) {
                        var mentions = Object.keys(event.mentions)
                        var urlfake = "https://facebook.com/"
                        let url = urlfake + `${mentions}`;
                        //let b = data[id].isFriend == false ? "không !" : data[id].isFriend == true ? "có !" : "Đéo";
                        //let sn = data[id].vanity;
                        let name = global.data.userName.get(mentions) || await (await Users.getData(mentions)).name;
                        var sexrd = ['1', '2'];
                        var sex = sexrd[Math.floor(Math.random() * sexrd.length)];
                        //var sex = await data[id].gender;
                        var gender = sex == 2 ? "Nam" : sex == 1 ? "Nữ" : "Trần Đức Bo";
                        let money = (await Currencies.getData(event.mentions)).money;
                        var callback = () => api.sendMessage({ body: `💦Tên: ${name}` + `\n🏝URL cá nhân: ${url}` + `\n🐧UID: ${mentions}\n🦋Giới tính: ${gender}\n🤑 Số tiền: ${money} đô.`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
                        return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
                    } else {

                        var urlfake = "https://facebook.com/"
                        let url = urlfake + `${args[1]}`;
                        //let b = data[id].isFriend == false ? "không !" : data[id].isFriend == true ? "có !" : "Đéo";
                        //let sn = data[id].vanity;
                        let name = await Users.getNameUser(args[1]);
                        var sexrd = ['1', '2'];
                        var sex = sexrd[Math.floor(Math.random() * sexrd.length)];
                        //var sex = await data[id].gender;
                        var gender = sex == 2 ? "Nam" : sex == 1 ? "Nữ" : "Trần Đức Bo";
                         let money = (await Currencies.getData(args[1])).money;
                        var callback = () => api.sendMessage({ body: `💦Tên: ${name}` + `\n🏝URL cá nhân: ${url}` + `\n🐧UID: ${args[1]}\n🦋Giới tính: ${gender}\n🤑 Số tiền: ${money} đô.`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
                        return request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
                    }
                }
            }

        default:
            {
                return api.sendMessage(`Bạn có thể dùng:\n\n${prefix}${this.config.name} user => nó sẽ lấy thông tin của chính bạn.\n\n${prefix}${this.config.name} user @[Tag] => nó sẽ lấy thông tin người bạn tag.\n\n${prefix}${this.config.name} box => nó sẽ lấy thông tin box của bạn (số thành viên, số tin nhắn,...)\n\n${prefix}${this.config.name} user box [uid || tid]`, event.threadID, event.messageID);
            }
    }

}