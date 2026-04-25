gsap.registerPlugin(ScrollTrigger);

// 画像のズームアウト
const zoomSections = document.querySelectorAll('.js-zoom-section');
zoomSections.forEach((section) => {
    const img = section.querySelector('.js-zoom-image');
    gsap.to(img, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        }
    });
});

// タイトルの浮き上がり
const titles = document.querySelectorAll('.js-title');
titles.forEach((title) => {
    gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
            once: true
        }
    });
});
