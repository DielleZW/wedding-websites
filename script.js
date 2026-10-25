
(() => {
  const w = window.PMW_WEDDING;
  const app = document.getElementById("app");

  if (!w) {
    app.innerHTML = `
      <section class="section">
        <h2>Wedding website not found</h2>
        <p>Please check the link with the couple.</p>
      </section>
    `;
    return;
  }

  // =====================================================
  // HELPERS
  // =====================================================

  const esc = s =>
    String(s ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  const safeUrl = s => {
    if (!s || typeof s !== "string" || !s.trim()) return "";

    try {
      const u = new URL(s.trim(), location.href);

      return ["https:", "http:", "mailto:"].includes(u.protocol)
        ? u.href
        : "";
    } catch {
      return "";
    }
  };

  // A link appears ONLY when a valid URL exists.
  const link = (url, label) => {
    const href = safeUrl(url);

    if (!href) return "";

    return `
      <a href="${esc(href)}"
         target="_blank"
         rel="noopener noreferrer">
        ${esc(label)} ↗
      </a>
    `;
  };

  const heading = (eyebrow, title, intro = "") => `
    <div class="section-head">
      <div class="eyebrow">${esc(eyebrow)}</div>
      <h2>${esc(title)}</h2>
      ${intro ? `<p>${esc(intro)}</p>` : ""}
      <div class="motif">✦ ✧ ✦</div>
    </div>
  `;

  // =====================================================
  // ENABLED SECTIONS & NAVIGATION
  // =====================================================

  const sections = [
    ["story", "Our Story"],
    ["events", "Celebrations"],
    ["travel", "Travel & Stay"],
    ["gallery", "Gallery"],
    ["bridalParty", "Bridal Party"],
    ["registry", "Registry"],
    ["rsvp", "RSVP"],
    ["faq", "FAQs"]
  ].filter(([id]) => w[id]?.enabled);

  const nav = document.getElementById("links");

  nav.innerHTML = sections
    .map(([id, title]) => `<a href="#${id}">${title}</a>`)
    .join("");

  document.title = `${w.names} | Wedding Website`;

  document.getElementById("brand").textContent = w.names;
  document.getElementById("footer-names").textContent = w.names;

  // =====================================================
  // HERO
  // =====================================================

  const names = w.names.split(" & ");

  let out = `
    <section class="hero invitation-hero"
             id="home"
             style="background-image:url('${esc(w.heroImage)}')">

      <div class="hero-copy">

        <div class="hero-kicker">
          ${esc(w.heroKicker)}
        </div>

        <div class="script">
          ${esc(w.heroScript || "Together, in Zimbabwe")}
        </div>

        <h1>
          ${esc(names[0])}
          <span class="hero-and">&</span>
          ${esc(names[1] || "")}
        </h1>

        <div class="hero-date">${esc(w.date)}</div>

        <div class="hero-place">
          ${esc(w.destination)}
        </div>

        <p class="hero-note">
          ${esc(w.subtitle)}
        </p>

        ${w.rsvp?.enabled
          ? '<a class="button" href="#rsvp">RSVP details ↓</a>'
          : ""}

      </div>
    </section>
  `;

  // =====================================================
  // OUR STORY
  // =====================================================

  if (w.story?.enabled) {
    const s = w.story;

    out += `
      <section id="story" class="section">

        ${heading("The beginning", s.title)}

        <div class="story-intro">

          <img src="${esc(s.image)}"
               alt="${esc(w.names)} together"
               loading="lazy">

          <div class="story-body">

            <div class="script">
              ${esc(s.kicker || "It started with a click...")}
            </div>

            ${esc(s.body)
              .split(/\n\s*\n/)
              .map(p => `<p>${p}</p>`)
              .join("")}

          </div>
        </div>

        <div class="love-notes">

          <div>
            <span class="eyebrow">
              ${esc(s.brideLabel || `${names[0]} on ${names[1] || "their partner"}`)}
            </span>
            <p>${esc(s.brideAboutGroom)}</p>
          </div>

          <div>
            <span class="eyebrow">
              ${esc(s.groomLabel || `${names[1] || "Partner"} on ${names[0]}`)}
            </span>
            <p>${esc(s.groomAboutBride)}</p>
          </div>

        </div>
      </section>
    `;
  }

  // =====================================================
  // THE CELEBRATIONS
  // =====================================================

  if (w.events?.enabled) {
    const e = w.events;

    out += `
      <section id="events" class="wash">
        <div class="section">

          ${heading("Celebrate with us", e.title, e.intro)}

          ${e.attireNote ? `
            <div class="attire-note">
              <strong>Attire & Weather</strong>
              <p>${esc(e.attireNote)}</p>
            </div>
          ` : ""}

          <div class="cards event-cards">

            ${(e.items || []).map((v, i) => `
              <article class="card">

                <div class="eyebrow">
                  Celebration ${i + 1} · ${esc(v.date)}
                </div>

                <h3>${esc(v.name)}</h3>

                <div class="detail">
                  ${esc(v.venue)}
                </div>

                <p class="event-time">
                  ${esc(v.time)}
                </p>

                <h4>${esc(v.dressCode)}</h4>

                <p>${esc(v.description)}</p>

                <div class="card-links">
                  ${link(v.websiteUrl, "Venue website")}
                  ${link(v.mapUrl, "Directions")}
                </div>

              </article>
            `).join("")}

          </div>
        </div>
      </section>
    `;
  }

  // =====================================================
  // TRAVEL & STAY
  // =====================================================

  if (w.travel?.enabled) {
    const t = w.travel;

    out += `
      <section id="travel" class="section">

        ${heading("Welcome to Zimbabwe", t.title, t.intro)}

        ${t.image ? `
          <div class="travel-feature">

            <img src="${esc(t.image)}"
                 alt="${esc(t.imageAlt || w.destination)}"
                 loading="lazy">

            <p>
              ${esc(
                t.featureText ||
                "From the thunder of the Falls to the warmth of Zimbabwean hospitality — we hope you fall in love with this place too."
              )}
            </p>

          </div>
        ` : ""}

        <div class="cards travel-cards">

          ${(t.details || []).map(d => {

            const email = safeUrl(
              d.email ? `mailto:${d.email}` : ""
            );

            const emailLink = email
              ? `<a href="${esc(email)}">${esc(d.email)} ↗</a>`
              : "";

            // Only show links configured for this couple.
            const primaryLink = d.linkUrl
              ? link(d.linkUrl, d.linkLabel || "Learn more")
              : "";

            const secondaryLink = d.secondaryUrl
              ? link(
                  d.secondaryUrl,
                  d.secondaryLabel || "More information"
                )
              : "";

            const allLinks =
              emailLink + primaryLink + secondaryLink;

            return `
              <article class="card">

                <h3>${esc(d.heading)}</h3>

                <p>${esc(d.text)}</p>

                ${allLinks ? `
                  <div class="card-links">
                    ${allLinks}
                  </div>
                ` : ""}

              </article>
            `;
          }).join("")}

        </div>

        ${t.panoramaImage ? `
          <div class="travel-panorama">

            <img src="${esc(t.panoramaImage)}"
                 alt="${esc(t.panoramaAlt || w.destination)}"
                 loading="lazy">

          </div>
        ` : ""}

      </section>
    `;
  }

  // =====================================================
  // GALLERY
  // =====================================================

  if (w.gallery?.enabled) {
    out += `
      <section id="gallery" class="wash">
        <div class="section">

          ${heading(
            "Our adventures so far",
            w.gallery.title
          )}

          <div class="gallery">

            ${(w.gallery.images || []).map(i => `
              <img src="${esc(i.src || i)}"
                   alt="${esc(i.alt || "A photograph of the couple")}"
                   loading="lazy">
            `).join("")}

          </div>

        </div>
      </section>
    `;
  }

  // =====================================================
  // BRIDAL PARTY
  // =====================================================

  if (w.bridalParty?.enabled) {
    out += `
      <section id="bridalParty" class="section">

        ${heading(
          "Our favourite people",
          w.bridalParty.title
        )}

        <div class="cards">

          ${(w.bridalParty.people || []).map(p => `
            <article class="card">
              <h3>${esc(p.name)}</h3>
              <p>${esc(p.role)}</p>
            </article>
          `).join("")}

        </div>

      </section>
    `;
  }

  // =====================================================
  // GIFT REGISTRY
  // =====================================================

  if (w.registry?.enabled) {
    out += `
      <section id="registry" class="section">

        ${heading(
          "With love",
          w.registry.title,
          w.registry.message
        )}

        ${(w.registry.links || [])
          .map(l => link(l.url, l.label))
          .join("")}

      </section>
    `;
  }

  // =====================================================
  // RSVP
  // =====================================================

  if (w.rsvp?.enabled) {
    const r = w.rsvp;

    const formUrl = safeUrl(r.googleFormUrl);

    out += `
      <section id="rsvp" class="section">

        <div class="rsvp-box">

          <div class="eyebrow">
            We hope you'll join us
          </div>

          <h2>${esc(r.title)}</h2>

          <p>${esc(r.message)}</p>

          <p>
            <strong>${esc(r.deadline)}</strong>
          </p>

          ${formUrl ? `
            <a class="button"
               href="${esc(formUrl)}"
               target="_blank"
               rel="noopener noreferrer">
              Respond via Google Forms ↗
            </a>
          ` : `
            <span class="button disabled"
                  aria-disabled="true">
              RSVP opening soon
            </span>
          `}

        </div>

      </section>
    `;
  }

  // =====================================================
  // FAQ
  // =====================================================

  if (w.faq?.enabled) {
    out += `
      <section id="faq" class="wash">
        <div class="section">

          ${heading(
            "Your questions, answered",
            w.faq.title
          )}

          <div class="faq">

            ${(w.faq.items || []).map(q => `
              <details>

                <summary>
                  ${esc(q.question)}
                </summary>

                <p>${esc(q.answer)}</p>

              </details>
            `).join("")}

          </div>

          <div class="faq-official">

            <p>
              For up-to-date entry requirements,
              always consult the official authorities.
            </p>

            ${link(
              "https://www.zimimmigration.gov.zw/",
              "Zimbabwe Immigration"
            )}

            ${link(
              "https://www.evisa.gov.zw/",
              "Official eVisa Portal"
            )}

          </div>

        </div>
      </section>
    `;
  }

  // =====================================================
  // RENDER WEBSITE
  // =====================================================

  app.innerHTML = out;

  // =====================================================
  // SMOOTH INTERNAL NAVIGATION
  // =====================================================

  const scrollToSection = hash => {
    const el = document.querySelector(hash);

    if (!el) return;

    const stickyNav = document.querySelector(".nav");

    const offset =
      (stickyNav?.offsetHeight || 0) + 12;

    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top,
      behavior: "smooth"
    });
  };

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const hash = a.getAttribute("href");

      if (
        hash &&
        hash !== "#" &&
        document.querySelector(hash)
      ) {
        e.preventDefault();
        e.stopPropagation();

        scrollToSection(hash);
      }
    });
  });

  // =====================================================
  // ACTIVE NAVIGATION HIGHLIGHT
  // =====================================================

  const anchors = [...nav.querySelectorAll("a")];

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          anchors.forEach(a => {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + e.target.id
            );
          });
        }
      });
    }, {
      rootMargin: "-20% 0px -65% 0px"
    });

    sections.forEach(([id]) => {
      const el = document.getElementById(id);

      if (el) obs.observe(el);
    });
  }

})();