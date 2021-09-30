module.exports.config = {
  name: "chuibot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Chửi Bot Version 8 ban user bằng reply tn",
  commandCategory: "Noprefix",
  usages: "",
  cooldowns: 2,
  denpendencies: {
    "fs-extra": "",
    "request": ""
  }
};
module.exports.onLoad = async function () {
  const { resolve } = global.nodemodule["path"];
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { downloadFile } = global.utils;
  const path = resolve(__dirname, "cache/CHUIBOT");
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
  //Hàm dowload file có sẵn (có thể thay)
  //Jpg nhé
  //if (!existsSync(resolve(__dirname, 'cache/CHUIBOT', 'chuithe1.jpg'))) await downloadFile("https://haingoaiphiemdam.com/images/file/7OIQ0R1h1ggBAKUH/concac-dep.jpg", resolve(__dirname, 'cache/CHUIBOT', 'chuithe1.jpg'));
  //if (!existsSync(resolve(__dirname, 'cache/CHUIBOT', 'chuithe2.jpg'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/img/amen.jpg", resolve(__dirname, 'cache/CHUIBOT', 'chuithe2.jpg'));
  //GIF nhé
  if (!existsSync(resolve(__dirname, 'cache/CHUIBOT', 'chuithe3.gif'))) await downloadFile("https://c.tenor.com/p0so-KaD03cAAAAC/bunny-girl-senpai-slap.gifhttps://c.tenor.com/p0so-KaD03cAAAAC/bunny-girl-senpai-slap.gif", resolve(__dirname, 'cache/CHUIBOT', 'chuithe3.gif'));
  //MP4 nhé
  //if (!existsSync(resolve(__dirname, 'cache/CHUIBOT', 'chuithe.mp4'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/chuitheconcac.mp4", resolve(__dirname, 'cache/CHUIBOT', 'chuithe.mp4'));
  //MP3 nhé
  //if (!existsSync(resolve(__dirname, 'cache/CHUIBOT', 'domixi.mp3'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp3/domixichubay1p.mp3", resolve(__dirname, 'cache/CHUIBOT', 'domixi.mp3'));
}

module.exports.handleReply = async function ({ api, args, Users, event, handleReply }) {
  const { threadID, messageID } = event;
  const { reason } = handleReply;
  var name = await Users.getNameUser(event.senderID);
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
  var arg = event.body.split(" ");
  var uidUser = handleReply.author;
  var nameU = handleReply.nameU;
  //console.log(uidUser, nameU)
  switch (handleReply.type) {
    case "reply":
      {
        var idad = global.config.ADMINBOT;
        for (let ad of idad) {
          api.sendMessage({
            body: "📄Lời chăng chối từ " + name + ":\n " + event.body,
            mentions: [{
              id: event.senderID,
              tag: name
            }]
          }, ad, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            messageID: data.messageID,
            messID: event.messageID,
            author: event.senderID,
            id: event.threadID,
            nameU: name,
            type: "banU"
          }))
        }
        break;
      }

    case "banU":
      {
        if (arg[0] == "ban" || arg[0] == "Ban") {
          let data = (await Users.getData(uidUser)).data || {};
          data.banned = 1;
          data.reason = reason || null;
          data.dateAdded = time;
          await Users.setData(uidUser, { data });
          global.data.userBanned.set(uidUser, { reason: data.reason, dateAdded: data.dateAdded });
          api.sendMessage(`»Thông báo từ Admin ${name}«\n\n ${nameU}\n- Bạn Đã Bị Ban\n- Cấm sử dụng bot.\nLý do: Chửi bot`, uidUser, () =>
            api.sendMessage(`${global.data.botID}`, () =>
              api.sendMessage(`★★BanSuccess★★\n\n🔷${nameU} \n🔰TID:${uidUser} `, threadID)));
        } else {
          api.sendMessage({ body: `Admin ❤ ${name} thông tin đến bạn:\n\n${event.body}\n\n»»💬Reply tin nhắn này để nói lời chăng chối của bạn tới admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
          break;
        }
      }

    case "chuithe":
      {
        api.sendMessage({ body: `Admin ❤ ${name} thông tin đến bạn:\n\n${event.body}\n\n»»💬Reply tin nhắn này để nói lời chăng chối của bạn tới admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
          name: this.config.name,
          author: event.senderID,
          messageID: data.messageID,
          type: "reply"
        }), handleReply.messID);
        break;
      }
  }
};

