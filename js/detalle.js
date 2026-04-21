const WA = "529904006725";
      const waLink = (msg) =>
        `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

      function fillSEO(y) {
        document.getElementById("meta-title").textContent = y.seo.title;
        document
          .getElementById("meta-desc")
          .setAttribute("content", y.seo.desc);
        document
          .getElementById("meta-keys")
          .setAttribute("content", y.seo.keys);
        document
          .getElementById("meta-canonical")
          .setAttribute(
            "href",
            `https://oceanmajestycancun.com/yates/${y.slug}/`,
          );
        document
          .getElementById("og-title")
          .setAttribute("content", y.seo.title);
        document.getElementById("og-desc").setAttribute("content", y.seo.desc);
        document
          .getElementById("og-image")
          .setAttribute("content", y.images[0]);
        document.title = y.seo.title;

        // Schema.org Product
        const schema = {
          "@context": "https://schema.org",
          "@type": "Product",
          name: `Renta Yate ${y.name} ${y.model} – Cancún`,
          description: y.seo.desc,
          image: y.images,
          brand: { "@type": "Brand", name: "Ocean Majesty Cancún" },
          offers: y.packages.map((p) => ({
            "@type": "Offer",
            name: p.name,
            priceCurrency: "MXN",
            price: p.price.replace(/[^0-9]/g, "") || "0",
            availability: "https://schema.org/InStock",
            url: `https://oceanmajestycancun.com/yates/${y.slug}/`,
          })),
        };
        document.getElementById("schema-product").textContent =
          JSON.stringify(schema);
      }

      function fillGallery(y) {
        const g = document.getElementById("heroGallery");
        g.innerHTML = `<div class="gallery-main" data-idx="0"><img src="${y.images[0]}" alt="${y.name} ${y.model} Cancún renta yate" loading="eager"/></div>`;
      }

      function fillPhotoGallery(y) {
        const extras = y.images.slice(1);
        if (!extras.length) return;
        document.getElementById("photoGallerySection").style.display = "";
        document.getElementById("galleryGrid").innerHTML = extras
          .map(
            (src, i) =>
              `<div class="gallery-item" data-idx="${i + 1}"><img src="${src}" alt="${y.name} foto ${i + 2}" loading="lazy"/></div>`,
          )
          .join("");
      }

      function initLightbox(images) {
        let current = 0;
        const lb = document.getElementById("lightbox");
        const lbImg = document.getElementById("lbImg");
        const lbCount = document.getElementById("lbCounter");

        function openAt(idx) {
          current = ((idx % images.length) + images.length) % images.length;
          lbImg.src = images[current];
          lbImg.alt = `Foto ${current + 1} de ${images.length}`;
          lbCount.textContent = `${current + 1} / ${images.length}`;
          lb.style.display = "flex";
          document.body.style.overflow = "hidden";
        }

        function closeLb() {
          lb.style.display = "none";
          document.body.style.overflow = "";
        }

        document.getElementById("lbClose").onclick = closeLb;
        document.getElementById("lbPrev").onclick = (e) => {
          e.stopPropagation();
          openAt(current - 1);
        };
        document.getElementById("lbNext").onclick = (e) => {
          e.stopPropagation();
          openAt(current + 1);
        };
        lb.addEventListener("click", (e) => {
          if (e.target === lb || e.target === lbImg.parentElement) closeLb();
        });
        document.addEventListener("keydown", (e) => {
          if (lb.style.display === "none") return;
          if (e.key === "Escape") closeLb();
          if (e.key === "ArrowLeft") openAt(current - 1);
          if (e.key === "ArrowRight") openAt(current + 1);
        });

        // Delegate click from any thumbnail or hero
        document.addEventListener("click", (e) => {
          const item = e.target.closest("[data-idx]");
          if (!item || !document.contains(item)) return;
          openAt(Number(item.dataset.idx));
        });
      }

      function fillBreadcrumb(y) {
        document.getElementById("breadcrumb").innerHTML = `
    <a href="index.html">Inicio</a><span class="sep">›</span>
    <a href="index.html#flota">Flota</a><span class="sep">›</span>
    <span>${y.name} – ${y.model}</span>`;
      }

      function fillMain(y) {
        document.getElementById("yachtEyebrow").textContent = y.eyebrow;
        document.getElementById("yachtH1").innerHTML = `<em>${y.name}</em>`;
        document.getElementById("yachtModel").textContent = y.model;
        document.getElementById("yachtTagline").textContent = y.tagline;

        // specs
        document.getElementById("specsGrid").innerHTML = y.specs
          .map(
            (s) => `
    <div class="spec-box">
      <span class="spec-icon"><i class="${s.icon}"></i></span>
      <span class="spec-val">${s.val}</span>
      <span class="spec-lbl">${s.lbl}</span>
    </div>`,
          )
          .join("");

        // description
        document.getElementById("yachtDesc").innerHTML = y.description
          .map((p) => `<p>${p}</p>`)
          .join("");

        // includes
        document.getElementById("includesGrid").innerHTML = y.includes
          .map(
            (i) => `
    <div class="inc-item"><span class="ico"><i class="${i.ico}"></i></span>${i.txt}</div>`,
          )
          .join("");

        // packages
        document.getElementById("packagesList").innerHTML = y.packages
          .map(
            (p) => `
    <div class="package-row${p.featured ? " featured" : ""}">
      <div>
        <div class="pkg-name">${p.name} ${p.featured ? '<span class="pkg-badge">Más popular</span>' : ""}</div>
        <div class="pkg-detail">${p.detail}</div>
      </div>
      <div class="pkg-price">
        <span class="pkg-price-val">${p.price}</span>
        <span class="pkg-price-note">Precio total</span>
      </div>
    </div>`,
          )
          .join("");

        // route
        document.getElementById("routeStops").innerHTML = y.route
          .map(
            (r) => `
    <div class="route-stop">
      <div class="stop-dot"><i class="${r.ico}"></i></div>
      <div class="stop-info">
        <h4>${r.name}</h4>
        <p>${r.desc}</p>
        <span class="stop-time">${r.time}</span>
      </div>
    </div>`,
          )
          .join("");

        // extras
        document.getElementById("extrasGrid").innerHTML = y.extras
          .map(
            (e) => `
    <div class="extra-item"><span class="eco"><i class="${e.ico}"></i></span>${e.txt}</div>`,
          )
          .join("");

        // policies
        document.getElementById("policyList").innerHTML = y.policies
          .map(
            (p) => `
    <div class="policy-item">${p}</div>`,
          )
          .join("");

        // marina
        document.getElementById("marinaName").textContent = y.marina.name;
        document.getElementById("marinaAddr").textContent = y.marina.addr;
      }

      function fillSidebar(y) {
        // price
        const firstPkg = y.packages[0];
        document.getElementById("sidebarPrice").textContent = firstPkg.price;
        document.getElementById("sidebarPriceNote").textContent =
          "MXN · precio desde";

        // select
        const sel = document.getElementById("pkgSelect");
        sel.innerHTML = y.packages
          .map((p, i) => `<option value="${i}">${p.name} — ${p.price}</option>`)
          .join("");
        sel.selectedIndex = y.packages.findIndex((p) => p.featured) || 0;

        function updateSidebar() {
          const pkg = y.packages[sel.value];
          document.getElementById("bspVal").textContent = `${pkg.price} MXN`;
          const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(pkg.waMsg)}`;
          document.getElementById("btnWaBook").href = waHref;
          document.getElementById("btnConsult").onclick = () =>
            window.open(waHref, "_blank");
          document.getElementById("waFab").href = waHref;
          document.getElementById("navCta").href = waHref;
        }
        sel.addEventListener("change", updateSidebar);
        updateSidebar();

        // includes in sidebar (first 5)
        document.getElementById("sidebarIncludes").innerHTML = y.includes
          .slice(0, 5)
          .map(
            (i) => `
    <div class="bi-item"><i class="${i.ico}"></i> ${i.txt}</div>`,
          )
          .join("");
      }

      function fillSimilar(currentId, fleet) {
        const others = fleet.filter((y) => y.id !== currentId).slice(0, 3);
        document.getElementById("similarGrid").innerHTML = others
          .map(
            (y) => `
    <a class="sim-card" href="detalle.html?id=${y.id}">
      <div class="sim-img"><img src="${y.images[0]}" alt="Renta ${y.name} Cancún" loading="lazy"/></div>
      <div class="sim-body">
        <div class="sim-model">${y.model}</div>
        <div class="sim-name">${y.name}</div>
        <div class="sim-price">Desde <strong>${y.packages[0].price}</strong></div>
      </div>
    </a>`,
          )
          .join("");
      }

      function initReveal() {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((e, i) => {
              if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add("vis"), i * 60);
                obs.unobserve(e.target);
              }
            });
          },
          { threshold: 0.08 },
        );
        document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
      }

      // Nav scroll
      window.addEventListener(
        "scroll",
        () => {
          document
            .getElementById("mainNav")
            .classList.toggle("solid", window.scrollY > 50);
        },
        { passive: true },
      );

      // Boot
      document.addEventListener("DOMContentLoaded", async () => {
        try {
          const fleet = await loadFleet();
          const id =
            new URLSearchParams(window.location.search).get("id") ||
            fleet[0].id;
          const yacht = getYachtById(id, fleet) || fleet[0];
          if (!yacht) {
            window.location.href = "index.html";
            return;
          }
          fillSEO(yacht);
          fillGallery(yacht);
          fillPhotoGallery(yacht);
          fillBreadcrumb(yacht);
          fillMain(yacht);
          fillSidebar(yacht);
          fillSimilar(yacht.id, fleet);
          initReveal();
          initLightbox(yacht.images);
        } catch (err) {
          console.error("Fleet load error:", err);
        }
      });
