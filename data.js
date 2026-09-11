/* Recomienda Mujeres · contenido editable del MVP estático */

const SITE = {
  name: "Recomienda Mujeres",
  description: "Directorio chileno para descubrir y contactar talento, servicios y negocios liderados por mujeres.",
  whatsapp: "56982398540",
  instagram: "verotorrejon",
  email: "hola@recomiendamujeres.cl",
  pilotNotice: "Estamos en etapa piloto. Los perfiles marcados como demostrativos sirven para probar la experiencia."
};

const REGIONS = [
  "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
  "Valparaíso", "Metropolitana", "O'Higgins", "Maule", "Ñuble", "Biobío",
  "La Araucanía", "Los Ríos", "Los Lagos", "Aysén", "Magallanes"
];

const AREAS = [
  { id: "salud-bienestar", name: "Salud y bienestar", description: "Profesionales para el cuidado físico, mental y familiar." },
  { id: "belleza-cuidado", name: "Belleza y cuidado personal", description: "Servicios de imagen, estética y autocuidado." },
  { id: "negocios", name: "Negocios y asesorías", description: "Apoyo para ordenar, administrar y hacer crecer proyectos." },
  { id: "tecnologia", name: "Tecnología y digital", description: "Soluciones digitales, datos, productos y soporte tecnológico." },
  { id: "comunicacion", name: "Comunicación y creatividad", description: "Diseño, contenidos, fotografía, marketing y cultura." },
  { id: "educacion", name: "Educación y desarrollo", description: "Clases, formación, mentoría y aprendizaje." },
  { id: "hogar-oficios", name: "Hogar y oficios", description: "Diseño, reparación, producción y servicios para espacios." },
  { id: "legal-finanzas", name: "Legal y finanzas", description: "Asesoría jurídica, contable, tributaria y financiera." },
  { id: "deporte", name: "Deporte y movimiento", description: "Entrenamiento, actividad física y experiencias al aire libre." }
];

const PROFESSIONS = [
  { id: "medicina-general", name: "Medicina general", areas: ["salud-bienestar"], keywords: ["doctora", "médica", "consulta médica"] },
  { id: "pediatria", name: "Pediatría", areas: ["salud-bienestar"], keywords: ["pediatra", "doctor de niños", "salud infantil"] },
  { id: "psicologia", name: "Psicología", areas: ["salud-bienestar"], keywords: ["psicóloga", "terapia", "salud mental", "sicologa"] },
  { id: "nutricion", name: "Nutrición", areas: ["salud-bienestar"], keywords: ["nutricionista", "alimentación", "dieta"] },
  { id: "kinesiologia", name: "Kinesiología", areas: ["salud-bienestar", "deporte"], keywords: ["kinesióloga", "rehabilitación", "fisioterapia"] },
  { id: "matroneria", name: "Matronería y acompañamiento", areas: ["salud-bienestar"], keywords: ["matrona", "doula", "embarazo", "parto"] },
  { id: "odontologia", name: "Odontología", areas: ["salud-bienestar"], keywords: ["dentista", "salud dental"] },
  { id: "peluqueria", name: "Peluquería y estilismo", areas: ["belleza-cuidado"], keywords: ["pelo", "peluquera", "estilista", "coloración", "peinado"] },
  { id: "maquillaje", name: "Maquillaje", areas: ["belleza-cuidado", "comunicacion"], keywords: ["maquilladora", "novias", "maquillista"] },
  { id: "manicure", name: "Manicure y cuidado de uñas", areas: ["belleza-cuidado"], keywords: ["manicurista", "uñas", "nail art"] },
  { id: "cosmetologia", name: "Cosmetología", areas: ["belleza-cuidado", "salud-bienestar"], keywords: ["cosmetóloga", "facial", "piel"] },
  { id: "coaching", name: "Coaching y mentoría", areas: ["negocios", "educacion"], keywords: ["coach", "mentora", "acompañamiento"] },
  { id: "consultoria", name: "Consultoría de negocios", areas: ["negocios"], keywords: ["consultora", "estrategia", "asesoría"] },
  { id: "contabilidad", name: "Contabilidad", areas: ["negocios", "legal-finanzas"], keywords: ["contadora", "impuestos", "declaración de renta"] },
  { id: "abogacia", name: "Abogacía", areas: ["legal-finanzas", "negocios"], keywords: ["abogada", "legal", "contratos", "juicio"] },
  { id: "finanzas", name: "Asesoría financiera", areas: ["legal-finanzas", "negocios"], keywords: ["finanzas", "presupuesto", "inversiones"] },
  { id: "diseno-web", name: "Diseño web", areas: ["tecnologia", "comunicacion"], keywords: ["página web", "sitio web", "ux", "ui"] },
  { id: "desarrollo-software", name: "Desarrollo de software", areas: ["tecnologia"], keywords: ["programadora", "aplicaciones", "sistemas", "it"] },
  { id: "community-management", name: "Community management", areas: ["comunicacion", "tecnologia"], keywords: ["redes sociales", "instagram", "contenido digital"] },
  { id: "diseno-grafico", name: "Diseño gráfico", areas: ["comunicacion"], keywords: ["diseñadora", "logo", "identidad visual"] },
  { id: "fotografia", name: "Fotografía", areas: ["comunicacion"], keywords: ["fotógrafa", "fotos", "retratos", "eventos"] },
  { id: "periodismo", name: "Periodismo y contenidos", areas: ["comunicacion"], keywords: ["periodista", "redacción", "contenidos"] },
  { id: "docencia", name: "Docencia y clases", areas: ["educacion"], keywords: ["profesora", "tutora", "clases particulares"] },
  { id: "arquitectura", name: "Arquitectura e interiorismo", areas: ["hogar-oficios", "comunicacion"], keywords: ["arquitecta", "diseño de interiores", "remodelación"] },
  { id: "oficios", name: "Oficios y reparación", areas: ["hogar-oficios"], keywords: ["maestra", "carpintería", "electricidad", "reparación"] },
  { id: "entrenamiento", name: "Entrenamiento personal", areas: ["deporte", "salud-bienestar"], keywords: ["entrenadora", "personal trainer", "ejercicio", "gimnasio"] },
  { id: "yoga", name: "Yoga y movimiento consciente", areas: ["deporte", "salud-bienestar"], keywords: ["yoga", "pilates", "movilidad"] }
];

