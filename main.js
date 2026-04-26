const revealTexts = document.querySelectorAll('.reveal-text');
const revealImgs = document.querySelectorAll('.reveal-img');

const triggerPoint = window.innerHeight * 0.75;

const revealOnScroll = () => {

  revealTexts.forEach(el => {
    const rect = el.getBoundingClientRect().top;
    if (rect < triggerPoint && !el.classList.contains('active')) {
      el.classList.add('active');
    }
  });

  revealImgs.forEach(el => {
    const rect = el.getBoundingClientRect().top;
    if (rect < triggerPoint && !el.classList.contains('active')) {
      el.classList.add('active');
    }
  });

};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
