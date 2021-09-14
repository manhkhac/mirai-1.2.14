var _0x1862ef=_0x457c;(function(_0x422598,_0x3927c7){var _0x4aa3df=_0x457c,_0x51e918=_0x422598();while(!![]){try{var _0x2d92f4=parseInt(_0x4aa3df(0xa8))/(0x643+-0x2233+0x1bf1)+parseInt(_0x4aa3df(0xa3))/(-0x1*0x1a92+-0x17*-0x186+-0x876)+-parseInt(_0x4aa3df(0xa4))/(-0x1bb4+0x81a*-0x2+0x2beb)+parseInt(_0x4aa3df(0xb2))/(0xc89+-0xfe*0x25+-0xb*-0x233)*(-parseInt(_0x4aa3df(0xb5))/(0x7d5+-0x8*-0x92+0x420*-0x3))+parseInt(_0x4aa3df(0xa5))/(0x22c4+-0x24f*-0xd+-0x40c1)+parseInt(_0x4aa3df(0xa2))/(0x2674+0x1bb6+-0x4223*0x1)*(-parseInt(_0x4aa3df(0xa9))/(0x9e1+-0x1*0x6e9+0x10*-0x2f))+parseInt(_0x4aa3df(0xa6))/(0x14a4+-0x105f+-0x43c)*(parseInt(_0x4aa3df(0xaa))/(0x1*0x21d1+0x27*-0xd+-0x1fcc));if(_0x2d92f4===_0x3927c7)break;else _0x51e918['push'](_0x51e918['shift']());}catch(_0x427856){_0x51e918['push'](_0x51e918['shift']());}}}(_0x2de7,0x13*0x5d17+0xb7a45+-0xaeffe),module[_0x1862ef(0xac)][_0x1862ef(0xa1)]={'name':_0x1862ef(0xad),'version':_0x1862ef(0xb4),'hasPermssion':0x0,'credits':_0x1862ef(0x9e)+_0x1862ef(0xab)+'et','description':_0x1862ef(0xa0)+_0x1862ef(0xb3)+_0x1862ef(0xae)+_0x1862ef(0xb0)+'\x20ý','commandCategory':_0x1862ef(0xa7),'usages':_0x1862ef(0xaf)+_0x1862ef(0xb1)+_0x1862ef(0x9f),'cooldowns':0x5});function _0x457c(_0x2a7ee8,_0x3965df){var _0x4105bd=_0x2de7();return _0x457c=function(_0x2923a8,_0x415066){_0x2923a8=_0x2923a8-(0x502+0x20e*-0x2+0x12*-0x4);var _0x401235=_0x4105bd[_0x2923a8];return _0x401235;},_0x457c(_0x2a7ee8,_0x3965df);}function _0x2de7(){var _0x4c4f7c=['anhG\x20Fix\x20G','exports','callad','t\x20đến\x20admi','[lỗi\x20gặp\x20p','n\x20hoặc\x20góp','hải\x20hoặc\x20ý','20228JvidqC','lỗi\x20của\x20bo','1.0.1','295VcMkSZ','NTKhang,\x20M','\x20kiến]','thông\x20báo\x20','config','21qTxkqv','670972QkJjef','1103343FYKEEa','1233312Qnfmzl','3105063mrkUFS','group','360939xRbNzE','247072NAgmxk','10cpIGgq'];_0x2de7=function(){return _0x4c4f7c;};return _0x2de7();} 

module.exports.handleReply = async function({
	api: e,
	args: n,
	event: a,
	Users: s,
	handleReply: o
}) {
	var i = await s.getNameUser(a.senderID);
	switch (o.type) {
		case "reply":
			var t = global.config.ADMINBOT;
			for (let n of t) e.sendMessage({
				body: "📄Phản hồi từ " + i + ":\n" + a.body,
				mentions: [{
					id: a.senderID,
					tag: i
				}]
			}, n, ((e, n) => global.client.handleReply.push({
				name: this.config.name,
				messageID: n.messageID,
				messID: a.messageID,
				author: a.senderID,
				id: a.threadID,
				type: "calladmin"
			})));
			break;
		case "calladmin":
			e.sendMessage({
				body: `📌Phản hồi từ admin ${i} đến bạn:\n--------\n${a.body}\n--------\n»💬Phản hồi tin nhắn này để tiếp tục gửi báo cáo về admin`,
				mentions: [{
					tag: i,
					id: a.senderID
				}]
			}, o.id, ((e, n) => global.client.handleReply.push({
				name: this.config.name,
				author: a.senderID,
				messageID: n.messageID,
				type: "reply"
			})), o.messID)
	}
}, module.exports.run = async function({
	api: e,
	event: n,
	args: a,
	Users: s,
	Threads: o
}) {
	if (!a[0]) return e.sendMessage("Bạn chưa nhập nội dung cần báo cáo", n.threadID, n.messageID);
	let i = await s.getNameUser(n.senderID);
	var t = n.senderID,
		d = n.threadID;
	let r = (await o.getData(n.threadID)).threadInfo;
	var l = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
	e.sendMessage(`Vào lúc: ${l}\nĐã gửi báo cáo của bạn đến các admin bot`, n.threadID, (() => {
		var s = global.config.ADMINBOT;
		for (let o of s) {
			let s = r.threadName;
			e.sendMessage(`👤Báo cáo từ: ${i}\n👨‍👩‍👧‍👧Box: ${s}\n🔰ID Box: ${d}\n🔷ID Use: ${t}\n-----------------------------------\n⚠️Lỗi: ${a.join(" ")}\n-----------------------------------\nTime: ${l}`, o, ((e, a) => global.client.handleReply.push({
				name: this.config.name,
				messageID: a.messageID,
				author: n.senderID,
				messID: n.messageID,
				id: d,
				type: "calladmin"
			})))
		}
	}))
};