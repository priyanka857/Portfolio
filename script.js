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

const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (motionAllowed) {
  typeRole();
} else if (typer) {
  typer.textContent = roles[0];
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (window.AOS) {
  AOS.init({
    duration: motionAllowed ? 650 : 0,
    once: true,
    easing: "ease-out-cubic",
    offset: 80,
    disable: !motionAllowed,
  });
}

const navbarEl = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const navbarCollapse = document.getElementById("mainNavbar");

function closeMobileMenu() {
  if (navbarCollapse?.classList.contains("show") && window.bootstrap) {
    bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Close the mobile menu on outside click/tap
document.addEventListener("click", (event) => {
  const isOpen = navbarCollapse?.classList.contains("show");
  const clickedInsideNavbar = event.target.closest(".navbar");
  if (isOpen && !clickedInsideNavbar) {
    closeMobileMenu();
  }
});

// Compact + shadow navbar once the page is scrolled
function updateNavbarScrollState() {
  if (!navbarEl) return;
  navbarEl.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", updateNavbarScrollState, { passive: true });
updateNavbarScrollState();

// Reset a stuck-open mobile menu when resizing back to desktop width
window.addEventListener("resize", () => {
  if (window.innerWidth >= 992) {
    closeMobileMenu();
  }
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

/* =============================
   Minimal Dot Cursor
============================= */
if (finePointer && motionAllowed) {
  const cursorDot = document.createElement("span");
  cursorDot.className = "cursor-dot";

  document.body.append(cursorDot);
  document.body.classList.add("custom-cursor-enabled");

  window.addEventListener(
    "pointermove",
    (event) => {
      cursorDot.style.left = `${event.clientX}px`;
      cursorDot.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );

  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, select, .project-card, .skill-card, .service-card, .btn"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("pointerenter", () => {
      document.body.classList.add("cursor-hover");
    });

    element.addEventListener("pointerleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });

  window.addEventListener("pointerdown", () => {
    document.body.classList.add("cursor-click");
  });

  window.addEventListener("pointerup", () => {
    document.body.classList.remove("cursor-click");
  });

  window.addEventListener("blur", () => {
    document.body.classList.remove("cursor-hover", "cursor-click");
  });
}

if (motionAllowed) {
  const revealItems = document.querySelectorAll(
    "main section, .service-card, .skill-card, .project-card, .info-panel"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal-ready");
      revealObserver.observe(item);
    });
  }

  if (finePointer) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;

        card.style.setProperty("--tilt-x", `${x.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${y.toFixed(2)}deg`);
        card.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
        card.style.removeProperty("--glow-x");
        card.style.removeProperty("--glow-y");
      });
    });
  }

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.06}px, ${y * 0.12}px)`;
    });

    button.addEventListener("pointerleave", () => {
      button.style.removeProperty("transform");
    });

    button.addEventListener("click", (event) => {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.setProperty("--x", `${event.clientX - rect.left}px`);
      ripple.style.setProperty("--y", `${event.clientY - rect.top}px`);
      button.appendChild(ripple);

      ripple.addEventListener("animationend", () => ripple.remove(), {
        once: true,
      });
    });
  });
}

const contactForm = document.querySelector(".contact-form");
const formStatus = contactForm?.querySelector(".form-status");
const formSubmitBtn = contactForm?.querySelector('button[type="submit"]');

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (formStatus) {
    formStatus.textContent = "";
    formStatus.classList.remove("is-error", "is-success");
  }

  if (formSubmitBtn) {
    formSubmitBtn.disabled = true;
  }

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      contactForm.reset();
      if (formStatus) {
        formStatus.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
        formStatus.classList.add("is-success");
      }
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    if (formStatus) {
      formStatus.textContent =
        "Something went wrong sending that. Please email priyankasuresh857@gmail.com directly.";
      formStatus.classList.add("is-error");
    }
  } finally {
    if (formSubmitBtn) {
      formSubmitBtn.disabled = false;
    }
  }
});