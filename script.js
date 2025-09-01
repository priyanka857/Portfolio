// =============================
// Typewriter Effect
// =============================
const roles = [
  "MERN Stack Developer ",
  "Full Stack Innovator ",
  "Web Developer | Freelancer ",
];

const el = document.getElementById("typer");
let i = 0,
  charI = 0,
  erase = false;

function type() {
  if (!el) return; // safety check if element not found

  const word = roles[i % roles.length];

  // Typing
  if (!erase) {
    el.innerHTML = `<span class="text-accent">${word.slice(0, charI)}</span>`;
    charI++;
    if (charI > word.length + 10) erase = true; // pause before erasing
  }
  // Erasing
  else {
    el.innerHTML = `<span class="text-accent">${word.slice(0, charI)}</span>`;
    charI--;
    if (charI < 1) {
      erase = false;
      i++;
    }
  }

  setTimeout(type, erase ? 50 : 100); // slightly faster erase
}
type();

// =============================
// Dynamic Footer Year
// =============================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// =============================
// Bootstrap Tooltips
// =============================
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
tooltipTriggerList.forEach((tooltipTriggerEl) => {
  new bootstrap.Tooltip(tooltipTriggerEl);
});

// =============================
// AOS (Animate On Scroll)
// =============================
AOS.init({
  duration: 800,   // smoother animation
  once: false,     // animation repeats when scrolling
  easing: "ease-in-out", // improved easing
});