const SERVICE_TAGS = [
  "Atención online", "Atención presencial", "A domicilio", "Con reserva",
  "Sesión individual", "Paquete de sesiones", "Acompañamiento mensual",
  "Talleres grupales", "Clases particulares", "Servicios para empresas",
  "Evaluación inicial", "Cobertura de eventos", "Creación de contenido",
  "Productos personalizados", "Despacho nacional", "Presupuesto sin costo"
];

const SEARCH_SYNONYMS = {
  "doctor de niños": ["pediatria"], "doctora": ["medicina-general"], "medico": ["medicina-general"],
  "pelo": ["peluqueria"], "peinado": ["peluqueria"], "uñas": ["manicure"],
  "sicologa": ["psicologia"], "terapia": ["psicologia"], "salud mental": ["psicologia"],
  "pagina web": ["diseno-web"], "página web": ["diseno-web"], "redes sociales": ["community-management"],
  "clases de instagram": ["community-management"], "fotos": ["fotografia"], "contador": ["contabilidad"],
  "abogado": ["abogacia"], "entrenadora": ["entrenamiento"], "diseño de interiores": ["arquitectura"]
};

const PROFILES = [
  {
    id: "veronica-torrejon", type: "professional", name: "Verónica Torrejón", initials: "VT", plan: "pro", demo: true,
    headline: "Coach y consultora para emprendedoras", areas: ["negocios", "educacion"], professions: ["coaching", "consultoria"],
    services: ["Atención online", "Atención presencial", "Acompañamiento mensual", "Talleres grupales", "Servicios para empresas"],
    region: "Metropolitana", city: "Santiago", modes: ["online", "presencial"], rating: 5, reviews: 72,
    description: "Acompaña a mujeres que quieren ordenar sus objetivos, fortalecer sus negocios y convertir ideas en planes concretos.",
    about: "Su trabajo combina conversaciones estratégicas, herramientas prácticas y seguimiento. Atiende procesos individuales y facilita talleres para equipos y comunidades.",
    whatsapp: SITE.whatsapp, instagram: SITE.instagram, website: "https://verotorrejon.github.io/Mi-propio-Linktree/", avatarColor: "#8f3d62",
    availability: "Agenda abierta para octubre", gallery: ["assets/images/comunidad-hero.webp", "assets/images/taller-wellness.webp"],
    reviewList: [
      { name: "Paula", text: "Me ayudó a ordenar el foco comercial y convertir las ideas en tareas concretas." },
      { name: "Antonia", text: "El acompañamiento fue cercano, claro y muy práctico." }
    ]
  },
  {
    id: "camila-rojas", type: "professional", name: "Camila Rojas", initials: "CR", plan: "advanced", demo: true,
    headline: "Psicóloga de bienestar y procesos personales", areas: ["salud-bienestar"], professions: ["psicologia"],
    services: ["Atención online", "Atención presencial", "Sesión individual", "Talleres grupales"],
    region: "Valparaíso", city: "Viña del Mar", modes: ["online", "presencial"], rating: 4.9, reviews: 18,
    description: "Acompañamiento psicológico para mujeres adultas, con atención online y presencial.",
    about: "Trabaja con objetivos acordados y una comunicación clara sobre el alcance de cada proceso.",
    whatsapp: SITE.whatsapp, instagram: "", website: "", avatarColor: "#3f6f6b",
    availability: "Nuevas horas disponibles", gallery: ["assets/images/taller-wellness.webp"],
    reviewList: [{ name: "Daniela", text: "Un espacio respetuoso y fácil de comprender desde la primera sesión." }]
  },
  {
    id: "valentina-soto", type: "professional", name: "Valentina Soto", initials: "VS", plan: "intermediate", demo: true,
    headline: "Pediatra con orientación familiar", areas: ["salud-bienestar"], professions: ["pediatria"],
    services: ["Atención presencial", "Con reserva", "Evaluación inicial"], region: "Metropolitana", city: "Providencia",
    modes: ["presencial"], rating: 4.8, reviews: 9, description: "Consulta pediátrica de ejemplo para probar búsquedas como “doctor de niños”.",
    about: "Este perfil es demostrativo y no corresponde a una atención médica real.", whatsapp: SITE.whatsapp,
    instagram: "", website: "", avatarColor: "#5e6e91", availability: "Perfil demostrativo", gallery: [], reviewList: []
  },
  {
    id: "francisca-diaz", type: "professional", name: "Francisca Díaz", initials: "FD", plan: "advanced", demo: true,
    headline: "Estilista y colorista", areas: ["belleza-cuidado"], professions: ["peluqueria"],
    services: ["Atención presencial", "A domicilio", "Con reserva", "Presupuesto sin costo"], region: "Biobío", city: "Concepción",
    modes: ["presencial"], rating: 4.9, reviews: 23, description: "Corte, coloración y peinados con diagnóstico previo y atención personalizada.",
    about: "Trabaja en estudio y ofrece atención a domicilio para eventos dentro de Concepción.", whatsapp: SITE.whatsapp,
    instagram: "", website: "", avatarColor: "#aa6c46", availability: "Reservas con 5 días de anticipación", gallery: [],
    reviewList: [{ name: "Carolina", text: "Entendió muy bien lo que buscaba y explicó cada paso." }]
  },
  {
    id: "paula-reyes", type: "professional", name: "Paula Reyes", initials: "PR", plan: "intermediate", demo: true,
    headline: "Contadora para independientes y PYMES", areas: ["legal-finanzas", "negocios"], professions: ["contabilidad"],
    services: ["Atención online", "Acompañamiento mensual", "Servicios para empresas", "Evaluación inicial"],
    region: "Maule", city: "Talca", modes: ["online", "presencial"], rating: 4.7, reviews: 11,
    description: "Orden tributario, iniciación de actividades y apoyo mensual para pequeños negocios.",
    about: "Entrega orientación simple para comprender obligaciones y fechas importantes.", whatsapp: SITE.whatsapp,
    instagram: "", website: "", avatarColor: "#6d5c8c", availability: "Atención online en todo Chile", gallery: [], reviewList: []
  },
  {
    id: "fernanda-morales", type: "professional", name: "Fernanda Morales", initials: "FM", plan: "pro", demo: true,
    headline: "Diseñadora web y estratega digital", areas: ["tecnologia", "comunicacion"], professions: ["diseno-web", "diseno-grafico"],
    services: ["Atención online", "Servicios para empresas", "Productos personalizados", "Presupuesto sin costo"],
    region: "Los Lagos", city: "Puerto Varas", modes: ["online"], rating: 5, reviews: 16,
    description: "Sitios web claros y marcas digitales pensadas para pequeñas empresas.",
    about: "Diseña experiencias sencillas, responsivas y fáciles de administrar.", whatsapp: SITE.whatsapp,
    instagram: "", website: "", avatarColor: "#2f6b7b", availability: "Proyectos desde noviembre", gallery: ["assets/images/comunidad-hero.webp"], reviewList: []
  },
  {
    id: "daniela-perez", type: "professional", name: "Daniela Pérez", initials: "DP", plan: "basic", demo: true,
    headline: "Kinesióloga y entrenadora funcional", areas: ["salud-bienestar", "deporte"], professions: ["kinesiologia", "entrenamiento"],
    services: ["Atención presencial", "A domicilio", "Sesión individual"], region: "Valparaíso", city: "Concón",
    modes: ["presencial"], rating: 4.8, reviews: 7, description: "Movimiento, rehabilitación y retorno progresivo a la actividad física.",
    about: "Perfil demostrativo para validar categorías que cruzan salud y deporte.", whatsapp: SITE.whatsapp,
    instagram: "", website: "", avatarColor: "#587a4e", availability: "Cupos limitados", gallery: ["assets/images/social-run.webp"], reviewList: []
  },
  {
    id: "marcela-araya", type: "professional", name: "Marcela Araya", initials: "MA", plan: "basic", demo: true,
    headline: "Profesora de matemáticas", areas: ["educacion"], professions: ["docencia"],
    services: ["Atención online", "Clases particulares", "Paquete de sesiones"], region: "Antofagasta", city: "Antofagasta",
    modes: ["online"], rating: 4.9, reviews: 14, description: "Clases particulares para enseñanza media y preparación de evaluaciones.",
    about: "Planifica sesiones de acuerdo con objetivos y contenidos del establecimiento.", whatsapp: SITE.whatsapp,
    instagram: "", website: "", avatarColor: "#ad785c", availability: "Horarios de tarde", gallery: [], reviewList: []
  },
  {
    id: "lumen-estudio", type: "business", name: "Lumen Estudio", initials: "LE", plan: "advanced", demo: true,
    headline: "Branding y contenido para marcas con propósito", areas: ["comunicacion", "tecnologia"], professions: ["diseno-grafico", "community-management"],
    services: ["Servicios para empresas", "Creación de contenido", "Acompañamiento mensual", "Presupuesto sin costo"],
    region: "Metropolitana", city: "Santiago", modes: ["online", "presencial"], rating: 4.9, reviews: 19,
    description: "Estudio demostrativo liderado por mujeres, especializado en identidad y comunicación digital.",
    about: "Desarrolla identidades visuales, pautas de contenido y campañas para emprendimientos.", whatsapp: SITE.whatsapp,
    instagram: "", website: "", avatarColor: "#8b4264", availability: "Agenda de proyectos abierta", gallery: ["assets/images/comunidad-hero.webp"], reviewList: []
  },
  {
    id: "taller-norte", type: "business", name: "Taller Norte", initials: "TN", plan: "intermediate", demo: true,
    headline: "Objetos de madera para hogares y negocios", areas: ["hogar-oficios"], professions: ["oficios"],
    services: ["Productos personalizados", "Despacho nacional", "Presupuesto sin costo"], region: "Coquimbo", city: "La Serena",
    modes: ["presencial"], rating: 4.8, reviews: 13, description: "Emprendimiento demostrativo de diseño y fabricación a pequeña escala.",
    about: "Produce repisas, organizadores y piezas personalizadas según espacio y uso.", whatsapp: SITE.whatsapp,
    instagram: "", website: "", avatarColor: "#8d6846", availability: "Despachos semanales", gallery: [], reviewList: []
  },
  {
    id: "verde-raiz", type: "business", name: "Verde Raíz", initials: "VR", plan: "basic", demo: true,
    headline: "Productos de autocuidado de producción local", areas: ["belleza-cuidado"], professions: ["cosmetologia"],
    services: ["Despacho nacional", "Productos personalizados"], region: "Los Ríos", city: "Valdivia", modes: ["online"],
    rating: 4.7, reviews: 8, description: "Negocio demostrativo de productos de autocuidado y regalos.",
    about: "Catálogo pequeño, producción responsable y despachos dentro de Chile.", whatsapp: SITE.whatsapp,
    instagram: "", website: "", avatarColor: "#52715d", availability: "Stock disponible", gallery: [], reviewList: []
  },
  {
    id: "mesa-sur", type: "business", name: "Mesa Sur", initials: "MS", plan: "pro", demo: true,
    headline: "Catering y experiencias de brunch", areas: ["negocios"], professions: ["consultoria"],
    services: ["Cobertura de eventos", "Productos personalizados", "Servicios para empresas"], region: "Valparaíso", city: "Valparaíso",
    modes: ["presencial"], rating: 5, reviews: 21, description: "Emprendimiento demostrativo de catering para encuentros, talleres y celebraciones pequeñas.",
    about: "Diseña propuestas simples, estacionales y adaptadas al tipo de encuentro.", whatsapp: SITE.whatsapp,
    instagram: "", website: "", avatarColor: "#a45f4d", availability: "Cotizaciones para noviembre", gallery: ["assets/images/taller-wellness.webp"], reviewList: []
  }
];

