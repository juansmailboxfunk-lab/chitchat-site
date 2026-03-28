(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink(activeId) {
    navLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + activeId;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function closeMenu() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    siteNav.classList.remove("is-open");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
      navToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
      siteNav.classList.toggle("is-open", !isOpen);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });
  }

  const sections = document.querySelectorAll("[data-section]");
  if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const activeId = entry.target.getAttribute("id");
          setActiveLink(activeId);
        });
      },
      {
        rootMargin: "-45% 0px -40% 0px",
        threshold: 0.01
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  const contactForm = document.querySelector(".contact-form");
  const formStatus = document.querySelector(".form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      formStatus.classList.add("is-visible");
      formStatus.textContent = "Gracias. Este formulario es una vista previa y todavía no envía mensajes.";
      contactForm.reset();
    });
  }
})();
