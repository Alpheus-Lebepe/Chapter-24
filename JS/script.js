const birthday = new Date('2026-10-17T00:00:00');
const units = { days: document.getElementById('days'), hours: document.getElementById('hours'), minutes: document.getElementById('minutes'), seconds: document.getElementById('seconds') };
const toast = document.getElementById('toast');
let toastTimer;

function pad(value) { return String(value).padStart(2, '0'); }
function updateCountdown() {
  const now = new Date();
  let difference = birthday - now;
  if (difference < 0) {
    const nextBirthday = new Date(`${now.getFullYear() + 1}-10-17T00:00:00`);
    difference = nextBirthday - now;
  }
  const seconds = Math.floor(difference / 1000);
  units.days.textContent = pad(Math.floor(seconds / 86400));
  units.hours.textContent = pad(Math.floor((seconds % 86400) / 3600));
  units.minutes.textContent = pad(Math.floor((seconds % 3600) / 60));
  units.seconds.textContent = pad(seconds % 60);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

function celebrate() {
  const colors = ['#315cff', '#6f8cff', '#1939b7', '#f1f1ed'];
  for (let i = 0; i < 70; i += 1) {
    const piece = document.createElement('i');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--x', `${(Math.random() - 0.5) * 260}px`);
    piece.style.animationDelay = `${Math.random() * .45}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3100);
  }
  showToast('Chapter 24 is officially in session. Happy birthday, Tshepo!');
}

document.getElementById('celebrateBtn').addEventListener('click', celebrate);
document.getElementById('wishBtn').addEventListener('click', () => { celebrate(); showToast('Wish sent into the universe. Make it a big one.'); });
updateCountdown();
setInterval(updateCountdown, 1000);
