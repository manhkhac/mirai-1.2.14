module.exports.config = {
  name: 'manhg',
  version: '1.0.1',
  hasPermssion: 2,
  credits: 'ManhG',
  description: 'Tải hoặc cập nhật tất cả module của ManhG',
  commandCategory: 'admin',
  usages: '[install/uninstall/update/bỏ trống]',
  cooldowns: 1,
  dependencies: {
    'axios': '',
    "fs-extra": '',
    'path': ''
  }
};

module.exports.run = async function ({ event, api, Users, args, Threads }) {
  
}
