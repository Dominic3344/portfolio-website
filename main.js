// ── CIRCUIT CANVAS BACKGROUND ──
(function(){
  const canvas = document.getElementById('circuit-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], lines = [];

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    init();
  }

  function init(){
    nodes = [];
    lines = [];
    const count = Math.floor((W * H) / 22000);
    for(let i = 0; i < count; i++){
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    const t = Date.now() * 0.001;

    // draw lines between nearby nodes
    for(let i = 0; i < nodes.length; i++){
      for(let j = i+1; j < nodes.length; j++){
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 120){
          const alpha = (1 - dist/120) * 0.5;
          ctx.strokeStyle = `rgba(0,229,204,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          // right-angle routing
          const mx = (nodes[i].x + nodes[j].x) / 2;
          ctx.lineTo(mx, nodes[i].y);
          ctx.lineTo(mx, nodes[j].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // draw nodes
    for(const n of nodes){
      n.pulse += 0.03;
      const glow = Math.sin(n.pulse) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(0,229,204,${glow * 0.8})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();

      n.x += n.vx;
      n.y += n.vy;
      if(n.x < 0 || n.x > W) n.vx *= -1;
      if(n.y < 0 || n.y > H) n.vy *= -1;
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

// ── SCROLL REVEAL ──
(function(){
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if(e.isIntersecting){
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
})();

// ── TYPING EFFECT for hero name ──
// already handled via CSS animation

// ── NAV highlight on scroll ──
(function(){
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if(window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--cyan)' : '';
    });
  });
})();

// ── Mouse parallax on hero ──
(function(){
  const hero = document.getElementById('hero');
  document.addEventListener('mousemove', (e) => {
    const mx = (e.clientX / window.innerWidth - 0.5) * 20;
    const my = (e.clientY / window.innerHeight - 0.5) * 10;
    hero.style.backgroundPosition = `${50 + mx * 0.1}% ${50 + my * 0.1}%`;
  });
})();

// ── Staggered card reveal ──
(function(){
  const cards = document.querySelectorAll('.project-card, .skill-card, .blog-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });
})();
// ── ASSET INJECTION ──
(function injectAssets(){
  // Inject favicon
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.href = ASSETS.logo;
  document.head.appendChild(favicon);

  // Inject all data-asset images
  document.querySelectorAll('[data-asset]').forEach(el => {
    const key = el.getAttribute('data-asset');
    if(ASSETS[key]) el.src = ASSETS[key];
  });
})();

// ── FOOTER REVEAL ON SCROLL BOTTOM ──
(function(){
  const footer = document.querySelector('footer');
  function checkFooter(){
    const scrollBottom = window.innerHeight + window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    if(scrollBottom >= docHeight - 60){
      footer.classList.add('visible');
    } else {
      footer.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', checkFooter);
  checkFooter(); // run once on load
})();

// ── HAMBURGER MENU ──
(function(){
  const btn = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();
const dot = document.createElement('div');
dot.className = 'cursor-dot';
const ring = document.createElement('div');
ring.className = 'cursor-ring';
document.body.append(dot, ring);

document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX - 4 + 'px';
  dot.style.top  = e.clientY - 4 + 'px';
  ring.style.left = e.clientX - 16 + 'px';
  ring.style.top  = e.clientY - 16 + 'px';
});
const roles = ['Maker', 'IoT Explorer', 'App Developer', 'Hackathon Fighter'];
const el = document.querySelector('.hero-eyebrow span');
let i = 0, char = 0, deleting = false;

function type() {
  const word = roles[i];

  if (!deleting) {
    char++;
    el.textContent = word.slice(0, char);
    if (char === word.length) {
      deleting = true;
      setTimeout(type, 1400); // pause before deleting
      return;
    }
    setTimeout(type, 90);
  } else {
    char--;
    el.textContent = word.slice(0, char);
    if (char === 0) {
      deleting = false;
      i = (i + 1) % roles.length;
      setTimeout(type, 300); // pause before next word
      return;
    }
    setTimeout(type, 50);
  }
}

type();

document.addEventListener('click', (e) => {
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:fixed; width:5px; height:5px; border-radius:50%;
      background:var(--cyan); pointer-events:none; z-index:9999;
      left:${e.clientX}px; top:${e.clientY}px;
      box-shadow: 0 0 6px var(--cyan);
    `;
    document.body.appendChild(p);

    const angle = (i / 10) * Math.PI * 2;
    const dist  = 40 + Math.random() * 40;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;

    p.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
    ], { duration: 600, easing: 'ease-out' }).onfinish = () => p.remove();
  }
});
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientY - rect.top  - rect.height / 2) / 12;
    const y = (e.clientX - rect.left - rect.width  / 2) / 12;
    card.style.transform = `perspective(600px) rotateX(${-x}deg) rotateY(${y}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
});

// ── BULB TOGGLE ──
(function(){
  const bulb = document.getElementById('bulb');
  const text = document.querySelector('.bulb-text');
  let on = false;

  // auto flicker on load to grab attention
  setTimeout(() => {
    bulb.classList.add('on');
    text.classList.add('on');
    setTimeout(() => {
      bulb.classList.remove('on');
      text.classList.remove('on');
      setTimeout(() => {
        bulb.classList.add('on');
        text.classList.add('on');
        setTimeout(() => {
          bulb.classList.remove('on');
          text.classList.remove('on');
        }, 200);
      }, 150);
    }, 200);
  }, 1000);

  bulb.addEventListener('click', () => {
    on = !on;
    bulb.classList.toggle('on', on);
    text.classList.toggle('on', on);
  });
})();