/* Recomienda Mujeres · interfaz compartida del MVP */

const PAGE = document.body.dataset.page || "home";
const CATALOG_TYPE = document.body.dataset.catalogType || "";
const FAVORITES_KEY = "rm-favorites-v2";

const ICONS = {
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  share: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.3 10.8 7.4-4.4m-7.4 6.8 7.4 4.4"/></svg>',
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6m0-6-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>'
};

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function normalizeText(value = "") {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9ñ\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

function areaById(id) {
  return AREAS.find((area) => area.id === id);
}

function professionById(id) {
  return PROFESSIONS.find((profession) => profession.id === id);
}

function formatPrice(value) {
  return value === 0 ? "$0" : `$${new Intl.NumberFormat("es-CL").format(value)}`;
}

function whatsappURL(text, number = SITE.whatsapp) {
  return `https://wa.me/${String(number).replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

function getFavorites() {
  try { return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]"); }
  catch { return []; }
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function saveFavorites(items) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  document.querySelectorAll("[data-favorites-count]").forEach((node) => {
    node.textContent = items.length;
    node.hidden = items.length === 0;
  });
}

function toggleFavorite(id, button) {
  const items = getFavorites();
  const next = items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
  saveFavorites(next);
  if (button) {
    const active = next.includes(id);
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
    const label = button.querySelector("[data-favorite-label]");
    if (label) label.textContent = active ? "Guardado" : "Guardar";
  }
  showToast(next.includes(id) ? "Perfil guardado en este dispositivo" : "Perfil eliminado de tus guardados");
  if (PAGE === "favorites") renderFavoritesPage();
}

function showToast(message) {
  const toast = document.getElementById("siteToast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, 2800);
}

function navLink(href, label, pages = []) {
  const active = pages.includes(PAGE) ? ' aria-current="page" class="is-current"' : "";
  return `<a href="${href}"${active}>${label}</a>`;
}

function professionLinksForArea(areaId, limit = 8) {
  return PROFESSIONS.filter((item) => item.areas.includes(areaId)).slice(0, limit).map((item) =>
    `<a href="catalogo.html?profession=${encodeURIComponent(item.id)}">${escapeHTML(item.name)}</a>`
  ).join("");
}

function renderHeader() {
  const target = document.getElementById("siteHeader");
  if (!target) return;
  target.innerHTML = `
    <a class="skip-link" href="#mainContent">Saltar al contenido</a>
    <div class="pilot-bar"><div class="site-width"><span>${escapeHTML(SITE.pilotNotice)}</span><a href="como-funciona.html">Conoce el piloto</a></div></div>
    <header class="site-header">
      <div class="header-main site-width">
        <button class="icon-button mobile-menu-button" type="button" data-open-mobile-menu aria-label="Abrir menú">${ICONS.menu}</button>
        <a class="brand" href="index.html" aria-label="Recomienda Mujeres, inicio"><span>Recomienda</span><strong>Mujeres</strong></a>
        <form class="header-search" role="search" data-global-search>
          <label class="sr-only" for="globalSearch">Buscar mujeres, servicios o negocios</label>
          ${ICONS.search}<input id="globalSearch" name="q" type="search" placeholder="¿Qué necesitas hoy?" autocomplete="off">
          <button type="submit">Buscar</button>
        </form>
        <nav class="header-actions" aria-label="Acciones principales">
          <a class="saved-link" href="favoritas.html">Guardadas <span data-favorites-count hidden>0</span></a>
          <button class="button button-primary button-small" type="button" data-open-join>Quiero aparecer</button>
        </nav>
      </div>
      <div class="nav-row">
        <nav class="desktop-nav site-width" aria-label="Navegación principal">
          <button class="categories-trigger" type="button" aria-expanded="false" data-mega-trigger>${ICONS.menu}<span>Explorar categorías</span></button>
          ${navLink("catalogo.html", "Profesionales", ["catalog", "profile"])}
          ${navLink("pymes.html", "Emprendimientos", ["businesses"])}
          ${navLink("eventos.html", "Eventos", ["events", "event"])}
          ${navLink("noticias.html", "Historias", ["news", "article", "podcast"])}
          ${navLink("oportunidades.html", "Oportunidades", ["opportunities"])}
          ${navLink("suscripciones.html", "Planes", ["plans"])}
        </nav>
        <div class="mega-menu" data-mega-menu hidden>
          <div class="site-width mega-menu-inner">
            <div class="mega-areas" role="tablist" aria-label="Áreas">
              ${AREAS.map((area, index) => `<button type="button" role="tab" aria-selected="${index === 0}" data-mega-area="${area.id}">${escapeHTML(area.name)}${ICONS.chevron}</button>`).join("")}
            </div>
            <div class="mega-content">
              ${AREAS.map((area, index) => `<section data-mega-panel="${area.id}" ${index ? "hidden" : ""}>
                <div><p class="eyebrow">${escapeHTML(area.name)}</p><h2>Encuentra una opción cercana y confiable</h2><p>${escapeHTML(area.description)}</p></div>
                <div class="mega-links">${professionLinksForArea(area.id, 10)}</div>
                <a class="text-link" href="catalogo.html?area=${encodeURIComponent(area.id)}">Ver toda el área ${ICONS.arrow}</a>
              </section>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </header>
    <dialog class="mobile-drawer" id="mobileMenuDialog" aria-labelledby="mobileMenuTitle">
      <div class="drawer-head"><h2 id="mobileMenuTitle">Explorar</h2><button class="icon-button" type="button" data-close-dialog aria-label="Cerrar menú">${ICONS.close}</button></div>
      <form class="drawer-search" role="search" data-global-search>${ICONS.search}<label class="sr-only" for="mobileSearch">Buscar</label><input id="mobileSearch" name="q" type="search" placeholder="¿Qué necesitas?"><button type="submit">Buscar</button></form>
      <nav class="mobile-links" aria-label="Navegación móvil">
        <a href="index.html">Inicio</a><a href="catalogo.html">Profesionales</a><a href="pymes.html">Emprendimientos</a><a href="eventos.html">Eventos</a><a href="noticias.html">Historias</a><a href="oportunidades.html">Oportunidades</a><a href="suscripciones.html">Planes</a><a href="favoritas.html">Guardadas</a><a href="panel.html">Panel demostrativo</a>
      </nav>
      <div class="mobile-category-list">
        ${AREAS.map((area) => `<details><summary>${escapeHTML(area.name)}</summary><div>${professionLinksForArea(area.id, 20)}</div></details>`).join("")}
      </div>
      <button class="button button-primary button-full" type="button" data-open-join>Quiero aparecer</button>
    </dialog>
    <dialog class="join-dialog" id="joinDialog" aria-labelledby="joinDialogTitle">
      <div class="dialog-head"><div><p class="eyebrow">Etapa piloto</p><h2 id="joinDialogTitle">Quiero aparecer</h2></div><button class="icon-button" type="button" data-close-dialog aria-label="Cerrar formulario">${ICONS.close}</button></div>
      <p class="dialog-intro">Completa estos datos y prepararemos un mensaje de WhatsApp. No perderás la información ingresada.</p>
      <form id="joinForm" class="form-grid">
        <label>Nombre o nombre del negocio<input name="name" required autocomplete="name"></label>
        <label>Tipo de perfil<select name="type" required><option value="">Selecciona</option><option value="Profesional o independiente">Profesional o independiente</option><option value="Emprendimiento o PYME">Emprendimiento o PYME</option></select></label>
        <label>Área<select name="area" id="joinArea" required><option value="">Selecciona un área</option>${AREAS.map((area) => `<option value="${area.id}">${escapeHTML(area.name)}</option>`).join("")}</select></label>
        <label>Profesión o categoría<select name="profession" id="joinProfession" required><option value="">Primero selecciona un área</option></select></label>
        <label>Región<select name="region" required><option value="">Selecciona una región</option>${REGIONS.map((region) => `<option>${escapeHTML(region)}</option>`).join("")}</select></label>
        <label>Comuna o ciudad<input name="city" required></label>
        <label class="field-full">Servicios o productos principales<input name="services" required placeholder="Ej.: atención online, talleres, diseño de marca"></label>
        <label class="field-full">Cuéntanos brevemente qué haces<textarea name="description" rows="3" required></textarea></label>
        <label class="field-full">Instagram, web o teléfono de contacto<input name="contact" required></label>
        <p class="form-note field-full">Al continuar se abrirá WhatsApp con estos datos. Podrás revisarlos antes de enviar.</p>
        <button class="button button-primary field-full" type="submit">Continuar por WhatsApp ${ICONS.arrow}</button>
      </form>
    </dialog>
    <div class="toast" id="siteToast" role="status" aria-live="polite" hidden></div>`;

  saveFavorites(getFavorites());
  initHeaderInteractions();
}

function renderFooter() {
  const target = document.getElementById("siteFooter");
  if (!target) return;
  target.innerHTML = `
    <footer class="site-footer">
      <div class="site-width footer-grid">
        <div class="footer-brand"><a class="brand brand-light" href="index.html"><span>Recomienda</span><strong>Mujeres</strong></a><p>Más visibilidad, mejores conexiones y nuevas oportunidades para mujeres en todo Chile.</p><a class="button button-light" href="como-funciona.html#aparecer">Quiero aparecer</a></div>
        <div><h2>Descubre</h2><a href="catalogo.html">Profesionales</a><a href="pymes.html">Emprendimientos</a><a href="eventos.html">Eventos</a><a href="noticias.html">Historias</a><a href="oportunidades.html">Oportunidades</a></div>
        <div><h2>La comunidad</h2><a href="quienes-somos.html">Quiénes somos</a><a href="como-funciona.html">Cómo funciona</a><a href="suscripciones.html">Planes</a><a href="alianzas.html">Alianzas</a><a href="podcast.html">Podcast</a></div>
        <div><h2>Ayuda</h2><a href="faq.html">Preguntas frecuentes</a><a href="contacto.html">Contacto</a><a href="favoritas.html">Mis guardadas</a><a href="panel.html">Panel demostrativo</a><a href="404.html">Página no encontrada</a></div>
      </div>
      <div class="site-width footer-bottom"><span>© ${new Date().getFullYear()} Recomienda Mujeres</span><span>MVP estático en etapa piloto · Chile</span></div>
    </footer>`;
}

function initHeaderInteractions() {
  const megaTrigger = document.querySelector("[data-mega-trigger]");
  const megaMenu = document.querySelector("[data-mega-menu]");
  const setMega = (open) => {
    if (!megaTrigger || !megaMenu) return;
    megaTrigger.setAttribute("aria-expanded", String(open));
    megaMenu.hidden = !open;
  };
  megaTrigger?.addEventListener("click", () => setMega(megaTrigger.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("click", (event) => {
    if (megaMenu && !megaMenu.hidden && !event.target.closest(".nav-row")) setMega(false);
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMega(false); });

  document.querySelectorAll("[data-mega-area]").forEach((button) => {
    const activate = () => {
      document.querySelectorAll("[data-mega-area]").forEach((item) => item.setAttribute("aria-selected", String(item === button)));
      document.querySelectorAll("[data-mega-panel]").forEach((panel) => { panel.hidden = panel.dataset.megaPanel !== button.dataset.megaArea; });
    };
    button.addEventListener("mouseenter", activate);
    button.addEventListener("focus", activate);
    button.addEventListener("click", activate);
  });

  const mobileDialog = document.getElementById("mobileMenuDialog");
  document.querySelector("[data-open-mobile-menu]")?.addEventListener("click", () => mobileDialog?.showModal());
  document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => button.closest("dialog")?.close()));
  document.querySelectorAll("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  }));

  document.querySelectorAll("[data-global-search]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = new FormData(form).get("q")?.toString().trim() || "";
    window.location.href = `catalogo.html${query ? `?q=${encodeURIComponent(query)}` : ""}`;
  }));

  const joinDialog = document.getElementById("joinDialog");
  document.querySelectorAll("[data-open-join]").forEach((button) => button.addEventListener("click", () => {
    mobileDialog?.close();
    joinDialog?.showModal();
  }));

  const areaSelect = document.getElementById("joinArea");
  const professionSelect = document.getElementById("joinProfession");
  areaSelect?.addEventListener("change", () => {
    const options = PROFESSIONS.filter((item) => item.areas.includes(areaSelect.value));
    professionSelect.innerHTML = `<option value="">Selecciona una opción</option>${options.map((item) => `<option value="${item.id}">${escapeHTML(item.name)}</option>`).join("")}<option value="otra">Otra</option>`;
  });
  document.getElementById("joinForm")?.addEventListener("submit", submitJoinForm);
}

function submitJoinForm(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const area = areaById(data.area)?.name || data.area;
  const profession = professionById(data.profession)?.name || data.profession;
  const message = [
    "Hola, quiero solicitar un perfil en Recomienda Mujeres.", "", `Nombre: ${data.name}`, `Tipo: ${data.type}`,
    `Área: ${area}`, `Profesión o categoría: ${profession}`, `Ubicación: ${data.city}, ${data.region}`,
    `Servicios o productos: ${data.services}`, `Descripción: ${data.description}`, `Contacto: ${data.contact}`
  ].join("\n");
  window.open(whatsappURL(message), "_blank", "noopener,noreferrer");
  showToast("Tu mensaje está listo para revisar en WhatsApp");
}

function profileCard(profile) {
  const favorite = isFavorite(profile.id);
  const professionNames = profile.professions.map((id) => professionById(id)?.name).filter(Boolean);
  return `<article class="profile-card">
    <div class="profile-card-top">
      <div class="avatar avatar-large" style="--avatar:${profile.avatarColor}" aria-hidden="true">${escapeHTML(profile.initials)}</div>
      <button class="favorite-button ${favorite ? "is-active" : ""}" type="button" data-favorite="${profile.id}" aria-pressed="${favorite}" aria-label="${favorite ? "Quitar de guardadas" : "Guardar perfil"}">${ICONS.heart}</button>
      ${profile.demo ? '<span class="demo-badge">Demostrativo</span>' : ""}
    </div>
    <div class="profile-card-body">
      <div class="profile-type">${profile.type === "business" ? "Emprendimiento" : professionNames[0] || "Profesional"}</div>
      <h3><a href="perfil.html?id=${encodeURIComponent(profile.id)}">${escapeHTML(profile.name)}</a></h3>
      <p class="profile-headline">${escapeHTML(profile.headline)}</p>
      <p class="profile-location">${ICONS.pin}<span>${escapeHTML(profile.city)}, ${escapeHTML(profile.region)}</span></p>
      <div class="tag-row">${profile.services.slice(0, 2).map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}</div>
      <div class="card-footer"><span class="rating"><strong>${profile.rating.toFixed(1)}</strong> <span aria-hidden="true">★</span> <small>${profile.reviews} referencias de ejemplo</small></span><a class="card-link" href="perfil.html?id=${encodeURIComponent(profile.id)}" aria-label="Ver perfil de ${escapeHTML(profile.name)}">Ver perfil ${ICONS.arrow}</a></div>
    </div>
  </article>`;
}

function bindFavoriteButtons(scope = document) {
  scope.querySelectorAll("[data-favorite]").forEach((button) => button.addEventListener("click", () => toggleFavorite(button.dataset.favorite, button)));
}

function eventCard(event) {
  return `<article class="event-card">
    <a class="event-image" href="evento.html?id=${encodeURIComponent(event.id)}"><img src="${event.image}" alt="" width="800" height="520" loading="lazy"><span>${escapeHTML(event.type)}</span></a>
    <div class="event-card-body"><p class="event-date">${escapeHTML(event.dateLabel)}</p><h3><a href="evento.html?id=${encodeURIComponent(event.id)}">${escapeHTML(event.title)}</a></h3><p>${escapeHTML(event.excerpt)}</p><div class="card-footer"><span class="location-text">${escapeHTML(event.location)}</span><a class="card-link" href="evento.html?id=${encodeURIComponent(event.id)}">Ver evento ${ICONS.arrow}</a></div></div>
  </article>`;
}

function articleCard(article) {
  return `<article class="article-card"><a class="article-image" href="articulo.html?id=${encodeURIComponent(article.id)}"><img src="${article.image}" alt="" width="800" height="520" loading="lazy"></a><div><p class="eyebrow">${escapeHTML(article.category)}</p><h3><a href="articulo.html?id=${encodeURIComponent(article.id)}">${escapeHTML(article.title)}</a></h3><p>${escapeHTML(article.excerpt)}</p><a class="text-link" href="articulo.html?id=${encodeURIComponent(article.id)}">Leer historia ${ICONS.arrow}</a></div></article>`;
}

function renderHome() {
  const categories = document.getElementById("homeCategories");
  if (categories) categories.innerHTML = AREAS.slice(0, 8).map((area, index) => {
    const count = PROFILES.filter((profile) => profile.areas.includes(area.id)).length;
    return `<a class="category-tile" href="catalogo.html?area=${area.id}"><span class="category-number">${String(index + 1).padStart(2, "0")}</span><span><strong>${escapeHTML(area.name)}</strong><small>${escapeHTML(area.description)}</small></span><span class="category-count">${count}</span></a>`;
  }).join("");

  const featured = document.getElementById("featuredProfiles");
  if (featured) {
    featured.innerHTML = PROFILES.filter((profile) => profile.type === "professional").slice(0, 4).map(profileCard).join("");
    bindFavoriteButtons(featured);
  }
  const businesses = document.getElementById("featuredBusinesses");
  if (businesses) {
    businesses.innerHTML = PROFILES.filter((profile) => profile.type === "business").slice(0, 4).map(profileCard).join("");
    bindFavoriteButtons(businesses);
  }
  const events = document.getElementById("homeEvents");
  if (events) events.innerHTML = EVENTS.filter((event) => !event.featured).slice(0, 3).map(eventCard).join("");
  const articles = document.getElementById("homeArticles");
  if (articles) articles.innerHTML = ARTICLES.map(articleCard).join("");
  const planPreview = document.getElementById("homePlans");
  if (planPreview) planPreview.innerHTML = PLANS.slice(0, 3).map((plan) => `<article class="mini-plan ${plan.featured ? "is-featured" : ""}"><p class="eyebrow">${escapeHTML(plan.name)}</p><h3>${formatPrice(plan.price)}<small>${plan.price ? "/mes" : " para siempre"}</small></h3><p>${escapeHTML(plan.description)}</p><a class="text-link" href="suscripciones.html#${plan.id}">Ver beneficios ${ICONS.arrow}</a></article>`).join("");

  renderCarousel();
  initHomeSearch();
  renderFeaturedCountdown();
}

function renderCarousel() {
  const target = document.getElementById("heroCarousel");
  if (!target) return;
  target.innerHTML = `<div class="carousel-track" data-carousel-track>${BANNERS.map((slide, index) => `<article class="carousel-slide" data-slide aria-hidden="${index !== 0}">
    <img src="${slide.image}" alt="" width="1600" height="900" ${index ? "loading=\"lazy\"" : "fetchpriority=\"high\""} style="object-position:${slide.position}">
    <div class="carousel-shade"></div><div class="carousel-copy"><p class="eyebrow">${escapeHTML(slide.eyebrow)}</p><h2>${escapeHTML(slide.title)}</h2><p>${escapeHTML(slide.text)}</p><a class="button button-light" href="${slide.link}" ${index ? 'tabindex="-1"' : ""}>${escapeHTML(slide.cta)} ${ICONS.arrow}</a></div>
  </article>`).join("")}</div>
  <button class="carousel-arrow carousel-prev" type="button" aria-label="Banner anterior">‹</button><button class="carousel-arrow carousel-next" type="button" aria-label="Banner siguiente">›</button>
  <div class="carousel-controls" role="tablist" aria-label="Elegir banner">${BANNERS.map((_, index) => `<button type="button" role="tab" aria-selected="${index === 0}" aria-label="Ir al banner ${index + 1}" data-carousel-dot="${index}"></button>`).join("")}</div>`;

  const slides = [...target.querySelectorAll("[data-slide]")];
  const dots = [...target.querySelectorAll("[data-carousel-dot]")];
  let current = 0;
  let timer;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const go = (index) => {
    current = (index + slides.length) % slides.length;
    target.querySelector("[data-carousel-track]").style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, position) => {
      const active = position === current;
      slide.setAttribute("aria-hidden", String(!active));
      slide.querySelector("a")?.setAttribute("tabindex", active ? "0" : "-1");
    });
    dots.forEach((dot, position) => dot.setAttribute("aria-selected", String(position === current)));
  };
  const stop = () => clearInterval(timer);
  const start = () => { if (!reducedMotion) { stop(); timer = setInterval(() => go(current + 1), 6500); } };
  target.querySelector(".carousel-prev")?.addEventListener("click", () => { go(current - 1); start(); });
  target.querySelector(".carousel-next")?.addEventListener("click", () => { go(current + 1); start(); });
  dots.forEach((dot, index) => dot.addEventListener("click", () => { go(index); start(); }));
  target.addEventListener("mouseenter", stop);
  target.addEventListener("mouseleave", start);
  target.addEventListener("focusin", stop);
  target.addEventListener("focusout", start);
  let touchStart = 0;
  target.addEventListener("touchstart", (event) => { touchStart = event.changedTouches[0].clientX; stop(); }, { passive: true });
  target.addEventListener("touchend", (event) => { const delta = event.changedTouches[0].clientX - touchStart; if (Math.abs(delta) > 45) go(current + (delta < 0 ? 1 : -1)); start(); }, { passive: true });
  go(0);
  start();
}

