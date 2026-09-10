/* ==========================================================
   LÓGICA COMPARTIDA — usado por index.html y catalogo.html
   ========================================================== */

const IS_CATALOG_PAGE = !!document.getElementById("profilesGrid");

// Estado de filtros (se llena desde la URL en catalogo.html)
const filterState = {
  search: "",
  region: "",
  professionTags: new Set(),
  minRating: 0,
  sort: "default"
};

/* -------------------------
   URL <-> FILTROS
   (permite compartir/guardar un link con el catálogo filtrado)
------------------------- */

function readFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);

  filterState.search = params.get("q") || "";
  filterState.region = params.get("region") || "";
  filterState.minRating = parseFloat(params.get("rating")) || 0;
  filterState.sort = params.get("sort") || "default";

  const profParam = params.get("prof");
  if (profParam) {
    profParam.split(",").forEach(t => filterState.professionTags.add(t));
  }
}

function writeFiltersToURL() {
  if (!IS_CATALOG_PAGE) return;

  const params = new URLSearchParams();

  if (filterState.search) params.set("q", filterState.search);
  if (filterState.region) params.set("region", filterState.region);
  if (filterState.minRating) params.set("rating", filterState.minRating);
  if (filterState.sort !== "default") params.set("sort", filterState.sort);
  if (filterState.professionTags.size > 0) {
    params.set("prof", [...filterState.professionTags].join(","));
  }

  const newUrl = window.location.pathname +
    (params.toString() ? "?" + params.toString() : "");

  window.history.replaceState({}, "", newUrl);
}

function buildCatalogURL() {
  const params = new URLSearchParams();

  if (filterState.search) params.set("q", filterState.search);
  if (filterState.region) params.set("region", filterState.region);
  if (filterState.minRating) params.set("rating", filterState.minRating);
  if (filterState.sort !== "default") params.set("sort", filterState.sort);
  if (filterState.professionTags.size > 0) {
    params.set("prof", [...filterState.professionTags].join(","));
  }

  return "catalogo.html" + (params.toString() ? "?" + params.toString() : "");
}

/* -------------------------
   SIDEBAR
------------------------- */

function openSidebar() {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("sidebarBackdrop").classList.add("open");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarBackdrop").classList.remove("open");
}

function buildSidebarFilters() {

  // Región
  const regionSelect = document.getElementById("sidebarRegion");
  regionSelect.innerHTML = `<option value="">Todas las regiones</option>` +
    REGIONS.map(r => `<option value="${r}" ${filterState.region === r ? "selected" : ""}>${r}</option>`).join("");

  // Rating
  const ratingSelect = document.getElementById("sidebarRating");
  ratingSelect.value = filterState.minRating || "0";

  // Tags de profesión
  const tagContainer = document.getElementById("sidebarProfessionTags");
  tagContainer.innerHTML = PROFESSION_TAGS.map(tag => `
    <label>
      <input
        type="checkbox"
        value="${tag}"
        ${filterState.professionTags.has(tag) ? "checked" : ""}
        onchange="toggleSidebarTag('${tag.replace(/'/g, "\\'")}', this.checked)"
      >
      ${tag}
    </label>
  `).join("");
}

function toggleSidebarTag(tag, checked) {
  if (checked) {
    filterState.professionTags.add(tag);
  } else {
    filterState.professionTags.delete(tag);
  }
}

function applySidebarFilters() {

  filterState.region = document.getElementById("sidebarRegion").value;
  filterState.minRating = parseFloat(document.getElementById("sidebarRating").value) || 0;

  closeSidebar();

  if (IS_CATALOG_PAGE) {
    syncTopFiltersFromState();
    runFilter();
  } else {
    window.location.href = buildCatalogURL();
  }
}

function clearSidebarFilters() {
  filterState.region = "";
  filterState.minRating = 0;
  filterState.professionTags.clear();
  buildSidebarFilters();

  if (IS_CATALOG_PAGE) {
    syncTopFiltersFromState();
    runFilter();
  }
}

