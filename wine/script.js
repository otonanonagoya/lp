/**
 * OTONA NO NAGOYA - Wine Issue 2026
 * Core Interaction Fix
 */

$(function () {
  
  // 1. スクロールアニメーション
  const initFade = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });
    $('.fade-up').each((i, el) => observer.observe(el));
  };

  // 2. アーカイブ誌面 (turn.js)
  const initBook = () => {
    const $mag = $('#magazine');
    
    // 画面幅に合わせたサイズの決定
    const getDim = () => {
      const winW = $(window).width();
      let w = 1100;
      if (winW < 768) w = winW * 0.94;
      else if (winW < 1200) w = winW * 0.85;
      
      return {
        width: w,
        height: (w / 2) * 1.414
      };
    };

    const dim = getDim();

    // Turn.js 初期化
    $mag.turn({
      width: dim.width,
      height: dim.height,
      autoCenter: true,
      display: 'double',
      gradients: true,
      duration: 1000,
      page: 2,
      when: {
        turned: function() {
          updateBtns();
        }
      }
    });

    // ボタンの表示制御
    const updateBtns = () => {
      const current = $mag.turn('page');
      const total = $mag.turn('pages');
      
      $('#prev-btn').toggleClass('hidden', current <= 2);
      $('#next-btn').toggleClass('hidden', current >= total - 1);
    };

    // 初期ボタン状態
    updateBtns();

    // クリックイベントの確実なバインド (Event Delegation)
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
      timer = setTimeout(() => {
        const n = getDim();
        $mag.turn('size', n.width, n.height);
      }, 200);
    });
  };

  // 3. 横スクロールを物理的に無効化する補助（モバイル対策）
  const preventHorizontalScroll = () => {
    window.addEventListener('scroll', () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
    }, { passive: true });
  };

  // 起動
  initFade();
  initBook();
  preventHorizontalScroll();

});
