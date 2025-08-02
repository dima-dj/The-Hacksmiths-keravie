
function smoothScrollTo(el) {
  if (!el) return;
  const header = document.querySelector('header');
  const offset = (header?.offsetHeight || 0) + 8;
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
  setTimeout(() => {
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }, 400);
}


document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const target = getTargetFromHash(a.getAttribute('href'));
  if (target) {
    e.preventDefault();
    smoothScrollTo(target);
  } else {
    
    const hash = a.getAttribute('href');
    if (hash === '#map-keravie' || hash === '#devenir-membre') {
      e.preventDefault();
      alert("Cette section sera bientôt disponible. Merci pour votre intérêt !");
    }
  }
});


const membreBtn = document.querySelector('input.button[type="button"]');
if (membreBtn) {
  membreBtn.addEventListener('click', () => {
    const preferred = getTargetFromHash('#devenir-membre');
    const fallback1 = getTargetFromHash('#nos-coiffeurs');
    const fallback2 = getTargetFromHash('#comment-ca-marche');
    const target = preferred || fallback1 || fallback2;
    if (target) {
      smoothScrollTo(target);
    } else {
      alert("Merci ! Nous ouvrirons bientôt l'inscription des coiffeurs membres.");
    }
  });
}




window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('resize', setActiveLink);
document.addEventListener('DOMContentLoaded', setActiveLink);




(function setupReveal(){
  const candidates = [
    '.step', '.benefit-card', '.product-showcase',
    '.how-it-works h3', '.benefits h3', '.join-movement h3', '.recycling-process h3'
  ];
  const items = document.querySelectorAll(candidates.join(', '));
  if (!items.length) return;

  
  if (!document.getElementById('reveal-style')) {
    const st = document.createElement('style');
    st.id = 'reveal-style';
    st.textContent = `
      .reveal { opacity: 0; transform: translateY(8px); transition: opacity .5s ease, transform .5s ease; }
      .reveal.in-view { opacity: 1; transform: none; }
    `;
    document.head.appendChild(st);
  }

  items.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in-view');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
})();
