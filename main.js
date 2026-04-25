// GSAPプラグインの登録
gsap.registerPlugin(ScrollTrigger);

// 1. 画像のズームアウト（引き）設定
const zoomSections = document.querySelectorAll('.js-zoom-section');

zoomSections.forEach((section) => {
    const img = section.querySelector('.js-zoom-image');
    
    gsap.to(img, {
        scale: 1, // 1.5倍から1倍へ
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: section,
            // 画面の下から25%（上から75%）の位置で開始
            start: "top 75%", 
            end: "bottom top",
            scrub: 1.2, // 指の動きに少し遅れて付いてくる滑らかな設定
        }
    });
});

// 2. タイトルの浮き上がり設定
const titles = document.querySelectorAll('.js-title');

titles.forEach((title) => {
    gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: title,
            start: "top 80%", // 画像より少し遅れて（画面下から20%の位置）で開始
            once: true // 1回のみ実行
        }
    });
});
