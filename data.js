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
