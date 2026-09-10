/* ==========================================================
   DATOS COMPARTIDOS — usado por index.html y catalogo.html
   ========================================================== */

/* -------------------------
   TAGS DE PROFESIÓN
   Lista curada. Cada perfil puede elegir hasta 3.
------------------------- */
const PROFESSION_TAGS = [
  "Maquillaje",
  "Nutrición",
  "Psicología",
  "Fotografía",
  "Diseño Gráfico",
  "Coaching",
  "Personal Training",
  "Abogacía",
  "Ingeniería Comercial",
  "Consultoría y Asesoría",
  "Periodismo",
  "Content Creator",
  "Contabilidad",
  "Medicina",
  "Odontología",
  "Kinesiología",
  "Educación y Clases Particulares",
  "Arquitectura",
  "Terapias Alternativas",
  "Peluquería y Estética",
  "Community Management",
  "Doula y Matronería"
];

/* -------------------------
   TAGS DE SERVICIO (formato / modalidad)
   Reutilizables para cualquier profesión. Hasta 4 por perfil.
------------------------- */
const SERVICE_TAGS = [
  "Sesión única",
  "Paquete de sesiones",
  "Acompañamiento mensual",
  "Atención online",
  "Atención presencial",
  "Talleres grupales",
  "Clases particulares",
  "Diagnóstico inicial gratuito",
  "Cobertura de eventos",
  "Creación de contenido"
];

/* -------------------------
   ÁREAS (Área > Profesión) — punto 2.3 y 2.4 del brief
   Agrupa los mismos PROFESSION_TAGS de arriba en categorías
   amplias para el mega menú y el buscador inteligente.
   IMPORTANTE: no se renombra ningún tag existente, solo se
   agrupan, así ningún perfil actual se ve afectado.
   Para agregar una profesión nueva en el futuro: súmala a
   PROFESSION_TAGS y agrégala aquí, dentro del área que le
   corresponda.
------------------------- */
const AREAS = [
  { id: "salud", nombre: "Salud y Bienestar", icono: "🩺",
    tags: ["Medicina", "Nutrición", "Psicología", "Odontología", "Kinesiología", "Terapias Alternativas", "Doula y Matronería"] },
  { id: "belleza", nombre: "Belleza y Estética", icono: "💄",
    tags: ["Maquillaje", "Peluquería y Estética"] },
  { id: "negocios", nombre: "Negocios y Asesorías", icono: "💼",
    tags: ["Coaching", "Abogacía", "Ingeniería Comercial", "Consultoría y Asesoría", "Contabilidad"] },
  { id: "comunicacion", nombre: "Comunicación y Contenido", icono: "📸",
    tags: ["Fotografía", "Diseño Gráfico", "Periodismo", "Content Creator", "Community Management"] },
  { id: "educacion", nombre: "Educación y Desarrollo", icono: "📚",
    tags: ["Educación y Clases Particulares"] },
  { id: "hogar", nombre: "Hogar y Diseño", icono: "🏡",
    tags: ["Arquitectura"] },
  { id: "deporte", nombre: "Deporte y Movimiento", icono: "🤸‍♀️",
    tags: ["Personal Training"] }
];

/* -------------------------
   SINÓNIMOS — punto 1.2.3 del brief (buscador inteligente)
   Mapea lenguaje cotidiano/coloquial -> tag real existente.
   Se puede seguir ampliando sumando líneas, sin tocar nada más.
------------------------- */
const SEARCH_SYNONYMS = {
  "doctor de niños": "Medicina", "doctora": "Medicina", "medico": "Medicina", "médica": "Medicina",
  "pelo": "Peluquería y Estética", "peinado": "Peluquería y Estética", "uñas": "Peluquería y Estética",
  "maquillista": "Maquillaje", "maquilladora": "Maquillaje",
  "abogado": "Abogacía", "leyes": "Abogacía", "legal": "Abogacía", "juicio": "Abogacía",
  "contador": "Contabilidad", "impuestos": "Contabilidad", "declaracion de renta": "Contabilidad",
  "terapia": "Psicología", "psicologo": "Psicología", "salud mental": "Psicología",
  "nutricionista": "Nutrición", "dieta": "Nutrición",
  "entrenadora": "Personal Training", "gimnasio": "Personal Training", "ejercicio": "Personal Training",
  "pagina web": "Diseño Gráfico", "diseñadora": "Diseño Gráfico", "logo": "Diseño Gráfico",
  "redes sociales": "Community Management", "instagram": "Community Management",
  "fotografa": "Fotografía", "fotos": "Fotografía",
  "clases": "Educación y Clases Particulares", "profesora": "Educación y Clases Particulares", "tutora": "Educación y Clases Particulares",
  "embarazo": "Doula y Matronería", "parto": "Doula y Matronería", "matrona": "Doula y Matronería",
  "diseño de interiores": "Arquitectura", "arquitecta": "Arquitectura",
  "consultora": "Consultoría y Asesoría", "mentora": "Coaching", "coach": "Coaching",
  "periodista": "Periodismo",
  "kinesiologa": "Kinesiología", "fisioterapia": "Kinesiología",
  "dentista": "Odontología",
  "acupuntura": "Terapias Alternativas", "reiki": "Terapias Alternativas"
};

