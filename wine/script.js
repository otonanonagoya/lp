$(function () {
const prevBtn = document.querySelector('.archive-nav.prev');
const nextBtn = document.querySelector('.archive-nav.next');
function initMagazine() {
let bookWidth;
if (window.innerWidth <= 768) {
bookWidth = window.innerWidth * 0.9;
} else {
bookWidth = Math.min(window.innerWidth * 0.8, 1000);
}
const pageWidth = bookWidth / 2;
const bookHeight = pageWidth * 1.414; // A4比率
$('#magazine').turn({
width: bookWidth,
height: bookHeight,
autoCenter: true,
display: 'double',
gradients: true,
duration: 1000,
page: 2,
when: {
turned: function () {
updateNav();
}
}
});
}
function updateNav() {
const currentPage = $('#magazine').turn('page');
const totalPages = $('#magazine').turn('pages');
// 最初の見開き
if (currentPage <= 2) {
prevBtn.classList.add('hidden');
} else {
prevBtn.classList.remove('hidden');
}
// 最後の見開き
if (currentPage >= totalPages - 1) {
nextBtn.classList.add('hidden');
} else {
nextBtn.classList.remove('hidden');
}
}
// 初期化
initMagazine();
updateNav();
// イベント
prevBtn.addEventListener('click', () => $('#magazine').turn('previous'));
nextBtn.addEventListener('click', () => $('#magazine').turn('next'));
// リサイズ対応
let resizeTimer;
window.addEventListener('resize', () => {
clearTimeout(resizeTimer);
resizeTimer = setTimeout(() => {
location.reload(); // turn.jsのサイズ再計算はリロードが最も確実
}, 200);
});
// Intersection Observer
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) entry.target.classList.add('show');
});
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