// Mantiene sincronizados los controles de arriba del catálogo
// (buscador, rating, orden) con el estado de filtros
function syncTopFiltersFromState() {
  const regionTop = document.getElementById("regionFilter");
  const ratingTop = document.getElementById("ratingFilter");
  if (regionTop) regionTop.value = filterState.region;
  if (ratingTop) ratingTop.value = filterState.minRating || "0";
  buildSidebarFilters();
  renderActiveTagPills();
}

function renderActiveTagPills() {
  const container = document.getElementById("activeTagsBar");
  if (!container) return;

  const pills = [...filterState.professionTags].map(tag => `
    <div class="active-tag-pill">
      ${tag}
      <button onclick="removeTagFilter('${tag.replace(/'/g, "\\'")}')">✕</button>
    </div>
  `).join("");

  container.innerHTML = pills;
}

function removeTagFilter(tag) {
  filterState.professionTags.delete(tag);
  buildSidebarFilters();
  renderActiveTagPills();
  runFilter();
}

/* -------------------------
   BÚSQUEDA / FILTRO / ORDEN (página catálogo)
------------------------- */

function runFilter() {

  if (!IS_CATALOG_PAGE) return;

  filterState.search = document.getElementById("searchInput").value.toLowerCase().trim();
  filterState.region = document.getElementById("regionFilter").value;
  filterState.minRating = parseFloat(document.getElementById("ratingFilter").value) || 0;
  filterState.sort = document.getElementById("sortBy").value;

  let filtered = profiles.filter(profile => {

    const matchesSearch = matchesSmartSearch(profile, filterState.search);

    const matchesRegion =
      !filterState.region || profile.region === filterState.region;

    const matchesTags =
      filterState.professionTags.size === 0 ||
      profile.professionTags.some(t => filterState.professionTags.has(t));

    const matchesRating = profile.rating >= filterState.minRating;

    return matchesSearch && matchesRegion && matchesTags && matchesRating;
  });

  if (filterState.sort === "name-asc") {
    filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name, "es"));
  } else if (filterState.sort === "reviews-desc") {
    filtered = filtered.slice().sort((a, b) => b.reviews - a.reviews);
  } else if (filterState.sort === "rating-desc") {
    filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
  }

  displayProfiles(filtered);
  renderActiveTagPills();
  writeFiltersToURL();
}

/* -------------------------
   TARJETAS DE PERFIL
------------------------- */

