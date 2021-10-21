module.exports.config = {
    name: "setup",
    eventType: [""],
    version: "1.0.0",
    credits: "Mirai Team",
    description: "setup auto random join/leave",
    dependencies: {
        "fs-extra": "",
        "path": ""
    }
};

module.exports.onLoad = async function() {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    ///////////////join Noti start
    const pathJoin = resolve(__dirname, "cache/joinNoti");
    if (!existsSync(pathJoin)) mkdirSync(pathJoin, { recursive: true });
    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join2.mp4'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/join.mp4", resolve(__dirname, 'cache/joinNoti', 'join2.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join1.mp4'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/joinNoti.mp4", resolve(__dirname, 'cache/joinNoti', 'join1.mp4'));

    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join3.mp4'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/join3.mp4", resolve(__dirname, 'cache/joinNoti', 'join3.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join4.mp4'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/join4.mp4", resolve(__dirname, 'cache/joinNoti', 'join4.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join5.mp4'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/mp4/join5.mp4", resolve(__dirname, 'cache/joinNoti', 'join5.mp4'));
    ///////////////join Noti end

    ///////////////leave Noti start
    const pathLeave = resolve(__dirname, "cache/leaveNoti");
    if (!existsSync(pathLeave)) mkdirSync(pathLeave, { recursive: true });
    if (!existsSync(resolve(__dirname, 'cache/leaveNoti', 'leave1.gif'))) await downloadFile("https://github.com/manhkhac/mirai-1.2.8/raw/data/gif/leave.gif", resolve(__dirname, 'cache/leaveNoti', 'leave1.gif'));
    if (!existsSync(resolve(__dirname, 'cache/leaveNoti', 'leave2.gif'))) await downloadFile("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/gif/byebye.gif", resolve(__dirname, 'cache/leaveNoti', 'leave2.gif'));
    if (!existsSync(resolve(__dirname, 'cache/leaveNoti', 'leave3.gif'))) await downloadFile("https://raw.githubusercontent.com/manhkhac/mirai-1.2.8/data/gif/leave3.gif", resolve(__dirname, 'cache/leaveNoti', 'leave3.gif'));
    ///////////////leave Noti end

    return;
}

module.exports.run = async function({}) {}