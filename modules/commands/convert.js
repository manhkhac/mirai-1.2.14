module.exports.config = {
    name: "cv",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: "Chuyển đổi các loại tiền tệ sang USD.",
    commandCategory: "Currencies",
    usages: "[amount] [unit]",
    cooldowns: 1,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async function ({ event, api, args }) {
    const { threadID, messageID } = event;
    const amount = args[0];
    const unit = args[1].toUpperCase();
    const out = msg => api.sendMessage(msg, threadID, messageID);
    try {
        const { exchangeRate } = await this.convert(amount, unit);
        const msg = `${unit} to USD\n` +
            `${amount} ${unit} = ${(amount*exchangeRate).toFixed(3)} USD`;
        return out(msg);
    }
    catch (e) {
        return out(e.error);
    }

}

module.exports.convert = function (num, from) {
    const axios = global.nodemodule["axios"];
    return new Promise(async function (resolve, reject) {
        if (isNaN(num)) {
            reject({ error: "Số tiền nhập vào phải là 1 con số." });
        } else if (num.indexOf("-") !== -1) {
            reject({ error: "Số tiền nhập vào phải là 1 con số không âm." });
        } else {
            try {
                const { data } = await axios.get(`http://valuta.exchange/vi/${from.toLowerCase()}-to-usd?amount=${num}`);

                https://valuta.exchange/usd-to-eur?amount=1534
                
                const Data = data.toString();
                const exchangeRate = Data.split('<span class="UpdateTime__ExchangeRate-sc-136xv3i-1 djCdnS">')[1].split("</span>")[0];
                resolve({ data: exchangeRate });
            }
            catch (e) {
                reject({ error: "Đơn vị tiền bạn nhập không tồn tại." });
            }
        }
    });
}