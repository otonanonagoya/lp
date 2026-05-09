// script.js

/* =========================
   Fade Up Animation
========================= */

const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }

  });

},{
  threshold:0.15
});

fadeElements.forEach((el) => {
  observer.observe(el);
});


/* =========================
   Magazine Init
========================= */

document.addEventListener('DOMContentLoaded', () => {

  $('#magazine').turn({

    width:
      window.innerWidth <= 768
        ? window.innerWidth * 0.96
        : Math.min(1400, window.innerWidth * 0.94),

    height:
      window.innerWidth <= 768
        ? window.innerWidth * 1.42
        : Math.min(860, window.innerWidth * 0.68),

    autoCenter:true,

    display:'double',

    direction:'rtl',

    gradients:true,

    acceleration:true,

    elevation:180,

    duration:1400

  });


  /* =========================
     Long Edge Page Turn
  ========================= */

  const leftHit =
    document.querySelector('.page-hit.left');

  const rightHit =
    document.querySelector('.page-hit.right');


  // 左側クリック → 次ページ
  leftHit.addEventListener('click', () => {

    $('#magazine').turn('next');

  });


  // 右側クリック → 前ページ
  rightHit.addEventListener('click', () => {

    $('#magazine').turn('previous');

  });

});