/* =========================
   Fade Up Animation
========================= */

const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }

  });

}, {
  threshold: 0.15
});

fadeElements.forEach((el) => {
  observer.observe(el);
});


/* =========================
   Magazine
========================= */

$(function () {

  // responsive size
  const bookWidth = Math.min(window.innerWidth * 0.92, 900);

  const pageWidth = bookWidth / 2;

  // A4比率に近い
  const bookHeight = pageWidth * 1.42;

  $('#magazine').turn({

    width: bookWidth,

    height: bookHeight,

    autoCenter: true,

    display: 'double',

    elevation: 50,

    gradients: true,

    duration: 1200,

    page: 2

  });


  /* =========================
     Navigation
  ========================= */

  const prevBtn =
    document.querySelector('.archive-nav.prev');

  const nextBtn =
    document.querySelector('.archive-nav.next');


  // previous
  prevBtn.addEventListener('click', () => {

    if ($('#magazine').turn('page') > 2) {

      $('#magazine').turn('previous');

    }

  });


  // next
  nextBtn.addEventListener('click', () => {

    $('#magazine').turn('next');

  });

});