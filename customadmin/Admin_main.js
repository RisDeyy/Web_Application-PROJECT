const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const offcanvas = document.getElementById('of1');
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

const borderChangeElement = document.querySelector('.menu-toggle');
const closedBox = document.querySelector('.closeBtn');

let isBorderVisible = false;

borderChangeElement.addEventListener('mousedown', () => {
  if (!isBorderVisible) {
    borderChangeElement.style.border = '5px inset #E6E6FA'; // Thêm border khi nhấn vào
    isBorderVisible = true;
  }
});

closedBox.addEventListener('mousedown', () => {
  if (isBorderVisible) {
    borderChangeElement.style.border = '2px solid transparent'; // Xóa border khi nhấn vào box khác
    isBorderVisible = false;
  }

});


const text2 = document.getElementById('text2');
const texts = [
  'Phụng', 
  'Lực', 
  'Huy', 
  'Nghĩa',
  'Thịnh'
];
let currentTextIndex = 0;

function changeText() {
  text2.textContent = texts[currentTextIndex];
  currentTextIndex = (currentTextIndex + 1) % texts.length;
}

setInterval(changeText, 4000); 