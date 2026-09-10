/* =========================================================
   RECOMIENDA MUJERES — script.js
   Sin dependencias externas. Pensado para GitHub Pages.
   ========================================================= */

/* ---------- 1. TAXONOMÍA BASE (Área > Profesión) ----------
   Esta misma estructura debería vivir en un solo archivo
   (ej: taxonomia.js) y ser importada tanto por el menú,
   el buscador, como por el formulario "Quiero aparecer",
   para que nunca queden desincronizados. */
const AREAS = [
  { id:'salud', nombre:'Salud y Bienestar', icono:'🩺',
    profesiones:['Médica general','Pediatra','Psiquiatra','Psicóloga','Nutrióloga','Matrona','Kinesióloga','Dentista','Enfermera'] },
  { id:'belleza', nombre:'Belleza y Estética', icono:'💄',
    profesiones:['Peluquera / Estilista','Maquilladora','Manicurista','Cosmetóloga','Esteticista','Diseñadora de cejas y pestañas'] },
  { id:'negocios', nombre:'Negocios y Asesorías', icono:'💼',
    profesiones:['Consultora / Coach / Mentora','Contadora','Abogada','Asesora financiera','Asesora inmobiliaria','Recursos Humanos'] },
  { id:'tecnologia', nombre:'Tecnología y Diseño', icono:'💻',
    profesiones:['Diseñadora gráfica','Desarrolladora web','Community Manager','Marketing digital','Fotógrafa','UX/UI Designer'] },
  { id:'hogar', nombre:'Hogar y Construcción', icono:'🏡',
    profesiones:['Arquitecta','Diseñadora de interiores','Organizadora del hogar','Jardinera / Paisajista'] },
  { id:'eventos', nombre:'Eventos y Gastronomía', icono:'🎉',
    profesiones:['Organizadora de eventos','Pastelera','Catering','Florista','Wedding planner'] },
  { id:'educacion', nombre:'Educación y Desarrollo', icono:'📚',
    profesiones:['Profesora particular','Coach de vida','Profesora de idiomas','Tutora académica'] },
  { id:'deporte', nombre:'Deporte y Movimiento', icono:'🤸‍♀️',
    profesiones:['Entrenadora personal','Instructora de yoga','Instructora de pilates','Nutrición deportiva'] },
];

/* ---------- 2. SINÓNIMOS / LENGUAJE COTIDIANO ----------
   Mapeo palabra-que-escribe-la-usuaria -> profesión real.
   Se puede seguir ampliando sin tocar el resto del código. */
const SINONIMOS = {
  'doctor de niños':'Pediatra', 'doctora de niños':'Pediatra', 'niños doctora':'Pediatra', 'medico niños':'Pediatra',
  'pelo':'Peluquera / Estilista', 'peinado':'Peluquera / Estilista', 'corte de pelo':'Peluquera / Estilista',
  'color de pelo':'Cosmetóloga', 'tintura':'Cosmetóloga',
  'uñas':'Manicurista', 'manicure':'Manicurista', 'pedicure':'Manicurista',
  'psicologa':'Psicóloga', 'terapia':'Psicóloga', 'salud mental':'Psicóloga',
  'abogada':'Abogada', 'leyes':'Abogada', 'legal':'Abogada', 'juicio':'Abogada',
  'contador':'Contadora', 'impuestos':'Contadora', 'declaracion de renta':'Contadora',
  'pagina web':'Desarrolladora web', 'sitio web':'Desarrolladora web', 'programadora':'Desarrolladora web',
  'redes sociales':'Community Manager', 'instagram':'Community Manager', 'marketing':'Marketing digital',
  'entrenadora':'Entrenadora personal', 'gimnasio':'Entrenadora personal', 'ejercicio':'Entrenadora personal',
  'torta':'Pastelera', 'pasteles':'Pastelera', 'reposteria':'Pastelera',
  'matrimonio':'Wedding planner', 'bodas':'Wedding planner', 'novia':'Wedding planner',
  'flores':'Florista', 'nutricionista':'Nutrióloga', 'dieta':'Nutrióloga',
  'embarazo':'Matrona', 'parto':'Matrona', 'diseño de interiores':'Diseñadora de interiores',
  'fotos':'Fotógrafa', 'fotografa':'Fotógrafa', 'yoga':'Instructora de yoga', 'pilates':'Instructora de pilates',
};

