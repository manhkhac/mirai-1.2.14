module.exports.config = {
    name: "hiepdam",
    version: "2.2.2",
    hasPermssion: 0,
    credits: "MiraiTeam fix by ManhNK",
    description: "",
    commandCategory: "18+",
    usages: "[@tag]",
    cooldowns: 10,
    dependencies: {
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async() => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const dirMaterial = __dirname + `/cache/canvas/`;
    if (!fs.existsSync(dirMaterial + "canvas")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "hiepdam.png")) request("https://i.imgur.com/VrkcjC7.jpg").pipe(fs.createWriteStream(dirMaterial + "hiepdam.png"));
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let hiepdam_image = await jimp.read(__root + "/hiepdam.png");
    let pathImg = __root + `/hiepdam_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));

    hiepdam_image.composite(circleOne.resize(100, 100), 900, 150).composite(circleTwo.resize(250, 250), 171, 187);

    let raw = await hiepdam_image.getBufferAsync("image/png");

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
    var money = data.money;
    const mention = Object.keys(event.mentions);
    var one = senderID,
        two = mention[0];
    if (!two) return api.sendMessage("Vui lòng tag 1 người.", threadID, messageID);
    else if (money < 969) return api.sendMessage("Bạn cần 969 để sử dụng!", threadID, messageID);
    else {
        Currencies.setData(event.senderID, options = { money: money - 969 });
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "Sướng quá ah ah ah...", attachment: fs.createReadStream(path) }, threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 15000), messageID, () => fs.unlinkSync(path), messageID));
    }
}