/* -------------------------
   BANNER / CARRUSEL — punto 2.2.2 del brief
   5 slides de ejemplo. "link" acepta: una página real del sitio,
   un ancla (#eventos) o "modal:aparecer" para abrir el formulario.
------------------------- */
const BANNER_SLIDES = [
  {
    kicker: "Historia destacada",
    title: "Conoce a Verónica Torrejón, Coach y Consultora en Santiago",
    text: "De ordenar sus propios objetivos a acompañar a decenas de mujeres cada mes. Su historia, y cómo la encontraron sus primeras clientas.",
    cta: "Ver su historia",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    link: "catalogo.html?prof=Coaching"
  },
  {
    kicker: "Evento de la comunidad",
    title: "Mañana de Wellness — sábado 14 de noviembre",
    text: "Social run + brunch con taller de bienestar emocional. Quedan los últimos cupos.",
    cta: "Ver evento",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    link: "#eventos"
  },
  {
    kicker: "Únete",
    title: "¿Tienes un servicio o emprendimiento?",
    text: "Crea tu perfil gratis y deja que más personas te encuentren.",
    cta: "Quiero aparecer",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    link: "modal:aparecer"
  },
  {
    kicker: "Explora por categoría",
    title: "Descubre mujeres en salud, belleza, negocios y más",
    text: "Ordenado por área y profesión, como en las grandes tiendas — para encontrar rápido.",
    cta: "Ver catálogo",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    link: "catalogo.html"
  },
  {
    kicker: "Alianza",
    title: "Nueva alianza con Cámara de Emprendedoras de Chile",
    text: "Beneficios exclusivos para las profesionales de nuestra comunidad.",
    cta: "Conocer más",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    link: "catalogo.html"
  }
];

/* -------------------------
   PRÓXIMOS EVENTOS + EVENTO DESTACADO — punto 1.2.5 del brief
   "featured.isoDate" alimenta el countdown en vivo.
------------------------- */
const EVENTS = {
  proximos: [
    {
      fecha: "22 de octubre · Online",
      titulo: "Taller: Cómo fijar precios sin miedo a cobrar de más",
      descripcion: "Capacitación gratuita para emprendedoras que están partiendo.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=500&q=80"
    },
    {
      fecha: "8 de noviembre · Parque O'Higgins",
      titulo: "Feria de Mujeres Emprendedoras — Verano 2026",
      descripcion: "Más de 80 stands de negocios liderados por mujeres de todo Chile.",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=500&q=80"
    },
    {
      fecha: "Marzo 2027 · Santiago",
      titulo: "Corrida de Mujeres — Media Maratón de Santiago 2027",
      descripcion: "Juntas comunitarias de entrenamiento cada semana antes de la fecha.",
      image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=500&q=80"
    }
  ],
  featured: {
    kicker: "Evento propio · Inscripción abierta",
    titulo: "Mañana de Wellness",
    descripcion: "Sábado 14 de noviembre de 2026. Partimos con un social run alegre y cerramos con un brunch y taller de bienestar emocional. Taller de bienestar — inscríbete ahora para asegurar tu cupo, ¡quedan los últimos disponibles!",
    isoDate: "2026-11-14T09:00:00-03:00",
    whatsappUrl: "https://wa.me/56982398540?text=Quiero%20inscribirme%20en%20Ma%C3%B1ana%20de%20Wellness",
    imagenPrincipal: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80",
    imagenFlotante: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80"
  }
};

/* -------------------------
   REGIONES DE CHILE
------------------------- */
const REGIONS = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana",
  "O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes"
];

/* -------------------------
   CONFIGURACIÓN — AQUÍ VAS A PEGAR TUS DATOS Y LINKS
------------------------- */
const CONFIG = {

  // Contacto de respaldo (se usa si un perfil no tiene su propio
  // whatsapp/instagram cargado desde el formulario)
  OWNER_WHATSAPP: "56982398540",   // sin "+", sin espacios
  OWNER_INSTAGRAM: "verotorrejon", // sin "@"

  // Pega aquí la URL de embed de tu Google Form cuando la tengas
  FORM_EMBED_URL: "",

  // Pega aquí la URL de tu Apps Script Web App cuando la tengas
  SHEET_API_URL: ""

};

