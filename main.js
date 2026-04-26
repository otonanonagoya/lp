gsap.registerPlugin(ScrollTrigger);

// 1. 画像のズームアウト（一度きり・横幅100%維持）
const zoomImages = document.querySelectorAll('.js-zoom-image');

zoomImages.forEach((img) => {
  gsap.to(img, {
    scale: 1,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      // トリガーを画像本体ではなく親コンテナに変更し、動作を安定化
      trigger: img.parentElement, 
      start: "top 75%",
      once: true
    }
  });
});

// 2. タイトルの浮き上がり（CSSに頼らず確実に出現させる方式）
const titles = document.querySelectorAll('.js-title');

titles.forEach((title) => {
  // fromTo を使って、初期状態（透明）から完了状態へ確実にアニメーションさせる
  gsap.fromTo(title,
    { 
      opacity: 0, 
      y: 30 
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        once: true
      }
    }
  );
});
