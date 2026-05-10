$(function () {
  // 1. フェードアニメーション（既存維持）
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });
  $('.fade-up').each((i, el) => observer.observe(el));

  // 2. アーカイブ誌面 (Turn.js)
  const $mag = $('#magazine');
  const ratio = 2000 / 1448; 

  const initTurn = () => {
    const winW = $(window).width();
    const winH = $(window).height();

    let bookW = Math.min(winW - 40, 1100); 
    let bookH = (bookW / 2) * ratio;

    if (bookH > winH * 0.7) {
      bookH = winH * 0.7;
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
      page: 2, // 重要：ダミーの次の「見開き」から開始
      autoCenter: true,
      duration: 800,
      direction: 'ltr', // 左から右へめくる設定
      when: {
        turned: function(e, page) {
          const total = $mag.turn('pages');
          // ボタンの不透明度（1P目のダミーには戻らせない）
          $('#prev-btn').css('opacity', page <= 2 ? 0.2 : 1);
          $('#next-btn').css('opacity', page >= total - 1 ? 0.2 : 1);
        }
      }
    });
  };

  initTurn();

  // 3. ナビゲーション（LTR設定に合わせた標準的な挙動）
  $('#prev-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('previous');
  });

  $('#next-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('next');
  });

  let timer;
  $(window).on('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(initTurn, 300);
  });
});