/* -------------------------
   PERFILES DE EJEMPLO
   (cuando conectes SHEET_API_URL, estos se reemplazan solos)
------------------------- */
const profiles = [

  {
    id: 1,
    name: "Manuela Diaz",
    professionTags: ["Maquillaje"],
    serviceTags: ["Atención presencial", "Cobertura de eventos", "Clases particulares"],
    otherTag: "",
    region: "Metropolitana",
    location: "Santiago",
    rating: 4.9,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    description: "Maquilladora profesional especializada en maquillaje social, novias y eventos.",
    instagram: "",
    whatsapp: "",
    reviewList: [
      { name: "Camila", text: "Excelente profesional. Muy dedicada y el resultado fue increíble." },
      { name: "Francisca", text: "Muy puntual, amable y talentosa. La recomiendo totalmente." }
    ]
  },

  {
    id: 2,
    name: "Analicia Aldana",
    professionTags: ["Periodismo", "Content Creator"],
    serviceTags: ["Atención online", "Talleres grupales", "Cobertura de eventos", "Creación de contenido"],
    otherTag: "",
    region: "Valparaíso",
    location: "Valparaíso",
    rating: 4.9,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    description: "Periodista y Creadora del colectivo Tejer la Red, impulsando espacios comunitarios.",
    instagram: "",
    whatsapp: "",
    reviewList: [
      { name: "Daniela", text: "Me ayudó muchísimo y siempre estuvo disponible para resolver mis dudas." },
      { name: "Sofía", text: "Una profesional muy cercana y clara para explicar." }
    ]
  },

  {
    id: 3,
    name: "Pilar",
    professionTags: ["Psicología"],
    serviceTags: ["Sesión única", "Atención online", "Acompañamiento mensual", "Talleres grupales"],
    otherTag: "",
    region: "Metropolitana",
    location: "Providencia - Las Condes",
    rating: 4.9,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=80",
    description: "Psicóloga dedicada al acompañamiento de procesos personales y bienestar.",
    instagram: "",
    whatsapp: "",
    reviewList: [
      { name: "María", text: "Me sentí muy escuchada y acompañada durante todo el proceso." }
    ]
  },

  {
    id: 4,
    name: "Jose Gomez",
    professionTags: ["Fotografía"],
    serviceTags: ["Atención presencial", "Cobertura de eventos", "Creación de contenido"],
    otherTag: "",
    region: "Biobío",
    location: "Concepción",
    rating: 4.9,
    reviews: 14,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    description: "Fotógrafa especializada en retratos, marcas personales y emprendimientos.",
    instagram: "",
    whatsapp: "",
    reviewList: [
      { name: "Antonia", text: "Entendió exactamente lo que necesitaba para mi marca." }
    ]
  },

  {
    id: 5,
    name: "Veronica Torrejon",
    professionTags: ["Coaching", "Ingeniería Comercial", "Consultoría y Asesoría"],
    serviceTags: ["Atención online", "Acompañamiento mensual", "Talleres grupales", "Creación de contenido"],
    otherTag: "",
    region: "Metropolitana",
    location: "Santiago",
    rating: 5,
    reviews: 172,
    image: "https://images.unsplash.com/photo-1551836022-8b2858c9c9c4?auto=format&fit=crop&w=800&q=80",
    description: "Acompañamiento para mujeres que quieren ordenar sus objetivos y proyectos. Me gusta crear espacios y eventos de bienestar, potenciar a emprendedores y sus negocios.",
    instagram: "verotorrejon",
    whatsapp: "56982398540",
    reviewList: [
      { name: "Paula", text: "Muy profesional y creativa. Estoy muy feliz de haberla conocido, me ayudo mucho a aumentar mis ventas." },
      { name: "Sofía", text: "Una profesional muy cercana y clara para explicar." },
      { name: "Antonia", text: "Me encanto! Sigo trabajando con ella todos los meses!!" }
    ]
  },

  {
    id: 6,
    name: "Valentina Rojas",
    professionTags: ["Personal Training"],
    serviceTags: ["Atención presencial", "Talleres grupales", "Atención online"],
    otherTag: "",
    region: "Metropolitana",
    location: "Ñuñoa",
    rating: 5.0,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    description: "Acompañamiento para mujeres que quieren realizar deporte y mejorar su salud.",
    instagram: "",
    whatsapp: "",
    reviewList: [
      { name: "Carolina", text: "Me ayudó a ordenar mis entrenamientos y finalmente dar el primer paso." }
    ]
  }

];
