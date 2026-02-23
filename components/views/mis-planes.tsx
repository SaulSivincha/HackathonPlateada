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
  MessageCircle,
  Users,
  CheckCircle2,
  FolderOpen,
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
  opciones?: { cantidad: number; precio: string }[]
}

const planes: Plan[] = [
  {
    id: "identidad-visual",
    titulo: "Identidad Visual",
    descripcion: "Logo, paleta de colores y tipografía para tu negocio",
    icon: Palette,
    precio: "S/ 49",
    hitos: [
      {
        numero: 1,
        titulo: "Tu logo y paleta de colores",
        entregable: "Logo profesional, paleta de colores y tipografía definida para tu marca",
        duracion: "3-5 días",
      },
    ],
    sesionFinal:
      "Sesión de 20 minutos para explicarte cómo usar tu logo y paleta en cualquier material.",
  },
  {
    id: "flyers",
    titulo: "Pack de Flyers",
    descripcion: "Flyers profesionales diseñados + plantillas editables en Canva",
    icon: FileText,
    precio: "Desde S/ 25",
    opciones: [
      { cantidad: 3, precio: "S/ 25" },
      { cantidad: 6, precio: "S/ 45" },
      { cantidad: 12, precio: "S/ 75" },
    ],
    hitos: [
      {
        numero: 1,
        titulo: "Flyers diseñados + plantillas",
        entregable: "Flyers profesionales listos para imprimir y compartir por WhatsApp o redes, más plantillas editables en Canva para que crees los tuyos",
        duracion: "3-5 días",
      },
    ],
    sesionFinal:
      "Sesión de 20 minutos para enseñarte a editar las plantillas en Canva y crear tus propios flyers.",
  },
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
  {
    id: "whatsapp",
    titulo: "Plan Ventas por WhatsApp",
    descripcion: "Mensajes de venta, catálogo, seguimiento y automatización básica",
    icon: MessageCircle,
    precio: "S/ 240",
    hitos: [
      {
        numero: 1,
        titulo: "Guión de ventas personalizado",
        entregable: "Documento con mensajes de presentación, seguimiento y cierre adaptados a tu negocio",
        duracion: "Semana 1",
      },
      {
        numero: 2,
        titulo: "Catálogo de WhatsApp Business",
        entregable: "Catálogo digital configurado con tus productos, precios y fotos reales",
        duracion: "Semana 1-2",
      },
      {
        numero: 3,
        titulo: "Respuestas automáticas y etiquetas",
        entregable: "WhatsApp Business con mensajes automáticos de bienvenida, ausencia y seguimiento configurados",
        duracion: "Semana 2-3",
      },
      {
        numero: 4,
        titulo: "Lista de difusión y primeras ventas",
        entregable: "Lista de difusión activa + acompañamiento en las primeras 3 conversaciones de venta",
        duracion: "Semana 3-4",
      },
    ],
    sesionFinal:
      "Sesión de capacitación (1 hora) para que aprendas a gestionar conversaciones, usar etiquetas y hacer seguimiento de clientes por tu cuenta.",
  },
  {
    id: "clientes",
    titulo: "Plan Fidelización de Clientes",
    descripcion: "Base de clientes, seguimiento, reseñas y programa de referidos",
    icon: Users,
    precio: "S/ 290",
    hitos: [
      {
        numero: 1,
        titulo: "Base de datos de clientes",
        entregable: "Plantilla organizada con nombre, contacto, última compra e historial de cada cliente",
        duracion: "Semana 1",
      },
      {
        numero: 2,
        titulo: "Estrategia de seguimiento post-venta",
        entregable: "Protocolo de mensajes para después de cada venta: agradecimiento, consulta de satisfacción y recompra",
        duracion: "Semana 2",
      },
      {
        numero: 3,
        titulo: "Gestión de reseñas en Google",
        entregable: "Perfil de Google Business configurado y guía para pedir reseñas a tus clientes actuales",
        duracion: "Semana 2-3",
      },
      {
        numero: 4,
        titulo: "Programa de referidos",
        entregable: "Diseño de un incentivo sencillo para que tus clientes te recomienden + tarjeta de referido lista para compartir",
        duracion: "Semana 3-4",
      },
    ],
    sesionFinal:
      "Sesión de capacitación (1 hora) para que aprendas a mantener tu base de clientes activa, pedir reseñas y gestionar tu programa de referidos.",
  },
]

