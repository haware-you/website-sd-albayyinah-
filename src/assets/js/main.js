// SD Al Bayyinah — progressive-enhancement script. The site works without it,
// except the WhatsApp forms, which need it to build the message.

(function () {
  const isEn = document.documentElement.lang === "en";
  const T = (id, en) => (isEn ? en : id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
      // Solid header while the menu is open, so text stays readable over the hero.
      header?.classList.toggle("menu-open", !open);
    });
  }

  /* ---------- Submenus (click to open; hover handled by CSS on desktop) ---------- */
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

  /* ---------- Header background + floating WhatsApp visibility on scroll ---------- */
  const waFloat = document.querySelector(".wa-float");
  const firstScreen = () => Math.min(window.innerHeight * 0.8, 600);
  let formOnScreen = false;
  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 40);
    waFloat?.classList.toggle("is-hidden", window.scrollY < firstScreen() || formOnScreen);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Hide the floating button while a WhatsApp form is visible (it would be redundant).
  const forms = document.querySelectorAll("[data-wa-form]");
  if (forms.length && "IntersectionObserver" in window) {
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
      formOnScreen = visible.size > 0;
      onScroll();
    }, { threshold: 0.2 });
    forms.forEach((f) => io.observe(f));
  }

  /* ---------- Tabs with a sliding underline ---------- */
  document.querySelectorAll("[data-tabs]").forEach((wrap) => {
    const tabs = [...wrap.querySelectorAll('[role="tab"]')];
    const indicator = wrap.querySelector(".tab-indicator");
    const place = () => {
      const sel = tabs.find((t) => t.getAttribute("aria-selected") === "true");
      if (!sel || !indicator) return;
      indicator.style.width = sel.offsetWidth + "px";
      indicator.style.transform = `translateX(${sel.offsetLeft}px)`;
    };
    const select = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      place();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
  });

  /* ---------- School day: mark what is happening right now (Jakarta time) ---------- */
  document.querySelectorAll("[data-day]").forEach((list) => {
    const parse = (s) => {
      const m = /^(\d{1,2})[.:](\d{2})/.exec(s || "");
      return m ? Number(m[1]) * 60 + Number(m[2]) : null;
    };
    const mark = () => {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      const get = (type) => parts.find((p) => p.type === type)?.value;
      const weekday = get("weekday");
      const now = Number(get("hour")) * 60 + Number(get("minute"));
      const rows = [...list.querySelectorAll("li[data-time]")];
      rows.forEach((r) => { r.classList.remove("is-now"); r.querySelector(".now-badge")?.remove(); });
      if (weekday === "Sat" || weekday === "Sun") return;
      const times = rows.map((r) => parse(r.dataset.time));
      const last = times[times.length - 1];
      if (times[0] == null || now < times[0] || now >= last) return; // outside school hours
      let idx = 0;
      times.forEach((t, i) => { if (t != null && t <= now) idx = i; });
      const row = rows[idx];
      row.classList.add("is-now");
      const badge = document.createElement("span");
      badge.className = "now-badge";
      badge.textContent = T("Sekarang", "Now");
      row.querySelector("strong")?.append(badge);
    };
    mark();
    setInterval(mark, 60 * 1000);
  });

  /* ---------- Copy buttons ---------- */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = T("Tersalin", "Copied");
        btn.classList.add("is-done");
      } catch {
        btn.textContent = T("Gagal, salin manual", "Copy failed");
      }
      setTimeout(() => { btn.textContent = label; btn.classList.remove("is-done"); }, 2000);
    });
  });

  /* ---------- WhatsApp forms ---------- */
  forms.forEach((form) => {
    const error = form.querySelector(".form-error");
    const submit = form.querySelector('button[type="submit"]');
    const done = form.querySelector(".wa-done");
    const fields = [...form.querySelectorAll("input, select, textarea")];
    let tried = false;

    const check = (f) => {
      const bad = f.required && !f.value.trim();
      f.classList.toggle("is-invalid", bad);
      f.classList.toggle("is-valid", !bad && f.value.trim() !== "");
      f.setAttribute("aria-invalid", String(bad));
      const label = f.closest(".field");
      let msg = label.querySelector(".field-msg");
      if (bad && !msg) {
        msg = document.createElement("span");
        msg.className = "field-msg";
        msg.textContent = T("Wajib diisi", "Required");
        label.append(msg);
      } else if (!bad && msg) msg.remove();
      return !bad;
    };

    fields.forEach((f) => {
      f.addEventListener("blur", () => { if (tried || f.value.trim()) check(f); });
      f.addEventListener("input", () => { if (f.classList.contains("is-invalid")) check(f); });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      tried = true;
      const bad = fields.filter((f) => !check(f));
      if (bad.length) {
        error.textContent = T("Mohon isi: ", "Please fill in: ") + bad.map((f) => f.dataset.label).join(", ");
        error.hidden = false;
        bad[0].focus();
        return;
      }
      error.hidden = true;

      const lines = [form.dataset.waHeader, ""];
      fields.forEach((f) => { if (f.value.trim()) lines.push(`${f.dataset.label}: ${f.value.trim()}`); });
      const url = `https://wa.me/${form.dataset.waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;

      submit.setAttribute("aria-busy", "true");
      submit.textContent = T("Membuka WhatsApp…", "Opening WhatsApp…");
      setTimeout(() => {
        const win = window.open(url, "_blank", "noopener");
        submit.removeAttribute("aria-busy");
        submit.textContent = submit.dataset.label;
        done.querySelector("[data-done-title]").textContent = T("WhatsApp sudah terbuka", "WhatsApp is open");
        done.querySelector("[data-done-text]").textContent = T(
          "Pesan Anda belum terkirim. Tekan Kirim di WhatsApp untuk menyelesaikan.",
          "Your message is not sent yet. Press Send in WhatsApp to finish."
        );
        const link = done.querySelector("[data-done-link]");
        link.href = url;
        link.textContent = win ? T("Buka WhatsApp lagi", "Open WhatsApp again") : T("WhatsApp tidak terbuka? Klik di sini", "WhatsApp didn't open? Click here");
        done.hidden = false;
        if (!reduceMotion) done.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, reduceMotion ? 0 : 450);
    });
  });
})();
