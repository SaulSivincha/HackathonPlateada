import type { TallerInfo } from "./app-context"

export interface TallerMagistral {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  instructor: string
  instructorBio: string
  duracion: string
  formato: string
  precio: string
  precioAntes?: string
  cupos: string
  fecha: string
  hora: string
  temario: string[]
  deliverables: string[]
  testimonial?: { nombre: string; texto: string }
}

export const talleresMagistrales: TallerMagistral[] = [
  {
    id: "magistral-digital",
    title: "Domina lo digital sin miedo",
    subtitle: "Taller magistral intensivo",
    description:
      "En 3 horas transformamos tu presencia digital desde cero. Sales con Instagram, WhatsApp Business, Google Maps y tu primer catalogo digital funcionando. No necesitas saber nada de tecnologia, te guiamos paso a paso.",
    icon: "instagram",
    instructor: "Carlos Mendoza",
    instructorBio: "Consultor digital con 12 anos ayudando a emprendedores +50 a digitalizarse. Ex Google for Startups mentor.",
    duracion: "3 horas",
    formato: "Virtual por Zoom (con grabacion incluida)",
    precio: "S/ 49",
    precioAntes: "S/ 89",
    cupos: "20 participantes",
    fecha: "Sabado 15 de marzo, 2026",
    hora: "9:00 AM - 12:00 PM",
    temario: [
      "Tu perfil profesional de Instagram en 30 minutos",
      "WhatsApp Business: catalogo, respuestas rapidas y etiquetas",
      "Google Maps: que te encuentren sin pagar publicidad",
      "Tu primer catalogo digital con Canva (plantilla incluida)",
      "Sesion de preguntas y respuestas personalizada",
    ],
    deliverables: [
      "Instagram de negocio configurado y con 3 publicaciones",
      "WhatsApp Business con catalogo de productos listo",
      "Perfil de Google Maps creado y verificado",
      "Catalogo digital en PDF listo para compartir",
      "Grabacion del taller para repasar cuando quieras",
      "Grupo de WhatsApp de soporte por 30 dias",
    ],
    testimonial: {
      nombre: "Rosa M., 58 anos — Pasteleria artesanal",
      texto: "Yo pensaba que las redes no eran para mi. En 3 horas tenia todo funcionando y esa semana me llegaron 4 pedidos por Instagram.",
    },
  },
  {
    id: "magistral-ventas",
    title: "Vende mas sin bajar tus precios",
    subtitle: "Taller magistral de estrategia comercial",
    description:
      "Aprende a calcular tus precios correctamente, presentar tu valor sin miedo y cerrar mas ventas. Ideal para emprendedores que sienten que cobran poco o que les cuesta vender.",
    icon: "calculator",
    instructor: "Ana Lucia Torres",
    instructorBio: "Especialista en ventas para pequenos negocios. 15 anos de experiencia en capacitacion comercial para emprendedores.",
    duracion: "3 horas",
    formato: "Virtual por Zoom (con grabacion incluida)",
    precio: "S/ 49",
    precioAntes: "S/ 89",
    cupos: "20 participantes",
    fecha: "Sabado 22 de marzo, 2026",
    hora: "9:00 AM - 12:00 PM",
    temario: [
      "Por que tus precios actuales probablemente estan mal",
      "Formula simple para calcular tu precio real (con ganancia)",
      "Como presentar tu precio con seguridad y sin disculparte",
      "Tecnicas para que el cliente diga SI sin regatear",
      "Sesion practica: calcula tus precios en vivo",
    ],
    deliverables: [
      "Calculadora de precios en Excel personalizada",
      "Guia de argumentos de venta para tu negocio",
      "Script de respuesta cuando el cliente dice 'esta caro'",
      "Lista de precios profesional lista para imprimir",
      "Grabacion del taller para repasar cuando quieras",
      "Grupo de WhatsApp de soporte por 30 dias",
    ],
    testimonial: {
      nombre: "Jorge P., 62 anos — Carpinteria",
      texto: "Descubri que estaba cobrando 40% menos de lo que debia. Ahora mis clientes pagan sin dudar porque se presentar el valor de mi trabajo.",
    },
  },
  {
    id: "magistral-clientes",
    title: "Consigue clientes todas las semanas",
    subtitle: "Taller magistral de captacion",
    description:
      "Aprende un sistema simple para que cada semana lleguen clientes nuevos a tu negocio usando WhatsApp, recomendaciones y tu comunidad. Sin invertir en publicidad.",
    icon: "message-circle",
    instructor: "Patricia Rojas",
    instructorBio: "Especialista en marketing local. Ha ayudado a mas de 200 emprendedores +50 a llenar sus agendas.",
    duracion: "3 horas",
    formato: "Virtual por Zoom (con grabacion incluida)",
    precio: "S/ 49",
    precioAntes: "S/ 89",
    cupos: "20 participantes",
    fecha: "Sabado 29 de marzo, 2026",
    hora: "9:00 AM - 12:00 PM",
    temario: [
      "Los 3 canales que ya tienes y no estas aprovechando",
      "Como pedir recomendaciones sin que sea incomodo",
      "WhatsApp como herramienta de ventas (no de spam)",
      "Tu rutina semanal de captacion en 30 minutos al dia",
      "Sesion practica: arma tu plan de esta semana",
    ],
    deliverables: [
      "Plan de captacion semanal personalizado",
      "Plantillas de mensajes para WhatsApp listas para usar",
      "Guia de como pedir y usar recomendaciones",
      "Calendario mensual de acciones comerciales",
      "Grabacion del taller para repasar cuando quieras",
      "Grupo de WhatsApp de soporte por 30 dias",
    ],
    testimonial: {
      nombre: "Maria L., 55 anos — Costura y arreglos",
      texto: "Antes esperaba que los clientes llegaran solos. Ahora cada lunes ya tengo mi agenda de la semana llena solo con WhatsApp y mis vecinas.",
    },
  },
]

