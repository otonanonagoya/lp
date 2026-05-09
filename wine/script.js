$(function () {
  // 1. フェードアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });
  $('.fade-up').each((i, el) => observer.observe(el));

  // 2. アーカイブ誌面 (Turn.js) 全デバイス見開き表示
  const $mag = $('#magazine');

  const initTurn = () => {
    const winW = $(window).width();
    // モバイルでも2ページ表示させるため、viewportからはみ出さない最大幅を計算
    let bookW = Math.min(winW - 40, 1100); 
    let bookH = (bookW / 2) * 1.414;

    if ($mag.data().done) $mag.turn('destroy');

    $mag.turn({
      width: bookW,
      height: bookH,
      display: 'double', // 強制的に見開き表示
      acceleration: true,
      gradients: true,
      elevation: 50,
      page: 2,
      when: {
        turned: function(e, page) {
          $('#prev-btn').css('opacity', page <= 2 ? 0.2 : 1);
          $('#next-btn').css('opacity', page >= $mag.turn('pages') - 1 ? 0.2 : 1);
        }
      }
    });
  };

  initTurn();

  // 3. ボタン操作の確実なバインド
  $(document).on('click', '#prev-btn', function(e) {
    e.preventDefault();
    $mag.turn('previous');
  });

  $(document).on('click', '#next-btn', function(e) {
    e.preventDefault();
    $mag.turn('next');
  });

  // リサイズ対応
  let timer;
  $(window).on('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(initTurn, 300);
  });
});
