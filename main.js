// =====================
// スクロール連動：背景画像消去
// =====================

window.addEventListener('scroll', () => {
  const fvBgContainer = document.querySelector('.fv-bg-container');
  const fvSection = document.querySelector('.fv-fullscreen');
  
  if (!fvBgContainer || !fvSection) return;
  
  const fvRect = fvSection.getBoundingClientRect();
  const fvHeight = fvSection.offsetHeight;
  
  const scrollProgress = Math.max(0, -fvRect.top / fvHeight);
  
  fvBgContainer.style.opacity = Math.max(0, 1 - scrollProgress);
});

// =====================
// 従来のカウントアップ + フェードイン
// =====================

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

const targets = document.querySelectorAll(
  '.image-zoom, .text, .overlay-text'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      const counters = entry.target.querySelectorAll('.count-up');
      counters.forEach(counter => countUp(counter));

      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin: "0px 0px -25% 0px"
});

targets.forEach(el => observer.observe(el));

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
// フェードイン + ズームアウト
window.addEventListener("load", () => {

  const items = document.querySelectorAll(".grid-item img");

  items.forEach((img, i) => {
    img.style.opacity = 0;
    img.style.transform = "scale(1.2)";

    setTimeout(() => {
      img.style.transition = "all 1.2s ease";
      img.style.opacity = 1;
      img.style.transform = "scale(1.05)";
    }, i * 120);
  });

});