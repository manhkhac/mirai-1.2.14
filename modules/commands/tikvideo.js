
module.exports.config = {
	name: "tikvideo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "KhánhMilo",
	description: "Tải video tik tok xóa logo",
	commandCategory: "media",
	usages: "[url]",
	cooldowns: 10,
	dependencies: {
		"axios": "",
		"fs-extra": ""
	}
	
};
module.exports.run = async function({ api, event, args,}) {
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];
 	if (global.client.tikvideo == true) return api.sendMessage("Hệ thống đang xử lý yêu cầu từ box khác, vui lòng quay lại sau", event.threadID, event.messageID);
        global.client.tikvideo = true;
  if (!args.join("") != " " ){ return api.sendMessage("Bạn phải ngập url video tiktok !!!", event.threadID, event.messageID);}
  var uid = args[0];
  try {
	const options = {
		method: 'GET',
		url: 'https://video-nwm.p.rapidapi.com/url/',
		params: {url: `\'${uid}\'`},
		headers: {
		  'x-rapidapi-key': 'a012e05802msh4ce48bff26d5c0ap151d85jsn4edde7f89de0',
		  'x-rapidapi-host': 'video-nwm.p.rapidapi.com'
		}
	  };
	  var data = await axios.request(options);
	  if(data.data.item.video.playAddr[0] == undefined ) get = data.data.item.video.playAddr
	  else get = data.data.item.video.playAddr[0]
	  pathus = __dirname+`/cache/${event.threadID}-${event.senderID}.mp4`  
	  var getms = (await axios.get(get,{responseType: "arraybuffer"})).data; 
	  fs.writeFileSync(pathus, Buffer.from(getms, "utf-8"));
	  //console.log(get);
	  if (fs.statSync(__dirname + `/cache/${event.threadID}-${event.senderID}.mp4`).size > 26214400) {
		global.client.tikvideo = false;
		return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${event.threadID}-${event.senderID}.mp4`), event.messageID);
	  }
	  else {
		global.client.tikvideo = false;
		return api.sendMessage({body : "" , attachment: fs.createReadStream(__dirname + `/cache/${event.threadID}-${event.senderID}.mp4`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.threadID}-${event.senderID}.mp4`), event.messageID);
	  }
	  
	 
		}catch {
			global.client.tikvideo = false;
			return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB!', event.threadID, event.messageID);
		};
 }