/* Perfiles adicionales del piloto: 20 profesionales + 20 PYMES en total. */
const INITIAL_PROFESSIONAL_AGES = {
  "veronica-torrejon": 42, "camila-rojas": 36, "valentina-soto": 44, "francisca-diaz": 32,
  "paula-reyes": 41, "fernanda-morales": 35, "daniela-perez": 38, "marcela-araya": 47
};
PROFILES.forEach((profile) => { if (profile.type === "professional") profile.age = INITIAL_PROFESSIONAL_AGES[profile.id]; });

const PROFILE_EXPANSION = [
  { id: "javiera-nunez", type: "professional", name: "Javiera Núñez", age: 40, headline: "Abogada para familias y pequeños negocios", areas: ["legal-finanzas"], professions: ["abogacia"], region: "Arica y Parinacota", city: "Arica", modes: ["online", "presencial"], services: ["Atención online", "Evaluación inicial", "Servicios para empresas"] },
  { id: "andrea-pizarro", type: "professional", name: "Andrea Pizarro", age: 34, headline: "Nutricionista con enfoque familiar", areas: ["salud-bienestar"], professions: ["nutricion"], region: "Tarapacá", city: "Iquique", modes: ["online", "presencial"], services: ["Sesión individual", "Atención online", "Talleres grupales"] },
  { id: "sofia-vega", type: "professional", name: "Sofía Vega", age: 29, headline: "Fotógrafa de productos y retratos", areas: ["comunicacion"], professions: ["fotografia"], region: "Atacama", city: "Copiapó", modes: ["presencial"], services: ["Cobertura de eventos", "Creación de contenido", "Presupuesto sin costo"] },
  { id: "constanza-munoz", type: "professional", name: "Constanza Muñoz", age: 31, headline: "Maquilladora para eventos y novias", areas: ["belleza-cuidado", "comunicacion"], professions: ["maquillaje"], region: "Coquimbo", city: "Ovalle", modes: ["presencial"], services: ["A domicilio", "Con reserva", "Productos personalizados"] },
  { id: "romina-salazar", type: "professional", name: "Romina Salazar", age: 39, headline: "Arquitecta e interiorista", areas: ["hogar-oficios", "comunicacion"], professions: ["arquitectura"], region: "O'Higgins", city: "Rancagua", modes: ["online", "presencial"], services: ["Evaluación inicial", "Servicios para empresas", "Presupuesto sin costo"] },
  { id: "elisa-figueroa", type: "professional", name: "Elisa Figueroa", age: 45, headline: "Dentista de atención integral", areas: ["salud-bienestar"], professions: ["odontologia"], region: "Ñuble", city: "Chillán", modes: ["presencial"], services: ["Atención presencial", "Con reserva", "Evaluación inicial"] },
  { id: "catalina-antilef", type: "professional", name: "Catalina Antilef", age: 28, headline: "Estratega de redes y contenido", areas: ["comunicacion", "tecnologia"], professions: ["community-management"], region: "La Araucanía", city: "Temuco", modes: ["online"], services: ["Creación de contenido", "Acompañamiento mensual", "Servicios para empresas"] },
  { id: "carolina-vidal", type: "professional", name: "Carolina Vidal", age: 37, headline: "Profesora de yoga y movilidad", areas: ["deporte", "salud-bienestar"], professions: ["yoga"], region: "Aysén", city: "Coyhaique", modes: ["online", "presencial"], services: ["Sesión individual", "Talleres grupales", "Atención online"] },
  { id: "ingrid-soto", type: "professional", name: "Ingrid Soto", age: 33, headline: "Desarrolladora de software y automatización", areas: ["tecnologia"], professions: ["desarrollo-software"], region: "Magallanes", city: "Punta Arenas", modes: ["online"], services: ["Servicios para empresas", "Productos personalizados", "Presupuesto sin costo"] },
  { id: "natalia-herrera", type: "professional", name: "Natalia Herrera", age: 43, headline: "Asesora financiera para independientes", areas: ["legal-finanzas", "negocios"], professions: ["finanzas"], region: "Valparaíso", city: "Quilpué", modes: ["online", "presencial"], services: ["Atención online", "Evaluación inicial", "Acompañamiento mensual"] },
  { id: "paz-contreras", type: "professional", name: "Paz Contreras", age: 38, headline: "Matrona y acompañante perinatal", areas: ["salud-bienestar"], professions: ["matroneria"], region: "Los Lagos", city: "Osorno", modes: ["online", "presencial"], services: ["Sesión individual", "Atención online", "Talleres grupales"] },
  { id: "macarena-bustos", type: "professional", name: "Macarena Bustos", age: 30, headline: "Diseñadora de identidad visual", areas: ["comunicacion"], professions: ["diseno-grafico"], region: "Metropolitana", city: "Maipú", modes: ["online"], services: ["Creación de contenido", "Productos personalizados", "Presupuesto sin costo"] },
  { id: "altura-textil", type: "business", name: "Altura Textil", headline: "Accesorios textiles hechos en el norte", areas: ["hogar-oficios"], professions: ["oficios"], region: "Arica y Parinacota", city: "Arica", modes: ["online", "presencial"], services: ["Productos personalizados", "Despacho nacional", "Con reserva"] },
  { id: "norte-crea", type: "business", name: "Norte Crea", headline: "Papelería y regalos corporativos", areas: ["comunicacion", "negocios"], professions: ["diseno-grafico"], region: "Tarapacá", city: "Iquique", modes: ["online", "presencial"], services: ["Productos personalizados", "Servicios para empresas", "Despacho nacional"] },
  { id: "desierto-botanico", type: "business", name: "Desierto Botánico", headline: "Autocuidado de inspiración nortina", areas: ["belleza-cuidado"], professions: ["cosmetologia"], region: "Antofagasta", city: "Antofagasta", modes: ["online"], services: ["Despacho nacional", "Productos personalizados", "Con reserva"] },
  { id: "cobre-y-barro", type: "business", name: "Cobre y Barro", headline: "Cerámica utilitaria hecha a mano", areas: ["hogar-oficios"], professions: ["oficios"], region: "Atacama", city: "Copiapó", modes: ["online", "presencial"], services: ["Productos personalizados", "Despacho nacional", "Talleres grupales"] },
  { id: "brisa-papeleria", type: "business", name: "Brisa Papelería", headline: "Diseño, impresión y detalles personalizados", areas: ["comunicacion"], professions: ["diseno-grafico"], region: "Coquimbo", city: "La Serena", modes: ["online", "presencial"], services: ["Productos personalizados", "Despacho nacional", "Servicios para empresas"] },
  { id: "costa-circular", type: "business", name: "Costa Circular", headline: "Moda recuperada y talleres de reparación", areas: ["hogar-oficios"], professions: ["oficios"], region: "Valparaíso", city: "Viña del Mar", modes: ["presencial"], services: ["Talleres grupales", "Productos personalizados", "Con reserva"] },
  { id: "club-mercado", type: "business", name: "Club Mercado", headline: "Vitrina colaborativa para marcas locales", areas: ["negocios"], professions: ["consultoria"], region: "Metropolitana", city: "Santiago", modes: ["online", "presencial"], services: ["Servicios para empresas", "Acompañamiento mensual", "Cobertura de eventos"] },
  { id: "casa-colchagua", type: "business", name: "Casa Colchagua", headline: "Decoración y textiles para el hogar", areas: ["hogar-oficios"], professions: ["arquitectura"], region: "O'Higgins", city: "Santa Cruz", modes: ["online", "presencial"], services: ["Productos personalizados", "Despacho nacional", "Presupuesto sin costo"] },
  { id: "raiz-maule", type: "business", name: "Raíz Maule", headline: "Canastas y alimentos de productoras locales", areas: ["negocios"], professions: ["consultoria"], region: "Maule", city: "Curicó", modes: ["online", "presencial"], services: ["Despacho nacional", "Productos personalizados", "Servicios para empresas"] },
  { id: "nuble-dulce", type: "business", name: "Ñuble Dulce", headline: "Pastelería de autor para celebraciones", areas: ["negocios"], professions: ["consultoria"], region: "Ñuble", city: "Chillán", modes: ["presencial"], services: ["Productos personalizados", "Con reserva", "Cobertura de eventos"] },
  { id: "biobio-circular", type: "business", name: "Biobío Circular", headline: "Soluciones reutilizables para empresas", areas: ["negocios", "hogar-oficios"], professions: ["consultoria"], region: "Biobío", city: "Concepción", modes: ["online", "presencial"], services: ["Servicios para empresas", "Productos personalizados", "Presupuesto sin costo"] },
  { id: "bosque-sur", type: "business", name: "Bosque Sur", headline: "Mobiliario de pequeña escala", areas: ["hogar-oficios"], professions: ["oficios"], region: "La Araucanía", city: "Temuco", modes: ["presencial"], services: ["Productos personalizados", "Despacho nacional", "Presupuesto sin costo"] },
  { id: "rio-vivo", type: "business", name: "Río Vivo", headline: "Experiencias de bienestar junto a la naturaleza", areas: ["salud-bienestar", "deporte"], professions: ["yoga"], region: "Los Ríos", city: "Valdivia", modes: ["presencial"], services: ["Talleres grupales", "Con reserva", "Cobertura de eventos"] },
  { id: "sur-a-mano", type: "business", name: "Sur a Mano", headline: "Regalos con identidad del sur de Chile", areas: ["hogar-oficios"], professions: ["oficios"], region: "Los Lagos", city: "Puerto Montt", modes: ["online", "presencial"], services: ["Productos personalizados", "Despacho nacional", "Servicios para empresas"] },
  { id: "patagonia-lenta", type: "business", name: "Patagonia Lenta", headline: "Turismo creativo y experiencias locales", areas: ["negocios", "comunicacion"], professions: ["consultoria"], region: "Aysén", city: "Coyhaique", modes: ["online", "presencial"], services: ["Con reserva", "Talleres grupales", "Servicios para empresas"] },
  { id: "austral-lab", type: "business", name: "Austral Lab", headline: "Estudio digital para negocios regionales", areas: ["tecnologia", "comunicacion"], professions: ["diseno-web", "community-management"], region: "Magallanes", city: "Punta Arenas", modes: ["online"], services: ["Servicios para empresas", "Creación de contenido", "Acompañamiento mensual"] }
];

