module.exports.config = {
  name: "adbot",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "manhIT",
  description: "Kiểm tra thông tin ngơời dùng.",
  commandCategory: "Info",
  usages: "",
  cooldowns: 1,
  dependencies: {
    "request": ""
    }
};

module.exports.run = async({api,event,args,Users,Currencies}) => {
    const request = require('request');
    const fs = global.nodemodule["fs-extra"]
    var callback = () => api.sendMessage(
    {body:`梁ADMIN BOT梁\n
    \n👀 Tên: MạnhNK (ManhICT)
    \n❎ Tuổi: ...
    \n👤 😶 Giới tính: Nam
    \n💫 Chiều cao cân nặng: 1m72 45kg
    \n💘 Mối quan hệ: Cu đơn
    \n😎 Quê quán: ...
    \n🤔 Nơi ở: ...
    \n👫 Gu: Ni :<
    \n🌸 Tính cách: Bồ là nhất
    \n👉 Profile: https://www.facebook.com/manhict/`,
        attachment: fs.createReadStream(__dirname + "/cache/ADMINBOT.png")}, event.threadID, () => 
        fs.unlinkSync(__dirname + "/cache/ADMINBOT.png"));  
        return request(
            encodeURI(`https://graph.facebook.com/${100038379006171}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`)).pipe(
    fs.createWriteStream(__dirname+'/cache/ADMINBOT.png')).on('close',() => callback());
};