module.exports.config = {
    name: "tromcho",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "HungCatMoi (ManhG fix)",
    description: "",
    commandCategory: "Game",
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
    if (!fs.existsSync(dirMaterial + "tromcho.png")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/img/ext135.png").pipe(fs.createWriteStream(dirMaterial + "tromcho.png"));
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let tromcho_image = await jimp.read(__root + "/tromcho.png");
    let pathImg = __root + `/tromcho${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    tromcho_image.composite(circleOne.resize(50, 50), 234, 38).composite(circleTwo.resize(90, 90), 50, 234);

    let raw = await tromcho_image.getBufferAsync("image/png");

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

module.exports.run = async function({ event, api, args }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);
    var one = senderID,two = mention[0];
    if (!two) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
    else {
        var one = senderID,two = mention[0];
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "M coi chừng t xích m lại nhé sủa cl! 😈😈 ",
         attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
}