module.exports.handleEvent = async ({ event, api, Users, Threads }) => {
  var { threadID, messageID, body, senderID } = event;
  if (senderID == global.data.botID) return;
  const fs = global.nodemodule["fs-extra"];
  const moment = require("moment-timezone");
  var time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
  let name = await Users.getNameUser(event.senderID);
  var idbox = event.threadID;
  let uidUser = event.senderID;
  let dataThread = await Threads.getData(event.threadID);
  let threadInfo = dataThread.threadInfo;
  const listAdmin = global.config.ADMINBOT;

  //Random câu trả lời
  var tl = [`${name}` + " Bạn đã chửi bot vào " + `${time}` + ".\n- Tin nhắn này đã được gửi về cho admin.\n- Thêm lần nữa ăn ban bạn nhé :)))", `${name}` + ", mày thích chửi bố mày không, ăn ban nhé con trai :)))", `${name}` + " mày đã ngu, lại còn óc chó, đéo biết dùng bot chửi cc :)))", `${name}` + ", óc lồn, mày tuổi lồn dùng bot của bố mày nhé. \nÀ đéo phải mày tuổi cặc nhé :)))"];
  var rand = tl[Math.floor(Math.random() * tl.length)];
  //Random ảnh 
  var images = [
    //fs.createReadStream(__dirname + `/cache/CHUIBOT/chuithe1.jpg`),
    // fs.createReadStream(__dirname + `/cache/CHUIBOT/chuithe2.jpg`),
    fs.createReadStream(__dirname + `/cache/CHUIBOT/chuithe3.gif`)
    //fs.createReadStream(__dirname + `/cache/CHUIBOT/chuithe.mp4`),
    //fs.createReadStream(__dirname + `/cache/CHUIBOT/domixi.mp3`)
  ];
  var randAtt = images[Math.floor(Math.random() * images.length)];
  //trả lời
  var msg = {
    body: rand,
    attachment: randAtt,
  }
  //Những câu bot bị chửi.
  const arr = ["botngu", "bot ngu", "bot gà", "con bot lol", "bot ngu lol", "bot chó", "dm bot", "đm bot", "dmm bot", "dmm bot", "đmm bot", "đb bot", "bot điên", "bot dở", "bot khùng", "đĩ bot", "bot paylac rồi", "con bot lòn", "cmm bot", "clap bot", "bot ncc", "bot oc", "bot óc", "bot óc chó", "cc bot", "bot tiki", "lozz bottt", "lol bot", "loz bot", "lồn bot", "bot lồn", "bot lon", "bot cac", "bot nhu lon", "bot như cc", "bot như bìu", "Bot sida", "bot sida", "bot fake", "mạnh ngu", "bot shoppee", "bot đểu", "bot dỡm"];
  arr.forEach(value => {
    let str = value[0].toUpperCase() + value.slice(1);
    if (body === value.toUpperCase() | body === value | str === body) {
      let nameT = threadInfo.threadName;
      modules = "Chửi bot:";
      console.log(modules, value + "|", nameT);
      api.sendMessage(msg, threadID, () => {
        var idad = listAdmin;
        for (var idad of listAdmin) {
          api.sendMessage(`=== Bot Notification ===\n\n👥Tên Box: ${nameT}\n⛔ID box: ${idbox}\n🆘Tên tội nhân: ${name} \n🔰ID tội nhân: ${uidUser}\n🕒Time: ${time}\n😥Chửi bot: ${value}`,
            idad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                author: senderID,
                messageID: info.messageID,
                messID: messageID,
                id: idbox,
                type: "chuithe"
              })
          );
        }
      });
    }
  });

}

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}