function searchSuggestionItems(query) {
  const normalized = normalizeText(query);
  if (normalized.length < 2) return [];
  const items = [];
  PROFESSIONS.forEach((profession) => {
    const text = normalizeText([profession.name, ...profession.keywords].join(" "));
    if (text.includes(normalized) || Object.entries(SEARCH_SYNONYMS).some(([key, ids]) => normalizeText(key).includes(normalized) && ids.includes(profession.id))) {
      items.push({ type: "Profesión", label: profession.name, href: `catalogo.html?profession=${profession.id}` });
    }
  });
  AREAS.forEach((area) => { if (normalizeText(area.name).includes(normalized)) items.push({ type: "Área", label: area.name, href: `catalogo.html?area=${area.id}` }); });
  PROFILES.forEach((profile) => { if (normalizeText(`${profile.name} ${profile.headline}`).includes(normalized)) items.push({ type: profile.type === "business" ? "Emprendimiento" : "Perfil", label: profile.name, href: `perfil.html?id=${profile.id}` }); });
  return items.slice(0, 6);
}

function initHomeSearch() {
  const form = document.getElementById("homeSearchForm");
  const input = document.getElementById("homeSearchInput");
  const suggestions = document.getElementById("homeSearchSuggestions");
  const region = document.getElementById("homeRegion");
  if (!form || !input || !suggestions || !region) return;
  region.innerHTML = `<option value="">Todo Chile</option>${REGIONS.map((item) => `<option>${escapeHTML(item)}</option>`).join("")}`;
  input.addEventListener("input", () => {
    const results = searchSuggestionItems(input.value);
    suggestions.innerHTML = results.map((item) => `<a href="${item.href}"><span><small>${escapeHTML(item.type)}</small>${escapeHTML(item.label)}</span>${ICONS.arrow}</a>`).join("");
    suggestions.hidden = results.length === 0;
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") suggestions.hidden = true;
  });
  document.addEventListener("click", (event) => { if (!event.target.closest(".home-search-wrap")) suggestions.hidden = true; });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (input.value.trim()) params.set("q", input.value.trim());
    if (region.value) params.set("region", region.value);
    window.location.href = `catalogo.html${params.toString() ? `?${params}` : ""}`;
  });
}

