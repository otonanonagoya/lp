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
   Magazine
========================= */

document.addEventListener('DOMContentLoaded', () => {

  $('#magazine').turn({

  width:
    window.innerWidth <= 768
      ? window.innerWidth * 0.94
      : Math.min(1400, window.innerWidth * 0.92),

  height:
    window.innerWidth <= 768
      ? window.innerWidth * 1.48
      : Math.min(860, window.innerWidth * 0.62),

  autoCenter: true,

  display: 'double',

  direction: 'ltr',

  gradients: true,

  acceleration: true,

  elevation: 180,

  duration: 1200

});


  /* =========================
     Navigation
  ========================= */

  const prevBtn = document.querySelector('.archive-nav.prev');

  const nextBtn = document.querySelector('.archive-nav.next');


  prevBtn.addEventListener('click', () => {

    $('#magazine').turn('previous');

  });


  nextBtn.addEventListener('click', () => {

    $('#magazine').turn('next');

  });

});