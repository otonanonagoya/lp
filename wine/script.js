$(function () {

  /* ========================================
  Fade Animation
  ========================================= */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }

    });
  }, {
    threshold: 0.12
  });

  $('.fade-up').each((i, el) => {
    observer.observe(el);
  });

  /* ========================================
  FV Slideshow
  ========================================= */

  const slides = document.querySelectorAll('.fv-bg');

  let current = 0;

  function changeSlide() {

    slides[current].classList.remove('active');

    current = (current + 1) % slides.length;

    slides[current].classList.add('active');
  }

  setInterval(changeSlide, 8000);

  /* ========================================
  Count Up
  ========================================= */

  const countUp = (el) => {

    const target = parseFloat(el.dataset.target);

    const duration = 1800;

    const start = performance.now();

    const update = (now) => {

      const progress = Math.min((now - start) / duration, 1);

      const ease = 1 - Math.pow(1 - progress, 3);

      const value = (ease * target).toFixed(1);

      el.innerText = target % 1 === 0
        ? Math.floor(value)
        : value;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerText = target;
      }

    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const counters = entry.target.querySelectorAll('.count-up');

        counters.forEach(counter => countUp(counter));

        counterObserver.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.4
  });

  document.querySelectorAll('.reader-grid').forEach(el => {
    counterObserver.observe(el);
  });

  /* ========================================
  Turn.js
  ========================================= */

  const $mag = $('#magazine');

  const ratio = 2000 / 1448;

  const initTurn = () => {

    const winW = $(window).width();

    const winH = $(window).height();

    let bookW = Math.min(winW - 40, 1100);

    let bookH = (bookW / 2) * ratio;

    if (bookH > winH * 0.8) {

      bookH = winH * 0.8;

      bookW = (bookH / ratio) * 2;
    }

    if ($mag.data().done) {
      $mag.turn('destroy').off();
    }

    const totalPages = $mag.find('.page').length;

    $mag.turn({

      width: Math.floor(bookW),

      height: Math.floor(bookH),

      display: 'double',

      acceleration: true,

      gradients: true,

      elevation: 50,

      autoCenter: true,

      duration: 800,

      direction: 'rtl',

      page: totalPages,

      when: {

        turned: function(e, page) {

          $('#prev-btn').css(
            'opacity',
            page >= totalPages - 1 ? 0.2 : 1
          );

          $('#next-btn').css(
            'opacity',
            page <= 2 ? 0.2 : 1
          );

        }

      }

    });

  };

  initTurn();

  $('#prev-btn').on('click', function(e) {

    e.preventDefault();

    $mag.turn('next');

  });

  $('#next-btn').on('click', function(e) {

    e.preventDefault();

    $mag.turn('previous');

  });

  let resizeTimer;

  $(window).on('resize', () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(initTurn, 300);

  });

});