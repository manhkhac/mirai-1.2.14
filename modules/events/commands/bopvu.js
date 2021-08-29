module.exports.config = {
    name: "bopvu",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "CatalizCS fix by manhNK",
    description: "",
    commandCategory: "Game",
    usages: "[tag]",
    dependencies: {"path":"", "jimp":""},
    cooldowns: 5
};

module.exports.onLoad = () => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const dirMaterial = __dirname + `/cache/canvas/`;
    if (!fs.existsSync(dirMaterial + "canvas")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "bopvu.png")) request("https://i.imgur.com/fhXXIcT.jpg").pipe(fs.createWriteStream(dirMaterial + "bopvu.png"));
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

module.exports.run = async function ({ event, api, args, client }) {
    const fs = global.nodemodule["fs-extra"];
    let { threadID, messageID, senderID } = event;
    var mention = Object.keys(event.mentions);
    if (!mention) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
    else {
        var one = mention[0];
        return makeImage({ one }).then(path => api.sendMessage({ body: "Ôi....🥰\n" + event.mentions[mention[0]].replace(/@/g, "") +"\nVíu em to quóa 🤫", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
}