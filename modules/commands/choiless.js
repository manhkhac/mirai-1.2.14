module.exports.config = {
    name: "choiless",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "Dunguwu fix by ManhG",
    description: "Chơi gay với 1 ai đó",
    commandCategory: "18+",
    usages: "[tag]",
    dependencies: {
        "path": "",
        "jimp": ""
    },
    cooldowns: 5
};

module.exports.onLoad = () => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const dirMaterial = __dirname + `/cache/canvas/`;
    if (!fs.existsSync(dirMaterial + "canvas")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "choiless.png")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/img/choiless.jpg").pipe(fs.createWriteStream(dirMaterial + "choiless.png"));
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    const path = global.nodemodule["path"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let choiless_image = await jimp.read(__root + "/choiless.png");
    let pathImg = __root + `/choiless_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    choiless_image.composite(circleOne.resize(50, 50), 220, 50).composite(circleTwo.resize(50, 50), 350, 320);

    let raw = await choiless_image.getBufferAsync("image/png");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);

    return pathImg;
}
async function circle(image) {
    const jimp = global.nodemodule["jimp"];
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function({ event, api, args, Currencies }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    var data = await Currencies.getData(event.senderID);
    var money = data.money
    const mention = Object.keys(event.mentions);
    var one = senderID,
        two = mention[0];
    if (!two) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
    else if (money < 969) return api.sendMessage("Bạn cần 969 để sử dụng!", threadID, messageID);
    else {
        Currencies.setData(event.senderID, options = { money: money - 969 })
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "Kimochiiiiiiiiiii " + event.mentions[mention[0]].replace(/@/g, "") + "\nSướng quúa", attachment: fs.createReadStream(path) }, threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 15000), messageID, () => fs.unlinkSync(path), messageID));
    }
}