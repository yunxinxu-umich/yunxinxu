// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  initMenu();
  initReveal();
  initActiveNav();
  initRipple();
  initTilt();
  initParallax();
  initHeroLock();
});


// ===== 1. Mobile Menu =====
function initMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}


// ===== 2. Scroll Reveal =====
function initReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}


// ===== 3. Active Nav (用 IntersectionObserver 替代 scroll) =====
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navItems.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  }, {
    threshold: 0.6
  });

  sections.forEach(section => observer.observe(section));
}


// ===== 4. Ripple Effect =====
function initRipple() {
  function addRipple(selector) {
    document.querySelectorAll(selector).forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const circle = document.createElement("span");
        circle.className = "ripple";

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        circle.style.width = circle.style.height = `${size}px`;
        circle.style.left = `${e.clientX - rect.left - size / 2}px`;
        circle.style.top = `${e.clientY - rect.top - size / 2}px`;

        this.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
      });
    });
  }

  addRipple(".pill-btn");
  addRipple(".contact-btn");
}


// ===== 5. Tilt Card =====
function initTilt() {
  const cards = document.querySelectorAll(".tilt-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y - rect.height / 2) / rect.height) * -6;
      const rotateY = ((x - rect.width / 2) / rect.width) * 6;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0)";
    });
  });
}


// ===== 6. Parallax =====
function initParallax() {
  const orbs = document.querySelectorAll(".bg-orb");

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / document.documentElement.clientWidth - 0.5) * 10;
    const y = (e.clientY / document.documentElement.clientHeight - 0.5) * 10;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.5;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
}

// ===== 7. Hero Lock Scroll =====
function initHeroLock() {
  const scrollBtn = document.getElementById("scrollDown");
  const sections = document.querySelectorAll(".section");
  const hero = document.querySelector(".hero");

  if (!hero || sections.length < 2) return;

  let unlocked = false;

  function unlockAndScroll() {
    if (unlocked) return;
    unlocked = true;

    document.body.classList.remove("lock-scroll");

    sections[1].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // lock at start
  document.body.classList.add("lock-scroll");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", unlockAndScroll);
  }
  hero.addEventListener(
    "wheel",
    (e) => {
      if (e.deltaY > 0) {
        unlockAndScroll();
      }
    },
    { once: true }
  );

  hero.addEventListener(
    "touchmove",
    unlockAndScroll,
    { once: true }
  );
}