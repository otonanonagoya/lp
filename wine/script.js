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

  /* =========================
   Long Edge Page Turn
========================= */

const leftHit = document.querySelector('.page-hit.left');

const rightHit = document.querySelector('.page-hit.right');

leftHit.addEventListener('click',()=>{

  $('#magazine').turn('previous');
direction:'rtl',
});

rightHit.addEventListener('click',()=>{

  $('#magazine').turn('next');

});