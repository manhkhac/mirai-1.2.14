module.exports.config = {
  name: "test",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "test",
  commandCategory: "news",
  usages: "",
  cooldowns: 0,
  dependencies: { "axios": "", "cheerio": "", "request-promise": "" }
};

module.exports.run = async function ({ api, event, args }) {
  const cheerio = global.nodemodule["cheerio"];
  const request = global.nodemodule['request-promise'];

  request('https://www.24h.com.vn/tong-hop-so-lieu-dich-covid-19-c972.html', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html); // load HTML

      $('.page-cv19-data__statis-num').each((index, el) => { // lặp từng phần tử có class là jpage-cv19-data__statis-num
        const datas = $(el).find('p').text();

        console.log(datas);
      })
    }
    else {
      console.log(error);
    }
  });

}