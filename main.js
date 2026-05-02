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

// フェードイン + ズームアウト
window.addEventListener("load", () => {

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