const cursor = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring');

if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    ring.animate(
      { left: `${e.clientX}px`, top: `${e.clientY}px` },
      { duration: 350, fill: 'forwards', easing: 'ease-out' }
    );
  });

  document.querySelectorAll('a, .magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '58px';
      ring.style.height = '58px';
      ring.style.borderColor = '#a6ff00';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '34px';
      ring.style.height = '34px';
      ring.style.borderColor = 'rgba(255,255,255,.5)';
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.magnetic').forEach(button => {
  button.addEventListener('mousemove', e => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const r = button.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    button.style.transform = `translate(${x * .08}px, ${y * .08}px)`;
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll', window.scrollY);
});
