gsap.registerPlugin(ScrollTrigger); // スクロール連動機能を使う宣言

// 画像の「引き」
gsap.to(".js-zoom-image", {
  scale: 1, // 1倍（元の大きさ）に戻す
  scrollTrigger: {
    trigger: ".image-section", // このセクションが画面に入ったら
    start: "top top", // セクションの上が画面の上に重なったら開始
    end: "bottom bottom", // セクションの底が画面の底に重なったら終了
    scrub: true, // スクロール量とアニメーションを同期させる
  }
});
