$(function () {
  // 1. フェードアニメーション復旧
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });
  $('.fade-up').each((i, el) => observer.observe(el));

  // 2. アーカイブ誌面 (Turn.js) - 全デバイス見開き + 切断防止
  const $mag = $('#magazine');

  const initTurn = () => {
    const winW = $(window).width();
    const winH = $(window).height();

    // 誌面の絶対切断防止：画面幅から余白を引き、A4見開きの比率(1.414)で高さを算出
    let bookW = Math.min(winW - 40, 1100); 
    let bookH = (bookW / 2) * 1.414;

    // もし算出された高さが画面を突き抜ける場合は、高さを基準に再計算
    if (bookH > winH * 0.8) {
      bookH = winH * 0.8;
      bookW = (bookH / 1.414) * 2;
    }

    if ($mag.data().done) $mag.turn('destroy');

    $mag.turn({
      width: Math.floor(bookW),
      height: Math.floor(bookH),
      display: 'double', // スマホでも見開き固定
      acceleration: true,
      gradients: true,
      elevation: 50,
      page: 2, // 最初の見開きから開始
      autoCenter: true,
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

  // 3. ナビゲーション
  $(document).on('click', '#prev-btn', function(e) {
    e.preventDefault();
    $mag.turn('previous');
  });

  $(document).on('click', '#next-btn', function(e) {
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
