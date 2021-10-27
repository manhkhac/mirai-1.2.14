module.exports.config = {
  name: "setup",
  version: "1.0.3",
  hasPermssion: 2,
  credits: "ManhG",
  description: "onLoad",
  commandCategory: "config",
  usages: "",
  cooldowns: 0,
  denpendencies: {
    "fs-extra": "",
    "request": ""
  }
};
module.exports.onLoad = () => {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const dirMaterial = __dirname + `/Noprefix/`;
  if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
  ////////////// ngudot
  if (!fs.existsSync(dirMaterial + "ngudot.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/ngudot.mp4").pipe(fs.createWriteStream(dirMaterial + "ngudot.mp4"));
  ////////////////ao that day
  if (!fs.existsSync(dirMaterial + "aothatday.mp3")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp3/aothatday.mp3").pipe(fs.createWriteStream(dirMaterial + "aothatday.mp3"));
  //////////////// goodnight
  if (!fs.existsSync(dirMaterial + "goodnight.gif")) request("https://i.pinimg.com/originals/dd/4c/8b/dd4c8bfb421cfc8d7289aeabbc74b966.gif").pipe(fs.createWriteStream(dirMaterial + "goodnight.gif"));
  //////////////// sad
  if (!fs.existsSync(dirMaterial + "sad.mp4")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/chan.mp4").pipe(fs.createWriteStream(dirMaterial + "sad.mp4"));
  //////////////// ỏ
  if (!fs.existsSync(dirMaterial + "ooo.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/ooo.mp4").pipe(fs.createWriteStream(dirMaterial + "ooo.mp4"));
  //////////////// ngudot
  if (!fs.existsSync(dirMaterial + "ngudot.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/ngudot.mp4").pipe(fs.createWriteStream(dirMaterial + "ngudot.mp4"));
  //////////////// ban la nhat
  if (!fs.existsSync(dirMaterial + "banlanhat.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/banlanhat.mp4").pipe(fs.createWriteStream(dirMaterial + "banlanhat.mp4"));
  //////////////// hi
  //if (!fs.existsSync(dirMaterial + "hi.gif")) request("https://media.discordapp.net/attachments/849164098024374283/859645612097798184/received_373965544066156.gif").pipe(fs.createWriteStream(dirMaterial + "hi.gif"));
  //////////////// simp
  if (!fs.existsSync(dirMaterial + "simp.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/simp.mp4").pipe(fs.createWriteStream(dirMaterial + "simp.mp4"));
  //////////////// oidoioi
  if (!fs.existsSync(dirMaterial + "oidoioi.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/oidoioi.mp4").pipe(fs.createWriteStream(dirMaterial + "oidoioi.mp4"));
  //////////////// bruh
  if (!fs.existsSync(dirMaterial + "bruh.mp3")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp3/bruh.mp3").pipe(fs.createWriteStream(dirMaterial + "bruh.mp3"));
  //////////////// kolm 
  if (!fs.existsSync(dirMaterial + "kolammadoicoan.mp4")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/kolammadoicoan.mp4").pipe(fs.createWriteStream(dirMaterial + "kolammadoicoan.mp4"));
  //////////////// nguquah
  //if (!fs.existsSync(dirMaterial + "nguquagiotrua.mp3")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp3/nguquagiotrua.mp3").pipe(fs.createWriteStream(dirMaterial + "nguquagiotrua.mp3"));
  //////////////// thamlam
  if (!fs.existsSync(dirMaterial + "thamlam.mp4")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/mp4/thamlam.mp4").pipe(fs.createWriteStream(dirMaterial + "thamlam.mp4"));
  ////////////////

  ////////////////
  const dir12congiap = __dirname + `/Noprefix/12congiap/`;
  if (!fs.existsSync(dir12congiap + "Noprefix/12congiap")) fs.mkdirSync(dir12congiap, { recursive: true });
  if (!fs.existsSync(dir12congiap + "12congiap.jpg")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/12congiap.jpg").pipe(fs.createWriteStream(dir12congiap + "12congiap.jpg"));
  if (!fs.existsSync(dir12congiap + "ti.gif")) request("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/12congiap/t%C3%AD.gif").pipe(fs.createWriteStream(dir12congiap + "ti.gif"));
  if (!fs.existsSync(dir12congiap + "suu.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/suu.gif").pipe(fs.createWriteStream(dir12congiap + "suu.gif"));
  if (!fs.existsSync(dir12congiap + "dan.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/dan.gif").pipe(fs.createWriteStream(dir12congiap + "dan.gif"));
  if (!fs.existsSync(dir12congiap + "mao.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/mao.gif").pipe(fs.createWriteStream(dir12congiap + "mao.gif"));
  if (!fs.existsSync(dir12congiap + "thin.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/thin.gif").pipe(fs.createWriteStream(dir12congiap + "thin.gif"));
  if (!fs.existsSync(dir12congiap + "ran.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/t%E1%BB%8B.gif").pipe(fs.createWriteStream(dir12congiap + "ran.gif"));
  if (!fs.existsSync(dir12congiap + "ngo.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/ngo.gif").pipe(fs.createWriteStream(dir12congiap + "ngo.gif"));
  if (!fs.existsSync(dir12congiap + "mui.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/mui.gif").pipe(fs.createWriteStream(dir12congiap + "mui.gif"));
  if (!fs.existsSync(dir12congiap + "than.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/than.gif").pipe(fs.createWriteStream(dir12congiap + "than.gif"));
  if (!fs.existsSync(dir12congiap + "dau.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/dau.gif").pipe(fs.createWriteStream(dir12congiap + "dau.gif"));
  if (!fs.existsSync(dir12congiap + "tuat.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/tuat.gif").pipe(fs.createWriteStream(dir12congiap + "tuat.gif"));
  if (!fs.existsSync(dir12congiap + "hoi.gif")) request("https://github.com/manhkhac/mirai-1.2.8/raw/data/12congiap/hoi.gif").pipe(fs.createWriteStream(dir12congiap + "hoi.gif"));
////////////////

return;

}
 
module.exports.run = async function ({ api, event, Threads, getText }) {
  return api.sendMessage(`chỉ để load source`, event.threadID, event.messageID);
}