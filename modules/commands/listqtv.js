module.exports.config = {
    name: 'listqtv',
    version: '1.0.1',
    hasPermssion: 0,
    credits: 'ManhG',
    description: 'Danh sách quản trị viên Box',
    commandCategory: 'Group',
    usages: 'listqtv',
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function({ api, event, args, Users, Threads }) {
    /*try {
        var threadInfo = await api.getThreadInfo(args[0]);
    } catch (e) {
        var threadInfo = await api.getThreadInfo(event.threadID);
    }
    var threadInfo = (await Threads.getData(event.threadID)).threadInfo;
    let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;
    console.log(qtv2);
    dem = 1;
    for (let i = 0; i < qtv2.length; i++) {
        const name = (await Users.getData(qtv2[i].id)).name;
        //const name = info[qtv2[i]].name;
        listad += '' + `${dem++}` + '. ' + name + '\n';
    }

    api.sendMessage(
        `Danh sách ${qtv} quản trị viên gồm:\n${listad}`, event.threadID, event.messageID
    );
    */


    var threadInfo = await api.getThreadInfo(event.threadID);
    let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;
    dem = 1;
    for (let i = 0; i < qtv2.length; i++) {
        const info = (await api.getUserInfo(qtv2[i].id));
        const name = info[qtv2[i].id].name;
        listad += '' + `${dem++}` + '. ' + name + '\n';
    }

    api.sendMessage(
        `Danh sách ${qtv} quản trị viên gồm:\n${listad}`,event.threadID,event.messageID
    );

};

