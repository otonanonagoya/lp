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

  const prevBtn = document.querySelector('.archive-nav.prev');
  const nextBtn = document.querySelector('.archive-nav.next');

  // =========================
  // Responsive Size
  // =========================

  let bookWidth;

  if (window.innerWidth <= 768) {

    bookWidth = window.innerWidth * 0.92;

  } else {

    bookWidth = Math.min(window.innerWidth * 0.82, 1200);

  }

  const pageWidth = bookWidth / 2;

  const bookHeight = pageWidth * 1.42;


  // =========================
  // turn.js
  // =========================

  $('#magazine').turn({

    width: bookWidth,

    height: bookHeight,

    autoCenter: true,

    display: 'double',

    elevation: 50,

    gradients: true,

    duration: 1200,

    page: 2,

    when: {

      turned: function () {

        updateNav();

      }

    }

  });


  // =========================
  // Navigation Visibility
  // =========================

  function updateNav() {

    const currentPage =
      $('#magazine').turn('page');

    const totalPages =
      $('#magazine').turn('pages');


    // 初期見開きでは ← 非表示
    if (currentPage <= 2) {

      prevBtn.classList.add('hidden');

    } else {

      prevBtn.classList.remove('hidden');

    }


    // 最終見開きでは → 非表示
    if (currentPage >= totalPages - 1) {

      nextBtn.classList.add('hidden');

    } else {

      nextBtn.classList.remove('hidden');

    }

  }


  // 初期状態
  updateNav();


  // =========================
  // Prev
  // =========================

  prevBtn.addEventListener('click', () => {

    const currentPage =
      $('#magazine').turn('page');

    if (currentPage > 2) {

      $('#magazine').turn('previous');

    }

  });


  // =========================
  // Next
  // =========================

  nextBtn.addEventListener('click', () => {

    const currentPage =
      $('#magazine').turn('page');

    const totalPages =
      $('#magazine').turn('pages');

    if (currentPage < totalPages - 1) {

      $('#magazine').turn('next');

    }

  });

});