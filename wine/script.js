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

    if (bookH > winH * 0.8) {
      bookH = winH * 0.8;
      bookW = (bookH / ratio) * 2;
    }

    if ($mag.data().done) {
      $mag.turn('destroy').off();
    }

    // 現在の div.page の総数を取得（今回の場合は 13）
    const totalPages = $mag.find('.page').length;

    $mag.turn({
      width: Math.floor(bookW),
      height: Math.floor(bookH),
      display: 'double', 
      acceleration: true,
      gradients: true,
      elevation: 50,
      // 【ここを修正】物理的な最後のページを初期表示に設定
      page: totalPages, 
      autoCenter: true,
      duration: 800,
      direction: 'rtl', // 右開き（戻る挙動でページを進めるため）
      when: {
        turned: function(e, page) {
          // ページ順が逆転しているため、ボタンの不透明度ロジックを調整
          // 最初の表示（totalPages）のとき、左矢印（前の誌面へ）を薄くする
          $('#prev-btn').css('opacity', page >= totalPages - 1 ? 0.2 : 1);
          // 最後のページ（2P付近）に到達したとき、右矢印（次の誌面へ）を薄くする
          $('#next-btn').css('opacity', page <= 2 ? 0.2 : 1);
        }
      }
    });
  };

  initTurn();

  // 3. ナビゲーション
  // 物理的な順序を逆に辿るため、命令を入れ替えます
  $('#prev-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('next'); // 物理的な「次」＝ 誌面としては「前」
  });

  $('#next-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('previous'); // 物理的な「前」＝ 誌面としては「次」
  });

  let timer;
  $(window).on('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(initTurn, 300);
  });
});