const PROFILE_COLORS = ["#76546f", "#4f7370", "#8b654c", "#536a86", "#7c6244", "#5d7555", "#865467", "#496f7d"];
PROFILE_EXPANSION.forEach((seed, index) => {
  const words = seed.name.split(/\s+/);
  PROFILES.push({
    ...seed,
    initials: words.map((word) => word[0]).join("").slice(0, 2).toUpperCase(),
    plan: ["basic", "intermediate", "advanced", "pro"][index % 4], demo: true,
    rating: 4.6 + (index % 5) * 0.1, reviews: 5 + index * 2,
    description: `${seed.headline}. Perfil de ejemplo creado para ampliar la cobertura territorial del piloto.`,
    about: "Presenta información estructurada sobre servicios, modalidad y ubicación para facilitar búsquedas, comparación y contacto.",
    whatsapp: SITE.whatsapp, instagram: "", website: "", avatarColor: PROFILE_COLORS[index % PROFILE_COLORS.length],
    availability: index % 2 ? "Agenda abierta para consultas" : "Solicitudes disponibles",
    gallery: index % 4 === 0 ? ["assets/images/comunidad-hero.webp"] : [], reviewList: []
  });
});

const EVENTS = [
  {
    id: "manana-wellness", title: "Mañana de Wellness", featured: true, dateISO: "2026-11-14T09:00:00-03:00",
    dateLabel: "Sábado 14 de noviembre · 09:00", location: "Santiago · lugar por confirmar", type: "Bienestar y comunidad",
    excerpt: "Social run, brunch y un taller práctico de bienestar emocional para comenzar el día acompañadas.",
    description: "Una mañana para moverse, conversar y aprender herramientas simples de bienestar. Comenzaremos con un social run a ritmo amable, continuaremos con brunch y cerraremos con un taller de bienestar emocional.",
    image: "assets/images/social-run.webp", secondaryImage: "assets/images/taller-wellness.webp", status: "Inscripción abierta",
    schedule: ["09:00 · Bienvenida y activación", "09:20 · Social run", "10:30 · Brunch", "11:15 · Taller de bienestar emocional", "12:30 · Cierre"],
    whatsappText: "Hola, quiero inscribirme en Mañana de Wellness del 14 de noviembre de 2026."
  },
  {
    id: "precios-sin-miedo", title: "Cómo fijar precios sin miedo", featured: false, dateISO: "2026-10-22T18:30:00-03:00",
    dateLabel: "22 de octubre · 18:30", location: "Online", type: "Negocios",
    excerpt: "Taller introductorio para calcular costos, definir margen y comunicar el valor de tu trabajo.",
    description: "Una sesión práctica con ejercicios simples para revisar precios y tomar decisiones con más información.",
    image: "assets/images/comunidad-hero.webp", status: "Cupos disponibles", schedule: [],
    whatsappText: "Hola, quiero información sobre el taller Cómo fijar precios sin miedo."
  },
  {
    id: "feria-emprendedoras", title: "Feria de Mujeres Emprendedoras", featured: false, dateISO: "2026-11-08T11:00:00-03:00",
    dateLabel: "8 de noviembre · 11:00", location: "Valparaíso", type: "Feria",
    excerpt: "Una jornada para conocer productos, servicios e historias de negocios liderados por mujeres.",
    description: "Encuentro demostrativo con stands, conversaciones breves y actividades para toda la comunidad.",
    image: "assets/images/taller-wellness.webp", status: "Evento piloto", schedule: [],
    whatsappText: "Hola, quiero información sobre la Feria de Mujeres Emprendedoras."
  },
  {
    id: "entrenamientos-2027", title: "Entrenamientos para la Media Maratón 2027", featured: false, dateISO: "2027-03-06T09:00:00-03:00",
    dateLabel: "Desde marzo de 2027", location: "Santiago", type: "Deporte",
    excerpt: "Juntas comunitarias para comenzar a correr, compartir avances y prepararse acompañadas.",
    description: "Entrenamientos de ejemplo abiertos a distintos niveles, con ritmo conversacional y foco en la constancia.",
    image: "assets/images/social-run.webp", status: "Próximamente", schedule: [],
    whatsappText: "Hola, quiero saber cuándo comienzan los entrenamientos 2027."
  }
];

