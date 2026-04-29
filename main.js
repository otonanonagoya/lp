// 1. カウントアップ関数の定義（計算ロジック）
const countUp = (el) => {
  const target = parseFloat(el.getAttribute('data-target'));
  const duration = 2000; 
  const startTime = performance.now();

  const updateCount = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuad = 1 - (1 - progress) * (1 - progress);
    const currentValue = (easeOutQuad * target).toFixed(1);

    el.innerText = target % 1 === 0 ? Math.floor(currentValue) : currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.innerText = target;
    }
  };
  requestAnimationFrame(updateCount);
};

// 2. 監視対象の取得（1回だけでOK）
const targets = document.querySelectorAll(
  '.image-zoom, .text, .overlay-text'
);

// 3. 交差判定（スクロール監視）の設定
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 要素を表示させる
      entry.target.classList.add('active');

      // その要素の中にカウントアップ対象（.count-up）があれば実行
      const counters = entry.target.querySelectorAll('.count-up');
      counters.forEach(counter => countUp(counter));

      // 一度表示したら監視を解除
      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin: "0px 0px -25% 0px"
});

// 4. 監視の開始
targets.forEach(el => observer.observe(el));
