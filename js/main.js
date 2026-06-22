/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('filled', window.scrollY > 80);
}, { passive: true });

/* ── Mobile menu ── */
document.getElementById('hamBtn').addEventListener('click', () => {
  document.getElementById('mob').classList.add('open');
  document.body.style.overflow = 'hidden';
});
document.getElementById('mob-x').addEventListener('click', closeMob);
function closeMob() {
  document.getElementById('mob').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Scroll reveal ── */
const revEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
revEls.forEach(el => io.observe(el));

/* ── Hero entrance ── */
const hCtx = document.getElementById('heroCtx');
hCtx.style.cssText = 'opacity:0;transform:translateY(18px)';
setTimeout(() => {
  hCtx.style.cssText = 'opacity:1;transform:none;transition:opacity 1.1s ease,transform 1.1s ease';
}, 160);

/* ── Testimonial carousel ── */
const slides = Array.from(document.querySelectorAll('.t-slide'));
const dotsWrap = document.getElementById('tDots');
let cur = 0, autoTimer;

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 't-dot' + (i === 0 ? ' on' : '');
  d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  d.addEventListener('click', () => go(i));
  dotsWrap.appendChild(d);
});

function go(n) {
  slides[cur].classList.remove('active');
  dotsWrap.children[cur].classList.remove('on');
  cur = (n + slides.length) % slides.length;
  slides[cur].classList.add('active');
  dotsWrap.children[cur].classList.add('on');
  resetAuto();
}

document.getElementById('tNext').addEventListener('click', () => go(cur + 1));
document.getElementById('tPrev').addEventListener('click', () => go(cur - 1));

function resetAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => go(cur + 1), 5000);
}
resetAuto();
