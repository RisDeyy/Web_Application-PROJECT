const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const offcanvas = document.getElementById('of1');


openBtn.addEventListener('click', () => {
  offcanvas.style.left = '0';
 
});

closeBtn.addEventListener('click', () => {
  offcanvas.style.left = '-100%';
 
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