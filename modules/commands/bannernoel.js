const emtyArrgs = "Nội dung không được để trống"; // tin nhắn trả về khi người dùng nhập thiếu dữ liệu 
const sendWaiting = true; // bật hoặc tắt gửi tin nhắn "đang tạo hình ảnh, vui ồng chờ đợi...";
const textWaiting = "⏳Đang khởi tạo hình ảnh, vui lòng chờ đợi trong giây lát";
const unsendWaitingWhenSucces = false; // bật hoặc tắt gỡ tin nhắn waiting sau khi tạo xong ảnh
const bodyWhenSucces = "💟Banner Noel của bạn đây 🎅"; // 
const XfillText = 1560;

module.exports.config = {
  name: "bannernoel",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang banner NDT",
  description: "Tạo banner noel với tên của bạn",
  commandCategory: "create image",
  usages: "<nội dung>\nVí dụ: bannernoel Procoder",
  cooldowns: 5
};

module.exports.run = async ({ event, api, args }) => {
  const _0x5f011a = _0x53e9,
    _0x1d07f9 = _0x53e9,
    {
        writeFileSync,
        existsSync,
        mkdirSync,
        createReadStream,
        unlinkSync
    } = require(_0x5f011a(0xa3) + 'ra'),
    axios = require('axios'),
    Canvas = require(_0x1d07f9(0xa4)),
    {
        threadID,
        messageID,
        senderID
    } = event;
sendWaiting ? api[_0x5f011a(0xa5) + _0x5f011a(0xa6)](textWaiting, threadID, (_0x51d93c, _0x45c50b) => messageIDUnsend = _0x45c50b['messag' + _0x5f011a(0xa7)], messageID) : '';
const allAdmin = [...global[_0x1d07f9(0xa8)][_0x5f011a(0xa9) + 'OT'], ...api[_0x1d07f9(0xaa) + _0x5f011a(0xab) + _0x1d07f9(0xac)]()],
    listBanned = (await axios[_0x1d07f9(0xad)]('https:' + '//gith' + 'ub.com' + _0x1d07f9(0xae) + 'nggggg' + _0x5f011a(0xaf) + _0x1d07f9(0xb0) + 'les-mi' + _0x1d07f9(0xb1) + 'w/main' + _0x1d07f9(0xb2) + _0x1d07f9(0xb3)))[_0x1d07f9(0xb4)]['banner' + _0x5f011a(0xb5)];

function _0x3f37() {
    const _0x2782ac = ['zNmTzxH0', 'y2fUDMfZ', 'C2vUze1L', 'C3nHz2u', 'zuLe', 'y29UzMLN', 'qurnsu5c', 'z2v0q3vY', 'CMvUDfvZ', 'zxjjra', 'z2v0', 'l250A2HH', 'l3n0yxr1', 'CY1TB2r1', 'CMfPl3jH', 'l21HAw4U', 'ANnVBG', 'zgf0yq', 'yw5PBwu', 'Aw5JBhvK', 'yMXVy2S', 'ig7dOhKGXje', 'W7nUzYbI4BUF', 'Asb0W6fJia', 'z2NHUQmSihy', 'DwKGBmoYBG', 'zYbSACoQBG', 'igJHU4CGzMi', 'mdaWmtaZ', 'odi0otC1', 'yMNHUR90ihq', 'AmoQBsbJAa', 'Asb0AEg6V3q', 'iglHU4SGyxu', 'DgHVCIbT', 'B2r1BgvZ', 'igpHUQvTihm', '4BUTigtHU6vUzW', 'igZHU4DUAca', 'tog7H25Oig4', 'W6b5imsrW6mG', 'Ag9YigpHUQu', 'BsbZ4BUTigq', '4BULBMCGDhi', 'W6PUigjVDa', 'ig7dOhK'];
    _0x3f37 = function () {
        return _0x2782ac;
    };
    return _0x3f37();
}
if (!listBanned || listBanned[_0x5f011a(0xb6) + 'es'](_0x5f011a(0xb7))) return api[_0x5f011a(0xa5) + _0x1d07f9(0xa6)]('Module' + _0x5f011a(0xb8) + 'ã bị đ' + _0x1d07f9(0xb9) + _0x1d07f9(0xba) + _0x1d07f9(0xbb) + _0x1d07f9(0xbc) + _0x1d07f9(0xbd) + _0x1d07f9(0xbe) + '.com/1' + _0x1d07f9(0xbf) + _0x5f011a(0xc0) + '17 để ' + _0x1d07f9(0xc1) + _0x1d07f9(0xc2) + _0x5f011a(0xc3), threadID, messageID);
if (listBanned['includ' + 'es'](senderID)) return api[_0x1d07f9(0xa5) + _0x5f011a(0xa6)]('Bạn đã' + _0x5f011a(0xc4) + _0x1d07f9(0xc5) + _0x1d07f9(0xc6) + _0x1d07f9(0xc7) + _0x1d07f9(0xc8) + _0x1d07f9(0xc9) + 'này', threadID, messageID);

function _0x53e9(_0x4e62d8, _0x3f37f1) {
    const _0x53e906 = _0x3f37();
    return _0x53e9 = function (_0x26718b, _0x1459be) {
        _0x26718b = _0x26718b - 0xa3;
        let _0x1e779a = _0x53e906[_0x26718b];
        if (_0x53e9['QUjpUO'] === undefined) {
            var _0x2b5342 = function (_0x45c50b) {
                const _0x400081 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
                let _0x3e8a06 = '',
                    _0x59f0e1 = '';
                for (let _0x8447e6 = 0x0, _0x549c74, _0x95a906, _0x81e3d3 = 0x0; _0x95a906 = _0x45c50b['charAt'](_0x81e3d3++); ~_0x95a906 && (_0x549c74 = _0x8447e6 % 0x4 ? _0x549c74 * 0x40 + _0x95a906 : _0x95a906, _0x8447e6++ % 0x4) ? _0x3e8a06 += String['fromCharCode'](0xff & _0x549c74 >> (-0x2 * _0x8447e6 & 0x6)) : 0x0) {
                    _0x95a906 = _0x400081['indexOf'](_0x95a906);
                }
                for (let _0x1a856f = 0x0, _0x3dc1cd = _0x3e8a06['length']; _0x1a856f < _0x3dc1cd; _0x1a856f++) {
                    _0x59f0e1 += '%' + ('00' + _0x3e8a06['charCodeAt'](_0x1a856f)['toString'](0x10))['slice'](-0x2);
                }
                return decodeURIComponent(_0x59f0e1);
            };
            _0x53e9['gjuwke'] = _0x2b5342, _0x4e62d8 = arguments, _0x53e9['QUjpUO'] = !![];
        }
        const _0x2d08d0 = _0x53e906[0x0],
            _0x4659c1 = _0x26718b + _0x2d08d0,
            _0x51d93c = _0x4e62d8[_0x4659c1];
        return !_0x51d93c ? (_0x1e779a = _0x53e9['gjuwke'](_0x1e779a), _0x4e62d8[_0x4659c1] = _0x1e779a) : _0x1e779a = _0x51d93c, _0x1e779a;
    }, _0x53e9(_0x4e62d8, _0x3f37f1);
}
for (let id of allAdmin) {
    if (listBanned[_0x5f011a(0xb6) + 'es'](id)) return api['sendMe' + _0x5f011a(0xa6)](_0x5f011a(0xca) + _0x5f011a(0xcb) + 'bị aut' + _0x1d07f9(0xcc) + _0x5f011a(0xcd) + _0x1d07f9(0xce) + _0x5f011a(0xcf) + _0x1d07f9(0xd0), threadID, messageID);
}
  const name = args.join(" ");
  if (!name) return api.sendMessage(emtyArrgs, threadID, messageID);
  let messageIDUnsend;
  
  const folder = __dirname + "/bannernoel";
  const pathFont = folder + "/UTM Androgyne.ttf";
  const pathBackground = folder + "/background.png";
  const pathSave = __dirname + `/cache/bannernoel${Date.now()}.png`;
  async function CheckExistAndDownload(link, dir) {
    if (!existsSync(dir)) {
      try {
        const getBuffer = await axios.get(link, { responseType: "arraybuffer" });
        writeFileSync(dir, Buffer.from(getBuffer.data));
      }
      catch(err) {
        sendMessage("Rất tiết đã xảy ra lỗi trong quá trình tải xuống", threadID, messageID);
      }
    }
  }
  if (!existsSync(folder)) mkdirSync(folder);
  await CheckExistAndDownload("https://drive.google.com/uc?export=download&id=1hGMaftjaHkk2CLBiKfA2zjgRMvKNv4Ol", pathFont);
  await CheckExistAndDownload("https://drive.google.com/uc?export=download&id=1wUC2Ht7Fl5M42wsxIY1wfMHZgkmufZIw", pathBackground);
  const _0x3ed457=_0x331b,_0x5d95ce=_0x331b,background=await Canvas[_0x3ed457(0x18b)](pathBackground),{width,height}=background,canvas=Canvas[_0x3ed457(0x18c)](width,height);Canvas[_0x5d95ce(0x18d)](pathFont,{'\x66\x61\x6d\x69\x6c\x79':'\x42\x65\x56\x69\x65\x74\x6e\x61\x6d\x50\x72\x6f\x2d\x53\x65\x6d\x69\x42\x6f\x6c\x64\x49\x74\x61\x6c\x69\x63'});const ctx=canvas[_0x3ed457(0x18e)]('\x32\x64');let fontSize=0x14;ctx[_0x3ed457(0x18f)]=_0x5d95ce(0x190),ctx[_0x5d95ce(0x191)](background,0x0,0x0,width,height);function _0x331b(_0x14803c,_0x199885){const _0x331bd3=_0x1998();return _0x331b=function(_0x26243c,_0x2909a6){_0x26243c=_0x26243c-0x18b;let _0x390f33=_0x331bd3[_0x26243c];return _0x390f33;},_0x331b(_0x14803c,_0x199885);}let stopLoop=![];for(;stopLoop==![];++fontSize){ctx[_0x3ed457(0x192)]=fontSize+_0x3ed457(0x193);const widthText=ctx[_0x3ed457(0x194)](name)['\x77\x69\x64\x74\x68'];if(widthText>0x2d0||fontSize>0x50)stopLoop=!![];}function _0x1998(){const _0x397f9b=['\x6c\x6f\x61\x64\x49\x6d\x61\x67\x65','\x63\x72\x65\x61\x74\x65\x43\x61\x6e\x76\x61\x73','\x72\x65\x67\x69\x73\x74\x65\x72\x46\x6f\x6e\x74','\x67\x65\x74\x43\x6f\x6e\x74\x65\x78\x74','\x66\x69\x6c\x6c\x53\x74\x79\x6c\x65','\x23\x66\x66\x66\x66\x66\x66','\x64\x72\x61\x77\x49\x6d\x61\x67\x65','\x66\x6f\x6e\x74','\x70\x78\x20\x42\x65\x56\x69\x65\x74\x6e\x61\x6d\x50\x72\x6f\x2d\x53\x65\x6d\x69\x42\x6f\x6c\x64\x49\x74\x61\x6c\x69\x63','\x6d\x65\x61\x73\x75\x72\x65\x54\x65\x78\x74','\x74\x65\x78\x74\x41\x6c\x69\x67\x6e','\x74\x6f\x42\x75\x66\x66\x65\x72','\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67\x65'];_0x1998=function(){return _0x397f9b;};return _0x1998();}ctx[_0x3ed457(0x195)]='\x63\x65\x6e\x74\x65\x72',ctx['\x66\x69\x6c\x6c\x54\x65\x78\x74'](name,XfillText,0x309),writeFileSync(pathSave,canvas[_0x3ed457(0x196)]()),unsendWaitingWhenSucces?api['\x75\x6e\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67\x65'](messageIDUnsend):'',api[_0x3ed457(0x197)]({'\x62\x6f\x64\x79':bodyWhenSucces,'\x61\x74\x74\x61\x63\x68\x6d\x65\x6e\x74':createReadStream(pathSave)},threadID,()=>unlinkSync(pathSave),messageID);
};