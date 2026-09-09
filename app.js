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

    const allTags = [
      ...profile.professionTags,
      ...profile.serviceTags,
      profile.otherTag || ""
    ].join(" ").toLowerCase();

    const matchesSearch =
      !filterState.search ||
      profile.name.toLowerCase().includes(filterState.search) ||
      profile.description.toLowerCase().includes(filterState.search) ||
      allTags.includes(filterState.search);

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
