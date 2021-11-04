module.exports.config = {
    name: "choigay",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "VanHung (ManhG fix)",
    description: "",
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
    if (!fs.existsSync(dirMaterial + "gay.png")) request("https://i.imgur.com/PLKSRpp.jpg").pipe(fs.createWriteStream(dirMaterial + "gay.png"));
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    const path = global.nodemodule["path"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let gay_image = await jimp.read(__root + "/gay.png");
    let pathImg = __root + `/gay_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    gay_image.composite(circleOne.resize(200, 200), 90, 587).composite(circleTwo.resize(210, 210), 324, 166);

    let raw = await gay_image.getBufferAsync("image/png");

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

module.exports.run = async function ({ event, api, args, Currencies }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);
    var money = (await Currencies.getData(senderID)).money;
    var one = senderID, two = mention[0];
    if (!two) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
    else if (money < 969) return api.sendMessage("Bạn cần 969 để sử dụng!", threadID, messageID);
    else {
        Currencies.setData(event.senderID, options = { money: money - 969 })
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "Chơi bê đê hông anhhh 😚😚\nĐâm đít cho dễ ỉa nè 💩💩", attachment: fs.createReadStream(path) }, threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 15000), messageID,() => fs.unlinkSync(path), messageID));
    }
}