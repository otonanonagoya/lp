$(function () {
  // 1. フェードアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });
  $('.fade-up').each((i, el) => observer.observe(el));

  // 2. アーカイブ誌面 (Turn.js) 徹底改善
  const $mag = $('#magazine');
  const $window = $(window);

  const initTurn = () => {
    const winW = $window.width();
    const isMobile = winW < 768;
    
    // コンテナ幅に対する誌面サイズの計算（見切れ防止）
    let bookW = Math.min(winW - 60, 1000);
    if (isMobile) bookW = winW - 40; // モバイルは幅一杯

    const bookH = (isMobile) ? (bookW * 1.414) : (bookW / 2 * 1.414);

    // すでに初期化されている場合は一度破棄（リサイズ対策）
    if ($mag.data().done) {
       $mag.turn('destroy').off();
    }

    $mag.turn({
      width: bookW,
      height: bookH,
      autoCenter: true,
      display: isMobile ? 'single' : 'double', // モバイルは見切れ防止のため1枚表示
      acceleration: true,
      gradients: true,
      elevation: 50,
      duration: 1000,
      when: {
        turned: function(e, page) {
          updateControls(page);
        }
      }
    });
  };

  const updateControls = (page) => {
    const total = $mag.turn('pages');
    $('#prev-btn').toggleClass('hidden', page === 1);
    $('#next-btn').toggleClass('hidden', page === total);
  };

  // Turn.js実行
  initTurn();

  // 3. ボタンイベント（確実な動作のためにデリゲートではなく直接バインド）
  // turn.jsの内部処理と競合しないよう preventDefault を徹底
  $('#prev-btn').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $mag.turn('previous');
  });

  $('#next-btn').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $mag.turn('next');
  });

  // 4. リサイズ時の再計算（見切れ再発防止）
  let resizeTimer;
  $window.on('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initTurn();
    }, 300);
  });

  // 5. 横スクロールの強制排除
  $window.on('scroll', () => {
    if ($window.scrollLeft() !== 0) {
      $window.scrollLeft(0);
    }
  });
});
