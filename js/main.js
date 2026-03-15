/* ==========================================================
   GymTownGYM — main.js
   All site-wide interactions: navbar, reveal, counters,
   tabs, BMI, calorie calculator, contact form
========================================================== */

// ── 1. NAVBAR SCROLL BEHAVIOUR ────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('stuck', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── 2. HAMBURGER MENU ─────────────────────────────────────
const burger   = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

// ── 3. ACTIVE NAV LINK ────────────────────────────────────
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === page) a.classList.add('active');
  });
})();

// ── 4. SCROLL REVEAL ──────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('up'), i * 70);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── 5. COUNTER ANIMATION ──────────────────────────────────
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target  = +el.dataset.count;
    const suffix  = el.dataset.suffix || '';
    const dur     = 1800;
    const step    = target / (dur / 16);
    let cur = 0;
    const tick = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(tick); }
      el.textContent = Math.floor(cur) + suffix;
    }, 16);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// ── 6. TABS (pricing, timetable) ──────────────────────────
document.querySelectorAll('[data-tab-group]').forEach(group => {
  const id = group.dataset.tabGroup;
  const panels = document.querySelectorAll(`[data-panel="${id}"]`);
  group.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      panels.forEach(p => p.classList.toggle('active', p.dataset.tabValue === target));
    });
  });
});

// ── 7. BMI CALCULATOR ─────────────────────────────────────
const bmiForm = document.getElementById('bmiForm');
if (bmiForm) {
  const calc = () => {
    const h = +document.getElementById('bmiH').value;
    const w = +document.getElementById('bmiW').value;
    if (!h || !w) return;
    const bmi = (w / Math.pow(h / 100, 2)).toFixed(1);
    const numEl    = document.getElementById('bmiNum');
    const statEl   = document.getElementById('bmiStat');
    const fillEl   = document.getElementById('bmiFill');
    if (numEl)  numEl.textContent = bmi;
    let label = '', color = '', pct = '';
    if (bmi < 18.5) { label = 'Underweight'; color = '#60a5fa'; pct = '14%'; }
    else if (bmi < 25) { label = 'Healthy'; color = '#4ade80'; pct = '38%'; }
    else if (bmi < 30) { label = 'Overweight'; color = '#fbbf24'; pct = '64%'; }
    else               { label = 'Obese';       color = '#ff2d00'; pct = '90%'; }
    if (statEl)  { statEl.textContent = label; statEl.style.color = color; }
    if (numEl)   numEl.style.color = color;
    if (fillEl)  { fillEl.style.width = pct; fillEl.style.background = color; }
  };
  bmiForm.addEventListener('input', calc);
}

// ── 8. CALORIE CALCULATOR ─────────────────────────────────
const calForm = document.getElementById('calForm');
if (calForm) {
  // Gender toggle
  document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculateCal();
    });
  });

  const calculateCal = () => {
    const age    = +document.getElementById('calAge').value;
    const hCm    = +document.getElementById('calHeight').value;
    const weight = +document.getElementById('calWeight').value;
    const act    = +document.getElementById('calActivity').value;
    const gender = document.querySelector('.gender-btn.active')?.dataset.gender || 'male';
    if (!age || !hCm || !weight) return;

    // Mifflin-St Jeor
    let bmr = gender === 'male'
      ? 10 * weight + 6.25 * hCm - 5 * age + 5
      : 10 * weight + 6.25 * hCm - 5 * age - 161;
    const tdee = Math.round(bmr * act);

    const fat   = Math.round((tdee * 0.25) / 9);
    const prot  = Math.round((tdee * 0.30) / 4);
    const carbs = Math.round((tdee * 0.45) / 4);

    const setEl = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
    setEl('calTotal', tdee);
    setEl('calFat',   fat   + 'g');
    setEl('calProt',  prot  + 'g');
    setEl('calCarbs', carbs + 'g');

    // Macro bars (max based on highest macro)
    const max = Math.max(fat, prot, carbs);
    const setBar = (id, val) => { const e = document.getElementById(id); if (e) e.style.width = (val / max * 100) + '%'; };
    setBar('fatBar',   fat);
    setBar('protBar',  prot);
    setBar('carbBar',  carbs);
  };

  calForm.addEventListener('input', calculateCal);
}

// ── 9. CONTACT FORM ───────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    if (!btn) return;
    btn.textContent = 'Message Sent!';
    btn.style.background = '#4ade80';
    btn.style.borderColor = '#4ade80';
    btn.style.color = '#000';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.cssText = '';
      contactForm.reset();
    }, 3500);
  });
}

// ── 10. SMOOTH ANCHOR SCROLL ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── 11. TICKER CLONE (for seamless loop) ──────────────────
const track = document.querySelector('.ticker-track');
if (track) {
  track.innerHTML += track.innerHTML;
}