function renderFeaturedCountdown() {
  const target = document.getElementById("featuredCountdown");
  const event = EVENTS.find((item) => item.featured);
  if (!target || !event) return;
  target.innerHTML = `<div class="countdown-copy"><p class="eyebrow">${escapeHTML(event.status)}</p><h2>Solo faltan</h2><p>para vivir una mañana de movimiento, conversación y bienestar.</p></div>
    <div class="countdown-grid" data-countdown="${event.dateISO}">
      <div><strong data-days>00</strong><span>días</span></div><div><strong data-hours>00</strong><span>horas</span></div><div><strong data-minutes>00</strong><span>minutos</span></div><div><strong data-seconds>00</strong><span>segundos</span></div>
    </div><div class="countdown-cta"><strong>¡No te lo pierdas!</strong><a class="button button-primary" href="evento.html?id=${event.id}">Ver evento ${ICONS.arrow}</a></div>`;
  initCountdown(target.querySelector("[data-countdown]"));
}

function initCountdown(element) {
  if (!element) return;
  const target = new Date(element.dataset.countdown).getTime();
  const update = () => {
    const difference = target - Date.now();
    if (difference <= 0) {
      element.innerHTML = '<p class="countdown-ended">El evento ya finalizó</p>';
      clearInterval(element.countdownTimer);
      return;
    }
    const values = {
      days: Math.floor(difference / 86400000), hours: Math.floor((difference % 86400000) / 3600000),
      minutes: Math.floor((difference % 3600000) / 60000), seconds: Math.floor((difference % 60000) / 1000)
    };
    Object.entries(values).forEach(([key, value]) => { const node = element.querySelector(`[data-${key}]`); if (node) node.textContent = String(value).padStart(2, "0"); });
  };
  update();
  element.countdownTimer = setInterval(update, 1000);
}

