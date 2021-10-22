module.exports.config = {
    name: "boy",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Thanh",
    description: "Random ảnh trai xinh nhất Việt Nam :))",
    commandCategory: "random-img",
    usages: "",
    cooldowns: 5
};

module.exports.run = async({ api, event }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    axios.get('https://api.vinhbeat.ga/trai.php').then(res => {
        let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
        let callback = function() {
            api.sendMessage({
                attachment: fs.createReadStream(__dirname + `/cache/boy.${ext}`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boy.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/boy.${ext}`)).on("close", callback);
    })
}