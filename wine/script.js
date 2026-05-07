// script.js

const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
},{
  threshold:0.15
});

fadeElements.forEach((el)=>{
  observer.observe(el);
});


const sceneTrack = document.querySelector('.scene-track');

window.addEventListener('scroll', ()=>{

  const scrollY = window.scrollY;

  sceneTrack.style.transform = `translateX(${-scrollY * 0.08}px)`;

});