function levenshtein(a, b) {
  if (!a) return b.length;
  if (!b) return a.length;
  const matrix = Array.from({ length: b.length + 1 }, (_, row) => [row]);
  for (let column = 0; column <= a.length; column += 1) matrix[0][column] = column;
  for (let row = 1; row <= b.length; row += 1) {
    for (let column = 1; column <= a.length; column += 1) {
      matrix[row][column] = b[row - 1] === a[column - 1] ? matrix[row - 1][column - 1] : Math.min(matrix[row - 1][column - 1] + 1, matrix[row][column - 1] + 1, matrix[row - 1][column] + 1);
    }
  }
  return matrix[b.length][a.length];
}

function profileSearchScore(profile, query) {
  const normalized = normalizeText(query);
  if (!normalized) return 1;
  const professions = profile.professions.map((id) => professionById(id)).filter(Boolean);
  const areas = profile.areas.map((id) => areaById(id)).filter(Boolean);
  const fields = [profile.name, profile.headline, profile.description, profile.city, profile.region, ...profile.services, ...professions.map((item) => item.name), ...professions.flatMap((item) => item.keywords), ...areas.map((item) => item.name)].map(normalizeText);
  const haystack = fields.join(" ");
  let score = haystack.includes(normalized) ? 80 : 0;
  if (normalizeText(profile.name) === normalized) score += 120;
  const synonymIds = Object.entries(SEARCH_SYNONYMS).filter(([key]) => normalized.includes(normalizeText(key)) || normalizeText(key).includes(normalized)).flatMap(([, ids]) => ids);
  if (profile.professions.some((id) => synonymIds.includes(id))) score += 100;
  const queryTokens = normalized.split(" ").filter((token) => token.length > 1);
  const fieldTokens = haystack.split(" ");
  queryTokens.forEach((token) => {
    if (fieldTokens.includes(token)) score += 32;
    else if (fieldTokens.some((word) => word.startsWith(token) || token.startsWith(word))) score += 18;
    else if (fieldTokens.some((word) => word.length > 3 && levenshtein(word, token) <= (token.length > 6 ? 2 : 1))) score += 9;
  });
  return score;
}