function displayProfiles(list) {

  const grid = document.getElementById("profilesGrid");
  const info = document.getElementById("resultsInfo");

  grid.innerHTML = "";
  info.textContent = `${list.length} mujer${list.length === 1 ? "" : "es"} encontrada${list.length === 1 ? "" : "s"}`;

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:50px;">
        <h3>No encontramos resultados</h3>
        <p style="color:#777; margin-top:8px;">Prueba con otros filtros o categorías.</p>
      </div>
    `;
    return;
  }

  list.forEach(profile => {

    const card = document.createElement("div");
    card.className = "profile-card";

    card.innerHTML = `
      <img class="profile-image" src="${profile.image}" alt="${profile.name}" loading="lazy">
      <div class="profile-content">
        <div class="profile-tags">
          ${profile.professionTags.map(t => `<span class="tag-badge">${t}</span>`).join("")}
        </div>
        <h3 class="profile-name">${profile.name}</h3>
        <div class="profile-location">📍 ${profile.location}</div>
        <div class="rating">
          <span>★★★★★</span> ${profile.rating} (${profile.reviews})
        </div>
        <p class="profile-description">${profile.description}</p>
        <button class="view-profile" onclick="openProfile(${profile.id})">Ver perfil</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* -------------------------
   MODAL DE PERFIL
------------------------- */

function openProfile(id) {

  const profile = profiles.find(p => p.id === id);
  if (!profile) return;

  const details = document.getElementById("profileDetails");

  details.innerHTML = `
    <img src="${profile.image}" alt="${profile.name}" class="profile-modal-image" loading="lazy">

    <div class="profile-tags">
      ${profile.professionTags.map(t => `<span class="tag-badge">${t}</span>`).join("")}
    </div>

    <h2>${profile.name}</h2>
    <p style="color:#777;">📍 ${profile.location}</p>

    <div class="rating" style="margin-top:10px;">
      <span>★★★★★</span> ${profile.rating} (${profile.reviews} recomendaciones)
    </div>

    <p style="margin-top:20px;">${profile.description}</p>

    <div class="profile-services">
      <h3>Servicios</h3>
      <div class="profile-tags" style="margin-top:10px;">
        ${profile.serviceTags.map(t => `<span class="tag-badge">${t}</span>`).join("")}
      </div>
    </div>

    <div class="reviews">
      <h3>Recomendaciones</h3>
      ${profile.reviewList.map(review => `
        <div class="review">
          <div class="review-name">${review.name} · ★★★★★</div>
          <p>${review.text}</p>
        </div>
      `).join("")}
    </div>

    <div class="contact-buttons">
      <a class="whatsapp-btn" href="https://wa.me/${(profile.whatsapp || CONFIG.OWNER_WHATSAPP).replace(/\D/g, "")}" target="_blank" rel="noopener">
        💬 WhatsApp
      </a>
      <a class="instagram-btn" href="https://instagram.com/${(profile.instagram || CONFIG.OWNER_INSTAGRAM).replace("@", "")}" target="_blank" rel="noopener">
        📷 Instagram
      </a>
    </div>

    <button class="share-btn" style="width:100%; margin-top:10px; padding:12px; border-radius:10px;" onclick="shareProfile(${profile.id})">
      🔗 Copiar link de este perfil
    </button>
  `;

  document.getElementById("profileModal").style.display = "block";

  // Deja el link de este perfil guardado en la URL para poder compartirlo
  if (IS_CATALOG_PAGE) {
    const params = new URLSearchParams(window.location.search);
    params.set("perfil", id);
    window.history.replaceState({}, "", window.location.pathname + "?" + params.toString());
  }
}

function closeProfileModal() {
  document.getElementById("profileModal").style.display = "none";

  if (IS_CATALOG_PAGE) {
    const params = new URLSearchParams(window.location.search);
    params.delete("perfil");
    const newUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
    window.history.replaceState({}, "", newUrl);
  }
}

function shareProfile(id) {
  const url = window.location.origin + window.location.pathname.replace("index.html", "").replace(/\/$/, "/") +
    (IS_CATALOG_PAGE ? "catalogo.html" : "catalogo.html") + "?perfil=" + id;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copiado. Ya puedes pegarlo donde quieras compartirlo.");
    }).catch(() => {
      prompt("Copia este link:", url);
    });
  } else {
    prompt("Copia este link:", url);
  }
}

/* -------------------------
   FORMULARIO "QUIERO APARECER"
------------------------- */

let joinSelectedProfessionTags = new Set();
let joinSelectedServiceTags = new Set();

function openJoinModal() {

  const iframe = document.getElementById("formEmbed");
  const fallback = document.getElementById("fallbackForm");

  if (CONFIG.FORM_EMBED_URL) {
    iframe.src = CONFIG.FORM_EMBED_URL;
    iframe.style.display = "block";
    fallback.style.display = "none";
  } else {
    iframe.style.display = "none";
    fallback.style.display = "block";
    buildJoinTagCheckboxes();
  }

  document.getElementById("joinModal").style.display = "block";
}

function closeJoinModal() {
  document.getElementById("joinModal").style.display = "none";
}

