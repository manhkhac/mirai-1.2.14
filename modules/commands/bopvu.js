module.exports.config = {
    name: "bopvu",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "CatalizCS",
    description: "",
    commandCategory: "18+",
    usages: "[tag]",
    dependencies: { "path": "", "jimp": "" },
    cooldowns: 5
};

module.exports.onLoad = () => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const dirMaterial = __dirname + `/cache/canvas/`;
    if (!fs.existsSync(dirMaterial + "canvas")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "bopvu.png")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/img/bopvu.jpg").pipe(fs.createWriteStream(dirMaterial + "bopvu.png"));
}

async function makeImage({ one }) {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    const path = global.nodemodule["path"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let bopvu_image = await jimp.read(__root + "/bopvu.png");
    let pathImg = __root + `/bopvu_${one}.png`;
    let avatarOne = __root + `/avt_${one}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));


    let circleOne = await jimp.read(await circle(avatarOne));
    bopvu_image.composite(circleOne.resize(160, 160), 215, 72);

    let raw = await bopvu_image.getBufferAsync("image/png");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);

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
    var money = data.money;
    const mention = Object.keys(event.mentions);
    one = mention[0];
    if (!one) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
    else if (money < 499) return api.sendMessage("Bạn đéo đủ tiền.", threadID, messageID);
    else {
        Currencies.setData(event.senderID, options = { money: money - 499 })
        return makeImage({ one }).then(path => api.sendMessage({ body: "Ôi....🥰\n\nVíu em to quóa 🤫 ", attachment: fs.createReadStream(path) }, threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 15000), messageID, () => fs.unlinkSync(path), messageID));
    }
}