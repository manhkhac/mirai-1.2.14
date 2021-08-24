module.exports.config = {
	name: "lyrics",
    version: "1.0.0", 
	hasPermssion: 0,
	credits: "loi",
	description: "tìm lời bài hát", 
	commandCategory: "media",
	usages: "[text]",
	cooldowns: 5,
    dependencies: {
        "lyrics-finder":""
    }
};
module.exports.run = async function ({ api, args, event }) {
  const lyricsFinder = global.module['lyrics-finder'];
    let lyrics = await lyricsFinder(args.join(" ")) || "Not Found!";
    console.log(lyrics);
api.sendMessage(`${lyrics}`, event.threadID, event.messageID);
}