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

$(function () {

  $('#magazine').turn({

    width: 800,
    height: 560,

    autoCenter: true,

    display: 'double',

    elevation: 50,

    gradients: true,

    duration: 1200,

    page: 2

  });

  // next
  $('.archive-nav.next').on('click', function () {

    $('#magazine').turn('next');

  });

  // prev
  $('.archive-nav.prev').on('click', function () {

    $('#magazine').turn('previous');

  });

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
const prevBtn = document.querySelector('.archive-nav.prev');

const nextBtn = document.querySelector('.archive-nav.next');

prevBtn.addEventListener('click', () => {

  if($('#magazine').turn('page') > 2){
    $('#magazine').turn('previous');
  }

});

nextBtn.addEventListener('click', () => {

  $('#magazine').turn('next');

});