"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Package,
  ArrowRight,
  Home,
  Star,
  FileText,
  BarChart3,
  Palette,
  MessageCircle,
  GraduationCap,
  Users,
  CalendarPlus,
} from "lucide-react"

interface Hito {
  numero: number
  titulo: string
  entregable: string
  duracion: string
}

interface PlanPersonalizado {
  titulo: string
  descripcion: string
  icon: React.ElementType
  hitos: Hito[]
  sesionFinal: string
  precioTotal: string
}

const planes: Record<string, PlanPersonalizado> = {
  digital: {
    titulo: "Plan Presencia Digital",
    descripcion:
      "Basado en tu diagnostico, tu negocio necesita presencia en redes sociales y un canal de ventas digital. Este es el plan con los entregables que recibiras:",
    icon: Palette,
    hitos: [
      {
        numero: 1,
        titulo: "Identidad visual del negocio",
        entregable: "Logo, paleta de colores y plantillas para redes sociales listas para usar",
        duracion: "Semana 1",
      },
      {
        numero: 2,
        titulo: "Perfiles de redes configurados",
        entregable: "Instagram y Facebook Business con biografia, foto de perfil y portada profesional",
        duracion: "Semana 1-2",
      },
      {
        numero: 3,
        titulo: "Contenido del primer mes",
        entregable: "12 publicaciones disenadas + calendario de contenido para 30 dias",
        duracion: "Semana 2-3",
      },
      {
        numero: 4,
        titulo: "Catalogo digital en WhatsApp",
        entregable: "WhatsApp Business configurado con catalogo de productos y respuestas automaticas",
        duracion: "Semana 3-4",
      },
    ],
    sesionFinal:
      "Sesion de capacitacion (1 hora) para que aprendas a publicar contenido, responder clientes y actualizar tu catalogo por tu cuenta.",
    precioTotal: "S/ 280",
  },
  precios: {
    titulo: "Plan Gestion Basica",
    descripcion:
      "Tu diagnostico revelo que necesitas ordenar costos, fijar precios rentables y controlar tus finanzas. Estos son los entregables:",
    icon: BarChart3,
    hitos: [
      {
        numero: 1,
        titulo: "Inventario de productos y costos",
        entregable: "Documento con lista completa de productos, materiales y costo real de cada uno",
        duracion: "Semana 1",
      },
      {
        numero: 2,
        titulo: "Tabla de precios rentables",
        entregable: "Tabla de precios con margen de ganancia por producto, lista para imprimir",
        duracion: "Semana 2",
      },
      {
        numero: 3,
        titulo: "Plantilla de control financiero",
        entregable: "Hoja de calculo simple para registrar ingresos, gastos y ganancias cada mes",
        duracion: "Semana 2-3",
      },
      {
        numero: 4,
        titulo: "Reporte de situacion financiera",
        entregable: "Documento con analisis de tu situacion actual y recomendaciones para mejorar",
        duracion: "Semana 3-4",
      },
    ],
    sesionFinal:
      "Sesion de capacitacion (1 hora) para que aprendas a usar la plantilla de control financiero y actualizar precios por tu cuenta.",
    precioTotal: "S/ 320",
  },
  web: {
    titulo: "Plan Pagina Web",
    descripcion:
      "Segun tu diagnostico, tu negocio necesita una pagina web con catalogo para que tus clientes te encuentren y hagan pedidos. Entregables:",
    icon: FileText,
    hitos: [
      {
        numero: 1,
        titulo: "Diseno y estructura de la web",
        entregable: "Prototipo visual de la pagina web aprobado por ti antes de construirla",
        duracion: "Semana 1",
      },
      {
        numero: 2,
        titulo: "Pagina web publicada",
        entregable: "Web con pagina de inicio, catalogo de productos, info de contacto y link a WhatsApp",
        duracion: "Semana 2-3",
      },
      {
        numero: 3,
        titulo: "Optimizacion para Google",
        entregable: "Pagina configurada para aparecer en busquedas de Google en tu zona",
        duracion: "Semana 3",
      },
      {
        numero: 4,
        titulo: "Material de difusion",
        entregable: "Tarjeta digital y QR con link a tu web, listo para compartir con clientes",
        duracion: "Semana 4",
      },
    ],
    sesionFinal:
      "Sesion de capacitacion (1 hora) para que aprendas a editar productos, cambiar fotos y actualizar informacion en tu web.",
    precioTotal: "S/ 350",
  },
  whatsapp: {
    titulo: "Plan Ventas por WhatsApp",
    descripcion:
      "Tu negocio tiene potencial para vender mas por WhatsApp. Este plan te da las herramientas y mensajes listos para cerrar mas ventas desde tu celular:",
    icon: MessageCircle,
    hitos: [
      {
        numero: 1,
        titulo: "Guion de ventas personalizado",
        entregable: "Documento con mensajes de presentacion, seguimiento y cierre adaptados a tu negocio",
        duracion: "Semana 1",
      },
      {
        numero: 2,
        titulo: "Catalogo de WhatsApp Business",
        entregable: "Catalogo digital configurado con tus productos, precios y fotos reales",
        duracion: "Semana 1-2",
      },
      {
        numero: 3,
        titulo: "Respuestas automaticas y etiquetas",
        entregable: "WhatsApp Business con mensajes automaticos de bienvenida, ausencia y seguimiento configurados",
        duracion: "Semana 2-3",
      },
      {
        numero: 4,
        titulo: "Lista de difusion y primeras ventas",
        entregable: "Lista de difusion activa + acompanamiento en las primeras 3 conversaciones de venta",
        duracion: "Semana 3-4",
      },
    ],
    sesionFinal:
      "Sesion de capacitacion (1 hora) para que aprendas a gestionar conversaciones, usar etiquetas y hacer seguimiento de clientes por tu cuenta.",
    precioTotal: "S/ 240",
  },
  clientes: {
    titulo: "Plan Fidelizacion de Clientes",
    descripcion:
      "Tus clientes actuales son tu mayor activo. Este plan te ayuda a mantenerlos, conseguir resenas y que te recomienden a otros:",
    icon: Users,
    hitos: [
      {
        numero: 1,
        titulo: "Base de datos de clientes",
        entregable: "Plantilla organizada con nombre, contacto, ultima compra e historial de cada cliente",
        duracion: "Semana 1",
      },
      {
        numero: 2,
        titulo: "Estrategia de seguimiento post-venta",
        entregable: "Protocolo de mensajes para despues de cada venta: agradecimiento, consulta de satisfaccion y recompra",
        duracion: "Semana 2",
      },
      {
        numero: 3,
        titulo: "Gestion de resenas en Google",
        entregable: "Perfil de Google Business configurado y guia para pedir resenas a tus clientes actuales",
        duracion: "Semana 2-3",
      },
      {
        numero: 4,
        titulo: "Programa de referidos",
        entregable: "Diseno de un incentivo sencillo para que tus clientes te recomienden + tarjeta de referido lista para compartir",
        duracion: "Semana 3-4",
      },
    ],
    sesionFinal:
      "Sesion de capacitacion (1 hora) para que aprendas a mantener tu base de clientes activa, pedir resenas y gestionar tu programa de referidos.",
    precioTotal: "S/ 290",
  },
}

