module.exports.config = {
    name: "wibu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "request ảnh",
    commandCategory: "random-img",
    usages: "",
    cooldowns: 5,
    dependencies: {
        "axios": "",
    }
};
module.exports.run = async function({ event, api, args }) {
    const { threadID, messageID } = event;
    //chatfuel là dạng [{"type":"girl","data":"https://i.ibb.co/dL83x1T/cj-14.jpg"}] có ngoặc [ ]

    var reply = {
        body: "",
        attachment: (await global.nodemodule["axios"]({
            url: (await global.nodemodule["axios"]('https://wibu.demngayyeu.repl.co')).data.data, //Nếu api dạng chatfuel thì là .data[0].data '-'
            method: "GET",
            responseType: "stream"
        })).data

    }
    return api.sendMessage(reply, threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 20000), messageID);
}