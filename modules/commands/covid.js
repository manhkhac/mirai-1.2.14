module.exports.config = {
  name: "covid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Lấy thông tin về tình hình dịch bệnh COVID-19",
  commandCategory: "news",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};
/*module.exports.languages = {
  "vi": {
    "return": "====== Thế Giới ======\n😷 Nhiễm: %1\n💚 Đã hồi phục: %2\n💀 Tử vong: %3\n====== Việt Nam ======\n😷 Nhiễm: %4\n😎 Điều trị: %5\n💚 Đã hồi phục: %6\n💀 Tử vong: %7\n🤨 Nhiễm 7 ngày: %8\n❤ Hồi phục 7 ngày: %9\n☠️ Tử vong 7 ngày: %10\n\n Thời gian: %11"
  },
  "en": {
    "return": "====== World ======\n😷 Cases: %1\n😎 Treating: %2\n💚 Recovered: %3\n💀 Deaths: %4\n====== VietNam ======\n😷 Cases: %5\n😎 Treating: %6\n💚 Recovered: %7\n💀 Deaths: %8\n📰 News: %8\nData is updated at: %8 (UTC +7)"
  }
}*/
module.exports.run = async function ({ api, event, getText }) {
  const axios = global.nodemodule["axios"]; 
  const moment = require("moment-timezone");
    var time = moment.tz("Asia/Ho_Chi_Minh").format("YYYY");

    let fetchdata = await axios.get("https://static.pipezero.com/covid/data.json");
    var jsondata = (await fetchdata.data).total;
    var vn = (await fetchdata.data).overview[6];
    //var vn = jsondata.internal || {};
    //var tg = jsondata.world || {};
    var year = vn.date + '-' + time;

    var world = jsondata.world,
        //vn = vn.vietnam,
        //news = data.news,
        nhiemtg = world.cases,
        chettg = world.death,
        hoiphuctg = world.recovered,

        nhiemvn = vn.cases,
        chetvn = vn.death,
        hoiphucvn = vn.recovered,
        dieutrivn = vn.treating,

        nhiemvn7days = vn.avgCases7day,
        hoiphucvn7days = vn.avgRecovered7day,
        chetvn7days = vn.avgDeath7day,


        ptchetvn = Math.round(
            (chetvn * 100) / nhiemvn
        ),
        pthoiphucvn = Math.round(
            (hoiphucvn * 100) / nhiemvn
        ),
        ptchettg = Math.round(
            (chettg * 100) / nhiemtg
        ),
        pthoiphuctg = Math.round(
            (hoiphuctg * 100) / nhiemtg
        ),
        pthoiphucvn = pthoiphucvn.toString().split(".")[0],
        ptdieutrivn = (100 - pthoiphucvn - ptchetvn).toString().split(".")[0];
    ptchetvn = ptchetvn.toString().split(".")[0];
    pthoiphuctg = pthoiphuctg.toString().split(".")[0];
    ptchettg = ptchettg.toString().split(".")[0];
    return api.sendMessage(
        "====== Thế Giới ======\n" +
        `😷 Nhiễm: ${nhiemtg}\n` +
        `💚 Hồi phục: ${hoiphuctg} (${pthoiphuctg}%)\n` +
        `💀 Tử vong: ${chettg} (${ptchettg}%)\n` +
        "====== Việt Nam ======\n" +
        `😷 Nhiễm: ${nhiemvn}\n` +
        `💉 Đang điều trị: ${dieutrivn} (${ptdieutrivn}%)\n` +
        `💚 Hồi phục: ${hoiphucvn} (${pthoiphucvn}%)\n` +
        `💀 Tử vong: ${chetvn} (${ptchetvn}%)\n` +
        `🤨 Nhiễm 7 ngày: ${nhiemvn7days}\n` +
        `❤ Hồi phục 7 ngày:: ${hoiphucvn7days}\n` +
        `☠️ Tử vong 7 ngày: ${chetvn7days}\n\n` +
        //`Tin tức: ${news.vietnam}\n` +
        `Cập nhật: ${year}`,
        event.threadID, event.messageID
        );
  }
