$(function () {
  // 1. フェードアニメーション（既存構成維持）
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });
  $('.fade-up').each((i, el) => observer.observe(el));

  // 2. アーカイブ誌面 (Turn.js) - 左開き(LTR)完全対応版
  const $mag = $('#magazine');
  const ratio = 2000 / 1448; // 誌面データ比率

  const initTurn = () => {
    const winW = $(window).width();
    const winH = $(window).height();

    // 誌面を切断しないための計算
    let bookW = Math.min(winW - 40, 1100); 
    let bookH = (bookW / 2) * ratio;

    if (bookH > winH * 0.8) {
      bookH = winH * 0.8;
      bookW = (bookH / ratio) * 2;
    }

    if ($mag.data().done) {
      $mag.turn('destroy').off();
    }

    // Turn.js 初期化
    $mag.turn({
      width: Math.floor(bookW),
      height: Math.floor(bookH),
      display: 'double', 
      acceleration: true,
      gradients: true,
      elevation: 50,
      page: 1,           // 左開きの場合、1P（表紙）から開始
      autoCenter: true,
      duration: 800,
      direction: 'ltr',  // 左から右へ（洋書形式）
      when: {
        turned: function(e, page) {
          const total = $mag.turn('pages');
          // ナビゲーションボタンの可視性制御
          $('#prev-btn').css('opacity', page === 1 ? 0.2 : 1);
          $('#next-btn').css('opacity', page >= total - 1 ? 0.2 : 1);
        }
      }
    });
  };

  // 実行
  initTurn();

  // 3. 矢印ナビゲーションの挙動
  // direction: 'ltr' 時、nextは右方向、previousは左方向へ進みます
  $('#prev-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('previous');
  });

  $('#next-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('next');
  });

  // 4. リサイズ対策（崩れ・見切れ防止）
  let timer;
  $(window).on('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(initTurn, 300);
  });
});
