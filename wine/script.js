/**
 * OTONA NO NAGOYA - Wine Issue 2026
 * UX Design & Core Logic
 */

$(function () {
  
  // 1. スクロールに応じたフェードアップ演出
  const initFadeAnimation = () => {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          // 一度表示されたら監視を解除（ギャラリー的な静寂を保つため）
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach((el) => observer.observe(el));
  };

  // 2. マガジンビューアー (turn.js) の制御
  const initMagazine = () => {
    const $magazine = $('#magazine');
    const prevBtn = document.querySelector('.archive-nav.prev');
    const nextBtn = document.querySelector('.archive-nav.next');

    const getBookSize = () => {
      let width;
      if (window.innerWidth <= 768) {
        width = window.innerWidth * 0.95;
      } else if (window.innerWidth <= 1200) {
        width = window.innerWidth * 0.85;
      } else {
        width = 1100;
      }
      return {
        width: width,
        height: (width / 2) * 1.414 // A4比率に厳密に
      };
    };

    const size = getBookSize();

    $magazine.turn({
      width: size.width,
      height: size.height,
      autoCenter: true,
      display: 'double',
      elevation: 100,
      gradients: true,
      duration: 1400, // より優雅な速度
      page: 2,
      when: {
        turned: function () {
          updateNavStatus();
        }
      }
    });

    const updateNavStatus = () => {
      const currentPage = $magazine.turn('page');
      const totalPages = $magazine.turn('pages');

      if (currentPage <= 2) {
        prevBtn.classList.add('hidden');
      } else {
        prevBtn.classList.remove('hidden');
      }

      if (currentPage >= totalPages - 1) {
        nextBtn.classList.add('hidden');
      } else {
        nextBtn.classList.remove('hidden');
      }
    };

    // 初回実行
    updateNavStatus();

    // 操作イベント
    prevBtn.addEventListener('click', () => $magazine.turn('previous'));
    nextBtn.addEventListener('click', () => $magazine.turn('next'));

    // リサイズ最適化
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newSize = getBookSize();
        $magazine.turn('size', newSize.width, newSize.height);
      }, 300);
    });
  };

  // 3. パフォーマンスと触感の最適化
  const initSmoothInteraction = () => {
    // ホバー時に微かな視差効果（Parallax）を画像に与える（オプション）
    // 今回は静寂を重視し、CSSのTransitionで完結させています。
  };

  // 全機能の起動
  initFadeAnimation();
  initMagazine();
  initSmoothInteraction();

});
