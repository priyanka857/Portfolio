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

const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

/* =============================
   Premium Dot + Ring Cursor
============================= */
if (finePointer && motionAllowed) {
  const cursorDot = document.createElement("span");
  const cursorRing = document.createElement("span");

  cursorDot.className = "cursor-dot";
  cursorRing.className = "cursor-ring";

  document.body.append(cursorDot, cursorRing);
  document.body.classList.add("custom-cursor-enabled");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener(
    "pointermove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    },
    { passive: true }
  );

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

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

  const canTilt = finePointer;
  if (canTilt) {
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