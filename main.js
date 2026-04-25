gsap.registerPlugin(ScrollTrigger);

// 1. 画像のズームアウト（一度きり・自動完了）
const zoomImages = document.querySelectorAll('.js-zoom-image');

zoomImages.forEach((img) => {
    gsap.to(img, {
        scale: 1, // 100%のサイズに戻る
        duration: 1.8, // 少しゆっくりにして高級感を出す
        ease: "power2.out",
        scrollTrigger: {
            trigger: img,
            start: "top 75%", // 下から25%の位置で開始
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
