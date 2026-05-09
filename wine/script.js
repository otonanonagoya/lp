/* =========================
   Intersection Observer (Fade Up)
========================= */
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

fadeElements.forEach((el) => {
  observer.observe(el);
});


/* =========================
   Magazine (turn.js)
========================= */
$(function () {
  const prevBtn = document.querySelector('.archive-nav.prev');
  const nextBtn = document.querySelector('.archive-nav.next');

  // サイズ計算関数
  function getBookSize() {
    let width;
    if (window.innerWidth <= 768) {
      width = window.innerWidth * 0.92;
    } else {
      width = Math.min(window.innerWidth * 0.82, 1200);
    }
    return {
      width: width,
      height: (width / 2) * 1.42
    };
  }

  const size = getBookSize();

  // turn.js 初期化
  $('#magazine').turn({
    width: size.width,
    height: size.height,
    autoCenter: true,
    display: 'double',
    elevation: 50,
    gradients: true,
    duration: 1200,
    page: 2,
    when: {
      turned: function () {
        updateNav();
      }
    }
  });

  // ナビゲーションの表示・非表示管理
  function updateNav() {
    const currentPage = $('#magazine').turn('page');
    const totalPages = $('#magazine').turn('pages');

    // 最初の見開き（表紙付近）では戻るボタン非表示
    if (currentPage <= 2) {
      prevBtn.classList.add('hidden');
    } else {
      prevBtn.classList.remove('hidden');
    }

    // 最後の見開きでは次へボタン非表示
    if (currentPage >= totalPages - 1) {
      nextBtn.classList.add('hidden');
    } else {
      nextBtn.classList.remove('hidden');
    }
  }

  // 初期状態のナビ更新
  updateNav();

  // イベントリスナー
  prevBtn.addEventListener('click', () => {
    $('#magazine').turn('previous');
  });

  nextBtn.addEventListener('click', () => {
    $('#magazine').turn('next');
  });

  // リサイズ時の簡易対応（リロード推奨だが、最低限の再計算）
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newSize = getBookSize();
      $('#magazine').turn('size', newSize.width, newSize.height);
    }, 200);
  });
});
