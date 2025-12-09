// show local time
function updateTime(){ document.getElementById('timeNow').textContent = new Date().toLocaleString(); }
updateTime(); setInterval(updateTime, 60_000);

// open links safely
function openLink(url){ window.open(url, '_blank', 'noopener'); }

// 3D tilt effect per card
const cards = document.querySelectorAll('.portal-card');
cards.forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const rect = card.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const px = (mx / rect.width) - 0.5;
    const py = (my / rect.height) - 0.5;
    const tiltY = (px * 20).toFixed(2) + 'deg';
    const tiltX = (-py * 12).toFixed(2) + 'deg';
    card.style.setProperty('--tiltX', tiltX);
    card.style.setProperty('--tiltY', tiltY);
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.setProperty('--tiltX', '0deg');
    card.style.setProperty('--tiltY', '0deg');
  });
  card.addEventListener('click', (ev)=>{
    ev.preventDefault(); const url = card.getAttribute('data-url'); openLink(url);
  });
});

// keyboard accessibility: open first 4 with number keys
document.addEventListener('keydown', (e)=>{
  if(e.key >= '1' && e.key <= '4'){
    const idx = parseInt(e.key)-1; const c = cards[idx]; if(c) openLink(c.getAttribute('data-url'));
  }
});
