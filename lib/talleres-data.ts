import type { TallerInfo } from "./app-context"

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