const ARTICLES = [
  {
    id: "primeras-clientas", category: "Historias", title: "De una recomendación a las primeras clientas", date: "8 de septiembre de 2026",
    excerpt: "Cómo transformar una buena experiencia en una recomendación clara, concreta y útil.", image: "assets/images/comunidad-hero.webp",
    body: [
      "Una recomendación útil explica qué problema resolvió la profesional, cómo fue la experiencia y para quién podría ser adecuada. No necesita exagerar: necesita entregar contexto.",
      "Para una mujer que está comenzando, las primeras recomendaciones ayudan a generar confianza. Para quien busca, reducen la incertidumbre y hacen más fácil iniciar una conversación.",
      "En Recomienda Mujeres queremos que esas conexiones sean simples, respetuosas y transparentes."
    ]
  },
  {
    id: "perfil-claro", category: "Consejos", title: "Cinco datos que hacen más claro tu perfil", date: "3 de septiembre de 2026",
    excerpt: "Servicios concretos, ubicación, modalidad, disponibilidad y una forma directa de contacto.", image: "assets/images/taller-wellness.webp",
    body: [
      "Un perfil no necesita contar toda tu historia. Debe ayudar a una persona a comprender rápidamente qué haces y si puedes resolver lo que necesita.",
      "Describe tus servicios con palabras cotidianas, indica dónde atiendes, aclara si trabajas online y explica qué debe hacer alguien para contactarte.",
      "Una fotografía o portafolio aporta cuando muestra tu trabajo; los textos genéricos, en cambio, suelen generar más dudas que confianza."
    ]
  },
  {
    id: "red-local", category: "Comunidad", title: "Por qué una red local también puede abrir oportunidades", date: "29 de agosto de 2026",
    excerpt: "Encontrar talento cercano permite colaborar, recomendar y fortalecer el comercio de cada ciudad.", image: "assets/images/social-run.webp",
    body: [
      "Las búsquedas por comuna o región no son solamente un filtro. También permiten descubrir capacidades que muchas veces están más cerca de lo que imaginamos.",
      "Una red local activa facilita recomendaciones, colaboraciones y encuentros presenciales. La atención online, por su parte, amplía las oportunidades hacia todo Chile.",
      "La plataforma combina ambas posibilidades para que cada usuaria decida qué modalidad le sirve mejor."
    ]
  }
];

