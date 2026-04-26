gsap.registerPlugin(ScrollTrigger);
// 1. 画像のズームアウト（一度きり）
const zoomImages = document.querySelectorAll('.js-zoom-image');
zoomImages.forEach((img) => {
gsap.to(img, {
scale: 1,
duration: 1.8, // 1.8秒かけてゆったり引く
ease: "power2.out",
scrollTrigger: {
trigger: img,
start: "top 75%", // 画面の下から25%の位置で開始
once: true // 実行は一度のみ
}
});
});
// 2. タイトルとテキストの浮き上がり（一度きり）
const titles = document.querySelectorAll('.js-title');
titles.forEach((title) => {
gsap.to(title, {
opacity: 1,
y: 0,
duration: 1.2,
ease: "power3.out",
scrollTrigger: {
trigger: title,
start: "top 85%", // 画面の下から15%の位置で開始
once: true
}
});
});
