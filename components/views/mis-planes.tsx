"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Home,
  Package,
  Palette,
  BarChart3,
  FileText,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface Hito {
  numero: number
  titulo: string
  entregable: string
  duracion: string
}

interface Plan {
  id: string
  titulo: string
  descripcion: string
  icon: React.ElementType
  precio: string
  hitos: Hito[]
  sesionFinal: string
}

const planes: Plan[] = [
  {
    id: "digital",
    titulo: "Plan Presencia Digital",
    descripcion: "Logo, redes sociales, contenido y catálogo WhatsApp",
    icon: Palette,
    precio: "S/ 280",
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
        entregable: "Instagram y Facebook Business con biografía, foto de perfil y portada profesional",
        duracion: "Semana 1-2",
      },
      {
        numero: 3,
        titulo: "Contenido del primer mes",
        entregable: "12 publicaciones diseñadas + calendario de contenido para 30 días",
        duracion: "Semana 2-3",
      },
      {
        numero: 4,
        titulo: "Catálogo digital en WhatsApp",
        entregable: "WhatsApp Business configurado con catálogo de productos y respuestas automáticas",
        duracion: "Semana 3-4",
      },
    ],
    sesionFinal:
      "Sesión de capacitación (1 hora) para que aprendas a publicar contenido, responder clientes y actualizar tu catálogo por tu cuenta.",
  },
  {
    id: "precios",
    titulo: "Plan Gestión Básica",
    descripcion: "Inventario, precios, control financiero y reporte",
    icon: BarChart3,
    precio: "S/ 320",
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
        entregable: "Hoja de cálculo simple para registrar ingresos, gastos y ganancias cada mes",
        duracion: "Semana 2-3",
      },
      {
        numero: 4,
        titulo: "Reporte de situación financiera",
        entregable: "Documento con análisis de tu situación actual y recomendaciones para mejorar",
        duracion: "Semana 3-4",
      },
    ],
    sesionFinal:
      "Sesión de capacitación (1 hora) para que aprendas a usar la plantilla de control financiero y actualizar precios por tu cuenta.",
  },
  {
    id: "web",
    titulo: "Plan Página Web",
    descripcion: "Diseño web, publicación, SEO y material de difusión",
    icon: FileText,
    precio: "S/ 350",
    hitos: [
      {
        numero: 1,
        titulo: "Diseño y estructura de la web",
        entregable: "Prototipo visual de la página web aprobado por ti antes de construirla",
        duracion: "Semana 1",
      },
      {
        numero: 2,
        titulo: "Página web publicada",
        entregable: "Web con página de inicio, catálogo de productos, info de contacto y link a WhatsApp",
        duracion: "Semana 2-3",
      },
      {
        numero: 3,
        titulo: "Optimización para Google",
        entregable: "Página configurada para aparecer en búsquedas de Google en tu zona",
        duracion: "Semana 3",
      },
      {
        numero: 4,
        titulo: "Material de difusión",
        entregable: "Tarjeta digital y QR con link a tu web, listo para compartir con clientes",
        duracion: "Semana 4",
      },
    ],
    sesionFinal:
      "Sesión de capacitación (1 hora) para que aprendas a editar productos, cambiar fotos y actualizar información en tu web.",
  },
]

function PlanCard({ plan }: { plan: Plan }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = plan.icon

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
      {/* Plan header */}
      <div className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark-teal-50 text-dark-teal-600">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-dark-teal-900">{plan.titulo}</h3>
          <p className="text-sm text-platinum-500">{plan.descripcion}</p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="rounded-full bg-dark-teal-600 px-3 py-1 text-sm font-bold text-white">
            {plan.precio}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-semibold text-dark-teal-600 hover:text-dark-teal-800"
          >
            {expanded ? "Ocultar hitos" : "Ver hitos"}
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Hitos expandibles */}
      {expanded && (
        <div className="border-t border-border px-5 pb-5 pt-4 space-y-3">
          {plan.hitos.map((hito) => (
            <div
              key={hito.numero}
              className="overflow-hidden rounded-xl ring-1 ring-border"
            >
              <div className="flex items-start gap-3 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-teal-600 text-sm font-bold text-white">
                  {hito.numero}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="font-semibold text-dark-teal-900 text-sm">{hito.titulo}</h4>
                    <span className="shrink-0 rounded-full bg-dark-teal-50 px-2.5 py-0.5 text-xs font-medium text-dark-teal-700">
                      {hito.duracion}
                    </span>
                  </div>
                  <div className="mt-2 flex items-start gap-2 rounded-lg bg-pale-oak-50 p-2.5">
                    <Package className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pale-oak-500" />
                    <p className="text-xs leading-relaxed text-dark-teal-800">
                      <span className="font-semibold">Entregable:</span>{" "}
                      {hito.entregable}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Sesión final */}
          <div className="rounded-xl bg-deep-ocean-50 p-4 ring-1 ring-deep-ocean-200">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-deep-ocean-500">
                <GraduationCap className="h-4 w-4 text-dark-teal-900" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-dark-teal-900">Sesión final de capacitación</h4>
                <p className="mt-1 text-xs leading-relaxed text-dark-teal-700">{plan.sesionFinal}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function MisPlanes() {
  const { navigateTo } = useApp()

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-teal-900">Planes disponibles</h1>
        <p className="mt-1 text-platinum-500">
          Estos son los planes que ofrecemos. Cada uno incluye hitos con entregables claros y una sesión final de capacitación.
        </p>
      </div>

      {/* Lista de planes */}
      <div className="mb-10 space-y-4">
        {planes.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={() => navigateTo("dashboard")}
        className="w-full border-border text-dark-teal-700 hover:bg-dark-teal-50"
      >
        <Home className="mr-2 h-4 w-4" />
        Volver al inicio
      </Button>
    </div>
  )
}