const PODCAST_EPISODES = [
  { number: "01", title: "Cómo explicar lo que haces sin usar palabras difíciles", duration: "Resumen de 6 min", articleId: "perfil-claro", status: "Piloto" },
  { number: "02", title: "El valor de una recomendación bien contada", duration: "Resumen de 5 min", articleId: "primeras-clientas", status: "Piloto" },
  { number: "03", title: "Crecer cerca: redes, barrios y ciudades", duration: "Resumen de 7 min", articleId: "red-local", status: "Piloto" }
];

const OPPORTUNITIES = [
  { id: "contenido-redes", title: "Apoyo freelance en contenido para redes", organization: "Emprendimiento demostrativo", location: "Remoto", type: "Proyecto", description: "Búsqueda de una profesional para planificar y producir contenido durante seis semanas." },
  { id: "fotografia-productos", title: "Fotografía de productos para catálogo", organization: "PYME demostrativa", location: "Viña del Mar", type: "Servicio", description: "Sesión de fotografía para una colección pequeña y piezas de redes sociales." },
  { id: "taller-costos", title: "Facilitadora para taller de costos", organization: "Red comunitaria demostrativa", location: "Valparaíso", type: "Colaboración", description: "Convocatoria piloto para una actividad presencial dirigida a emprendedoras." }
];

