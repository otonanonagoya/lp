$(function () {
  // 1. フェードアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });
  $('.fade-up').each((i, el) => observer.observe(el));

  // 2. アーカイブ誌面 (Turn.js) - 1448:2000 比率の厳密適用
  const $mag = $('#magazine');
  const ratio = 2000 / 1448; // = 約1.3812

  const initTurn = () => {
    const winW = $(window).width();
    const winH = $(window).height();

    // 画面幅に基づいたブック幅の決定（見開きなので2枚分）
    let bookW = Math.min(winW - 40, 1100); 
    // 1枚あたりの幅は bookW / 2。それに比率を掛けて高さを算出
    let bookH = (bookW / 2) * ratio;

    // 画面の高さに収まらない場合は高さを基準に縮小
    if (bookH > winH * 0.8) {
      bookH = winH * 0.8;
      bookW = (bookH / ratio) * 2;
    }

    if ($mag.data().done) {
      $mag.turn('destroy').off();
    }

    $mag.turn({
      width: Math.floor(bookW),
      height: Math.floor(bookH),
      display: 'double', 
      acceleration: true,
      gradients: true,
      elevation: 50,
      page: 2, 
      autoCenter: true,
      duration: 800,
      when: {
        turned: function(e, page) {
          const total = $mag.turn('pages');
          $('#prev-btn').css('opacity', page <= 2 ? 0.2 : 1);
          $('#next-btn').css('opacity', page >= total - 1 ? 0.2 : 1);
        }
      }
    });
  };

  initTurn();

  // 3. 操作イベント
  $('#prev-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('previous');
  });

  $('#next-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('next');
  });

  // 4. リサイズ対策
  let timer;
  $(window).on('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(initTurn, 300);
  });
});