/* ---------- 3. Utilidades de texto ---------- */
function normalizar(txt){
  return txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
}
// Distancia de Levenshtein simple, para tolerar errores ortográficos (ej: "pediatrra")
function distancia(a,b){
  const m=a.length, n=b.length;
  const dp=Array.from({length:m+1},(_,i)=>[i,...Array(n).fill(0)]);
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      dp[i][j]=a[i-1]===b[j-1]? dp[i-1][j-1] : 1+Math.min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1]);
    }
  }
  return dp[m][n];
}

/* Índice plano: {textoBuscable, tipo, area, profesion} */
const INDICE = [];
AREAS.forEach(area=>{
  INDICE.push({ texto:normalizar(area.nombre), tipo:'area', area });
  area.profesiones.forEach(prof=>{
    INDICE.push({ texto:normalizar(prof), tipo:'profesion', area, profesion:prof });
  });
});
Object.keys(SINONIMOS).forEach(clave=>{
  const profNombre = SINONIMOS[clave];
  const area = AREAS.find(a=>a.profesiones.includes(profNombre));
  if(area) INDICE.push({ texto:normalizar(clave), tipo:'sinonimo', area, profesion:profNombre });
});

/* Búsqueda: coincidencia parcial -> sinónimo -> tolerancia a typos */
function buscarCoincidencias(consulta){
  const q = normalizar(consulta);
  if(q.length < 2) return [];
  const vistos = new Set();
  const resultados = [];

  const agregar = (item)=>{
    const clave = item.profesion || item.area.nombre;
    if(!vistos.has(clave)){ vistos.add(clave); resultados.push(item); }
  };

  // 1) coincidencia parcial directa (incluye sinónimos indexados)
  INDICE.filter(i=> i.texto.includes(q)).forEach(agregar);

  // 2) si el usuario escribió varias palabras, intenta por palabra clave
  if(resultados.length===0 && q.includes(' ')){
    q.split(' ').forEach(palabra=>{
      if(palabra.length>2){
        INDICE.filter(i=> i.texto.includes(palabra)).forEach(agregar);
      }
    });
  }

  // 3) tolerancia a errores ortográficos (distancia de Levenshtein)
  if(resultados.length===0){
    INDICE.forEach(item=>{
      const palabras = item.texto.split(' ');
      const cerca = palabras.some(p=> distancia(p,q) <= (q.length>5?2:1));
      if(cerca) agregar(item);
    });
  }

  return resultados.slice(0,6);
}

/* ---------- 4. Render del buscador con sugerencias ---------- */
function initBuscador(){
  const input = document.getElementById('input-buscador');
  const caja = document.getElementById('sugerencias-buscador');
  const form = document.getElementById('form-buscador');
  if(!input || !caja) return;

  input.addEventListener('input', ()=>{
    const val = input.value;
    if(val.trim().length < 2){ caja.classList.remove('visible'); caja.innerHTML=''; return; }
    const matches = buscarCoincidencias(val);
    caja.innerHTML = matches.length
      ? `<div class="sug-titulo">Resultados sugeridos</div>` + matches.map(m=>`
          <a class="sug-item" href="catalogo.html?categoria=${m.area.id}&profesion=${encodeURIComponent(m.profesion||'')}">
            <span>${m.area.icono}</span>
            <span>${m.profesion || m.area.nombre}</span>
            <span class="sug-area">${m.profesion? m.area.nombre : 'Área'}</span>
          </a>`).join('')
      : `<div class="sug-vacio">Sin coincidencias todavía. Prueba con otra palabra o explora por categoría en el menú.</div>`;
    caja.classList.add('visible');
  });

  document.addEventListener('click', (e)=>{
    if(!caja.contains(e.target) && e.target!==input) caja.classList.remove('visible');
  });

  form && form.addEventListener('submit', (e)=>{
    const matches = buscarCoincidencias(input.value);
    if(matches.length){
      e.preventDefault();
      window.location.href = `catalogo.html?categoria=${matches[0].area.id}&profesion=${encodeURIComponent(matches[0].profesion||'')}`;
    }
    // si no hay match, el form igual navega a catalogo.html?q=... (búsqueda general)
  });
}

