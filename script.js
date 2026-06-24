const roles = ["MERN Stack Developer", "Web Developer", "Freelancer"];

const typer = document.getElementById("typer");
let roleIndex = 0;
let charIndex = 1;
let deleting = false;

function typeRole() {
  if (!typer) return;

  const currentRole = roles[roleIndex % roles.length];
  typer.textContent = currentRole.slice(0, charIndex) || "\u00A0";

  if (!deleting && charIndex <= currentRole.length) {
    charIndex += 1;
    setTimeout(typeRole, 95);
    return;
  }

  if (!deleting && charIndex > currentRole.length) {
    deleting = true;
    charIndex = currentRole.length;
    setTimeout(typeRole, 1250);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeRole, 45);
    return;
  }

  deleting = false;
  roleIndex += 1;
  setTimeout(typeRole, 360);
}

typeRole();

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (window.AOS) {
  AOS.init({
    duration: 650,
    once: true,
    easing: "ease-out-cubic",
    offset: 80,
  });
}

const navLinks = document.querySelectorAll(".nav-link");
const navbarCollapse = document.getElementById("mainNavbar");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarCollapse?.classList.contains("show") && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    }
  });
});

const sections = [...document.querySelectorAll("main section[id]")];

function setActiveNavLink() {
  const current = sections.find((section) => {
    const box = section.getBoundingClientRect();
    return box.top <= 120 && box.bottom >= 120;
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      Boolean(current && link.getAttribute("href") === `#${current.id}`)
    );
  });
}

window.addEventListener("scroll", setActiveNavLink, { passive: true });
setActiveNavLink();

const contactForm = document.querySelector(".contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name") || "there";
  const email = formData.get("email") || "";
  const message = formData.get("message") || "";
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:priyankasuresh857@gmail.com?subject=${subject}&body=${body}`;
  contactForm.reset();
});
