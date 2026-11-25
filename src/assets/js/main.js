// SD Al Bayyinah — small progressive-enhancement script. The site works without it,
// except the WhatsApp forms, which need it to build the message.

(function () {
  // Mobile menu
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
      // Solid header while the menu is open, so text stays readable over the hero.
      document.querySelector("[data-header]")?.classList.toggle("menu-open", !open);
    });
  }

  // Submenus (click to open; hover handled by CSS on desktop)
  document.querySelectorAll("[data-submenu-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".nav-item");
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", (e) => {
    if (window.matchMedia("(max-width: 1080px)").matches) return;
    document.querySelectorAll(".nav-item.is-open").forEach((item) => {
      if (!item.contains(e.target)) {
        item.classList.remove("is-open");
        item.querySelector("[data-submenu-toggle]")?.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Header background after scrolling past the hero
  const header = document.querySelector("[data-header]");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Testimonial slider
  document.querySelectorAll("[data-slider]").forEach((slider) => {
    const slides = slider.querySelectorAll("[data-slide]");
    const dots = slider.querySelectorAll("[data-dot]");
    if (slides.length < 2) return;
    let i = 0;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
    };
    dots.forEach((d) => d.addEventListener("click", () => { show(Number(d.dataset.dot)); restart(); }));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer;
    const restart = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => show(i + 1), 7000); };
    restart();
  });

  // Tabs (News / Gallery)
  document.querySelectorAll("[data-tabs]").forEach((wrap) => {
    const tabs = wrap.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          const selected = t === tab;
          t.setAttribute("aria-selected", String(selected));
          document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
        });
      });
    });
  });

  // WhatsApp forms: validate, build the message, open wa.me
  document.querySelectorAll("[data-wa-form]").forEach((form) => {
    const error = form.querySelector(".form-error");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = form.querySelectorAll("input, select, textarea");
      const missing = [];
      fields.forEach((f) => {
        const bad = f.required && !f.value.trim();
        f.classList.toggle("is-invalid", bad);
        if (bad) missing.push(f.dataset.label);
      });
      if (missing.length) {
        const isEn = document.documentElement.lang === "en";
        error.textContent = (isEn ? "Please fill in: " : "Mohon isi: ") + missing.join(", ");
        error.hidden = false;
        return;
      }
      error.hidden = true;
      const lines = [form.dataset.waHeader, ""];
      fields.forEach((f) => { if (f.value.trim()) lines.push(`${f.dataset.label}: ${f.value.trim()}`); });
      const url = `https://wa.me/${form.dataset.waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank", "noopener");
    });
  });
})();
