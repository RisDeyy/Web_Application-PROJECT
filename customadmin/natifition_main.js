const notificationButton = document.getElementById('notification-button');
const notificationCount = document.getElementById('notification-count');
const notificationPopup = document.getElementById('notification-popup');
const notificationList = document.getElementById('notification-list');

let count = 0;
let notificationVisible = false;
const maxNotifications = 10; 
const notifications = [];

function showNotification() {
    if (notificationList.children.length >= maxNotifications) {
        let a = notificationList.children.length - maxNotifications;
        for (let i = 0; i < a; i++) {
            notificationList.removeChild(notificationList.children[1]);
        }
    }
    if (!notificationVisible) {
        notificationPopup.style.display = 'block';
        
    } else {
        notificationPopup.style.display = 'none';
        
    }
    notificationVisible = !notificationVisible;
    count= 0;
    notificationCount.classList.add('hidden');
    updateNotificationCount();
}
function updateNotificationCount() {
    notificationCount.textContent = count;
}
function addNotification(message) {
    if( notificationPopup.style.display === 'none'){

    
    const li = document.createElement('li');
    li.textContent = message;
    notificationList.appendChild(li);
    count++;
    notificationCount.textContent = count;
    notificationCount.classList.remove('hidden');}
    else{
        const li = document.createElement('li');
        li.textContent = message;
        notificationList.appendChild(li);
    }
    while (notifications.length > maxNotifications) {
        notifications.shift();
    }
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
