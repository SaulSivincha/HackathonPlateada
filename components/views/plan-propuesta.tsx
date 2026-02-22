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
}

export function PlanPropuesta() {
  const { selectedService, navigateTo } = useApp()
  const [accepted, setAccepted] = useState(false)

  const plan = planes[selectedService || "digital"]
  const PlanIcon = plan.icon

  if (accepted) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-dark-teal-50">
            <CheckCircle2 className="h-10 w-10 text-dark-teal-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-dark-teal-900">
            Excelente decision
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-platinum-500">
            Antes de iniciar el proyecto, necesitamos formalizar el acuerdo con
            un contrato digital sencillo.
          </p>
          <Button
            size="lg"
            onClick={() => navigateTo("contrato-digital")}
            className="w-full bg-dark-teal-600 py-6 text-lg font-semibold text-primary-foreground hover:bg-dark-teal-700"
          >
            Revisar y firmar contrato
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-dark-teal-50 px-3 py-1.5">
          <Star className="h-4 w-4 text-dark-teal-600" />
          <span className="text-sm font-semibold text-dark-teal-700">
            Plan personalizado para tu negocio
          </span>
        </div>
        <h1 className="mb-3 text-balance text-2xl font-bold text-dark-teal-900 sm:text-3xl">
          {plan.titulo}
        </h1>
        <p className="text-lg leading-relaxed text-platinum-600">
          {plan.descripcion}
        </p>
      </div>

      {/* Hitos como tarjetas */}
      <div className="mb-6 space-y-4">
        {plan.hitos.map((hito) => (
          <div
            key={hito.numero}
            className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border"
          >
            <div className="flex items-start gap-4 p-5">
              {/* Numero del hito */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-dark-teal-600 text-lg font-bold text-primary-foreground">
                {hito.numero}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-dark-teal-900">
                    {hito.titulo}
                  </h3>
                  <span className="shrink-0 rounded-full bg-dark-teal-50 px-2.5 py-1 text-xs font-medium text-dark-teal-700">
                    {hito.duracion}
                  </span>
                </div>
                <div className="mt-2 flex items-start gap-2 rounded-xl bg-pale-oak-50 p-3">
                  <Package className="mt-0.5 h-4 w-4 shrink-0 text-pale-oak-500" />
                  <p className="text-sm leading-relaxed text-dark-teal-800">
                    <span className="font-semibold">Entregable:</span>{" "}
                    {hito.entregable}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sesion final de capacitacion */}
      <div className="mb-8 rounded-2xl bg-deep-ocean-50 p-5 ring-1 ring-deep-ocean-200">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-deep-ocean-500 text-dark-teal-900">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-dark-teal-900">
              Sesion final: Aprende a continuar solo/a
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-dark-teal-700">
              {plan.sesionFinal}
            </p>
          </div>
        </div>
      </div>

      {/* Precio total */}
      <div className="mb-6 flex items-center justify-between rounded-2xl bg-dark-teal-800 px-6 py-5">
        <div>
          <p className="text-sm text-dark-teal-200">Inversion total del plan</p>
          <p className="text-3xl font-bold text-primary-foreground">{plan.precioTotal}</p>
        </div>
        <PlanIcon className="h-10 w-10 text-dark-teal-300" />
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          size="lg"
          onClick={() => setAccepted(true)}
          className="w-full bg-dark-teal-600 py-6 text-lg font-semibold text-primary-foreground hover:bg-dark-teal-700"
        >
          Acepto este plan
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigateTo("dashboard")}
          className="w-full border-border py-5 text-base text-platinum-500 hover:bg-muted hover:text-dark-teal-700"
        >
          <Home className="mr-2 h-5 w-5" />
          No por ahora, volver al inicio
        </Button>
      </div>
    </div>
  )
}
