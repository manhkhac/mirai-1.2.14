module.exports.config = {
  name: "zz",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang",
  description: "Converts your text to Zalgo",
  commandCategory: "random-text",
  depndencies: {
    "to-zalgo": ""
  },
  usages: "<text>",
  cooldowns: 5
};

module.exports.run = function({ api, event, args }) {
	const { commands } = global.client;
	const command = commands.get(("zz").toLowerCase());
  const credit = command.config.credits;
	

	return api.sendMessage(`${credit}`, threadID, messageID);
}