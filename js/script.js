/* ==========================================================================
   ECONOVA POWER SOLUTIONS PVT. LTD.
   Global scripts — Vanilla JavaScript only.
   Sections: helpers · header/nav · scroll reveal · projects (filter+modal)
             · contact form
   ========================================================================== */

"use strict";

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------------------
   Header — shadow on scroll, mobile navigation
   -------------------------------------------------------------------------- */
(function () {
  const header = $("#siteHeader");
  const navToggle = $("#navToggle");
  const nav = $("#mainNav");

  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (navToggle && nav) {
    const setNav = (open) => {
      navToggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    navToggle.addEventListener("click", () => {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });

    // Close the menu when a link inside it is chosen
    $$("a", nav).forEach((link) => link.addEventListener("click", () => setNav(false)));

    // Close with Escape and restore focus to the toggle
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setNav(false);
        navToggle.focus();
      }
    });
  }
})();

/* --------------------------------------------------------------------------
   Scroll reveal — fade-up on intersection (skipped when reduced motion)
   -------------------------------------------------------------------------- */
(function () {
  const targets = $$(".reveal");

  if (!targets.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* --------------------------------------------------------------------------
   Projects page — portfolio rendering, filters and detail modal
   -------------------------------------------------------------------------- */
(function () {
  const grid = $("#portfolioGrid");
  if (!grid) return; // only runs on projects.html

  /* =======================================================================
     PLACEHOLDER PROJECT DATA
     -----------------------------------------------------------------------
     Replace the items below with verified completed projects before launch.
     Use the pattern:
       {
         title:        "Project name",
         location:     "[LOCATION]",
         capacity:     "[PROJECT CAPACITY]",
         type:         "Project type (shown on the card)",
         tags:         ["Filter tags: Rooftop, Ground Mounted, Commercial, Industrial, Institutional"],
         scope:        "Contract scope, e.g. Complete EPC or Engineering + Procurement",
         image:        "images/projects/pX.jpg",
         client:       "[CLIENT NAME]",
         completion:   "[COMPLETION YEAR]",
         description:  "Short project overview",
         scopePoints:  ["Key deliverables"]
       }
     ======================================================================= */
  const PROJECTS = [
    {
      title: "Industrial Rooftop Solar",
      location: "Ahilyanagar, Maharashtra",
      capacity: "200 kW",
      type: "Industrial Rooftop",
      tags: ["Rooftop", "Industrial"],
      scope: "Complete EPC",
      image: "images/projects/p1.jpg",
      client: "[CLIENT NAME]",
      completion: "[COMPLETION YEAR]",
      description: "Industrial rooftop solar installation delivered under a complete EPC scope. [Replace with a verified project summary.]",
      scopePoints: ["Site assessment and shadow analysis", "Structural design and engineering", "Equipment procurement", "Installation and commissioning"]
    },
    {
      title: "Commercial Rooftop Solar",
      location: "Ahilyanagar, Maharashtra",
      capacity: "155 kW",
      type: "Commercial Rooftop",
      tags: ["Rooftop", "Commercial"],
      scope: "Complete EPC",
      image: "images/projects/p2.jpg",
      client: "[CLIENT NAME]",
      completion: "[COMPLETION YEAR]",
      description: "Commercial rooftop solar installation delivered under a complete EPC scope. [Replace with a verified project summary.]",
      scopePoints: ["Site assessment and shadow analysis", "Design and engineering", "Equipment procurement", "Installation and commissioning"]
    },
    {
      title: "Residential Rooftop Solar",
      location: "Ahilyanagar, Maharashtra",
      capacity: "280 kW",
      type: "Residential Rooftop",
      tags: ["Rooftop", "Residential"],
      scope: "Complete EPC",
      image: "images/projects/p6.jpg",
      client: "[CLIENT NAME]",
      completion: "[COMPLETION YEAR]",
      description: "Commercial rooftop solar installation delivered under a complete EPC scope. [Replace with a verified project summary.]",
      scopePoints: ["Site assessment", "Design and engineering", "Equipment procurement", "Installation and commissioning"]
    }
  ];

  const modal = $("#projectModal");
  const modalBackdrop = $("#projectModalBackdrop");
  const modalClose = $("#projectModalClose");
  let lastFocused = null;

  function projectCardHtml(project) {
    const id = PROJECTS.indexOf(project);
    return `
      <article class="project-card reveal">
        <button type="button" class="project-card-media" data-project-id="${id}" aria-haspopup="dialog" aria-label="View details of ${project.title}">
          <img src="${project.image}" alt="${project.type} solar project at ${project.location}">
        </button>
        <div class="project-card-body">
          <span class="project-tag">${project.type}</span>
          <h3 class="project-title">
            <button type="button" class="project-title-link" data-project-id="${id}">${project.title}</button>
          </h3>
          <p class="project-location">${project.location}</p>
          <div class="project-meta">
            <span class="project-capacity">${project.capacity}</span>
            <span class="project-scope">${project.scope}</span>
          </div>
        </div>
      </article>
    `;
  }

  function renderProjects(list) {
    grid.innerHTML = list.map(projectCardHtml).join("");
    grid.classList.toggle("hidden", list.length === 0);
    // Apply reveal state to newly rendered cards (grid may start below the fold)
    $$(".reveal", grid).forEach((el) => el.classList.add("is-visible"));
  }

  function openModal(id) {
    const project = PROJECTS[id];
    if (!project) return;

    $("#modalImage").src = project.image;
    $("#modalImage").alt = `${project.type} solar project at ${project.location}`;
    $("#modalTag").textContent = project.type;
    $("#modalTitle").textContent = project.title;
    $("#modalLocation").textContent = project.location;
    $("#modalClient").textContent = project.client;
    $("#modalCapacity").textContent = project.capacity;
    $("#modalScope").textContent = project.scope;
    $("#modalCompletion").textContent = project.completion;
    $("#modalDescription").textContent = project.description;

    const listEl = $("#modalScopeList");
    listEl.innerHTML = project.scopePoints.map((p) => `<li>${p}</li>`).join("");

    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function applyFilter(tag) {
    const list = tag === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(tag));
    renderProjects(list);
  }

  // Filter buttons
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", b === btn);
      });
      applyFilter(btn.dataset.filter);
    });
  });

  // Open modal from card buttons (event delegation)
  grid.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-project-id]");
    if (trigger) openModal(Number(trigger.dataset.projectId));
  });

  // Close modal: button, backdrop, Escape
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  // Initial render
  applyFilter("All");

  // `data-project` deep links: index.html can open a specific project
  window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("project");
    if (id !== null) openModal(Number(id));
  });
})();

