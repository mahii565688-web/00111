// FADE-IN ON SCROLL (cards + other fade-in)
const faders = document.querySelectorAll('.fade-in');
const cards = document.querySelectorAll('.card');

cards.forEach((card,index)=>card.style.setProperty('--delay',`${index*0.15}s`));

const appearOptions = { threshold:0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader=>appearOnScroll.observe(fader));
cards.forEach(card=>appearOnScroll.observe(card));

// NAV LINKS SMOOTH SCROLL
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    document.getElementById(targetId).scrollIntoView({behavior:"smooth"});
  });
});

// VIEW PROJECTS BUTTON
document.getElementById('view-projects').addEventListener('click',()=>{
  document.getElementById('gallery').scrollIntoView({behavior:"smooth"});
});

// ACTIVE NAV LINK ON SCROLL
const sections=document.querySelectorAll('section');
window.addEventListener('scroll',()=>{
  let current="";
  sections.forEach(section=>{
    if(pageYOffset>=section.offsetTop-100) current=section.getAttribute('id');
  });
  navLinks.forEach(link=>link.classList.remove('active'));
  navLinks.forEach(link=>{
    if(link.getAttribute('href')===`#${current}`) link.classList.add('active');
  });
});

// MAIN GALLERY CAROUSEL
const track=document.querySelector('.carousel-track');
const slides=Array.from(track.children);
const nextBtn=document.querySelector('.next');
const prevBtn=document.querySelector('.prev');
let currentIndex=0;

function updateCarousel(){ track.style.transform=`translateX(-${currentIndex*100}%)`; }

nextBtn.addEventListener('click',()=>{ currentIndex=(currentIndex+1)%slides.length; updateCarousel(); });
prevBtn.addEventListener('click',()=>{ currentIndex=(currentIndex-1+slides.length)%slides.length; updateCarousel(); });

// MINI-CAROUSEL FOR SERVICES
const miniCarousels=document.querySelectorAll('.mini-carousel');
miniCarousels.forEach(carousel=>{
  const track=carousel.querySelector('.mini-track');
  const imgs=Array.from(track.children);
  const next=carousel.querySelector('.next-mini');
  const prev=carousel.querySelector('.prev-mini');
  let index=0;
  function updateMini(){ track.style.transform=`translateX(-${index*(imgs[0].offsetWidth+10)}px)`; }
  next.addEventListener('click',()=>{ index=(index+1)%imgs.length; updateMini(); });
  prev.addEventListener('click',()=>{ index=(index-1+imgs.length)%imgs.length; updateMini(); });
  setInterval(()=>{ index=(index+1)%imgs.length; updateMini(); },3000);
  // Animate mini-images
  imgs.forEach((img,i)=>{ img.onload=()=>setTimeout(()=>img.classList.add('loaded'),i*150); });
});

// HERO TYPING ANIMATION
const typingText=document.querySelector('.typing-text');
const text='Soft • Modern • Luxury Design';
let i=0;
function type(){ if(i<text.length){ typingText.textContent+=text.charAt(i); i++; setTimeout(type,100); } }
window.addEventListener('load',type);