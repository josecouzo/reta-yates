/**
 * Ancla & Go — main.js
 * All interactive behaviours for the landing page.
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONFIG — change phone number here only
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CONFIG = {
  whatsapp: "529981234567",
  whatsappBase: "https://wa.me/529981234567",
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   YACHT DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const yachts = [
  {
    id: 1,
    name: "Azimut 50",
    category: ["lujo"],
    length: "50 pies",
    passengers: 12,
    cabins: 2,
    tags: ["Lujo", "Sunset", "Pareja"],
    price: "$18,000 MXN",
    image:
      "img/sailboat-sea-evening-sunlight-beautiful-sea-luxury-summer-adventure-active-vacation-mediterranean-sea-turkey.jpg",
    gradient: "linear-gradient(135deg, #0a4fa6 0%, #00b4d8 100%)",
    badge: "Premium",
    badgeType: "gold",
    msg: "Hola%2C%20me%20interesa%20el%20Azimut%2050%20para%20renta%20en%20Canc%C3%BAn",
  },
  {
    id: 2,
    name: "Sunseeker 60",
    category: ["lujo", "grande"],
    length: "60 pies",
    passengers: 18,
    cabins: 3,
    tags: ["Lujo", "Corporativo", "Grande"],
    price: "$28,000 MXN",
    image: "img/luxury-big-yacht-stay-sea-around-island-background-sky.jpg",
    gradient: "linear-gradient(135deg, #071d3f 0%, #0a4fa6 100%)",
    badge: "Exclusivo",
    badgeType: "gold",
    msg: "Hola%2C%20me%20interesa%20el%20Sunseeker%2060%20para%20renta%20en%20Canc%C3%BAn",
  },
  {
    id: 3,
    name: "Sea Ray 38 — Pacha",
    category: ["fiesta"],
    length: "38 pies",
    passengers: 20,
    cabins: 1,
    tags: ["Fiesta", "Cumpleaños", "DJ"],
    price: "$14,000 MXN",
    image: "img/view-boat-water.jpg",
    gradient: "linear-gradient(135deg, #00b4d8 0%, #0096b7 100%)",
    badge: "Party",
    badgeType: "aqua",
    msg: "Hola%2C%20me%20interesa%20el%20Sea%20Ray%2038%20Pacha%20para%20fiesta%20en%20Canc%C3%BAn",
  },
  {
    id: 4,
    name: "Malibu 24 — Explorer",
    category: ["pequeño"],
    length: "24 pies",
    passengers: 8,
    cabins: 0,
    tags: ["Íntimo", "Snorkel", "Pareja"],
    price: "$8,000 MXN",
    image: "img/view-boat-water.jpg",
    gradient: "linear-gradient(135deg, #014f6d 0%, #06a3c4 100%)",
    badge: null,
    badgeType: null,
    msg: "Hola%2C%20me%20interesa%20el%20Malibu%2024%20Explorer%20para%20renta%20en%20Canc%C3%BAn",
  },
  {
    id: 5,
    name: "Marquis 65 — Oceanus",
    category: ["grande", "fiesta"],
    length: "65 pies",
    passengers: 30,
    cabins: 4,
    tags: ["Grande", "Eventos", "Corporativo"],
    price: "$38,000 MXN",
    image: "img/luxury-big-yacht-stay-sea-around-island-background-sky.jpg",
    gradient: "linear-gradient(135deg, #083d82 0%, #00b4d8 100%)",
    badge: "Mega",
    badgeType: "gold",
    msg: "Hola%2C%20me%20interesa%20el%20Marquis%2065%20Oceanus%20para%20evento%20en%20Canc%C3%BAn",
  },
  {
    id: 6,
    name: "Fairline Targa 45",
    category: ["lujo", "grande"],
    length: "45 pies",
    passengers: 15,
    cabins: 2,
    tags: ["Lujo", "Isla Mujeres", "Snorkel"],
    price: "$22,000 MXN",
    image: "img/view-luxurious-yacht-water.jpg",
    gradient: "linear-gradient(135deg, #0a4fa6 0%, #083d82 100%)",
    badge: "Popular",
    badgeType: "aqua",
    msg: "Hola%2C%20me%20interesa%20el%20Fairline%20Targa%2045%20para%20renta%20en%20Canc%C3%BAn",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HELPERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/**
 * Safely loads an HTML component partial and injects it into a container.
 * Falls back gracefully if fetch fails (e.g. opened as file://).
 */
