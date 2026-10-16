const birthday = new Date("2026-10-17T00:00:00");
const units = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};
const toast = document.getElementById("toast");
let toastTimer;

function pad(value) {
  return String(value).padStart(2, "0");
}
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
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
}

function celebrate() {
  const colors = ["#315cff", "#6f8cff", "#1939b7", "#f1f1ed"];
  for (let i = 0; i < 70; i += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--x", `${(Math.random() - 0.5) * 260}px`);
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3100);
  }
  showToast("Chapter 24 is officially in session. Happy birthday, Tshepo!");
}

document.getElementById("celebrateBtn").addEventListener("click", celebrate);
document.getElementById("wishBtn").addEventListener("click", () => {
  const button = document.getElementById("wishBtn");
  const card = document.getElementById("wishCard");
  const isOpen = card.classList.toggle("open");
  card.setAttribute("aria-hidden", String(!isOpen));
  button.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    celebrate();
    showToast("Wish made. Chapter begins.");
  }
});
updateCountdown();
setInterval(updateCountdown, 1000);

const audio = document.getElementById("myAudio");
const soundControl = document.getElementById("soundControl");
let audioStarted = false;

function setSoundState(isMuted) {
  soundControl.classList.toggle("is-muted", isMuted);
  soundControl.setAttribute("aria-pressed", String(isMuted));
  soundControl.setAttribute(
    "aria-label",
    isMuted ? "Play birthday soundtrack" : "Mute birthday soundtrack",
  );
}

function playAudio() {
  if (!audio || audioStarted) return;
  audio
    .play()
    .then(() => {
      audioStarted = true;
      setSoundState(false);
    })
    .catch(() => {
      // Browsers may block unmuted autoplay until the visitor interacts.
      setSoundState(true);
    });
}

function toggleAudio() {
  if (audio.paused) {
    audio
      .play()
      .then(() => {
        audioStarted = true;
        setSoundState(false);
      })
      .catch(() => setSoundState(true));
  } else {
    audio.pause();
    setSoundState(true);
  }
}

soundControl.addEventListener("click", toggleAudio);
window.addEventListener("load", playAudio);
["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
  window.addEventListener(
    eventName,
    (event) => {
      if (event.target.closest && event.target.closest("#soundControl")) return;
      playAudio();
    },
    { once: true, passive: true },
  );
});
