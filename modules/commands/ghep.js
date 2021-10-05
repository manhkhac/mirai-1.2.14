module.exports.config = {
  name: "ghep",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Hungcho",
  description: "Ghép đôi",
  commandCategory: "roleplay", 
  usages: "", 
  cooldowns: 5,
  dependencies: {}
};
module.exports.run = async function({ api, event, Users, Currencies }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];
        var data = await Currencies.getData(event.senderID);
        var money = data.money
        if( money < 500) api.sendMessage("⚡️Nghèo quá nên tôi không biết ghép cho ai nhé!", event.threadID, event.messageID) //thay số tiền cần trừ vào 0, xóa money = 0
        else {
        var tile = Math.floor(Math.random() * 101);

        var namee = (await Users.getData(event.senderID)).name

        let loz = await api.getThreadInfo(event.threadID);
        var emoji = loz.participantIDs;
        var id = emoji[Math.floor(Math.random() * emoji.length)];
        ///////////////////////////////
        var love = ((await axios.get("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/json/xinloivk.json")).data).love;
        var linklove = love[Math.floor(Math.random() * love.length)];
        var getlove = (await axios.get(linklove, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + "/cache/love.gif", Buffer.from(getlove, "utf-8"));
        /////////////////////////////////////////////
        var name = (await Users.getData(id)).name;

        var arraytag = [];
                arraytag.push({id: event.senderID, tag: namee});
                arraytag.push({id: id, tag: name});
        Currencies.setData(event.senderID, options = {money: money - 500}) //thay số $ cần trừ vào x, xóa 2 gạch đầu dòng này để thực hiện trừ tiền
  
        let Avatar = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8") );
        let Avatar2 = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );
        var imglove = [];
              imglove.push(fs.createReadStream(__dirname + "/cache/love.gif"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));


        var msg = {body: `Ghép đôi thành công!\nTỉ lệ hợp đôi: ${tile}%\n`+namee+" "+"💓"+" "+name, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID);
        fs.unlinkSync(__dirname + '/cache/love.gif');
        fs.unlinkSync(__dirname + '/cache/avt.png');
        fs.unlinkSync(__dirname + '/cache/avt2.png');
      }
}