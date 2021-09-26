module.exports.config = {
	name: "tarot",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "ManhG",
	description: "bói bài",
	commandCategory: "Horoscope",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
const axios = require('axios');
const res = await axios.get(`https://le31.glitch.me/tarot`);
var tarot =       res.data.data;
var name  =       tarot.name;
var suite =       tarot.suite;
var image =       tarot.image;
var description = tarot.description;
var interpretation = tarot.interpretation;

return api.sendMessage(` ★ == Tarot == ★ \n\n⁂➻❥ Name: ${name}  \n⁂➻❥ Suite: ${suite} \n⁂➻❥ Description: ${description} \n⁂➻❥ Interpretation ${interpretation} \n⁂➻❥ Image ${image} \n\n⁂➻❥ Reply tin nhắn này với Trans để dịch qua tiếng việt `, event.threadID, event.messageID)
}