function buildJoinTagCheckboxes() {

  const profContainer = document.getElementById("joinProfessionTags");
  const servContainer = document.getElementById("joinServiceTags");

  if (profContainer) {
    profContainer.innerHTML = PROFESSION_TAGS.map(tag => `
      <label>
        <input type="checkbox" value="${tag}" onchange="toggleJoinTag('profession','${tag.replace(/'/g, "\\'")}', this)">
        ${tag}
      </label>
    `).join("") + `
      <label>
        <input type="checkbox" value="Otro" onchange="toggleJoinOther('profession', this)">
        Otro (mi profesión no está en la lista)
      </label>
    `;
  }

  if (servContainer) {
    servContainer.innerHTML = SERVICE_TAGS.map(tag => `
      <label>
        <input type="checkbox" value="${tag}" onchange="toggleJoinTag('service','${tag.replace(/'/g, "\\'")}', this)">
        ${tag}
      </label>
    `).join("") + `
      <label>
        <input type="checkbox" value="Otro" onchange="toggleJoinOther('service', this)">
        Otro
      </label>
    `;
  }
}

function toggleJoinTag(group, tag, checkbox) {

  const set = group === "profession" ? joinSelectedProfessionTags : joinSelectedServiceTags;
  const max = group === "profession" ? 3 : 4;

  if (checkbox.checked) {
    if (set.size >= max) {
      checkbox.checked = false;
      alert(`Puedes elegir hasta ${max} tags de ${group === "profession" ? "profesión" : "servicio"}.`);
      return;
    }
    set.add(tag);
  } else {
    set.delete(tag);
  }
}

function toggleJoinOther(group, checkbox) {
  const inputId = group === "profession" ? "joinProfessionOther" : "joinServiceOther";
  const otherInput = document.getElementById(inputId);
  otherInput.style.display = checkbox.checked ? "block" : "none";
}

function submitJoinForm(event) {
  event.preventDefault();

  alert(
    "¡Gracias! Esta primera versión es un prototipo. En la siguiente etapa este formulario quedará conectado directamente a nuestra base de datos para recibir solicitudes reales."
  );

  closeJoinModal();
}

/* -------------------------
   CARGA DESDE GOOGLE SHEETS (base de datos real)
------------------------- */

async function loadProfilesFromSheet() {

  if (!CONFIG.SHEET_API_URL) return;

  try {
    const response = await fetch(CONFIG.SHEET_API_URL);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      profiles.length = 0;
      data.forEach(p => profiles.push(p));
    }
  } catch (err) {
    console.error("No se pudo cargar la hoja de datos, usando perfiles de ejemplo:", err);
  }

  if (IS_CATALOG_PAGE) {
    runFilter();
  }
}

/* -------------------------
   CIERRE DE MODALES AL HACER CLIC AFUERA
------------------------- */

window.onclick = function (event) {
  const joinModal = document.getElementById("joinModal");
  const profileModal = document.getElementById("profileModal");

  if (event.target === joinModal) closeJoinModal();
  if (event.target === profileModal) closeProfileModal();
};

/* ==========================================================
   BÚSQUEDA INTELIGENTE — punto 1.2.3 del brief
   Coincidencia parcial (sin tildes) + sinónimos + tolerancia
   a errores de tipeo. 100% JS, sin dependencias ni costo.
   ========================================================== */

