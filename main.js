// イベント統合
window.addEventListener("load", () => {
  const fvTitle = document.querySelector(".fv-title");
  if (fvTitle) fvTitle.classList.add("active");

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

// Throttle 最適化
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scroll = window.scrollY;
      document.querySelectorAll(".grid-item img").forEach((img, i) => {
        img.style.transform = `scale(1.05) translateY(${scroll * (0.02 + i*0.005)}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
});

// 既存のコード（変更なし）
const countUp = (el) => { /* ... */ };
const targets = document.querySelectorAll('.image-zoom, .text');
const observer = new IntersectionObserver(/* ... */);
