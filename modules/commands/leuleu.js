/**
 * @author ProCoderMew
 * @warn Do not edit code or edit credits
 */

module.exports.config = {
    name: "leuleu",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "DinhPhuc",
    description: "líu lều ai đó",
    commandCategory: "18+",
    usages: "[tag]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'leuleu.png');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/3qMhKq3.jpg", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let leuleu_img = await jimp.read(__root + "/leuleu.png");
    let pathImg = __root + `/leuleu_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    leuleu_img.resize(500, 500).composite(circleOne.resize(45, 45), 374, 165).composite(circleTwo.resize(85, 85), 158, 127);

    let raw = await leuleu_img.getBufferAsync("image/png");

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
    if (!two) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
    else if (money < 969) return api.sendMessage("Bạn cần 499 để sử dụng!", threadID, messageID);
    else {
        Currencies.setData(event.senderID, options = { money: money - 969 })
        return makeImage({ one, two }).then(path => api.sendMessage({
            body: "Ngoan nào baby... ",
            attachment: fs.createReadStream(path)
        }, threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 20000), messageID, () => fs.unlinkSync(path), messageID));
    }
}