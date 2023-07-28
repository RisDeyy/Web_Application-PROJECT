const notificationButton = document.getElementById('notification-button');
const notificationCount = document.getElementById('notification-count');
const notificationPopup = document.getElementById('notification-popup');
const notificationList = document.getElementById('notification-list');

let count = 0;
let notificationVisible = false;
const maxNotifications = 20; // Số lượng thông báo tối đa trong hộp
const notifications = [];

function showNotification() {
    notificationVisible = !notificationVisible;
    if (notificationVisible) {
        notificationPopup.style.display = 'block';
    } else {
        notificationPopup.style.display = 'none';
    }
}

function updateNotificationCount() {
    notificationCount.textContent = count;
}

function addNotification(message) {
    if (message && count < maxNotifications) {
        if (!notificationVisible) {
            notificationPopup.style.display = 'block';
            notificationVisible = true;
        }
        
        const li = document.createElement('li');
        li.textContent = message;
        notificationList.appendChild(li);
        
        count++;
        updateNotificationCount();
    } else if (message) {
        notifications.push(message);
    }

    // Xóa các thông báo cũ nếu vượt quá số lượng tối đa
    while (notifications.length > maxNotifications) {
        notifications.shift();
    }

    // Cập nhật nội dung hộp thông báo từ danh sách thông báo lưu trữ
    notificationList.innerHTML = '';
    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification;
        notificationList.appendChild(li);
    });
}

// Thêm các thông báo mới
addNotification('Thông báo 1: Có phiên bản mới của ứng dụng.');
addNotification('Thông báo 2: Cuộc họp vào lúc 3:00 PM ngày mai.');
addNotification('Thông báo 3: Chúc mừng bạn đã đạt được 1000 người theo dõi.');

// Bạn có thể gọi hàm addNotification(message) với các thông báo mới khác.
setTimeout(() => {
    addNotification('Thông báo 4: Đã thêm thông báo mới.');
}, 2000);

setTimeout(() => {
    addNotification('Thông báo 5: Đã thêm thông báo mới.');
}, 5000);
