gsap.registerPlugin(ScrollTrigger);

// 1. 画像のズームアウト（一度きり・終了状態で固定）
const zoomImages = document.querySelectorAll('.js-zoom-image');

zoomImages.forEach((img) => {
    gsap.to(img, {
        scale: 1,
        duration: 1.8, // ゆっくり引く
        ease: "power2.out",
        overwrite: true, // 他の命令と重ならないように上書き
        scrollTrigger: {
            trigger: img,
            start: "top 75%", // 画面の下から25%の位置で開始
            toggleActions: "play none none none", // 再生のみ行い、戻っても何もしない
            once: true // 一度だけ実行
        }
    });
});

// 2. タイトルの浮き上がり
const titles = document.querySelectorAll('.js-title');

titles.forEach((title) => {
    gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: title,
            start: "top 85%",
            once: true
        }
    });
});
