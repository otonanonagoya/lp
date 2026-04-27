const images = document.querySelectorAll('.image-wrap');
const texts = document.querySelectorAll('.text');

const triggerAnimation = () => {
  const triggerLine = window.innerHeight * 0.75;

  images.forEach(el => {
    if (el.classList.contains('active')) return;
    const rect = el.getBoundingClientRect().top;
    if (rect < triggerLine) {
      el.classList.add('active');
    }
  });

  texts.forEach(el => {
    if (el.classList.contains('active')) return;
    const rect = el.getBoundingClientRect().top;
    if (rect < triggerLine) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', triggerAnimation);
window.addEventListener('load', triggerAnimation);
