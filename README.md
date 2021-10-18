# Installation

## Yêu cầu:
  - [NodeJS](https://nodejs.org/en/) và git(không bắt buộc).
  - Độ thông hiểu js, nodejs phải ở mức trên trung bình để có thể sử dụng.
  - Một tài khoản Facebook dùng để làm bot(Khuyên nên sử dụng acc đã bỏ hoặc không còn sử dụng để tránh mất acc hay acc bị khoá).

## Deployment
Click this button:
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/manhkhac/mirai-1.2.15
)
[![Run on Repl.it](https://repl.it/badge/github/manhkhac/mirai-1.2.15)](https://repl.it/github/manhkhac/mirai-1.2.15)

# Contributing
- Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.
- Liên hệ tới tôi khi bạn cần đóng góp tại: [GitHub](https://github.com/manhkhac) - [Facebook](https://fb.me/manhict) hoặc tạo pull request!

<h1>HƯỚNG DẪN CÁCH CÀI ĐẶT BOT MESSENGER TRÊN CÁC NỀN TẢNG</h1>

> :warning: **TRƯỚC KHI CHẠY BOT CÁC BẠN PHẢI CHẤP NHẬN VIỆC ACC FACEBOOK BỊ QUÉT VÀ DIE, MỌI KHIẾU NẠI VỀ ACC FACEBOOK BÊN MÌNH KHÔNG CHỊU TRÁCH NHIỆM**

<h1>Đối với Windows/VPS</h1> 

**Công cụ cần chuẩn bị cài đặt**

- 🍁 **[Nodejs](https://nodejs.org/en/)**
- 🍁 **[Python](https://www.python.org/)** - **không thiết yếu**
- 🍁 **Download zip** ở các link ở trên về máy rồi **giải nén** ra hoặc sử dụng: **git clone [link github]**
- 🍁 Vào thư mục **đã giải nén** hoặc **đã git clone** ở phía trên
- 🍁 **Click vào thanh địa chỉ đường dẫn tại đó** và gõ: **cmd** để mở Command Prompt trên máy tính của bạn**

**Cách cài đặt - gõ từng lệnh theo thứ tự dưới đây và đợi cài đặt**

- 🍁 **npm install windows-build-tools**
- 🍁 **npm install** - đợi khoảng 3-5p tùy theo tốc độ mạng
- 🍁 **npm audit fix**
- 🍁 **npm start** - đợi khoảng 3-5p tùy theo tốc độ mạng
- 🍁 **Lưu Ý: Khi cài đặt xong phải tắt đi và khởi động lại để tránh gặp lỗi không mong muốn.**

<h1>Đối với Replit - Dùng trên ĐT hoặc PC</h1> 

**Công cụ cần chuẩn cài đặt**

- 🍁 **Một tài khoản trên [Replit](https://replit.com/)**

**Thứ tự các thao tác trên [Replit](https://replit.com/)**

- 🍁 **+ New repl**
- 🍁 Qua tab **Import from github**
- 🍁 Nhập link **github** vào **from** và **click** vào nút **Import from github**
- 🍁 Đợi repl **Cloning**
- 🍁 Chọn **select language** là **Bash** và **configure the run button** là **npm start** xong rồi ấn **done**
- 🍁 Đợi tầm 10s nếu không tự **refesh trang thì refesh thủ công bằng phím F5 hoặc nút refesh trên thanh địa chỉ**

**Cách cài đặt - gõ từng lệnh theo thứ tự dưới đây và đợi cài đặt**

- 🍁 Chuyển qua tab **console** và gõ các lệnh theo thứ tự sau:
- 🍁 **npm install** - đợi khoảng 3-5p tùy theo tốc độ mạng
- 🍁 **npm audit fix**
- 🍁 **Ấn nút run trên màn hình** - đợi khoảng 3-5p tùy theo tốc độ mạng
- 🍁 **Lưu Ý: Khi cài đặt xong phải tắt đi và khởi động lại để tránh gặp lỗi không mong muốn.**

**Cách cài đặt treo 24/24 trên uptimerobot**

- 🍁 Vào chỉnh sửa file **mirai.js**
- 🍁 Thêm đoạn code sau vào dòng 1 của file **mirai.js**

```diff
const app = require ("express") ();  app.get ('/', (req, res) => {res.send ("RUN BOT");});app.listen(process.env. PORT);    
```

- 🍁 **npm install express**
- 🍁 **npm audit fix**
- 🍁 **Ấn nút run trên màn hình** - đợi khoảng 3-5p tùy theo tốc độ mạng
- 🍁 **Copy link** ở trang replit. Link có định dạng **https://miraiv2.nameuser.repl.co**
- 🍁 **Tạo tài khoản trên trang [UptimeRobot](https://uptimerobot.com/)**

**Thứ tự các thao tác trên [UptimeRobot](https://uptimerobot.com/)**


- 🍁 **+  Add New Monitor**
- 🍁 **Monitor Type** chọn **HTTP(s)**
- 🍁 **Friendly Name** đặt tùy ý
- 🍁 **URL (or IP)**: Dán link vừa copy bên **[Replit](https://replit.com/)** 
- 🍁 Ấn **tick** vào ô  **Select "Alert Contacts To Notify** (nhận thông báo từ email)
- 🍁 Ấn **Create Monitor** để hoàn thành quá trình tạo **uptime**

**Và cùng nhiều anh em tester, những người đã đóng góp đã đồng hành cùng project! Cảm ơn!**

## License

This project is licensed under the GNU General Public License v3.0 License - see the [LICENSE](LICENSE) file
