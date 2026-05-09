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
        ? window.innerWidth * 0.94
        : Math.min(1400, window.innerWidth * 0.92),

    height:
      window.innerWidth <= 768
        ? window.innerWidth * 1.32
        : Math.min(860, window.innerWidth * 0.62),

    autoCenter:true,

    display:'double',

    gradients:true,

    acceleration:true,

    elevation:180,

    duration:1400

  });


  /* =========================
     Arrow Navigation
  ========================= */

  const prevBtn =
    document.querySelector('.archive-nav.prev');

  const nextBtn =
    document.querySelector('.archive-nav.next');


  // 左矢印 → 前ページ
  prevBtn.addEventListener('click', () => {

    $('#magazine').turn('previous');

  });


  // 右矢印 → 次ページ
  nextBtn.addEventListener('click', () => {

    $('#magazine').turn('next');

  });


  /* =========================
     Keyboard Navigation
  ========================= */

  document.addEventListener('keydown', (e) => {

    if(e.key === 'ArrowLeft'){

      $('#magazine').turn('previous');

    }

    if(e.key === 'ArrowRight'){

      $('#magazine').turn('next');

    }

  });


  /* =========================
     Responsive Resize
  ========================= */

  window.addEventListener('resize', () => {

    $('#magazine').turn(
      'size',

      window.innerWidth <= 768
        ? window.innerWidth * 0.94
        : Math.min(1400, window.innerWidth * 0.92),

      window.innerWidth <= 768
        ? window.innerWidth * 1.32
        : Math.min(860, window.innerWidth * 0.62)

    );

  });

});