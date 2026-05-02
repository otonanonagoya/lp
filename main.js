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
// 1. ページロード時のアニメーション
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    // ヘッダーの出現
    tl.from('.site-header', {
        opacity: 0,
        y: -30,
        duration: 1.2,
        ease: 'power2.out'
    });

    // FV画像のフェードイン＆ズームアウト
    const gridItems = document.querySelectorAll('.grid-item img');
    gridItems.forEach((img, i) => {
        tl.fromTo(img,
            { scale: 1.15, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' },
            i * 0.08
        );
    });
});

// 2. スムーススクロール (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 3. スクロール時のパララックス効果
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scroll = window.scrollY;
            document.querySelectorAll('.fv .grid-item img').forEach((img, i) => {
                img.style.transform = `scale(1) translateY(${scroll * (0.02 + i * 0.005)}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// 4. スクロールトリガー (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
