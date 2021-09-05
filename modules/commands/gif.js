module.exports.config = {
	name: "gif",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "lấy ảnh gif",
	commandCategory: "Media",
	usages: "[text]",
	cooldowns: 5,
	dependencies: {"request":""},
	envConfig: {
		"TENOR": "73YIAOY3ACT1"
	}
};

module.exports.run = function({ api, event, args}) {
    const request = global.nodemodule["request"];
     const fs = global.nodemodule["fs-extra"];
	var { threadID, messageID } = event;
	var key = global.configModule.gif.TENOR;
	if (!args[0]) return api.sendMessage("Không tìm thấy tag bạn nhập", threadID, messageID);
	return request(`https://api.tenor.com/v1/random?key=${key}&q=${args[0]}&limit=1`, (err, response, body) => {
		if (err) throw err;
		var string = JSON.parse(body);
		var stringURL = string.results[0].media[0].tinygif.url;
		request(stringURL).pipe(fs.createWriteStream(__dirname + `/cache/randompic.gif`)).on("close", () => api.sendMessage({ attachment: fs.createReadStream(__dirname + "/cache/randompic.gif") }, threadID, () => fs.unlinkSync(__dirname + "/cache/randompic.gif"), messageID));
	});
}