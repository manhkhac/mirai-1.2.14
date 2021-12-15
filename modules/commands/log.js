module.exports.config = {
  name: "log",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "manhG",
  description: "log",
  commandCategory: "noprefix",
  usages: "",
  cooldowns: 3,
  denpendencies: {
  }
};

module.exports.run = async function ({ api, event, Threads, getText, args }) {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, senderID } = event;
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  /*////////////////////////////////////////// start on/off
  if (args[0] == "events" || args[0] == "bot" || args[0] == "-e") {
    var allThreadID = global.data.allThreadID;
    for (const singleThread of allThreadID) {
      let data = (await Threads.getData(singleThread)).data;
      if (typeof data["log"] == "undefined" || data["log"] == true) data["log"] = false;
      else data["log"] = true;
      await Threads.setData(singleThread, { data });
      global.data.threadData.set(singleThread, data);
      return api.sendMessage(`${(data["log"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
    }
  }
  *//////////////////////////////////////// end on/off
  //console.log(data)
  //var prefix = data.PREFIX;
  /////////////////////// Evens
  var log = data.log;
  var joinNoti = data.joinNoti;
  var leaveNoti = data.leaveNoti;
  //////////////////////
  var rankup = data.rankup;
  var resend = data.resend;

  var roleplay = data.roleplay;
  var goibot = data.goibot;
  var tagadmin = data.tagadmin;
  var goodnight = data.goodnight;var hi = data.hi;
  var simplove = data.simplove;
  var fixspam = data.fixspam;
  var spamban = data.spamban;

  //prefix == null ? rankup = `!` : rankup = `${prefix}`;
  log == null ? log = `true` : log = `${log}`;
  rankup == null ? rankup = `false` : rankup = `${rankup}`;
  resend == null ? resend = `false` : resend = `${resend}`;
  //////////////////////////// event
  joinNoti == null ? joinNoti = `true` : joinNoti = `${joinNoti}`;
  leaveNoti == null ? leaveNoti = `true` : leaveNoti = `${leaveNoti}`;
  ////////////////////////////
  roleplay == null ? roleplay = `true` : roleplay = `${roleplay}`;
  goibot == null ? goibot = `true` : goibot = `${goibot}`;
  tagadmin == null ? tagadmin = `true` : tagadmin = `${tagadmin}`;
  goodnight == null ? goodnight = `true` : goodnight = `${goodnight}`;
  hi == null ? hi = `true` : hi = `${hi}`;
  simplove == null ? simplove = `true` : simplove = `${simplove}`;
  fixspam == null ? fixspam = `true` : fixspam = `${fixspam}`;
  spamban == null ? spamban = `true` : spamban = `${spamban}`;

  return api.sendMessage(`╭─────╮\n   Command\n╰─────╯\n❯ rankup: ${rankup}\n❯ resend: ${resend}\n❯ roleplay: ${roleplay}\n❯ goibot: ${goibot}\n❯ tagadmin: ${tagadmin}\n❯ goodnight: ${goodnight}\n❯ sad: ${sad}\n❯ hi: ${hi}\n❯ fixspam: ${fixspam}\n❯ spamban: ${spamban}\n╭─────╮\n   Evens\n╰─────╯\n❯ log: ${log}\n❯ joinNoti: ${joinNoti}\n❯ leaveNoti: ${leaveNoti}`, threadID, messageID);
}

module.exports.languages = {
  "vi": { "on": "Bật", "off": "Tắt", "successText": "log events thành công", },
  "en": { "on": "on", "off": "off", "successText": "log events success!", }
}