function normalizeText(txt) {
  return (txt || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

// Distancia de Levenshtein — mide cuántas letras hay que cambiar
// para pasar de una palabra a otra. Se usa para tolerar errores
// de tipeo (ej: "pediatrra" sigue encontrando "Pediatra").
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

// ¿La consulta calza con algún sinónimo conocido? Devuelve el tag real.
function findSynonymTag(query) {
  const q = normalizeText(query);
  for (const key in SEARCH_SYNONYMS) {
    const nk = normalizeText(key);
    if (nk === q || q.includes(nk) || nk.includes(q)) return SEARCH_SYNONYMS[key];
  }
  return null;
}

// Reemplaza la comparación exacta anterior por una búsqueda en 3 pasos:
// 1) coincidencia parcial (sin tildes/mayúsculas, igual que antes pero más flexible)
// 2) sinónimo conocido (ej: "pelo" -> "Peluquería y Estética")
// 3) tolerancia a errores de tipeo contra los tags del propio perfil
function matchesSmartSearch(profile, rawQuery) {
  const query = normalizeText(rawQuery);
  if (!query) return true;

  const allTags = [...profile.professionTags, ...profile.serviceTags, profile.otherTag || ""];
  const haystack = normalizeText([profile.name, profile.description, ...allTags].join(" "));

  if (haystack.includes(query)) return true;

  const synonymTag = findSynonymTag(query);
  if (synonymTag && allTags.includes(synonymTag)) return true;

  return allTags.some(tag => tag && levenshtein(normalizeText(tag), query) <= (query.length > 5 ? 2 : 1));
}

/* ==========================================================
   MEGA MENÚ (Área > Profesión) — punto 2.3 del brief
   ========================================================== */

function renderMegaMenus() {
  document.querySelectorAll(".mega-menu").forEach(cont => {
    cont.innerHTML = AREAS.map(area => `
      <div class="mega-menu-grupo">
        <h4>${area.icono} ${area.nombre}</h4>
        <ul>
          ${area.tags.map(tag => `<li><a href="catalogo.html?prof=${encodeURIComponent(tag)}">${tag}</a></li>`).join("")}
        </ul>
      </div>
    `).join("");
  });
}

function initMegaMenuToggle() {
  document.querySelectorAll(".nav-item").forEach(item => {
    const trigger = item.querySelector(":scope > a");
    if (!trigger) return;
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const abierto = item.classList.contains("abierto");
      document.querySelectorAll(".nav-item.abierto").forEach(i => i.classList.remove("abierto"));
      if (!abierto) item.classList.add("abierto");
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
      document.querySelectorAll(".nav-item.abierto").forEach(i => i.classList.remove("abierto"));
    }
  });
}

/* ==========================================================
   BANNER / CARRUSEL — punto 2.2.2 del brief
   5 slides de BANNER_SLIDES (data.js), autoplay + navegación manual.
   ========================================================== */

function closeSidebarIfOpen() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar && sidebar.classList.contains("open")) closeSidebar();
}

function renderBanner() {
  const pista = document.getElementById("carruselPista");
  if (!pista) return;

  pista.innerHTML = BANNER_SLIDES.map(slide => {
    const esModal = slide.link.startsWith("modal:");
    const href = esModal ? "#" : slide.link;
    const onclick = esModal ? `onclick="closeSidebarIfOpen(); openJoinModal(); return false;"` : "";
    return `
      <a class="slide" style="background-image:url('${slide.image}')" href="${href}" ${onclick}>
        <div class="slide-contenido">
          <div class="slide-kicker">${slide.kicker}</div>
          <h3>${slide.title}</h3>
          <p>${slide.text}</p>
          <span class="slide-cta">${slide.cta}</span>
        </div>
      </a>`;
  }).join("");
}

