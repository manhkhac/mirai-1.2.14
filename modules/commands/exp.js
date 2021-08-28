module.exports.config = {
	name: "exp",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team (ManhNK Mod)",
	description: "Kiểm tra số kinh nghiệm của bản thân hoặc người được tag",
	commandCategory: "economy",
	usages: "[Tag]",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"soexpbanthan": "Số kinh nghiệm bạn đang có: %1",
		"soexpnguoikhac": "Số kinh nghiệm của %1 hiện đang có là: %2"
	},
	"en": {
		"soexpbanthan": "Your current exp: %1",
		"soexpnguoikhac": "%1's current exp: %2."
	}
}

module.exports.run = async function({ api, event, args, Currencies, getText }) {
	const { threadID, messageID, senderID, mentions } = event;

	if (!args[0]) {
		const exp = (await Currencies.getData(senderID)).exp;
		return api.sendMessage(getText("soexpbanthan", exp), threadID);
	}

	else if (Object.keys(event.mentions).length == 1) {
		var mention = Object.keys(mentions)[0];
		var exp = (await Currencies.getData(mention)).exp;
		if (!exp) exp = 0;
		return api.sendMessage({
			body: getText("soexpnguoikhac", mentions[mention].replace("@", ""), exp),
			mentions: [{
				tag: mentions[mention].replace("@", ""),
				id: mention
			}]
		}, threadID, messageID);
	}

	else return global.utils.throwError(this.config.name, threadID, messageID);
}