export function PlanPropuesta() {
  const { selectedService, navigateTo, setPlanPreparando } = useApp()
  const [accepted, setAccepted] = useState(false)

  const plan = planes[selectedService || "digital"]
  const PlanIcon = plan.icon

  if (accepted) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-dark-teal-50">
            <CheckCircle2 className="h-12 w-12 text-dark-teal-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-dark-teal-900">
            ¡Muy bien!
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-platinum-500">
            Ahora solo falta firmar un contrato sencillo para comenzar.
          </p>
          <Button
            size="lg"
            onClick={() => navigateTo("contrato-digital")}
            className="w-full bg-dark-teal-600 py-7 text-xl font-bold text-primary-foreground hover:bg-dark-teal-700"
          >
            Ver y firmar el contrato
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-dark-teal-900 leading-snug">
          {plan.titulo}
        </h1>
        <p className="text-xl leading-relaxed text-platinum-600">
          {plan.descripcion}
        </p>
      </div>

      {/* Hitos como tarjetas */}
      <p className="mb-4 text-base font-bold uppercase tracking-wide text-dark-teal-600">
        Lo que haremos juntos, paso a paso:
      </p>
      <div className="mb-6 space-y-4">
        {plan.hitos.map((hito) => (
          <div
            key={hito.numero}
            className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border"
          >
            <div className="flex items-start gap-4 p-5">
              {/* Numero del hito */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark-teal-600 text-xl font-bold text-primary-foreground">
                {hito.numero}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-dark-teal-900">
                    {hito.titulo}
                  </h3>
                  <span className="shrink-0 rounded-full bg-dark-teal-50 px-3 py-1 text-sm font-semibold text-dark-teal-700">
                    {hito.duracion}
                  </span>
                </div>
                <div className="mt-3 flex items-start gap-3 rounded-xl bg-pale-oak-50 p-4">
                  <Package className="mt-0.5 h-5 w-5 shrink-0 text-pale-oak-500" />
                  <p className="text-base leading-relaxed text-dark-teal-800">
                    <span className="font-bold">Lo que recibes:</span>{" "}
                    {hito.entregable}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sesion final */}
      <div className="mb-8 rounded-2xl bg-deep-ocean-50 p-5 ring-1 ring-deep-ocean-200">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-deep-ocean-500 text-dark-teal-900">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-dark-teal-900">
              Al final: te enseñamos a manejarlo solo
            </h3>
            <p className="mt-1 text-base leading-relaxed text-dark-teal-700">
              {plan.sesionFinal}
            </p>
          </div>
        </div>
      </div>

      {/* Precio total */}
      <div className="mb-8 flex items-center justify-between rounded-2xl bg-dark-teal-800 px-6 py-6">
        <div>
          <p className="text-base text-dark-teal-200">Inversión total del plan</p>
          <p className="text-4xl font-bold text-primary-foreground">{plan.precioTotal}</p>
        </div>
        <PlanIcon className="h-12 w-12 text-dark-teal-300" />
      </div>

      {/* Botones */}
      <div className="space-y-4">
        <Button
          size="lg"
          onClick={() => setAccepted(true)}
          className="w-full bg-dark-teal-600 py-7 text-xl font-bold text-primary-foreground hover:bg-dark-teal-700"
        >
          Sí, quiero este plan
          <ArrowRight className="ml-2 h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            setPlanPreparando(false)
            navigateTo("agendar-diagnostico")
          }}
          className="w-full border-2 border-dark-teal-200 py-6 text-lg text-dark-teal-700 hover:bg-dark-teal-50"
        >
          <CalendarPlus className="mr-2 h-5 w-5" />
          No me convence, agendar otra reunion
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigateTo("mis-planes")}
          className="w-full border-2 border-border py-6 text-lg text-platinum-500 hover:bg-muted hover:text-dark-teal-700"
        >
          <Home className="mr-2 h-5 w-5" />
          Volver a los planes
        </Button>
      </div>
    </div>
  )
}
