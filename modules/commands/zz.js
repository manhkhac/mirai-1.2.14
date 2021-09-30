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

module.exports.run = ({ api, event, args }) => {

  async function f3() {
  var y = await global.data.threadInfo.get(event.threadID).threadName;
  console.log(y); // 20
}
f3();

}