const PLANS = [
  { id: "basic", name: "Básico", price: 0, description: "Para comenzar a ser encontrada.", featured: false, features: ["Perfil esencial", "Hasta 4 servicios", "Región y modalidad", "WhatsApp o red social", "Link compartible"] },
  { id: "intermediate", name: "Intermedio", price: 4990, description: "Más información para generar confianza.", featured: false, features: ["Todo lo del plan Básico", "Galería de hasta 3 imágenes", "Disponibilidad", "Web y redes adicionales", "Una promoción activa"] },
  { id: "advanced", name: "Avanzado", price: 9990, description: "Para mostrar mejor tu trabajo.", featured: true, features: ["Todo lo del plan Intermedio", "Portafolio ampliado", "Video o enlace destacado", "Aparición prioritaria", "Estadísticas demostrativas"] },
  { id: "pro", name: "Pro", price: 16990, description: "Para negocios que buscan mayor visibilidad.", featured: false, features: ["Todo lo del plan Avanzado", "Página de negocio completa", "Publicaciones y cupones", "Participación en campañas", "Soporte prioritario"] }
];

const BANNERS = [
  { eyebrow: "Talento recomendado", title: "Encuentra a la mujer indicada para lo que necesitas", text: "Busca por profesión, servicio, ciudad o modalidad.", cta: "Explorar profesionales", link: "catalogo.html", image: "assets/images/comunidad-hero.webp", position: "center" },
  { eyebrow: "Evento destacado", title: "Una mañana para moverse y conectar", text: "Social run, brunch y bienestar emocional el 14 de noviembre.", cta: "Ver Mañana de Wellness", link: "evento.html?id=manana-wellness", image: "assets/images/social-run.webp", position: "center" },
  { eyebrow: "Haz visible tu trabajo", title: "Crea un perfil que explique con claridad lo que haces", text: "Súmate a la etapa piloto y ayúdanos a construir una mejor comunidad.", cta: "Quiero aparecer", link: "como-funciona.html#aparecer", image: "assets/images/taller-wellness.webp", position: "center" },
  { eyebrow: "Negocios liderados por mujeres", title: "Descubre productos, oficios y emprendimientos cercanos", text: "Filtra por región y encuentra nuevas opciones.", cta: "Explorar emprendimientos", link: "pymes.html", image: "assets/images/comunidad-hero.webp", position: "right" },
  { eyebrow: "Historias útiles", title: "Recomendaciones que abren oportunidades", text: "Ideas simples para presentar tu trabajo y generar confianza.", cta: "Leer historias", link: "noticias.html", image: "assets/images/taller-wellness.webp", position: "center" }
];

