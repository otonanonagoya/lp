gsap.registerPlugin(ScrollTrigger);
// 1. 画像のズームアウト（NOOG風のスクロール連動）
const zoomContainers = document.querySelectorAll('.js-zoom-container');
zoomContainers.forEach((container) => {
const img = container.querySelector('.js-zoom-image');
gsap.to(img, {
scale: 1, // アニメーション後は本来の横幅100%のサイズに戻る
ease: "none",
scrollTrigger: {
trigger: container,
start: "top bottom", // 画像の枠が画面の下端に入ったら開始
end: "center center", // 画像が画面の中央に来た時点で完了し100%表示になる
scrub: 1, // スクロールに滑らかに連動させる（NOOG特有の心地よさの要）
once: true // 1回のみ実行して完了状態を維持する
}
});
});
// 2. テキストの浮き上がり（NOOG風のフェードイン）
const fadeElements = document.querySelectorAll('.js-fade-up');
fadeElements.forEach((el) => {
gsap.to(el, {
opacity: 1,
y: 0,
duration: 1.2,
ease: "power3.out", // フワッと減速しながら止まる高級感のある動き
scrollTrigger: {
trigger: el,
start: "top 85%", // 要素が画面の下から15%の位置に来たら開始
once: true // 1回のみ実行
}
});
});
