module.exports.config = {
  name: "resend",
  version: "2.0.0",
  hasPermssion: 1,
  credits: "Thọ",
  description: "Là resend thôi",
  commandCategory: "general",
  usages: "resend",
  cooldowns: 0,
  hide: true,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.handleEvent = async function ({ event, api, client, Users }) {
  const request = global.nodemodule["request"];
  const axios = global.nodemodule["axios"]
  const { writeFileSync, createReadStream } = global.nodemodule["fs-extra"];

  let { messageID, senderID, threadID, body: content } = event;
  if (!global.logMessage) global.logMessage = new Map();
  if (!global.data.botID) global.data.botID = api.getCurrentUserID();

  const thread = global.data.threadData.get(threadID) || {};

  if (typeof thread["resend"] != "undefined" && thread["resend"] == false) return;
  if (senderID == global.data.botID) return;


  if (event.type != "message_unsend") global.logMessage.set(messageID, {
    msgBody: content,
    attachment: event.attachments
  })
  if (event.type == "message_unsend") {
    var getMsg = global.logMessage.get(messageID);
    if (!getMsg) return;
    let name = await Users.getNameUser(senderID);
    if (getMsg.attachment[0] == undefined) return api.sendMessage(`${name} đã gỡ 1 tin nhắn\nNội dung: ${getMsg.msgBody}`, threadID)
    else {
      let num = 0
      let msg = {
        body: `${name} vừa gỡ ${getMsg.attachment.length} tệp đính kèm.${(getMsg.msgBody != "") ? `\n\nNội dung: ${getMsg.msgBody}` : ""}`,
        attachment: [],
        mentions: { tag: name, id: senderID }
      }
      for (var i of getMsg.attachment) {
        num += 1;
        var getURL = await request.get(i.url);
        var pathname = getURL.uri.pathname;
        var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
        var path = __dirname + `/cache/${num}.${ext}`;
        var data = (await axios.get(i.url, { responseType: 'arraybuffer' })).data;
        writeFileSync(path, Buffer.from(data, "utf-8"));
        msg.attachment.push(createReadStream(path));
      }
      api.sendMessage(msg, threadID);
    }
  }
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "resend thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success notification rankup!",
  }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["resend"] == "undefined" || data["resend"] == false) data["resend"] = true;
  else data["resend"] = false;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["resend"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}