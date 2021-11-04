module.exports.config = {
    name: "ask",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "10 vạn Câu hỏi thú vị",
    commandCategory: "General",
    usages: "",
    cooldowns: 5,
};
/*
module.exports.handleEvent = function({ api, event }) {
    const { commands } = global.client;

    if (!event.body) return;

    const { threadID, messageID, body } = event;

    if (body.indexOf("ask") != 0) return;

    const splitBody = body.slice(body.indexOf("ask")).trim().split(/\s+/);


    if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const command = commands.get(splitBody[1].toLowerCase());

    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    return api.sendMessage(`⁂➻❥ ${command.config.name}\n${command.config.description}\n\n❯ Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯ Thuộc nhóm: ${command.config.commandCategory}\n❯ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯ Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n❯ Prefix: ${prefix}\n\n» Module code by ${command.config.credits} «`, threadID, messageID);
};
*/

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const command = commands.get((args[0] || "").toLowerCase());
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    if (!command) {
        //const command = commands.values();
        var tl = ["Con bot này thông minh hơn bạn", "tôi không có khả năng hiểu con gái", "con bot này giúp bạn hỗ trợ trong việc học?", "spam bot tôi sẽ ban bạn khỏi người dùng bot", "đừng để tôi cáu nhé!", "việc bạn đang làm là vô nghĩa", "bạn đã làm tôi cáu😡", "tôi yêu bạn vai lon", "bạn có yêu tôi không ?", "cái gì chưa biết chỉ cần biết là được", "con chuột bị ốm uống thuốc chuột thì tại sao con chuột lại chết ?", "chảy máu cam nhưng sao màu máu là màu đỏ ?", "228922 là một con số tuyệt vời.", "Đây là một lệnh vô dụng", "Đã từng có 600+ code JAV ở phiên bản đầu tiên của SpermBot", "Đây là con bot tự viết code cho chính nó", "7749 là con số đẹp cho tình yêu", "bạn có yêu tôi không ?", "bạn rất ngu", "Con gì ăn lửa với nước than?", " Bỏ ngoài nướng trong, ăn ngoài bỏ trong là gì?", "Con gì đập thì sống, không đập thì chết?", "Nắng ba năm tôi không bỏ bạn, mưa 1 ngày sao bạn lại bỏ tôi là cái gì?", "Cổ gì dài nhất?", " Bố mẹ có sáu người con trai, mỗi người con trai có một em gái. Hỏi gia đình đó có bao nhiêu người?", "Miệng rộng nhưng không nói một từ, là gì?", "Cái đầu giống mèo, chân giống mèo, và tai giống con mèo, nhưng không phải con mèo. Vậy là con gì?", "Bức tranh nàng Monalisa, người đẹp này không có gì?", "A gọi B bằng bác, B gọi C là ông nội, C kêu D là cậu, D kêu E là dì, E kêu F là chú, F gọi Z là con. Hỏi A gọi Z bằng gì?", "Làm thế nào để con cua được chính chân?", "Nếu bạn nhìn thấy con chim đang đậu trên nhánh cây, làm sao để lấy nhánh cây mà không làm động con chim?", "5 chia 3 bằng 2 khi nào?", "Cái gì đánh cha, đánh má, đánh anh, đánh chị, đánh em?", "Có 2 USD (tiền giấy loại 1 USD) trong cả 2 chiếc ví. Nhưng có một chiếc ví có số tiền gấp đôi chiếc ví còn lại. Làm sao điều này có thể xảy ra?", "Con cua đỏ dài 10cm chạy đua với con cua xanh dài 15cm. Con nào về đích trước?", "Núi nào bị chặt ra từng khúc?", "Loại nước giải khát nào chứa sắt và canxi?", "Rất thích hôn gọi là gì?", "Rất thích hôn gọi là gì?", "Chứng minh: Con gái bằng con dê", "Câu chữ nào mà những người vui sướng khi nhìn thấy nó sẽ trở nên buồn bã và ngược lại, những người buồn bã u sầu khi thấy nó sẽ trở nên vui vẻ hơn.", "Hãy chứng minh 4 : 3 = 2", "Ai có nhà di động đầu tiên?", "Làm sao để cái cân tự cân chính nó?", "Sở thú bị cháy, con gì chạy ra đầu tiên?", "30 chia 1/2 và cộng thêm 10, bằng bao nhiêu?", "Cái gì người mua biết, người bán biết, người xài không bao giờ biết?", "Cái gì tay trái cầm được còn tay phải cầm không được?", "Cái gì dài như trái chuối, cầm 1 lúc thì nó chảy nước ra?", "Từ gì mà 100% nguời dân Việt Nam đều phát âm sai?", "Trên đồng cỏ có 6 con bò, đếm đi đếm lại chỉ có 12 cái chân. Câu hỏi tại sao?", "Cái gì mà đi thì nằm, đứng cũng nằm, nhưng nằm lại đứng?", "Có 1 con trâu, đầu nó thì hướng về hướng mặt trời mọc, nó quay trái 2 vòng sau đó quay ngược lại sau đó lại quay phải hai vòng hỏi cái đuôi của nó chỉ hướng nào?", "Nơi nào có đường xá nhưng không có xe cộ, có nhà ở nhưng không có người, có siêu thị, công ty nhưng không có hàng hóa. Đó là nơi nào vậy?", "Ở Việt Nam, một thằng mù và ba thằng điếc đi ăn phở, mỗi người ăn một tô. Mỗi tô phở là 10 ngàn đồng. Hỏi ăn xong họ phải trả bao nhiêu tiền?", "Có 1 người đứng ở chân cầu. Ở giữa cầu có một con gấu rất hung dữ không cho ai qua cầu hết. Người đó sẽ mất hết 5 phút để đi từ chân cầu cho đến giữa cầu và con gấu cũng chỉ ngủ có 5 phút là tỉnh dậy. Hỏi người đó làm sao để qua được bên kia?", "Vịt nào đi bằng hai chân?", "Cái gì bạn không mượn mà trả?", "Cái gì trong trắng ngoài xanh, trồng đậu trồng hành rồi thả heo vào?", "Con trai và đàn ong có điểm gì khác nhau?", "Có 1 bà không biết bơi, xuống nước là bả chết. Một hôm bà đi tàu, bỗng nhiên tàu chìm, nhưng bà không chết. Tại sao?", "Con gì đầu dê mình ốc?", "2 con vịt đi trước 2 con vịt, 2 con vịt đi sau 2 con vịt, 2 con vịt đi giữa 2 con vịt. Hỏi có mấy con vịt?", "Trên nhấp dưới giật là đang làm gì?", "Nắng ba năm tôi không bỏ bạn, mưa 1 ngày sao bạn lại bỏ tôi là cái gì?", "Con gì đập thì sống, không đập thì chết?"];
        var tle = tl[Math.floor(Math.random() * tl.length)];
        var lon = `[Bạn có biết?]: ${tle}.`;
        return api.sendMessage(lon, event.threadID, event.messageID);
    }
    /*const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    return api.sendMessage(`⁂➻❥ ${command.config.name} \n${command.config.description}\n\n❯ Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯ Thuộc nhóm: ${command.config.commandCategory}\n❯ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯ Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n❯ Prefix: ${prefix}\n\n» Module code by ${command.config.credits} «`, threadID, messageID);
    */
};