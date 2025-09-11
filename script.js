// =============================
// Typewriter Effect (Fixed)
// =============================
const roles = [
  "MERN Stack Developer",
  "Web Developer "," Freelancer",
];

const el = document.getElementById("typer");
let i = 0,
    charI = 0,
    erase = false;

function type() {
  if (!el) return;

  const word = roles[i % roles.length];

  if (!erase) {
    el.textContent = word.slice(0, charI) || "\u00A0"; // avoid empty flicker
    charI++;
    if (charI > word.length) {
      erase = true;
      setTimeout(type, 1000); // pause before erase
      return;
    }
  } else {
    el.textContent = word.slice(0, charI) || "\u00A0";
    charI--;
    if (charI === 0) {
      erase = false;
      i++;
      setTimeout(type, 500); // pause before next word
      return;
    }
  }

  setTimeout(type, erase ? 50 : 120);
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
  duration: 500,   // smoother animation
  once: false,     // animation repeats when scrolling
  easing: "ease-in-out", // improved easing
});
