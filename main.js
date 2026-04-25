// GSAPのプラグインを有効化
gsap.registerPlugin(ScrollTrigger);

// 1. 画像の「引き」アニメーション
// ページ内のすべての「.js-zoom-section」を対象にループ処理を行います
const zoomSections = document.querySelectorAll('.js-zoom-section');

zoomSections.forEach((section) => {
    // セクションの中にある画像を探す
    const img = section.querySelector('.js-zoom-image');
    
    gsap.to(img, {
        scale: 1, // CSSで設定した1.3倍から、元の1倍に戻す
        ease: "none", // スクロールに完全同期させるため余計な加速をオフにする
        scrollTrigger: {
            trigger: section, // このセクションが
            start: "top top", // 画面の一番上に来たら開始
            end: "bottom bottom", // セクションの底が画面の底に来たら終了
            scrub: true, // スクロール量に合わせてアニメーションを伸縮させる
            // markers: true // 開発中にここを有効にすると、開始・終了位置が画面に表示されます
        }
    });
});

// 2. タイトルの「浮き上がり」アニメーション
// ページ内のすべての「.js-title」を対象にします
const titles = document.querySelectorAll('.js-title');

titles.forEach((title) => {
    gsap.to(title, {
        opacity: 1, // 透明から見える状態へ
        y: 0,       // 下から元の位置へ
        duration: 1.2, // 1.2秒かけて動く
        ease: "power3.out", // 動きの終わりにブレーキをかけて高級感を出す
        scrollTrigger: {
            trigger: title,
            start: "top 85%", // 画面の下から15%の位置に来たら再生開始
            once: true // 1回だけ再生（戻っても消えない）
        }
    });
});
