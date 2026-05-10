$(function () {
  // 1. フェードアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });
  $('.fade-up').each((i, el) => observer.observe(el));

  // 2. アーカイブ誌面 (Turn.js) - 左開き設定
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
      direction: 'ltr', // ここを 'ltr' (左から右) に変更
      when: {
        turned: function(e, page) {
          const total = $mag.turn('pages');
          // ボタンの不透明度制御
          $('#prev-btn').css('opacity', page <= 2 ? 0.2 : 1);
          $('#next-btn').css('opacity', page >= total - 1 ? 0.2 : 1);
        }
      }
    });
  };

  initTurn();

  // 3. ナビゲーション操作
  // direction: 'ltr' に合わせ、next/previous の役割を維持します
  $('#prev-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('previous'); // 前のページへ
  });

  $('#next-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('next'); // 次のページへ
  });

  let timer;
  $(window).on('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(initTurn, 300);
  });
});
