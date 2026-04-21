/* ── NAV SCROLL ── */
      const nav = document.getElementById("mainNav");
      window.addEventListener(
        "scroll",
        () => {
          nav.classList.toggle("solid", window.scrollY > 50);
        },
        { passive: true },
      );

      /* ── MOBILE MENU ── */
      const menuBtn = document.getElementById("menuBtn");
      const drawer = document.getElementById("navDrawer");
      menuBtn.addEventListener("click", () => {
        const open = drawer.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open);
      });
      drawer.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          drawer.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
        });
      });

      /* ── SMOOTH SCROLL ── */
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const id = a.getAttribute("href").slice(1);
          const target = document.getElementById(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });

      /* ── REVEAL ON SCROLL ── */
      const revealObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add("vis"), i * 75);
              revealObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(".reveal")
        .forEach((el) => revealObs.observe(el));

      /* ── FAQ ACCORDION ── */
      const faqItems = document.querySelectorAll(".faq-item");
      faqItems.forEach((item) => {
        const trigger = item.querySelector(".faq-trigger");
        const body = item.querySelector(".faq-body");
        trigger.addEventListener("click", () => {
          const isOpen = body.classList.contains("open");
          faqItems.forEach((i) => {
            i.querySelector(".faq-body").classList.remove("open");
            i.querySelector(".faq-trigger").setAttribute(
              "aria-expanded",
              "false",
            );
          });
          if (!isOpen) {
            body.classList.add("open");
            trigger.setAttribute("aria-expanded", "true");
          }
        });
      });
      if (faqItems.length) {
        faqItems[0].querySelector(".faq-body").classList.add("open");
        faqItems[0]
          .querySelector(".faq-trigger")
          .setAttribute("aria-expanded", "true");
      }

      /* ── FLEET CARDS ── */
      const WA = "529904006725";
      const waLink = (msg) =>
        `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

      const TYPE_LABEL = {
        luxury: "Lujo",
        sunset: "Atardecer",
        group: "Grupos",
      };

      const WA_SVG = `<svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;

      const PAX_SVG = `<svg viewBox="0 0 24 24" stroke="white" fill="none" stroke-width="2" style="width:11px;height:11px;flex-shrink:0"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`;

      const EYE_SVG = `<svg width="14" height="14" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

      function paxSpec(yacht) {
        const p = yacht.specs.find((s) => /pasajero|pax/i.test(s.lbl));
        return p ? p.val : "";
      }

      function featuredPkg(yacht) {
        return (
          yacht.packages.find((p) => p.featured) || yacht.packages[0] || null
        );
      }

      function cardTemplate(yacht) {
        const pkg = featuredPkg(yacht);
        const pax = paxSpec(yacht);
        const waMsg = pkg
          ? pkg.waMsg
          : `Hola! Me interesa el yate ${yacht.name}`;
        const price = pkg ? pkg.price : "Consultar";
        const priceNote = pkg ? pkg.name : "";
        const typeLabel = TYPE_LABEL[yacht.type] || yacht.type;
        const isFirst = yacht.id === "vive-la-vida";
        const specsHtml = yacht.specs
          .slice(0, 4)
          .map(
            (s) =>
              `<div class="spec"><span class="spec-val">${s.val}</span><span class="spec-lbl">${s.lbl}</span></div>`,
          )
          .join("");
        const pillsHtml = yacht.includes
          .slice(0, 5)
          .map((inc) => {
            const short = inc.txt.split(" ").slice(0, 2).join(" ");
            return `<span class="inc-pill">${short}</span>`;
          })
          .join("");
        const offerMeta =
          price !== "Consultar"
            ? `<meta itemprop="priceCurrency" content="MXN">`
            : "";
        const hotBadge = isFirst
          ? `<div class="card-hot"><i class="fa-solid fa-star"></i> Más popular</div>`
          : "";

        return `<article class="yacht-card reveal" data-type="${yacht.type}" role="listitem" itemscope itemtype="https://schema.org/Product">
  <div class="card-img">
    <img src="${yacht.images[0]}" alt="${yacht.name} – ${yacht.model}" loading="lazy" itemprop="image"/>
    <div class="card-img-grad"></div>
    ${hotBadge}
    <div class="card-pax">${PAX_SVG}${pax} pasajeros</div>
    <div class="card-tags-row"><span class="card-tag">${typeLabel}</span></div>
    <div class="card-hover-cta">
      <a class="card-hover-btn" href="${waLink(waMsg)}" target="_blank" rel="noopener">
        ${WA_SVG} Reservar este yate
      </a>
    </div>
  </div>
  <div class="card-body">
    <div>
      <p class="card-model" itemprop="brand">${yacht.model}</p>
      <h3 class="card-name" itemprop="name">${yacht.name}</h3>
    </div>
    <div class="card-specs">${specsHtml}</div>
    <div class="card-includes">${pillsHtml}</div>
    <div class="card-foot" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
      ${offerMeta}
      <div><span class="card-price-val">${price}</span><span class="card-price-lbl">${priceNote ? `MXN · ${priceNote}` : "Precio por grupo"}</span></div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
        <a class="btn-wa-green" href="${waLink(waMsg)}" target="_blank" rel="noopener">
          ${WA_SVG} Reservar
        </a>
        <a class="btn-details" href="detalle.html?id=${yacht.id}">
          ${EYE_SVG} Detalles
        </a>
      </div>
    </div>
  </div>
</article>`;
      }

      function renderFleetCards(fleet, filter = "all") {
        const grid = document.getElementById("fleetGrid");
        const visible =
          filter === "all" ? fleet : fleet.filter((y) => y.type === filter);
        grid.innerHTML = visible.map(cardTemplate).join("\n");
        grid.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));
      }

      (async () => {
        try {
          const fleet = await loadFleet();
          renderFleetCards(fleet);
          document.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
              document
                .querySelectorAll(".filter-btn")
                .forEach((b) => b.classList.remove("active"));
              btn.classList.add("active");
              renderFleetCards(fleet, btn.dataset.filter);
            });
          });
        } catch (err) {
          console.error("Fleet load error:", err);
          document.getElementById("fleetGrid").innerHTML =
            '<p style="text-align:center;color:var(--muted);padding:2rem">No se pudo cargar la flota. Intenta de nuevo.</p>';
        }
      })();