function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;
  const controls = {
    q: document.getElementById("catalogSearch"), area: document.getElementById("areaFilter"), profession: document.getElementById("professionFilter"),
    region: document.getElementById("regionFilter"), mode: document.getElementById("modeFilter"), sort: document.getElementById("sortFilter")
  };
  controls.area.innerHTML = `<option value="">Todas las áreas</option>${AREAS.map((area) => `<option value="${area.id}">${escapeHTML(area.name)}</option>`).join("")}`;
  controls.profession.innerHTML = `<option value="">Todas las profesiones</option>${PROFESSIONS.map((item) => `<option value="${item.id}">${escapeHTML(item.name)}</option>`).join("")}`;
  controls.region.innerHTML = `<option value="">Todas las regiones</option>${REGIONS.map((region) => `<option>${escapeHTML(region)}</option>`).join("")}`;
  controls.q.value = getParam("q"); controls.area.value = getParam("area"); controls.profession.value = getParam("profession"); controls.region.value = getParam("region"); controls.mode.value = getParam("mode"); controls.sort.value = getParam("sort") || "recommended";

  const run = () => {
    const query = controls.q.value.trim();
    let list = PROFILES.filter((profile) => {
      const typeMatch = !CATALOG_TYPE || profile.type === CATALOG_TYPE;
      return typeMatch && (!controls.area.value || profile.areas.includes(controls.area.value)) && (!controls.profession.value || profile.professions.includes(controls.profession.value)) && (!controls.region.value || profile.region === controls.region.value) && (!controls.mode.value || profile.modes.includes(controls.mode.value)) && (!query || profileSearchScore(profile, query) > 0);
    }).map((profile) => ({ profile, score: profileSearchScore(profile, query) }));
    if (controls.sort.value === "rating") list.sort((a, b) => b.profile.rating - a.profile.rating);
    else if (controls.sort.value === "name") list.sort((a, b) => a.profile.name.localeCompare(b.profile.name, "es"));
    else if (controls.sort.value === "reviews") list.sort((a, b) => b.profile.reviews - a.profile.reviews);
    else list.sort((a, b) => (b.score + (b.profile.plan === "pro" ? 4 : 0)) - (a.score + (a.profile.plan === "pro" ? 4 : 0)));

    const count = document.getElementById("catalogCount");
    if (count) count.textContent = `${list.length} ${CATALOG_TYPE === "business" ? "emprendimiento" : "resultado"}${list.length === 1 ? "" : "s"}`;
    grid.innerHTML = list.length ? list.map(({ profile }) => profileCard(profile)).join("") : `<div class="empty-state"><h2>No encontramos coincidencias</h2><p>Prueba con otra palabra, región o modalidad.</p><button class="button button-secondary" type="button" data-clear-catalog>Limpiar filtros</button></div>`;
    bindFavoriteButtons(grid);
    grid.querySelector("[data-clear-catalog]")?.addEventListener("click", clear);
    const params = new URLSearchParams();
    Object.entries({ q: query, area: controls.area.value, profession: controls.profession.value, region: controls.region.value, mode: controls.mode.value, sort: controls.sort.value === "recommended" ? "" : controls.sort.value }).forEach(([key, value]) => { if (value) params.set(key, value); });
    history.replaceState({}, "", `${location.pathname}${params.toString() ? `?${params}` : ""}`);
    renderActiveFilters(controls, run);
  };
  const clear = () => { Object.values(controls).forEach((control) => { control.value = control === controls.sort ? "recommended" : ""; }); run(); };
  Object.values(controls).forEach((control) => control.addEventListener(control === controls.q ? "input" : "change", run));
  document.getElementById("clearFilters")?.addEventListener("click", clear);
  run();
}

function renderActiveFilters(controls, run) {
  const target = document.getElementById("activeFilters");
  if (!target) return;
  const labels = [];
  if (controls.q.value) labels.push({ key: "q", label: `“${controls.q.value}”`, control: controls.q });
  ["area", "profession", "region", "mode"].forEach((key) => {
    const control = controls[key];
    if (control.value) labels.push({ key, label: control.options[control.selectedIndex].text, control });
  });
  target.innerHTML = labels.map((item, index) => `<button type="button" data-remove-filter="${index}">${escapeHTML(item.label)} <span aria-hidden="true">×</span></button>`).join("");
  target.querySelectorAll("[data-remove-filter]").forEach((button) => button.addEventListener("click", () => { labels[Number(button.dataset.removeFilter)].control.value = ""; run(); }));
}

