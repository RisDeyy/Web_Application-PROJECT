const express = require('express');
const app = express();

// Định tuyến GET tới trang chủ
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Định tuyến GET để xử lý yêu cầu lấy nội dung của box cần thay đổi
app.get('/get-box-content', (req, res) => {
    // Dữ liệu mới cho nội dung box (có thể là dữ liệu lấy từ cơ sở dữ liệu hoặc các thay đổi khác)
    const newBoxContent = `
        <h2>Updated Content</h2>
        <p>This is the updated content of the box.</p>
    `;
    // Gửi dữ liệu về cho trình duyệt
    res.send(newBoxContent);
});

// Khởi động server
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