export const talleres: TallerInfo[] = [
  {
    id: 1,
    title: "Google Maps: que te encuentren en tu zona",
    description:
      "Registra tu negocio en Google Maps para que clientes cercanos te encuentren cuando busquen lo que vendes.",
    icon: "map-pin",
    prereqs: "Ten la direccion exacta de tu negocio y el horario de atencion definido.",
    deliverables: [
      "Perfil de Google My Business creado y verificado",
      "Fotos del negocio y productos subidas al perfil",
      "Horarios, telefono y link a WhatsApp configurados",
      "Guia para responder resenas y mantener el perfil activo",
    ],
    price: "Gratis",
    capacity: "8-10 participantes",
  },
  {
    id: 2,
    title: "Como contar la historia de tu negocio y conectar con clientes",
    description:
      "Aprende a presentar tu negocio en 30 segundos con una historia que genere confianza y conecte emocionalmente con tus clientes.",
    icon: "mic",
    prereqs: "Piensa en por que empezaste tu negocio y que problema resuelves para tus clientes.",
    deliverables: [
      "Tu historia de negocio en 30 segundos lista para usar",
      "Estructura de presentacion para ferias, vecinos y redes",
      "Frases clave para conectar con distintos tipos de clientes",
      "Guia de storytelling basico para emprendedores",
    ],
    price: "Gratis",
    capacity: "8-10 participantes",
  },
  {
    id: 3,
    title: "Errores comunes que hacen perder ventas en pequenos negocios",
    description:
      "Identifica los errores mas frecuentes que alejan clientes y reducen tus ventas, a traves de casos practicos reales.",
    icon: "alert-triangle",
    prereqs: "Piensa en situaciones donde sentiste que perdiste una venta o un cliente no volvio.",
    deliverables: [
      "Lista de los 7 errores mas comunes identificados en tu negocio",
      "Casos practicos analizados en grupo",
      "Checklist de autodiagnostico para detectar fallas",
      "Acciones rapidas para corregir cada error identificado",
    ],
    price: "Gratis",
    capacity: "8-10 participantes",
  },
  {
    id: 4,
    title: "Como atender mejor a tus clientes y lograr que regresen",
    description:
      "Aprende tecnicas simples de atencion y fidelizacion para que tus clientes vuelvan y te recomienden sin que tengas que pedirlo.",
    icon: "heart-handshake",
    prereqs: "Recuerda a tus 3 mejores clientes: que tienen en comun y por que siguen eligiendote.",
    deliverables: [
      "5 tecnicas de atencion al cliente aplicables desde manana",
      "Guia de fidelizacion basica para negocios pequenos",
      "Plantilla de seguimiento post-venta sencilla",
      "Tips para pedir y usar recomendaciones de clientes",
    ],
    price: "Gratis",
    capacity: "8-10 participantes",
  },
  {
    id: 5,
    title: "Mentalidad emprendedora despues de los 50",
    description:
      "Supera las barreras mentales frente a la tecnologia y el cambio. Descubre como tu experiencia de vida es tu mayor ventaja competitiva.",
    icon: "brain",
    prereqs: "No se necesita ningun conocimiento previo. Solo ganas de reflexionar y aprender.",
    deliverables: [
      "Mapa personal de fortalezas como emprendedor mayor de 50",
      "Estrategias de adaptacion tecnologica sin estres",
      "Ejercicio de seguridad digital: que si puedo hacer hoy",
      "Guia de mentalidad para seguir creciendo en cualquier etapa",
    ],
    price: "Gratis",
    capacity: "8-10 participantes",
  },
  {
    id: 6,
    title: "Como organizar tu dia para que tu negocio no te consuma",
    description:
      "Aprende rutinas simples de gestion del tiempo para separar tu vida personal de tu negocio y trabajar con mas enfoque y menos agotamiento.",
    icon: "clock",
    prereqs: "Anota como es un dia tipico tuyo: que haces, a que hora y cuanto tiempo le dedicas al negocio.",
    deliverables: [
      "Rutina diaria y semanal adaptada a tu negocio",
      "Tecnica simple para priorizar tareas sin agobio",
      "Lista de habitos que mas tiempo consumen sin dar resultados",
      "Plantilla de planificacion semanal lista para usar",
    ],
    price: "Gratis",
    capacity: "8-10 participantes",
  },
]
