$(function () {
  // 1. フェードアニメーション
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

    const totalPages = $mag.find('.page').length;

    $mag.turn({
      width: Math.floor(bookW),
      height: Math.floor(bookH),
      display: 'double', 
      acceleration: true,
      gradients: true,
      elevation: 50,
      // 逆転の発想：最後のページ（入れ替えた後の archive1）を初期表示
      page: totalPages, 
      autoCenter: true,
      duration: 800,
      direction: 'rtl', // デフォルトの右開き設定のまま
      when: {
        turned: function(e, page) {
          // ページ順が逆なので、不透明度制御のロジックも反転
          $('#prev-btn').css('opacity', page >= totalPages - 1 ? 0.2 : 1);
          $('#next-btn').css('opacity', page <= 2 ? 0.2 : 1);
        }
      }
    });
  };

  initTurn();

  // 3. ナビゲーション
  // ページ順を逆転させたため、めくる方向の命令も入れ替えます
  $('#prev-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('next'); // 物理的には「進む」ことで前の誌面へ
  });

  $('#next-btn').on('click', function(e) {
    e.preventDefault();
    $mag.turn('previous'); // 物理的には「戻る」ことで次の誌面へ
  });

  let timer;
  $(window).on('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(initTurn, 300);
  });
});