function initCarrusel() {
  const pista = document.getElementById("carruselPista");
  const dotsCont = document.getElementById("carruselDots");
  if (!pista || !dotsCont) return;

  const slides = Array.from(pista.children);
  if (slides.length === 0) return;

  let actual = 0, timer;

  dotsCont.innerHTML = slides.map((_, i) =>
    `<button class="carrusel-dot ${i === 0 ? "activo" : ""}" aria-label="Ir a la slide ${i + 1}"></button>`
  ).join("");
  const dots = Array.from(dotsCont.children);

  function ir(i) {
    actual = (i + slides.length) % slides.length;
    pista.style.transform = `translateX(-${actual * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle("activo", idx === actual));
  }
  function auto() { timer = setInterval(() => ir(actual + 1), 6000); }
  function reiniciarAuto() { clearInterval(timer); auto(); }

  dots.forEach((d, i) => d.addEventListener("click", () => { ir(i); reiniciarAuto(); }));

  const prevBtn = document.getElementById("carruselPrev");
  const nextBtn = document.getElementById("carruselNext");
  if (prevBtn) prevBtn.addEventListener("click", () => { ir(actual - 1); reiniciarAuto(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { ir(actual + 1); reiniciarAuto(); });

  ir(0);
  auto();
}

/* ==========================================================
   PRÓXIMOS EVENTOS + COUNTDOWN — punto 1.2.5 del brief
   ========================================================== */

function renderEventos() {
  const grid = document.getElementById("eventosGrid");
  if (grid) {
    grid.innerHTML = EVENTS.proximos.map(ev => `
      <div class="evento-card">
        <div class="evento-card-img" style="background-image:url('${ev.image}')"></div>
        <div class="evento-card-body">
          <div class="evento-card-fecha">${ev.fecha}</div>
          <h4>${ev.titulo}</h4>
          <p>${ev.descripcion}</p>
        </div>
      </div>
    `).join("");
  }

  const f = EVENTS.featured;
  const kicker = document.getElementById("eventoDestacadoKicker");
  const titulo = document.getElementById("eventoDestacadoTitulo");
  const desc = document.getElementById("eventoDestacadoDesc");
  const wa = document.getElementById("eventoDestacadoWhatsapp");
  const img1 = document.getElementById("eventoDestacadoImg1");
  const img2 = document.getElementById("eventoDestacadoImg2");

  if (kicker) kicker.textContent = f.kicker;
  if (titulo) titulo.textContent = f.titulo;
  if (desc) desc.textContent = f.descripcion;
  if (wa) wa.href = f.whatsappUrl;
  if (img1) img1.src = f.imagenPrincipal;
  if (img2) img2.src = f.imagenFlotante;
}

function initCountdown() {
  const el = document.getElementById("countdown");
  if (!el) return;

  const objetivo = new Date(EVENTS.featured.isoDate).getTime();

  function actualizar() {
    const diff = Math.max(0, objetivo - Date.now());
    el.querySelector("[data-dias]").textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
    el.querySelector("[data-horas]").textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
    el.querySelector("[data-min]").textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    el.querySelector("[data-seg]").textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  }
  actualizar();
  setInterval(actualizar, 1000);
}

/* ==========================================================
   AUTOCOMPLETADO DEL BUSCADOR DEL HOME — punto 1.2.3 del brief
   ========================================================== */

function buildSearchIndex() {
  const index = [];
  AREAS.forEach(area => area.tags.forEach(tag => index.push({ area, tag })));
  return index;
}

function buscarSugerencias(consulta) {
  const q = normalizeText(consulta);
  if (q.length < 2) return [];

  const index = buildSearchIndex();
  const vistos = new Set();
  const resultados = [];
  const agregar = (item) => { if (!vistos.has(item.tag)) { vistos.add(item.tag); resultados.push(item); } };

  index.filter(i => normalizeText(i.tag).includes(q)).forEach(agregar);

  if (resultados.length === 0) {
    const synTag = findSynonymTag(q);
    const item = synTag && index.find(i => i.tag === synTag);
    if (item) agregar(item);
  }

  if (resultados.length === 0) {
    index.forEach(item => {
      if (levenshtein(normalizeText(item.tag), q) <= (q.length > 5 ? 2 : 1)) agregar(item);
    });
  }

  return resultados.slice(0, 6);
}

function initHeroSuggestions() {
  const input = document.getElementById("homeSearchInput");
  const caja = document.getElementById("searchSuggestions");
  if (!input || !caja) return;

  input.addEventListener("input", () => {
    const matches = buscarSugerencias(input.value);
    caja.innerHTML = matches.length
      ? `<div class="sug-titulo">Resultados sugeridos</div>` + matches.map(m => `
          <div class="sug-item" onclick="window.location.href='catalogo.html?prof=${encodeURIComponent(m.tag)}'">
            <span>${m.area.icono}</span><span>${m.tag}</span><span class="sug-area">${m.area.nombre}</span>
          </div>`).join("")
      : "";
    caja.classList.toggle("visible", matches.length > 0);
  });

  document.addEventListener("click", (e) => {
    if (!caja.contains(e.target) && e.target !== input) caja.classList.remove("visible");
  });
}
