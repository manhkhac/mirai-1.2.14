module.exports.config = {
  name: "fbget",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "fbget mp4",
  commandCategory: "media",
  usages: "[link]",
  cooldowns: 5,
  dependencies: {
    "fb-downloads": "",
    "axios": "",
    "node-fetch":"",
    "cheerio":""
  }

};

module.exports.run = async ({ api, event, args }) => {
  var { threadID, messageID} = event;
  var fbget = global.nodemodule["fb-downloads"];
  var cheerio = global.nodemodule["cheerio"];
  var fetch = global.nodemodule["node-fetch"];
  
    if(args.length > 0) {
      var url = args.join(" ");
      let videoObj;
      try {
        videoObj = await fbget.getVideoUrl(url);
        api.sendMessage("Đang tìm dữ liệu, vui lòng chờ ^‌_‌^", threadID, messageID);

        if(videoObj != undefined) {
          //consolog.log(url)
          if(videoObj.hd != undefined) {
            consolog.log('Bingo Got Full Link Video...')
            try {
              var hdlink = await fetch(`https://tinyurl.com/create.php?source=indexpage&url=${encodeURIComponent(videoObj.hdLink)}`).then(x => x.text());
              var sdlink = await fetch(`https://tinyurl.com/create.php?source=indexpage&url=${encodeURIComponent(videoObj.sdLink)}`).then(x => x.text());
            } catch (ex) {consolog.log(ex)}
            var $ = cheerio.load(hdlink);
            var $$ = cheerio.load(sdlink);
            var hdurl = $("#copy_div").attr('href')
            var sdurl = $$("#copy_div").attr('href')
            return api.sendMessage('HD: '+hdurl+'\n'+'SD: '+sdurl, threadID, messageID);

          } else {
            consolog.log('Hmm Got Only SD Link...')
            try {
              var sdlink = await fetch(`https://tinyurl.com/create.php?source=indexpage&url=${encodeURIComponent(videoObj.sdLink)}`).then(x => x.text());
            } catch (ex) {consolog.log(ex)}
            var $ = cheerio.load(sdlink);
            var sdurl = $("#copy_div").attr('href')
        
            return api.sendMessage('SD: '+sdurl, threadID, messageID);
            
          }
        } else {
          return api.sendMessage("Không tìm thấy link download hoặc link post không hợp lệ!", threadID, messageID);
        }
      } catch (e) {
        //consolog.log(e)
        return api.sendMessage("Lỗi rùi...", threadID, messageID);
      }
    } else {
      return api.sendMessage("Missing link facebook...", threadID, messageID);
      }

}
  

   
