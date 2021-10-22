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

module.exports.run = async function ({ api, event, Threads, getText }) {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, senderID } = event;
  //if (senderID == global.data.botID) return;

  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  //console.log(data)
  //var prefix = data.PREFIX;
  var rankup = data.rankup;
  var resend = data.resend;
  var log = data.log;

  var roleplay = data.roleplay;
  var ngudot = data.ngudot;
  var aothatday = data.aothatday;
  var goibot = data.goibot;
  var tagadmin = data.tagadmin;
  var goodnight = data.goodnight;
  var sad = data.sad;
  var trandan = data.trandan;
  var ooo = data.o;
  var banlanhat = data.banlanhat;
  var hi = data.hi;
  var simplove = data.simplove;
  var bruh = data.bruh;
  var oidoioi = data.oidoioi;
  var huan = data.huan;
  var nguquahtrua = data.nguquahtrua;
  var thamlam = data.thamlam;
  var fixspam = data.fixspam;
  var spamban = data.spamban;

  //prefix == null ? rankup = `!` : rankup = `${prefix}`;
  log == null ? log = `true` : log = `${log}`;
  rankup == null ? rankup = `false` : rankup = `${rankup}`;
  resend == null ? resend = `false` : resend = `${resend}`;

  roleplay == null ? roleplay = `true` : roleplay = `${roleplay}`;
  ngudot == null ? ngudot = `true` : ngudot = `${ngudot}`;
  thamlam == null ? thamlam = `true` : thamlam = `${thamlam}`;
  aothatday == null ? aothatday = `true` : aothatday = `${aothatday}`;
  goibot == null ? goibot = `true` : goibot = `${goibot}`;
  tagadmin == null ? tagadmin = `true` : tagadmin = `${tagadmin}`;
  goodnight == null ? goodnight = `true` : goodnight = `${goodnight}`;
  sad == null ? sad = `true` : sad = `${sad}`;
  trandan == null ? trandan = `true` : trandan = `${trandan}`;
  ooo == null ? ooo = `true` : ooo = `${ooo}`;
  banlanhat == null ? banlanhat = `true` : banlanhat = `${banlanhat}`;
  hi == null ? hi = `true` : hi = `${hi}`;
  simplove == null ? simplove = `true` : simplove = `${simplove}`;
  bruh == null ? bruh = `true` : bruh = `${bruh}`;
  oidoioi == null ? oidoioi = `true` : oidoioi = `${oidoioi}`;
  huan == null ? huan = `true` : huan = `${huan}`;
  nguquahtrua == null ? nguquahtrua = `true` : nguquahtrua = `${nguquahtrua}`;
  fixspam == null ? fixspam = `true` : fixspam = `${fixspam}`;
  spamban == null ? spamban = `true` : spamban = `${spamban}`;

  return api.sendMessage(`❯ log: ${log}\n❯ rankup: ${rankup}\n❯ resend: ${resend}\n❯ roleplay: ${roleplay}\n❯ goibot: ${goibot}\n❯ ngudot: ${ngudot}\n❯ aothatday: ${aothatday}\n❯ tagadmin: ${tagadmin}\n❯ goodnight: ${goodnight}\n❯ sad: ${sad}\n❯ trandan: ${trandan}\n❯ ỏ: ${ooo}\n❯ banlanhat: ${banlanhat}\n❯ hi: ${hi}\n❯ simplove: ${simplove}\n❯ oidoioi: ${oidoioi}\n❯ bruh: ${bruh}\n❯ huấn: ${huan}\n❯ nguquahtrua: ${nguquahtrua}\n❯ thamlam: ${thamlam}\n❯ fixspam: ${fixspam}\n❯ spamban: ${spamban}`, threadID, messageID);
}