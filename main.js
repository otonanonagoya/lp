const targets = document.querySelectorAll(
  '.image-zoom, .text, .overlay-text'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin: "0px 0px -25% 0px"
});

targets.forEach(el => observer.observe(el));

// カウントアップ関数
const countUp = (el) => {
const target = parseFloat(el.getAttribute('data-target'));
const duration = 2000; // 2秒かけてカウント
const startTime = performance.now();
const updateCount = (currentTime) => {
const elapsed = currentTime - startTime;
const progress = Math.min(elapsed / duration, 1);
// イージング（後半ゆっくり）
const easeOutQuad = 1 - (1 - progress) * (1 - progress);
const currentValue = (easeOutQuad * target).toFixed(1);
el.innerText = target % 1 === 0 ? Math.floor(currentValue) : currentValue;
if (progress < 1) {
requestAnimationFrame(updateCount);
} else {
el.innerText = target; // 最後に正確な値をセット
}
};
requestAnimationFrame(updateCount);
};
// 既存のObserverにカウントアップのトリガーを追加
const targets = document.querySelectorAll(
'.image-zoom, .text, .overlay-text'
);
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('active');
// カウントアップ対象が含まれている場合
const counters = entry.target.querySelectorAll('.count-up');
counters.forEach(counter => countUp(counter));
observer.unobserve(entry.target);
}
});
}, {
rootMargin: "0px 0px -25% 0px"
});
targets.forEach(el => observer.observe(el));
