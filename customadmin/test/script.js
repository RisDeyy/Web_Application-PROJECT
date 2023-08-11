
  // Lấy tham chiếu đến các phần tử
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');
  const offcanvas = document.getElementById('myOffcanvas');
  const content = document.getElementById('content');

  // Xử lý sự kiện khi nhấp vào nút "Open"
  openBtn.addEventListener('click', () => {
    
    offcanvas.classList.add('active');
    content.classList.add('active');
  });

  // Xử lý sự kiện khi nhấp vào nút "Close"
  closeBtn.addEventListener('click', () => {
    offcanvas.classList.remove('active');
    content.classList.remove('active');
  });

