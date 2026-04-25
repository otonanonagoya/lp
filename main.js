gsap.registerPlugin(ScrollTrigger);

// 1. 画像のズームアウト（一度きり・比率維持）
const zoomImages = document.querySelectorAll('.js-zoom-image');

zoomImages.forEach((img) => {
    gsap.to(img, {
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
        clearProps: "scale", // アニメーション終了後に scale 設定をクリア
        scrollTrigger: {
            trigger: img,
            start: "top 75%", // 画面の下から25%の位置で開始
            once: true
        }
    });
});

// 2. タイトルの浮き上がり
const titles = document.querySelectorAll('.js-title');

titles.forEach((title) => {
    gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: title,
            start: "top 85%",
            once: true
        }
    });
});
