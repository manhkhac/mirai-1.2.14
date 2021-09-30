module.exports.config = {
    name: "uptimes",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "Kiểm tra thời gian bot đã online",
    commandCategory: "system",
    cooldowns: 5,
    dependencies: {
        "pidusage": ""
    }
};

function byte2mb(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0,
        n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.run = async({ api, event }) => {
    const time = process.uptime(),
        hours = Math.floor(time / (60 * 60)),
        minutes = Math.floor((time % (60 * 60)) / 60),
        seconds = Math.floor(time % 60);

    const pidusage = await global.nodemodule["pidusage"](process.pid);
    const timeStart = Date.now();
    var upt = {
      body: `Thời gian hoạt động: ${hours}:${minutes}:${seconds}\n❯ Tổng người dùng: ${global.data.allUserID.length}\n❯ Tổng Nhóm: ${global.data.allThreadID.length}\n❯ Cpu đang sử dụng: ${pidusage.cpu.toFixed(1)}%\n❯ Ram đang sử dụng: ${byte2mb(pidusage.memory)}\n❯ Ping: ${Date.now() - timeStart}ms\n❯ Version: ${global.config.version}`,
            attachment: (await global.nodemodule["axios"]({
            url: (await global.nodemodule["axios"]('https://girl.demngayyeu.repl.co')).data.data,
            method: "GET",
            responseType: "stream"
        })).data
    }
    return api.sendMessage(upt, event.threadID, event.messageID);
}