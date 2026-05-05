// =====================
// 従来のカウントアップ + フェードイン
// =====================

const countUp = (el) => {
  const target = parseFloat(el.getAttribute('data-target'));
  const duration = 2000; 
  const startTime = performance.now();

  const updateCount = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuad = 1 - (1 - progress) * (1 - progress);
    const currentValue = (easeOutQuad * target).toFixed(1);

    el.innerText = target % 1 === 0 ? Math.floor(currentValue) : currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.innerText = target;
    }
  };
  requestAnimationFrame(updateCount);
};

const targets = document.querySelectorAll(
  '.image-zoom, .text, .overlay-text'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      const counters = entry.target.querySelectorAll('.count-up');
      counters.forEach(counter => countUp(counter));

      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin: "0px 0px -25% 0px"
});

targets.forEach(el => observer.observe(el));


// =====================
// コンタクトフォーム
// =====================
const form = document.getElementById("contactForm");

let isSubmitting = false;

if (form) {
  const button = form.querySelector("button");

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (isSubmitting) return;
    isSubmitting = true;

    button.disabled = true;
    button.innerText = "送信しています…";
    button.style.opacity = "0.7";

    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mpqbzpop", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        console.log("送信成功");

        form.reset();
        button.innerText = "送信完了しました";

        setTimeout(() => {
          window.location.href = "https://otonanonagoya.github.io/lp/thanks.html";
        }, 500);
      } else {
        throw new Error();
      }

    } catch (error) {
      isSubmitting = false;
      button.disabled = false;
      button.innerText = "掲載について相談する";
      button.style.opacity = "1";
      alert("送信に失敗しました。");
    }
  });
}
// =====================
// FV スライド（高級ゆっくり）
// =====================

const slides = document.querySelectorAll(".fv-bg");
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

// 初期表示
showSlide(0);

// 重要：ゆっくりが高級
setInterval(nextSlide, 14000);

// =====================
// FV テキスト演出
// =====================

window.addEventListener("load", () => {
  const fv = document.querySelector(".fv");
  setTimeout(() => {
    fv.classList.add("show");
  }, 400);
});
window.addEventListener("scroll", () => {
  const y = window.scrollY;

  document.querySelectorAll(".fv-bg img").forEach(img => {
    img.style.transform = `translateY(${y * 0.03}px) scale(1.05)`;
  });
});
// FVテキスト出現
const fv = document.querySelector('.fv-content');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    fv.classList.add('show');
  }
});