function PlanCard({ plan, onAdquirir, isAdquirido, onVerAvance }: { plan: Plan; onAdquirir: (id: string) => void; isAdquirido: boolean; onVerAvance: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [selectedOption, setSelectedOption] = useState(0)
  const Icon = plan.icon
  const precioMostrado = plan.opciones ? plan.opciones[selectedOption].precio : plan.precio

  return (
    <div className={`overflow-hidden rounded-2xl shadow-sm ring-1 transition-all ${
      isAdquirido
        ? "bg-success-50/60 ring-success-300 opacity-70"
        : "bg-card ring-border"
    }`}>
      {/* Badge plan adquirido */}
      {isAdquirido && (
        <div className="flex items-center gap-2 bg-success-100 px-5 py-2.5">
          <CheckCircle2 className="h-5 w-5 text-success-600" />
          <span className="text-sm font-bold text-success-700">Ya tienes este plan contratado</span>
        </div>
      )}

      {/* Plan header */}
      <div className="flex items-start gap-4 p-5">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
          isAdquirido ? "bg-success-100 text-success-600" : "bg-dark-teal-50 text-dark-teal-600"
        }`}>
          <Icon className="h-7 w-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-dark-teal-900 leading-snug">{plan.titulo}</h3>
            <span className={`shrink-0 rounded-full px-4 py-1.5 text-base font-bold text-white ${
              isAdquirido ? "bg-success-500" : "bg-dark-teal-600"
            }`}>
              {precioMostrado}
            </span>
          </div>
          <p className="mt-1 text-base text-platinum-500">{plan.descripcion}</p>
        </div>
      </div>


      {/* Selector de cantidad — solo si tiene opciones */}
      {plan.opciones && !isAdquirido && (
        <div className="px-5 pb-4">
          <p className="mb-2 text-sm font-semibold text-dark-teal-700">¿Cuántos flyers necesitas?</p>
          <div className="flex gap-2">
            {plan.opciones.map((op, i) => (
              <button
                key={op.cantidad}
                onClick={() => setSelectedOption(i)}
                className={`flex-1 rounded-xl py-3 text-center text-base font-bold transition-all ring-1 ${
                  selectedOption === i
                    ? "bg-dark-teal-600 text-white ring-dark-teal-600 shadow-sm"
                    : "bg-white text-dark-teal-700 ring-dark-teal-200 hover:bg-dark-teal-50"
                }`}
              >
                <span className="block text-lg">{op.cantidad}</span>
                <span className={`block text-sm font-medium ${selectedOption === i ? "text-dark-teal-100" : "text-platinum-500"}`}>
                  {op.precio}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Botones de acción */}
      <div className="flex gap-3 px-5 pb-5">
        {/* Ver qué incluye — botón secundario */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-dark-teal-200 bg-white py-4 text-base font-semibold text-dark-teal-700 transition-colors hover:bg-dark-teal-50"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-5 w-5" />
              Ocultar detalle
            </>
          ) : (
            <>
              <ChevronDown className="h-5 w-5" />
              Ver qué incluye
            </>
          )}
        </button>

        {/* Adquirir / Ver avance — botón principal */}
        <button
          onClick={() => isAdquirido ? onVerAvance() : onAdquirir(plan.id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white transition-colors ${
            isAdquirido
              ? "bg-success-500 hover:bg-success-600"
              : "bg-dark-teal-600 hover:bg-dark-teal-700"
          }`}
        >
          {isAdquirido ? (
            <>
              <FolderOpen className="h-5 w-5" />
              Ver mi avance
            </>
          ) : (
            <>
              Quiero este plan
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>

      {/* Hitos expandibles */}
      {expanded && (
        <div className="border-t border-border px-5 pt-5 pb-5 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-dark-teal-600">
            Lo que recibirás paso a paso:
          </p>
          {plan.hitos.map((hito) => (
            <div
              key={hito.numero}
              className="overflow-hidden rounded-xl ring-1 ring-border"
            >
              <div className="flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dark-teal-600 text-base font-bold text-white">
                  {hito.numero}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="font-bold text-dark-teal-900 text-base">{hito.titulo}</h4>
                    <span className="shrink-0 rounded-full bg-dark-teal-50 px-3 py-1 text-sm font-medium text-dark-teal-700">
                      {hito.duracion}
                    </span>
                  </div>
                  <div className="mt-2 flex items-start gap-2 rounded-lg bg-pale-oak-50 p-3">
                    <Package className="mt-0.5 h-4 w-4 shrink-0 text-pale-oak-500" />
                    <p className="text-sm leading-relaxed text-dark-teal-800">
                      <span className="font-semibold">Lo que recibes:</span>{" "}
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
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-deep-ocean-500">
                <GraduationCap className="h-5 w-5 text-dark-teal-900" />
              </div>
              <div>
                <h4 className="text-base font-bold text-dark-teal-900">Al final: te enseñamos a continuar solo</h4>
                <p className="mt-1 text-sm leading-relaxed text-dark-teal-700">{plan.sesionFinal}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function MisPlanes() {
  const { navigateTo, setSelectedService, planesAdquiridos } = useApp()

  const handleAdquirir = (planId: string) => {
    setSelectedService(planId)
    navigateTo("plan-propuesta")
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="animate-fade-in-up mb-8">
        <h1 className="text-2xl font-bold text-dark-teal-900">Nuestros planes</h1>
        <p className="mt-2 text-base text-platinum-500">
          Elige el plan que más se adapte a tu negocio. Puedes ver el detalle de cada uno antes de decidir.
        </p>
      </div>

      {/* Lista de planes — los adquiridos van al final */}
      <div className="mb-10 space-y-5">
        {[...planes]
          .sort((a, b) => {
            const aAdq = planesAdquiridos.includes(a.id) ? 1 : 0
            const bAdq = planesAdquiridos.includes(b.id) ? 1 : 0
            return aAdq - bAdq
          })
          .map((plan, idx) => (
          <div key={plan.id} className="animate-fade-in-up" style={{ animationDelay: `${100 + idx * 100}ms` }}>
          <PlanCard
            plan={plan}
            onAdquirir={handleAdquirir}
            isAdquirido={planesAdquiridos.includes(plan.id)}
            onVerAvance={() => navigateTo("proyecto-simulado")}
          />
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={() => navigateTo("dashboard")}
        className="animate-fade-in-up delay-700 w-full border-border py-6 text-base text-dark-teal-700 hover:bg-dark-teal-50"
      >
        <Home className="mr-2 h-5 w-5" />
        Volver al inicio
      </Button>
    </div>
  )
}
