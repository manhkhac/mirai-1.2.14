module.exports.config = {
	name: "dog",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "manhNK",
	description: "Xem Boss",
	commandCategory: "Animals",
	usages: "[Text]",
	cooldowns: 1,
	
	};
			
module.exports.run = async ({ api, event }) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule["axios"];

	axios.get('https://nekos.life/api/v2/img/woof').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	
	let callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + `/cache/dog.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/dog.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/dog.${ext}`)).on("close", callback);
			})
}