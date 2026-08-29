(function () {
  "use strict";

  const siteConfig = {
    brand: "G&G Tech",
    tagline: "Conectamos ideas, diseño y código.",
    whatsappNumber: "573024214446",
    contactEmail: "gg.tech.1901@gmail.com",
    formEndpoint: "",
  };

  const projects = [
    {
      id: "sabor-local",
      name: "Restaurante Sabor Local",
      category: "starter",
      label: "Starter",
      summary: "Landing enfocada en reservas y menú móvil.",
      context:
        "Un restaurante de barrio con buena identidad necesitaba una página más clara, rápida y lista para mover reservas desde móvil sin depender solo de redes.",
      decisions: [
        "Se simplificó la navegación para que el menú y el CTA de reserva quedaran a un toque.",
        "Se reorganizó el contenido en bloques cortos con mejor jerarquía visual.",
        "Se priorizó velocidad de carga y lectura rápida desde WhatsApp e Instagram.",
      ],
      tools: ["WordPress", "Elementor", "FormSubmit", "SEO on-page"],
      results: [
        "Mayor claridad de oferta en móvil.",
        "Formulario de reservas visible desde el primer scroll.",
        "Base lista para campañas locales y QR en mesa.",
      ],
      liveUrl: "",
      imagePrompt:
        "high-end restaurant landing page mockup on laptop and smartphone, warm local dining brand, elegant dark interface with violet accents, realistic studio lighting, premium web design presentation, clean hero section, 16:9 composition",
    },
    {
      id: "aurora-legal",
      name: "Aurora Legal",
      category: "starter",
      label: "Starter",
      summary: "Sitio compacto para confianza, servicios y captación.",
      context:
        "Un estudio jurídico quería una presencia digital sobria, moderna y más confiable que una página genérica, con foco en contacto inmediato.",
      decisions: [
        "Se trabajó una estética limpia con acentos oscuros y llamados de acción discretos.",
        "Se resumieron servicios en tarjetas para mejorar escaneo visual.",
        "Se dio prioridad al formulario y a la sección de credibilidad.",
      ],
      tools: ["Webflow", "CMS Lite", "Responsive QA"],
      results: [
        "Mejor percepción visual frente a competidores locales.",
        "Ruta de contacto más simple para clientes potenciales.",
        "Contenido fácil de actualizar sin tocar código.",
      ],
      liveUrl: "",
      imagePrompt:
        "professional legal services website mockup on desktop and tablet, refined dark and silver interface with subtle purple highlights, trustworthy editorial layout, premium realistic presentation, corporate web design case study, 16:9 composition",
    },
    {
      id: "altura-arquitectura",
      name: "Altura Arquitectura",
      category: "custom",
      label: "Custom",
      summary: "Experiencia visual con motion y narrativa de marca.",
      context:
        "Un estudio de arquitectura buscaba una experiencia más inmersiva, con scroll narrativo, proyectos destacados y una identidad digital con más presencia.",
      decisions: [
        "Se diseñó una narrativa por bloques con transiciones suaves y ritmo editorial.",
        "Se construyó un portafolio más visual, pensado para pantallas grandes y móvil.",
        "Se dio más protagonismo a mockups y a la percepción premium del estudio.",
      ],
      tools: ["React", "Next.js", "GSAP", "Tailwind"],
      results: [
        "Portafolio más memorable para reuniones y presentaciones.",
        "Mayor flexibilidad para crecer a nuevas secciones.",
        "Base preparada para agregar proyectos sin rehacer el sitio.",
      ],
      liveUrl: "",
      imagePrompt:
        "premium architecture studio website shown on ultra wide monitor and mobile device, dramatic editorial grid, dark luxury interface with metallic violet accents, realistic office presentation, immersive scrolling website design, 16:9 composition",
    },
    {
      id: "vita-studio",
      name: "Vita Studio Wellness",
      category: "custom",
      label: "Custom",
      summary: "Landing con identidad propia, animación y funnel claro.",
      context:
        "Una marca wellness quería diferenciarse con una landing más cuidada, capaz de explicar servicios, mostrar confianza visual y capturar leads mejor.",
      decisions: [
        "Se combinó una interfaz limpia con microanimaciones sobrias.",
        "Se estructuró el contenido como un funnel de descubrimiento a contacto.",
        "Se preparó una base para integrar automatizaciones y CRM después.",
      ],
      tools: ["React", "Framer Motion", "Supabase", "Responsive UI"],
      results: [
        "Mejor consistencia entre marca y experiencia digital.",
        "Formulario más visible y acompañado por CTA contextual.",
        "Escalabilidad lista para campañas futuras.",
      ],
      liveUrl: "",
      imagePrompt:
        "wellness brand landing page mockup on desktop and phone, minimal futuristic interface, soft metallic purple and charcoal palette, elegant product storytelling, realistic premium web design showcase, 16:9 composition",
    },
  ];

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state = {
    filter: "all",
    activeProjectId: null,
    lastFocusedElement: null,
  };

  document.addEventListener("DOMContentLoaded", () => {
    setCurrentYear();
    initStickyHeader();
    initMobileMenu();
    initRevealObserver();
    initScrollSpy();
    initHeroProgress();
    initTimelineProgress();
    renderProjects();
    initProjectFilters();
    initProjectModal();
    initPackageLinks();
    initFaq();
    initContactForm();
    hydrateContactLinks();
  });

  function setCurrentYear() {
    const yearNode = $("#currentYear");
    if (yearNode) yearNode.textContent = String(new Date().getFullYear());
  }

  function initStickyHeader() {
    const header = $("#navbar");
    if (!header) return;

    const toggleScrolled = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    toggleScrolled();
    window.addEventListener("scroll", toggleScrolled, { passive: true });
  }

  function initMobileMenu() {
    const toggle = $("#navToggle");
    const nav = $("#navLinks");
    if (!toggle || !nav) return;

    const setOpen = (open) => {
      toggle.classList.toggle("is-open", open);
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    $$(".nav-link", nav).forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function initRevealObserver() {
    const items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
  }

  function initScrollSpy() {
    const links = $$(".nav-link");
    const sections = ["inicio", "proyectos", "servicios", "sobre-mi", "proceso", "faq", "contacto"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

    const update = (id) => {
      links.forEach((link) => {
        const targetId = (link.getAttribute("href") || "").replace("#", "");
        link.classList.toggle("active", targetId === id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) update(visible.target.id);
      },
      { threshold: [0.2, 0.42, 0.7], rootMargin: "-24% 0px -48% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initHeroProgress() {
    const hero = $(".hero-circuit");
    if (!hero) return;

    const onScroll = () => {
      const max = Math.max(window.innerHeight * 0.9, 1);
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
      hero.style.setProperty("--hero-progress", String(0.14 + progress * 0.82));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initTimelineProgress() {
    const timeline = $("#timeline");
    if (!timeline) return;

    const update = () => {
      const rect = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.2;
      const raw = (start - rect.top) / Math.max(start - end, 1);
      const progress = Math.min(Math.max(raw, 0), 1);
      timeline.style.setProperty("--timeline-progress", progress.toFixed(3));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function buildImageUrl(prompt) {
    return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=landscape_16_9`;
  }

  function renderProjects() {
    const grid = $("#projectGrid");
    if (!grid) return;

    const items = projects.filter((project) => state.filter === "all" || project.category === state.filter);

    grid.innerHTML = items
      .map(
        (project) => `
          <button class="project-card" type="button" data-project-id="${project.id}" aria-label="Abrir caso de estudio de ${project.name}">
            <div class="project-thumb">
              <div class="project-skeleton" aria-hidden="true"></div>
              <img src="${buildImageUrl(project.imagePrompt)}" alt="${project.name} — caso de estudio ${project.label}" loading="lazy" />
              <div class="project-overlay">
                <div class="project-plus" aria-hidden="true">+</div>
                <div class="project-overlay__content">
                  <strong>${project.name}</strong>
                  <span>${project.label}</span>
                </div>
              </div>
            </div>
            <div class="project-meta">
              <span class="project-label">${project.label}</span>
              <span class="project-summary">${project.summary}</span>
            </div>
          </button>
        `
      )
      .join("");

    $$(".project-card", grid).forEach((card, index) => {
      card.style.transitionDelay = reduceMotion ? "0ms" : `${index * 30}ms`;
      card.addEventListener("click", () => openProjectModal(card.dataset.projectId));
    });

    $$("img", grid).forEach((image) => {
      const parentCard = image.closest(".project-card");
      const markLoaded = () => {
        if (parentCard) parentCard.classList.add("is-loaded");
      };

      if (image.complete) {
        markLoaded();
      } else {
        image.addEventListener("load", markLoaded, { once: true });
        image.addEventListener("error", markLoaded, { once: true });
      }
    });
  }

  function initProjectFilters() {
    const grid = $("#projectGrid");
    const chips = $$(".filter-chip");
    if (!grid || !chips.length) return;

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const filter = chip.dataset.filter || "all";
        if (filter === state.filter) return;
        state.filter = filter;

        chips.forEach((button) => {
          const active = button === chip;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-selected", String(active));
        });

        grid.classList.add("is-filtering");
        window.setTimeout(() => {
          renderProjects();
          grid.classList.remove("is-filtering");
        }, reduceMotion ? 0 : 160);
      });
    });
  }

  function initProjectModal() {
    const modal = $("#projectModal");
    const closeButton = $("#modalClose");
    if (!modal || !closeButton) return;

    closeButton.addEventListener("click", closeProjectModal);

    modal.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.dataset.closeModal === "true") closeProjectModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
        closeProjectModal();
      }

      if (event.key === "Tab" && !modal.hasAttribute("hidden")) {
        trapModalFocus(event);
      }
    });
  }

  function openProjectModal(projectId) {
    const project = projects.find((item) => item.id === projectId);
    const modal = $("#projectModal");
    if (!project || !modal) return;

    state.activeProjectId = projectId;
    state.lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    $("#modalImage").src = buildImageUrl(project.imagePrompt);
    $("#modalImage").alt = `${project.name} — vista principal del proyecto`;
    $("#modalCategory").textContent = project.label;
    $("#modalTitle").textContent = project.name;
    $("#modalContext").textContent = project.context;

    fillList($("#modalDecisions"), project.decisions);
    fillList($("#modalResults"), project.results);

    const toolsContainer = $("#modalTools");
    if (toolsContainer) {
      toolsContainer.innerHTML = project.tools.map((tool) => `<span>${tool}</span>`).join("");
    }

    const liveLink = $("#modalLiveLink");
    if (liveLink) {
      if (project.liveUrl) {
        liveLink.href = project.liveUrl;
        liveLink.removeAttribute("aria-disabled");
        liveLink.textContent = "Ver sitio en vivo";
      } else {
        liveLink.href = "#";
        liveLink.setAttribute("aria-disabled", "true");
        liveLink.textContent = "Ver sitio en vivo";
      }
    }

    const quoteLink = $("#modalQuoteLink");
    if (quoteLink) {
      quoteLink.dataset.package = project.label === "Starter" ? "Starter" : "Custom";
    }

    modal.removeAttribute("hidden");
    document.body.classList.add("modal-open");
    window.setTimeout(() => $("#modalClose")?.focus(), 10);
  }

  function closeProjectModal() {
    const modal = $("#projectModal");
    if (!modal || modal.hasAttribute("hidden")) return;

    modal.setAttribute("hidden", "");
    document.body.classList.remove("modal-open");
    state.activeProjectId = null;

    if (state.lastFocusedElement) {
      state.lastFocusedElement.focus();
    }
  }

  function trapModalFocus(event) {
    const modal = $("#projectModal");
    if (!modal) return;

    const focusable = $$(
      'button:not([disabled]), [href]:not([aria-disabled="true"]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
      modal
    ).filter((element) => !element.hasAttribute("hidden"));

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function fillList(container, items) {
    if (!container) return;
    container.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  }

  function initPackageLinks() {
    const links = $$("[data-package]");
    const select = $("#package");
    if (!links.length || !select) return;

    links.forEach((link) => {
      link.addEventListener("click", () => {
        const value = link.dataset.package || "";
        if (value) {
          select.value = value;
          validateField(select);
        }
      });
    });
  }

  function initFaq() {
    const items = $$(".faq-item");
    if (!items.length) return;

    items.forEach((item) => {
      const button = $(".faq-question", item);
      if (!button) return;

      button.addEventListener("click", () => {
        const open = item.classList.contains("is-open");
        items.forEach((entry) => {
          entry.classList.remove("is-open");
          $(".faq-question", entry)?.setAttribute("aria-expanded", "false");
        });

        if (!open) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function hydrateContactLinks() {
    const message = `Hola ${siteConfig.brand}, quiero cotizar un proyecto web.`;
    const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

    ["#whatsappDirect", "#floatingWhatsApp"].forEach((selector) => {
      const anchor = $(selector);
      if (anchor) anchor.href = waUrl;
    });
  }

  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;

    const fields = $$("input, textarea, select", form);

    fields.forEach((field) => {
      const eventName = field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, () => validateField(field));
      field.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const isValid = fields.every((field) => validateField(field));
      if (!isValid) {
        const firstInvalid = fields.find((field) => !validateField(field));
        firstInvalid?.focus();
        return;
      }

      const payload = Object.fromEntries(new FormData(form).entries());
      const success = $("#formSuccess");
      if (success) success.textContent = "Enviando solicitud...";

      try {
        if (siteConfig.formEndpoint) {
          const response = await fetch(siteConfig.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) throw new Error("No se pudo enviar");
        } else {
          await delay(700);
        }

        form.reset();
        fields.forEach(clearFieldState);
        if (success) success.textContent = "¡Recibido! Te respondo en menos de 24h.";
      } catch (error) {
        if (success) success.textContent = "Hubo un problema al enviar. Intenta otra vez o escríbeme por WhatsApp.";
      }
    });
  }

  function validateField(field) {
    const wrapper = field.closest(".field");
    const errorNode = wrapper ? $(".field-error", wrapper) : null;
    let error = "";

    if (field.hasAttribute("required") && !String(field.value).trim()) {
      error = "Este campo es obligatorio.";
    } else if (field.type === "email" && String(field.value).trim()) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(field.value).trim());
      if (!emailOk) error = "Ingresa un email válido.";
    }

    if (wrapper) wrapper.classList.toggle("is-invalid", Boolean(error));
    if (errorNode) errorNode.textContent = error;
    return !error;
  }

  function clearFieldState(field) {
    const wrapper = field.closest(".field");
    const errorNode = wrapper ? $(".field-error", wrapper) : null;
    if (wrapper) wrapper.classList.remove("is-invalid");
    if (errorNode) errorNode.textContent = "";
  }

  function delay(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }
})();
