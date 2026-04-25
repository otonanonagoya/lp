gsap.registerPlugin(ScrollTrigger);

// 1. 画像のズームアウト（一度きり）
const zoomImages = document.querySelectorAll('.js-zoom-image');

zoomImages.forEach((img) => {
    gsap.to(img, {
        scale: 1, // 横幅100%の状態へ
        duration: 1.8, // ゆったりと1.8秒かけて
        ease: "power2.out",
        scrollTrigger: {
            trigger: img,
            start: "top 75%", // 画面の下から25%の位置で開始
            once: true // 1回のみ実行
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