async function loadComponent(containerId, path) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    container.innerHTML = await res.text();
    return true;
  } catch (err) {
    console.warn(
      `[Ancla & Go] Could not load component "${path}":`,
      err.message,
    );
    return false;
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NAVBAR — scroll behaviour + hamburger + active link
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // Scroll → add .scrolled class
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load

  // Hamburger toggle
  const hamburger = document.getElementById("navbar-hamburger");
  const mobileMenu = document.getElementById("navbar-mobile");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
      hamburger.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú",
      );
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  // Active nav link via IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar__link[data-section]");

  if (navLinks.length && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "navbar__link--active",
                link.dataset.section === entry.target.id,
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCROLL REVEAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((el, i) => {
    // Stagger children inside a parent container
    const staggerDelay = el.closest("[data-stagger]") ? i * 80 : 0;
    if (staggerDelay) el.style.transitionDelay = `${staggerDelay}ms`;
    observer.observe(el);
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FLEET — render cards + filter
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildYachtCard(yacht) {
  const cabinText =
    yacht.cabins === 0
      ? "Cubierta abierta"
      : `${yacht.cabins} cabina${yacht.cabins > 1 ? "s" : ""}`;

  const badgeHTML = yacht.badge
    ? `<div class="yacht-card__badge"><span class="tag tag--${yacht.badgeType}">${yacht.badge}</span></div>`
    : "";

  const tagsHTML = yacht.tags
    .map((t) => `<span class="tag tag--dark">${t}</span>`)
    .join("");

  const waLink = `${CONFIG.whatsappBase}?text=${yacht.msg}`;

  return `
    <article
      class="yacht-card reveal"
      role="listitem"
      data-categories="${yacht.category.join(" ")}"
      aria-label="Yate ${yacht.name}"
    >
      <div class="yacht-card__img">
        ${
          yacht.image
            ? `<img src="${yacht.image}" alt="${yacht.name} — renta de yate en Cancún" loading="lazy" width="640" height="440" />`
            : `<div class="yacht-card__img-bg" style="background: ${yacht.gradient};" role="img" aria-label="Foto del yate ${yacht.name}"><svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M2 20h20M5 20V10l7-6 7 6v10"/><path d="M12 14v6M9 14h6"/></svg></div>`
        }
        ${badgeHTML}
      </div>
      <div class="yacht-card__body">
        <h3 class="yacht-card__name">${yacht.name}</h3>
        <div class="yacht-card__specs" aria-label="Especificaciones">
          <div class="yacht-card__spec">
            <span class="yacht-card__spec-icon" aria-hidden="true">📏</span>
            <span>${yacht.length}</span>
          </div>
          <div class="yacht-card__spec">
            <span class="yacht-card__spec-icon" aria-hidden="true">👥</span>
            <span>${yacht.passengers} personas</span>
          </div>
          <div class="yacht-card__spec">
            <span class="yacht-card__spec-icon" aria-hidden="true">🛏</span>
            <span>${cabinText}</span>
          </div>
        </div>
        <div class="yacht-card__tags" aria-label="Etiquetas">${tagsHTML}</div>
        <div class="yacht-card__footer">
          <div class="yacht-card__price">
            <span class="yacht-card__price-from">Desde</span>
            <span class="yacht-card__price-value">${yacht.price}</span>
          </div>
          <a
            href="${waLink}"
            class="btn btn--primary btn--sm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cotizar ${yacht.name} por WhatsApp"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Cotizar
          </a>
        </div>
      </div>
    </article>
  `;
}

function initFleet() {
  const grid = document.getElementById("fleet-grid");
  if (!grid) return;

  // Render all cards
  grid.innerHTML = yachts.map(buildYachtCard).join("");

  // Re-observe newly added .reveal elements
  document.querySelectorAll("#fleet-grid .reveal").forEach((el) => {
    // IntersectionObserver set up in initScrollReveal will already observe
    // but we add this hook so cards added later also animate
    el.classList.remove("visible"); // reset in case of re-render
  });
  initScrollReveal(); // re-run to pick up new .reveal nodes

  // Filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach((b) => b.classList.remove("filter-btn--active"));
      btn.classList.add("filter-btn--active");

      // Show/hide cards
      const cards = grid.querySelectorAll(".yacht-card");
      cards.forEach((card) => {
        const categories = card.dataset.categories ?? "";
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("yacht-card--hidden", !show);
      });
    });
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FAQ — accordion
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initFAQ() {
  const faqList = document.getElementById("faq-list");
  if (!faqList) return;

  faqList.addEventListener("click", (e) => {
    const question = e.target.closest(".faq-item__question");
    if (!question) return;

    const item = question.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    // Close all others
    faqList.querySelectorAll(".faq-item.open").forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove("open");
        openItem
          .querySelector(".faq-item__question")
          .setAttribute("aria-expanded", "false");
      }
    });

    // Toggle current
    item.classList.toggle("open", !isOpen);
    question.setAttribute("aria-expanded", !isOpen);
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FOOTER — copyright year
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SMOOTH ANCHOR OFFSET (fixed navbar compensation)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById("navbar")?.offsetHeight ?? 72;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BOOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Load components concurrently
  await Promise.all([
    loadComponent("navbar-container", "components/navbar.html"),
    loadComponent("footer-container", "components/footer.html"),
  ]);

  // 2. Init behaviours (components are in the DOM now)
  initNavbar();
  initFleet(); // renders yacht cards, then re-runs reveal
  initFAQ();
  initFooterYear();
  initSmoothScroll();
  initScrollReveal(); // final pass to catch static .reveal elements
});