/* --------------------------------------------------------------------------
   Contact form — frontend validation + demo success state
   -------------------------------------------------------------------------- */
(function () {
  const form = $("#contactForm");
  if (!form) return; // only runs on contact.html

  const fields = {
    name: { required: true },
    company: { required: false },
    phone: { required: true },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ },
    location: { required: true },
    type: { required: false },
    capacity: { required: false },
    message: { required: true }
  };

  const validateField = (input) => {
    const rules = fields[input.name];
    if (!rules) return true;

    const value = input.value.trim();
    const fieldWrap = input.closest(".form-field");
    let valid = true;
    let message = "";

    if (rules.required && !value) {
      valid = false;
      message = "This field is required.";
    } else if (value && rules.pattern && !rules.pattern.test(value)) {
      valid = false;
      message = input.name === "email" ? "Please enter a valid email address." : "Please enter a valid phone number.";
    }

    input.classList.toggle("is-invalid", !valid);
    if (fieldWrap) {
      fieldWrap.classList.toggle("has-error", !valid);
      const errorEl = fieldWrap.querySelector(".form-error");
      if (errorEl) errorEl.textContent = message;
    }
    // Required marker for screen readers when invalid
    input.setAttribute("aria-invalid", String(!valid));
    return valid;
  };

  const clearError = (input) => {
    input.classList.remove("is-invalid");
    const fieldWrap = input.closest(".form-field");
    if (fieldWrap) fieldWrap.classList.remove("has-error");
    input.setAttribute("aria-invalid", "false");
  };

  $$("input, select, textarea", form).forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      clearError(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = $$("input, select, textarea", form);
    const allValid = inputs.map(validateField).every(Boolean);

    if (!allValid) {
      // Move focus to the first invalid field
      const firstInvalid = inputs.find((i) => !validateField(i));
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // NOTE: No backend available — the enquiry is delivered via the
    // visitor's email client (mailto), addressed to contact.econova4@gmail.com.
    const data = {};
    inputs.forEach((input) => {
      if (input.name) data[input.name] = input.value.trim();
    });

    const subject = encodeURIComponent(`Solar Enquiry from ${data.name || "Website Visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.name}`,
        `Company: ${data.company || "-"}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Location: ${data.location || "-"}`,
        `Project Type: ${data.type || "-"}`,
        `Capacity: ${data.capacity || "-"}`,
        "",
        "Message:",
        data.message
      ].join("\n")
    );
    window.location.href = `mailto:contact.econova4@gmail.com?subject=${subject}&body=${body}`;

    form.classList.add("is-submitted");
    const success = $("#formSuccess");
    if (success) success.classList.add("show");
    form.querySelector('[type="submit"]').style.display = "none";
    $("#formSuccess").focus();
  });
})();