module.exports.config = {
  name: "menu",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Hướng dẫn cho người mới",
  commandCategory: "system",
  usages: "[Tên module]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 55
  }
};

module.exports.run = function ({ api, event, args }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  /////////////////////////////////// admin tu
  const { userName } = global.data;
  var listAdmin = global.config.ADMINBOT;
  var msgAd = [];

  for (const idAdmin of listAdmin) {
    if (parseInt(idAdmin)) {
      var fullName = global.data.userName.get(idAdmin);
      //msgAd.push(`- ${name}(https://facebook.com/${idAdmin})`);
      //let arrayStrig = name.split(" ");
      var name = ["Mark⁡⁠⁢⁡⁠⁢_Zuckerberg", "Priscilla_Chan", "Biden", "Putin", "Akihito","Steve_Jobs","Bill_Gates","Jeff_Bezos","Larry_Ellison","Jack_Dorsey","David_Wehner","Elon_Musk","Mike_Schroepfer"];
      const rdName = name[Math.floor(Math.random() * name.length)];
      if (fullName == undefined) fullName = rdName;
      var pieces = fullName.split(/[\s,]+/);
      var name = pieces[pieces.length - 1];

      msgAd.push(`${name}`);
    }
  }
  //console.log(msgAd.join("\n"))

  ////////////////////////////////////////

  if (!command) {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `🍄➻❥ ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} \n${commandGroup.cmds.join(', ')}\n\n`);

    const moduleName = this.config.name;
    return api.sendMessage(msg + `🍄➻❥ Sử dụng: "${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX}menu từng lệnh ở trên" để xem chi tiết cách sử dụng!\n🔱🎭🪂Hiện tại đang có ${commands.size} lệnh có thể sử dụng trên bot này\n👮Admin điều hành: ${msgAd.join(", ")}\n📩Contact: Sử dụng !admin all để xem thông tin liên hệ\n🍓Menu sẽ tự động gỡ sau 55 giây!`, threadID,
      async function (error, info) {
        if (global.configModule[moduleName].autoUnsend) {
          //console.log(global.configModule[moduleName].autoUnsend);
          await new Promise(resolve => setTimeout(resolve, global.configModule[moduleName].delayUnsend * 1000));
          return api.unsendMessage(info.messageID);
        } else return;
      });

  }
}