function renderProfilePage() {
  const target = document.getElementById("profilePage");
  if (!target) return;
  const profile = PROFILES.find((item) => item.id === getParam("id"));
  if (!profile) {
    target.innerHTML = `<div class="empty-state page-empty"><p class="eyebrow">Perfil no encontrado</p><h1>No pudimos abrir este perfil</h1><p>Puede que el enlace esté incompleto o que el perfil ya no esté disponible.</p><a class="button button-primary" href="catalogo.html">Volver al catálogo</a></div>`;
    return;
  }
  document.title = `${profile.name} · Recomienda Mujeres`;
  const professionNames = profile.professions.map((id) => professionById(id)?.name).filter(Boolean);
  const areaNames = profile.areas.map((id) => areaById(id)?.name).filter(Boolean);
  const favorite = isFavorite(profile.id);
  const gallery = profile.gallery.length ? `<div class="profile-gallery">${profile.gallery.map((image, index) => `<img src="${image}" alt="${index === 0 ? `Trabajo y comunidad de ${escapeHTML(profile.name)}` : `Galería de ${escapeHTML(profile.name)}`}" width="900" height="600" loading="lazy">`).join("")}</div>` : `<div class="gallery-placeholder"><span>${escapeHTML(profile.initials)}</span><p>Este perfil todavía no ha agregado una galería.</p></div>`;
  const related = PROFILES.filter((item) => item.id !== profile.id && item.areas.some((area) => profile.areas.includes(area))).slice(0, 3);
  const contactText = `Hola ${profile.name}, encontré tu perfil en Recomienda Mujeres y quisiera consultar por ${profile.services[0].toLowerCase()}.`;
  target.innerHTML = `
    <div class="profile-breadcrumb site-width"><a href="index.html">Inicio</a><span>/</span><a href="${profile.type === "business" ? "pymes.html" : "catalogo.html"}">${profile.type === "business" ? "Emprendimientos" : "Profesionales"}</a><span>/</span><span>${escapeHTML(profile.name)}</span></div>
    <section class="profile-hero site-width">
      <div class="profile-identity"><div class="avatar avatar-xl" style="--avatar:${profile.avatarColor}" aria-hidden="true">${escapeHTML(profile.initials)}</div><div>${profile.demo ? '<span class="demo-badge demo-inline">Perfil demostrativo</span>' : ""}<p class="eyebrow">${escapeHTML(profile.type === "business" ? "Emprendimiento liderado por mujeres" : professionNames.join(" · "))}</p><h1>${escapeHTML(profile.name)}</h1><p class="profile-hero-line">${escapeHTML(profile.headline)}</p><p class="profile-location">${ICONS.pin}<span>${escapeHTML(profile.city)}, ${escapeHTML(profile.region)} · ${profile.modes.map((mode) => mode === "online" ? "Online" : "Presencial").join(" y ")}</span></p></div></div>
      <div class="profile-actions"><a class="button button-primary" href="${whatsappURL(contactText, profile.whatsapp)}" target="_blank" rel="noopener">Contactar por WhatsApp ${ICONS.external}</a><button class="button button-secondary" type="button" data-open-booking>Solicitar reserva</button><button class="button button-secondary ${favorite ? "is-active" : ""}" type="button" data-favorite="${profile.id}" aria-pressed="${favorite}">${ICONS.heart}<span data-favorite-label>${favorite ? "Guardado" : "Guardar"}</span></button><button class="icon-button bordered" type="button" data-share-profile aria-label="Copiar enlace del perfil">${ICONS.share}</button></div>
    </section>
    <section class="profile-layout site-width">
      <div class="profile-main">
        ${gallery}
        <section class="content-panel"><p class="eyebrow">Sobre ${profile.type === "business" ? "el negocio" : "su trabajo"}</p><h2>${escapeHTML(profile.description)}</h2><p>${escapeHTML(profile.about)}</p></section>
        <section class="content-panel"><p class="eyebrow">Servicios y productos</p><h2>Lo que puedes solicitar</h2><div class="service-list">${profile.services.map((service) => `<div>${ICONS.check}<span>${escapeHTML(service)}</span></div>`).join("")}</div></section>
        <section class="content-panel"><p class="eyebrow">Recomendaciones</p><h2>${profile.reviews ? `${profile.reviews} referencias en esta demostración` : "Aún no hay recomendaciones"}</h2><p class="demo-explainer">Las valoraciones de este MVP son datos de ejemplo y no constituyen referencias verificadas.</p>${profile.reviewList.length ? `<div class="review-list">${profile.reviewList.map((review) => `<blockquote><p>“${escapeHTML(review.text)}”</p><cite>${escapeHTML(review.name)} · referencia demostrativa</cite></blockquote>`).join("")}</div>` : ""}</section>
        ${profile.areas.includes("salud-bienestar") ? '<p class="health-note">Este directorio facilita el contacto, pero no reemplaza una evaluación profesional ni acredita especialidades de salud.</p>' : ""}
      </div>
      <aside class="profile-sidebar">
        <div class="contact-card"><p class="eyebrow">Información práctica</p><h2>${escapeHTML(profile.availability)}</h2><dl><div><dt>Áreas</dt><dd>${escapeHTML(areaNames.join(", "))}</dd></div><div><dt>Profesiones</dt><dd>${escapeHTML(professionNames.join(", "))}</dd></div>${profile.age ? `<div><dt>Edad</dt><dd>${profile.age} años · dato demostrativo</dd></div>` : ""}<div><dt>Modalidad</dt><dd>${escapeHTML(profile.modes.map((mode) => mode === "online" ? "Online" : "Presencial").join(" y "))}</dd></div><div><dt>Plan</dt><dd>${escapeHTML(PLANS.find((plan) => plan.id === profile.plan)?.name || "Básico")}</dd></div></dl><button class="button button-primary button-full" type="button" data-open-booking>Solicitar una reserva</button><a class="button button-secondary button-full" href="${whatsappURL(contactText, profile.whatsapp)}" target="_blank" rel="noopener">Hacer una consulta</a>${profile.instagram ? `<a class="button button-secondary button-full" href="https://instagram.com/${encodeURIComponent(profile.instagram.replace("@", ""))}" target="_blank" rel="noopener">Ver Instagram ${ICONS.external}</a>` : ""}<small class="contact-disclaimer">La solicitud se coordina por WhatsApp; no confirma una hora automáticamente.</small></div>
      </aside>
    </section>
    <section class="related-section section site-width"><div class="section-heading"><div><p class="eyebrow">También podrías conocer</p><h2>Perfiles relacionados</h2></div><a class="text-link" href="catalogo.html?area=${profile.areas[0]}">Ver más ${ICONS.arrow}</a></div><div class="profile-grid">${related.map(profileCard).join("")}</div></section>
    <dialog class="join-dialog booking-dialog" id="bookingDialog" aria-labelledby="bookingDialogTitle">
      <div class="dialog-head"><div><p class="eyebrow">Solicitud de reserva</p><h2 id="bookingDialogTitle">Coordina con ${escapeHTML(profile.name)}</h2></div><button class="icon-button" type="button" data-close-booking aria-label="Cerrar solicitud">${ICONS.close}</button></div>
      <p class="dialog-intro">Indica tu preferencia y prepararemos un mensaje detallado. ${escapeHTML(profile.name)} confirmará disponibilidad y condiciones directamente contigo.</p>
      <form class="form-grid" id="bookingForm">
        <label>Tu nombre<input name="Nombre" required autocomplete="name"></label>
        <label>Contacto<input name="Contacto" required autocomplete="tel" placeholder="Teléfono o correo"></label>
        <label class="field-full">Servicio<select name="Servicio" required><option value="">Selecciona</option>${profile.services.map((service) => `<option>${escapeHTML(service)}</option>`).join("")}</select></label>
        <label>Fecha preferida<input name="Fecha preferida" type="date" min="${new Date().toISOString().slice(0, 10)}" required></label>
        <label>Horario preferido<select name="Horario preferido" required><option value="">Selecciona</option><option>Mañana</option><option>Mediodía</option><option>Tarde</option><option>Después de las 18:00</option></select></label>
        <label class="field-full">Modalidad<select name="Modalidad" required><option value="">Selecciona</option>${profile.modes.map((mode) => `<option>${mode === "online" ? "Online" : "Presencial"}</option>`).join("")}</select></label>
        <label class="field-full">Mensaje opcional<textarea name="Mensaje" rows="3" placeholder="Agrega contexto o una segunda alternativa de fecha"></textarea></label>
        <p class="form-note field-full">Esto es una solicitud, no una reserva confirmada. Al continuar se abrirá WhatsApp para que revises y envíes el mensaje.</p>
        <button class="button button-primary field-full" type="submit">Preparar solicitud por WhatsApp ${ICONS.arrow}</button>
      </form>
    </dialog>`;
  bindFavoriteButtons(target);
  target.querySelector("[data-share-profile]")?.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(window.location.href); showToast("Enlace copiado"); }
    catch { window.prompt("Copia este enlace:", window.location.href); }
  });
  const bookingDialog = target.querySelector("#bookingDialog");
  target.querySelectorAll("[data-open-booking]").forEach((button) => button.addEventListener("click", () => bookingDialog?.showModal()));
  target.querySelector("[data-close-booking]")?.addEventListener("click", () => bookingDialog?.close());
  bookingDialog?.addEventListener("click", (event) => { if (event.target === bookingDialog) bookingDialog.close(); });
  target.querySelector("#bookingForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const message = [
      `Hola ${profile.name}, encontré tu perfil en Recomienda Mujeres y quisiera solicitar una reserva.`, "",
      ...Object.entries(data).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`),
      "", "Entiendo que esta solicitud queda pendiente de confirmación."
    ].join("\n");
    window.open(whatsappURL(message, profile.whatsapp), "_blank", "noopener,noreferrer");
    bookingDialog?.close();
    showToast("Tu solicitud está lista para revisar en WhatsApp");
  });
}

function renderEventsPage() {
  const target = document.getElementById("eventsGrid");
  if (target) target.innerHTML = EVENTS.map(eventCard).join("");
}

function renderEventPage() {
  const target = document.getElementById("eventPage");
  if (!target) return;
  const event = EVENTS.find((item) => item.id === getParam("id")) || EVENTS.find((item) => item.featured);
  document.title = `${event.title} · Recomienda Mujeres`;
  target.innerHTML = `
    <section class="event-detail-hero"><img src="${event.image}" alt="Mujeres participando en ${escapeHTML(event.title)}" width="1600" height="900"><div class="event-detail-shade"></div><div class="site-width event-detail-copy"><p class="eyebrow">${escapeHTML(event.status)} · ${escapeHTML(event.type)}</p><h1>${escapeHTML(event.title)}</h1><p>${escapeHTML(event.excerpt)}</p><div class="event-meta"><span>${ICONS.clock}${escapeHTML(event.dateLabel)}</span><span>${ICONS.pin}${escapeHTML(event.location)}</span></div></div></section>
    <section class="event-detail-layout site-width section"><div class="event-description"><p class="eyebrow">La experiencia</p><h2>Movimiento, conversación y comunidad</h2><p>${escapeHTML(event.description)}</p>${event.schedule.length ? `<h3>Programa</h3><ol class="schedule-list">${event.schedule.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ol>` : ""}${event.secondaryImage ? `<img class="event-secondary" src="${event.secondaryImage}" alt="Mujeres compartiendo en un taller de bienestar" width="1200" height="800" loading="lazy">` : ""}</div><aside><div class="event-booking-card"><p class="eyebrow">Reserva tu lugar</p><h2>${escapeHTML(event.dateLabel)}</h2>${event.featured ? `<div class="compact-countdown" data-countdown="${event.dateISO}"><div><strong data-days>00</strong><span>días</span></div><div><strong data-hours>00</strong><span>horas</span></div><div><strong data-minutes>00</strong><span>min</span></div><div><strong data-seconds>00</strong><span>seg</span></div></div>` : ""}<p>La inscripción se coordina directamente por WhatsApp. Podrás revisar el mensaje antes de enviarlo.</p><a class="button button-primary button-full" href="${whatsappURL(event.whatsappText)}" target="_blank" rel="noopener">Inscribirme por WhatsApp ${ICONS.external}</a><small>Este MVP no procesa pagos ni reservas automáticas.</small></div></aside></section>`;
  initCountdown(target.querySelector("[data-countdown]"));
}

function renderNewsPage() {
  const target = document.getElementById("newsGrid");
  if (target) target.innerHTML = ARTICLES.map(articleCard).join("");
}

function renderArticlePage() {
  const target = document.getElementById("articlePage");
  if (!target) return;
  const article = ARTICLES.find((item) => item.id === getParam("id")) || ARTICLES[0];
  document.title = `${article.title} · Recomienda Mujeres`;
  target.innerHTML = `<article class="article-page"><header class="article-page-head site-width"><p class="eyebrow">${escapeHTML(article.category)} · ${escapeHTML(article.date)}</p><h1>${escapeHTML(article.title)}</h1><p>${escapeHTML(article.excerpt)}</p></header><img class="article-hero-image" src="${article.image}" alt="Comunidad de mujeres relacionada con el artículo" width="1600" height="900"><div class="article-body">${article.body.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}<div class="article-share"><a class="button button-secondary" href="noticias.html">Volver a historias</a><button class="button button-primary" type="button" data-share-article>${ICONS.share} Copiar enlace</button></div></div></article>`;
  target.querySelector("[data-share-article]")?.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(window.location.href); showToast("Enlace copiado"); }
    catch { window.prompt("Copia este enlace:", window.location.href); }
  });
}

function renderPodcastPage() {
  const target = document.getElementById("podcastEpisodes");
  if (target) target.innerHTML = PODCAST_EPISODES.map((episode) => `<article class="podcast-card"><div class="podcast-number">${episode.number}</div><div><div class="tag-row"><span>${escapeHTML(episode.status)}</span><span>${escapeHTML(episode.duration)}</span></div><h2>${escapeHTML(episode.title)}</h2><p>En esta etapa piloto ofrecemos una lectura breve del tema, sin simular un reproductor que todavía no existe.</p><a class="text-link" href="articulo.html?id=${episode.articleId}">Leer resumen ${ICONS.arrow}</a></div></article>`).join("");
}

function renderOpportunitiesPage() {
  const target = document.getElementById("opportunitiesList");
  if (!target) return;
  target.innerHTML = OPPORTUNITIES.map((item) => `<article class="opportunity-card"><div><div class="tag-row"><span>${escapeHTML(item.type)}</span><span>Demostrativo</span></div><h2>${escapeHTML(item.title)}</h2><p>${escapeHTML(item.description)}</p><div class="opportunity-meta"><span>${escapeHTML(item.organization)}</span><span>${ICONS.pin}${escapeHTML(item.location)}</span></div></div><a class="button button-secondary" href="${whatsappURL(`Hola, quiero consultar por la oportunidad: ${item.title}.`)}" target="_blank" rel="noopener">Consultar ${ICONS.external}</a></article>`).join("");
}

function renderPlansPage() {
  const target = document.getElementById("plansGrid");
  if (!target) return;
  target.innerHTML = PLANS.map((plan) => `<article class="plan-card ${plan.featured ? "is-featured" : ""}" id="${plan.id}">${plan.featured ? '<span class="plan-label">Más elegido para validar</span>' : ""}<p class="eyebrow">${escapeHTML(plan.name)}</p><h2>${formatPrice(plan.price)}<small>${plan.price ? " CLP / mes" : ""}</small></h2><p>${escapeHTML(plan.description)}</p><ul>${plan.features.map((feature) => `<li>${ICONS.check}${escapeHTML(feature)}</li>`).join("")}</ul><button class="button ${plan.featured ? "button-primary" : "button-secondary"} button-full" type="button" data-select-plan="${plan.id}">${plan.price ? "Solicitar este plan" : "Comenzar gratis"}</button></article>`).join("");
  target.insertAdjacentHTML("afterend", `<dialog class="join-dialog plan-dialog" id="planDialog" aria-labelledby="planDialogTitle">
    <div class="dialog-head"><div><p class="eyebrow">Solicitud de plan</p><h2 id="planDialogTitle">Revisemos tu opción</h2></div><button class="icon-button" type="button" data-close-plan aria-label="Cerrar solicitud">${ICONS.close}</button></div>
    <div class="plan-selection-summary" id="planSelectionSummary"></div>
    <form class="form-grid" id="planForm">
      <input type="hidden" name="Plan" id="selectedPlanInput">
      <label>Tu nombre<input name="Nombre" required autocomplete="name"></label>
      <label>Tipo de perfil<select name="Tipo de perfil" required><option value="">Selecciona</option><option>Profesional o independiente</option><option>Emprendimiento o PYME</option></select></label>
      <label class="field-full">Contacto<input name="Contacto" required placeholder="WhatsApp o correo"></label>
      <label class="field-full">Qué quieres mostrar<textarea name="Necesidad" rows="3" required placeholder="Cuéntanos brevemente qué ofreces"></textarea></label>
      <p class="form-note field-full">No se realizará ningún cobro. Prepararemos tu solicitud por WhatsApp para revisar el plan y los próximos pasos.</p>
      <button class="button button-primary field-full" type="submit">Preparar solicitud ${ICONS.arrow}</button>
    </form>
  </dialog>`);
  const dialog = document.getElementById("planDialog");
  const summary = document.getElementById("planSelectionSummary");
  const input = document.getElementById("selectedPlanInput");
  target.querySelectorAll("[data-select-plan]").forEach((button) => button.addEventListener("click", () => {
    const plan = PLANS.find((item) => item.id === button.dataset.selectPlan);
    if (!plan || !dialog || !summary || !input) return;
    input.value = `${plan.name} · ${formatPrice(plan.price)}${plan.price ? " CLP/mes" : ""}`;
    summary.innerHTML = `<span>${escapeHTML(plan.name)}</span><strong>${formatPrice(plan.price)}${plan.price ? " CLP / mes" : ""}</strong><p>${escapeHTML(plan.description)}</p>`;
    dialog.showModal();
  }));
  document.querySelector("[data-close-plan]")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  document.getElementById("planForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const message = ["Hola, quiero solicitar un plan en Recomienda Mujeres.", "", ...Object.entries(data).map(([key, value]) => `${key}: ${value}`)].join("\n");
    window.open(whatsappURL(message), "_blank", "noopener,noreferrer");
    dialog?.close();
    showToast("Tu solicitud está lista para revisar en WhatsApp");
  });
}

function renderDashboardPage() {
  const target = document.getElementById("dashboardContent");
  if (!target) return;
  const profile = PROFILES.find((item) => item.id === "veronica-torrejon") || PROFILES[0];
  target.innerHTML = `
    <div class="dashboard-notice"><span>Vista demostrativa</span><p>Estos indicadores usan datos simulados para mostrar cómo podría funcionar la gestión de un perfil sin backend.</p></div>
    <div class="metric-grid">
      <article class="metric-card"><span>Vistas del perfil</span><strong>248</strong><small>+18% versus período anterior</small></article>
      <article class="metric-card"><span>Contactos iniciados</span><strong>31</strong><small>12,5% de las visitas</small></article>
      <article class="metric-card"><span>Veces guardado</span><strong>19</strong><small>Solo dato demostrativo</small></article>
      <article class="metric-card"><span>Perfil completo</span><strong>82%</strong><div class="completeness-bar"><span style="width:82%"></span></div></article>
    </div>
    <div class="dashboard-grid">
      <section class="dashboard-panel dashboard-profile"><div class="dashboard-panel-head"><div><p class="eyebrow">Tu perfil</p><h2>${escapeHTML(profile.name)}</h2></div><span class="status-chip">Publicado</span></div><div class="dashboard-profile-row"><div class="avatar avatar-large" style="--avatar:${profile.avatarColor}" aria-hidden="true">${escapeHTML(profile.initials)}</div><div><strong>${escapeHTML(profile.headline)}</strong><p>${escapeHTML(profile.city)}, ${escapeHTML(profile.region)} · ${profile.modes.map((mode) => mode === "online" ? "Online" : "Presencial").join(" y ")}</p></div></div><div class="button-row"><a class="button button-secondary" href="perfil.html?id=${profile.id}">Ver perfil público</a><button class="button button-primary" type="button" data-open-join-page>Actualizar información</button></div></section>
      <section class="dashboard-panel"><div class="dashboard-panel-head"><div><p class="eyebrow">Actividad reciente</p><h2>Señales de interés</h2></div></div><ul class="activity-list"><li><span>Hoy</span><strong>5 personas abrieron tu perfil</strong></li><li><span>Ayer</span><strong>2 personas iniciaron contacto</strong></li><li><span>Esta semana</span><strong>Tu perfil fue guardado 4 veces</strong></li></ul></section>
      <section class="dashboard-panel"><div class="dashboard-panel-head"><div><p class="eyebrow">Próximo paso</p><h2>Mejora la confianza</h2></div></div><p>Agrega una descripción más específica, disponibilidad vigente y una imagen adicional de tu trabajo.</p><button class="text-link" type="button" data-open-join-page>Revisar mis datos ${ICONS.arrow}</button></section>
      <section class="dashboard-panel"><div class="dashboard-panel-head"><div><p class="eyebrow">Plan actual</p><h2>${escapeHTML(PLANS.find((plan) => plan.id === profile.plan)?.name || "Básico")}</h2></div></div><p>Este panel permite visualizar dónde aparecerían estadísticas, consultas y herramientas de gestión cuando exista una cuenta real.</p><a class="text-link" href="suscripciones.html">Comparar planes ${ICONS.arrow}</a></section>
    </div>`;
}

function preselectContactTopic() {
  if (PAGE !== "contact") return;
  const value = normalizeText(getParam("tema"));
  const select = document.querySelector('.contact-form select[name="Tema"]');
  if (!select || !value) return;
  const aliases = { aparecer: "Quiero aparecer", evento: "Evento", alianzas: "Alianza o patrocinio", alianza: "Alianza o patrocinio", patrocinio: "Alianza o patrocinio", oportunidad: "Oportunidad", feedback: "Comentario o sugerencia" };
  const wanted = aliases[value];
  if (wanted) select.value = wanted;
}

function renderFAQPage() {
  const target = document.getElementById("faqList");
  if (target) target.innerHTML = FAQS.map((item, index) => `<details class="faq-item" ${index === 0 ? "open" : ""}><summary>${escapeHTML(item.q)}<span aria-hidden="true">+</span></summary><p>${escapeHTML(item.a)}</p></details>`).join("");
}

function renderFavoritesPage() {
  const target = document.getElementById("favoritesGrid");
  if (!target) return;
  const favorites = getFavorites();
  const list = PROFILES.filter((profile) => favorites.includes(profile.id));
  target.innerHTML = list.length ? list.map(profileCard).join("") : `<div class="empty-state"><p class="eyebrow">Guardadas en este dispositivo</p><h2>Aún no tienes perfiles guardados</h2><p>Explora el catálogo y usa el corazón para volver a encontrarlos fácilmente.</p><a class="button button-primary" href="catalogo.html">Explorar profesionales</a></div>`;
  bindFavoriteButtons(target);
}

function initWhatsAppForms() {
  document.querySelectorAll("[data-whatsapp-form]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const title = form.dataset.formTitle || "Contacto desde Recomienda Mujeres";
    const lines = [title, "", ...Object.entries(data).map(([key, value]) => `${key}: ${value}`)];
    window.open(whatsappURL(lines.join("\n")), "_blank", "noopener,noreferrer");
    showToast("Tu mensaje está listo para revisar en WhatsApp");
  }));
}

function initPage() {
  renderHeader();
  renderFooter();
  const renderers = {
    home: renderHome, catalog: renderCatalog, businesses: renderCatalog, profile: renderProfilePage,
    events: renderEventsPage, event: renderEventPage, news: renderNewsPage, article: renderArticlePage,
    podcast: renderPodcastPage, opportunities: renderOpportunitiesPage, plans: renderPlansPage,
    faq: renderFAQPage, favorites: renderFavoritesPage, dashboard: renderDashboardPage
  };
  renderers[PAGE]?.();
  preselectContactTopic();
  initWhatsAppForms();
  if (window.location.hash === "#aparecer") setTimeout(() => document.getElementById("joinDialog")?.showModal(), 250);
  document.querySelectorAll("[data-open-join-page]").forEach((button) => button.addEventListener("click", () => document.getElementById("joinDialog")?.showModal()));
}

document.addEventListener("DOMContentLoaded", initPage);