/* ---------- 5. Mega menú (Área > Profesión) ---------- */
function renderMegaMenu(){
  const cont = document.getElementById('mega-menu-areas');
  if(!cont) return;
  cont.innerHTML = AREAS.map(area=>`
    <div class="mega-menu__grupo">
      <h4>${area.icono} ${area.nombre}</h4>
      <ul>
        ${area.profesiones.slice(0,6).map(p=>`<li><a href="catalogo.html?categoria=${area.id}&profesion=${encodeURIComponent(p)}">${p}</a></li>`).join('')}
      </ul>
    </div>`).join('');
}

function initNav(){
  document.querySelectorAll('.nav-item').forEach(item=>{
    const link = item.querySelector('.nav-link');
    if(!link || !item.querySelector('.mega-menu')) return;
    link.addEventListener('click', (e)=>{
      e.preventDefault();
      const abierto = item.classList.contains('abierto');
      document.querySelectorAll('.nav-item.abierto').forEach(i=>i.classList.remove('abierto'));
      if(!abierto) item.classList.add('abierto');
    });
  });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.nav-item')) document.querySelectorAll('.nav-item.abierto').forEach(i=>i.classList.remove('abierto'));
  });
}

/* ---------- 6. Carrusel / Banner ---------- */
function initCarrusel(){
  const pista = document.getElementById('carrusel-pista');
  if(!pista) return;
  const slides = Array.from(pista.children);
  const dotsCont = document.getElementById('carrusel-dots');
  let actual = 0, timer;

  dotsCont.innerHTML = slides.map((_,i)=>`<button class="dot ${i===0?'activo':''}" aria-label="Ir a la slide ${i+1}"></button>`).join('');
  const dots = Array.from(dotsCont.children);

  function ir(i){
    actual = (i + slides.length) % slides.length;
    pista.style.transform = `translateX(-${actual*100}%)`;
    dots.forEach((d,idx)=>d.classList.toggle('activo', idx===actual));
  }
  function auto(){ timer = setInterval(()=> ir(actual+1), 6000); }
  function reiniciarAuto(){ clearInterval(timer); auto(); }

  dots.forEach((d,i)=> d.addEventListener('click', ()=>{ ir(i); reiniciarAuto(); }));
  document.getElementById('carrusel-prev').addEventListener('click', ()=>{ ir(actual-1); reiniciarAuto(); });
  document.getElementById('carrusel-next').addEventListener('click', ()=>{ ir(actual+1); reiniciarAuto(); });

  ir(0); auto();
}

/* ---------- 7. Countdown evento ---------- */
function initCountdown(){
  const el = document.getElementById('countdown');
  if(!el) return;
  const fechaObjetivo = new Date('2026-11-14T09:00:00-03:00').getTime();

  function actualizar(){
    const ahora = Date.now();
    let diff = Math.max(0, fechaObjetivo - ahora);
    const dias = Math.floor(diff/86400000);
    const horas = Math.floor((diff%86400000)/3600000);
    const min = Math.floor((diff%3600000)/60000);
    const seg = Math.floor((diff%60000)/1000);
    el.querySelector('[data-dias]').textContent = String(dias).padStart(2,'0');
    el.querySelector('[data-horas]').textContent = String(horas).padStart(2,'0');
    el.querySelector('[data-min]').textContent = String(min).padStart(2,'0');
    el.querySelector('[data-seg]').textContent = String(seg).padStart(2,'0');
  }
  actualizar();
  setInterval(actualizar, 1000);
}

/* ---------- 8. Modal "Quiero aparecer" ---------- */
function initModal(){
  const fondo = document.getElementById('modal-aparecer');
  if(!fondo) return;
  document.querySelectorAll('[data-abrir-modal]').forEach(btn=>{
    btn.addEventListener('click', ()=> fondo.classList.add('visible'));
  });
  fondo.querySelectorAll('[data-cerrar-modal]').forEach(btn=>{
    btn.addEventListener('click', ()=> fondo.classList.remove('visible'));
  });
  fondo.addEventListener('click', (e)=>{ if(e.target===fondo) fondo.classList.remove('visible'); });
}

/* ---------- 9. Menú móvil ---------- */
function initMenuMovil(){
  const boton = document.getElementById('boton-hamburguesa');
  const nav = document.getElementById('nav-principal');
  if(!boton || !nav) return;
  boton.addEventListener('click', ()=> nav.classList.toggle('nav-movil-abierto'));
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderMegaMenu();
  initNav();
  initBuscador();
  initCarrusel();
  initCountdown();
  initModal();
  initMenuMovil();
});
