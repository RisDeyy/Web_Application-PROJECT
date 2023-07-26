function changeScreen(screenNumber) {
  // Ẩn tất cả các màn hình
  const screens = document.querySelectorAll('.screen');
  screens.forEach((screen) => {
    screen.classList.add('hidden');
  });

  // Hiển thị màn hình tương ứng
  const targetScreen = document.getElementById(`screen${screenNumber}`);
  targetScreen.classList.remove('hidden');
}