const FAQS = [
  { q: "¿Qué es Recomienda Mujeres?", a: "Es un directorio y comunidad digital en etapa piloto para descubrir servicios, profesionales y negocios liderados por mujeres en Chile." },
  { q: "¿Puedo aparecer gratis?", a: "Sí. El plan Básico permite crear una presencia esencial sin costo. Durante el piloto, la incorporación se coordina directamente por WhatsApp." },
  { q: "¿Los perfiles están verificados?", a: "Todavía no existe un sistema formal de verificación. Los perfiles de prueba están marcados como demostrativos y no deben interpretarse como una acreditación." },
  { q: "¿Cómo contacto a una profesional?", a: "Desde cada perfil puedes abrir WhatsApp, visitar sus redes o copiar un enlace para compartirlo." },
  { q: "¿Cómo guardo un perfil?", a: "Usa el botón Guardar. Tus favoritos quedan almacenados únicamente en el navegador de ese dispositivo." },
  { q: "¿Puedo publicar un evento u oportunidad?", a: "Sí. En esta etapa puedes proponerlo mediante el formulario de contacto o WhatsApp." },
  { q: "¿Los planes pagados ya se cobran en línea?", a: "No. Los precios son una propuesta del MVP y cualquier contratación se coordina directamente, sin pago automático." }
];

const CONFIG = {
  OWNER_WHATSAPP: SITE.whatsapp,
  OWNER_INSTAGRAM: SITE.instagram,
  FORM_EMBED_URL: "",
  SHEET_API_URL: ""
};

/* Alias de compatibilidad con la versión anterior */
const profiles = PROFILES;
const PROFESSION_TAGS = PROFESSIONS.map((item) => item.name);
