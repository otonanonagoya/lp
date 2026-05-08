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
   Archive Viewer
========================= */

const pages = document.querySelectorAll(".archive-page");

const prevBtn = document.querySelector(".archive-nav.prev");

const nextBtn = document.querySelector(".archive-nav.next");

const counter = document.querySelector(".archive-count");

let current = 0;

function updateArchive(){
  pages.forEach((page,index)=>{
    page.classList.toggle(
      "active",
      index === current
    );
  });
  counter.textContent =
    `${String(current + 1).padStart(2,"0")} / ${String(pages.length).padStart(2,"0")}`;
}
nextBtn.addEventListener("click",()=>{
  current++;
  if(current >= pages.length){
    current = 0;
  }
  updateArchive();
});
prevBtn.addEventListener("click",()=>{
  current--;
  if(current < 0){
    current = pages.length - 1;
  }
  updateArchive();
});
updateArchive();
height: isMobile
  ? window.innerWidth * 1.42
  : Math.min(860, window.innerWidth * 0.68),
  
  /* =========================
   Long Edge Page Turn
========================= */

const leftHit = document.querySelector('.page-hit.left');

const rightHit = document.querySelector('.page-hit.right');

leftHit.addEventListener('click',()=>{

  $('#magazine').turn('previous');

});

rightHit.addEventListener('click',()=>{

  $('#magazine').turn('next');

});

display:'double',