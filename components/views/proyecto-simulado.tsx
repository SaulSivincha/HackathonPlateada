"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Home,
  Palette,
  BarChart3,
  FileText,
  MessageCircle,
  Users,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Download,
  Clock,
} from "lucide-react"

/* ── Datos de planes (mismos que mis-planes) ── */
interface Hito {
  numero: number
  titulo: string
  entregable: string
  duracion: string
}

interface PlanData {
  id: string
  titulo: string
  precio: string
  icon: React.ElementType
  hitos: Hito[]
  sesionFinal: string
}

const planesData: PlanData[] = [
  {
    id: "digital",
    titulo: "Plan Presencia Digital",
    precio: "S/ 280",
    icon: Palette,
    hitos: [
      { numero: 1, titulo: "Identidad visual del negocio", entregable: "Logo, paleta de colores y plantillas para redes sociales listas para usar", duracion: "Semana 1" },
      { numero: 2, titulo: "Perfiles de redes configurados", entregable: "Instagram y Facebook Business con biografía, foto de perfil y portada profesional", duracion: "Semana 1-2" },
      { numero: 3, titulo: "Contenido del primer mes", entregable: "12 publicaciones diseñadas + calendario de contenido para 30 días", duracion: "Semana 2-3" },
      { numero: 4, titulo: "Catálogo digital en WhatsApp", entregable: "WhatsApp Business configurado con catálogo de productos y respuestas automáticas", duracion: "Semana 3-4" },
    ],
    sesionFinal: "Sesión de capacitación (1 hora) para que aprendas a publicar contenido, responder clientes y actualizar tu catálogo por tu cuenta.",
  },
  {
    id: "precios",
    titulo: "Plan Gestión Básica",
    precio: "S/ 320",
    icon: BarChart3,
    hitos: [
      { numero: 1, titulo: "Inventario de productos y costos", entregable: "Documento con lista completa de productos, materiales y costo real de cada uno", duracion: "Semana 1" },
      { numero: 2, titulo: "Tabla de precios rentables", entregable: "Tabla de precios con margen de ganancia por producto, lista para imprimir", duracion: "Semana 2" },
      { numero: 3, titulo: "Plantilla de control financiero", entregable: "Hoja de cálculo simple para registrar ingresos, gastos y ganancias cada mes", duracion: "Semana 2-3" },
      { numero: 4, titulo: "Reporte mensual del negocio", entregable: "Resumen del mes con ventas, gastos y recomendaciones de mejora", duracion: "Semana 3-4" },
    ],
    sesionFinal: "Sesión de capacitación (1 hora) para que aprendas a registrar tus ventas, calcular precios y leer tu reporte mensual.",
  },
  {
    id: "web",
    titulo: "Plan Página Web",
    precio: "S/ 350",
    icon: FileText,
    hitos: [
      { numero: 1, titulo: "Diseño y estructura de la página", entregable: "Boceto visual aprobado con secciones: inicio, productos, contacto y quiénes somos", duracion: "Semana 1" },
      { numero: 2, titulo: "Página publicada en internet", entregable: "Sitio web activo con dominio y hosting incluidos por 1 año", duracion: "Semana 1-2" },
      { numero: 3, titulo: "Catálogo de productos en línea", entregable: "Sección de productos con fotos, descripción y precios actualizable por ti", duracion: "Semana 2-3" },
      { numero: 4, titulo: "Formulario de contacto y WhatsApp", entregable: "Botón de WhatsApp y formulario para que los clientes te escriban directo", duracion: "Semana 3-4" },
    ],
    sesionFinal: "Sesión de capacitación (1 hora) para que aprendas a actualizar tu página, subir productos nuevos y revisar cuántas personas la visitan.",
  },
  {
    id: "whatsapp",
    titulo: "Plan Ventas por WhatsApp",
    precio: "S/ 240",
    icon: MessageCircle,
    hitos: [
      { numero: 1, titulo: "WhatsApp Business profesional", entregable: "Cuenta configurada con nombre, foto, horario, descripción del negocio y respuestas automáticas", duracion: "Semana 1" },
      { numero: 2, titulo: "Catálogo de productos activo", entregable: "Catálogo con fotos, precios y descripción de tus productos más vendidos", duracion: "Semana 1-2" },
      { numero: 3, titulo: "Mensajes de venta listos", entregable: "5 plantillas de mensajes para ofrecer productos, confirmar pedidos y hacer seguimiento", duracion: "Semana 2-3" },
      { numero: 4, titulo: "Estado de WhatsApp programado", entregable: "Plan de 4 semanas con contenido para tus estados: promociones, novedades y testimonios", duracion: "Semana 3-4" },
    ],
    sesionFinal: "Sesión de capacitación (1 hora) para que aprendas a usar el catálogo, enviar mensajes de venta y aprovechar los estados para atraer clientes.",
  },
  {
    id: "clientes",
    titulo: "Plan Fidelización de Clientes",
    precio: "S/ 290",
    icon: Users,
    hitos: [
      { numero: 1, titulo: "Base de datos de clientes", entregable: "Lista organizada de tus clientes actuales con nombre, contacto y frecuencia de compra", duracion: "Semana 1" },
      { numero: 2, titulo: "Plan de seguimiento post-venta", entregable: "Guía con mensajes y acciones para mantener contacto con tus clientes después de cada venta", duracion: "Semana 1-2" },
      { numero: 3, titulo: "Gestión de reseñas en Google", entregable: "Perfil de Google Business configurado y guía para pedir reseñas a tus clientes actuales", duracion: "Semana 2-3" },
      { numero: 4, titulo: "Programa de referidos", entregable: "Diseño de un incentivo sencillo para que tus clientes te recomienden + tarjeta de referido lista para compartir", duracion: "Semana 3-4" },
    ],
    sesionFinal: "Sesión de capacitación (1 hora) para que aprendas a mantener tu base de clientes activa, pedir reseñas y gestionar tu programa de referidos.",
  },
]

/* ── Tarjeta de un plan con sus hitos ── */
function PlanProyectoCard({ plan }: { plan: PlanData }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = plan.icon

  const HITO_COMPLETADO = 1
  const HITO_ACTUAL = 2

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
      {/* Header */}
      <div className="flex items-start gap-4 p-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-dark-teal-50 text-dark-teal-600">
          <Icon className="h-7 w-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-dark-teal-900 leading-snug">{plan.titulo}</h3>
            <span className="shrink-0 rounded-full bg-dark-teal-600 px-4 py-1.5 text-base font-bold text-white">
              {plan.precio}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-dark-teal-50 px-3 py-1 text-sm font-semibold text-dark-teal-600">
              En curso
            </span>
            <span className="text-sm text-platinum-500">
              Hito {HITO_ACTUAL} de {plan.hitos.length + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Barra de progreso general */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-dark-teal-50">
            <div
              className="h-full rounded-full bg-dark-teal-600 transition-all"
              style={{ width: `${Math.round(((HITO_COMPLETADO + 0.6) / (plan.hitos.length + 1)) * 100)}%` }}
            />
          </div>
          <span className="text-sm font-bold text-dark-teal-600">
            {Math.round(((HITO_COMPLETADO + 0.6) / (plan.hitos.length + 1)) * 100)}%
          </span>
        </div>
      </div>

      {/* Botón expandir/colapsar */}
      <div className="px-5 pb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dark-teal-200 bg-white py-4 text-base font-semibold text-dark-teal-700 transition-colors hover:bg-dark-teal-50"
        >
          {expanded ? (
            <><ChevronUp className="h-5 w-5" /> Ocultar hitos</>
          ) : (
            <><ChevronDown className="h-5 w-5" /> Ver detalle de hitos</>
          )}
        </button>
      </div>

      {/* Hitos expandidos */}
      {expanded && (
        <div className="border-t border-border px-5 pt-5 pb-5 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-dark-teal-600">
            Avance paso a paso:
          </p>

          {plan.hitos.map((hito) => {
            const isDone = hito.numero <= HITO_COMPLETADO
            const isCurrent = hito.numero === HITO_ACTUAL

            return (
              <div
                key={hito.numero}
                className={`overflow-hidden rounded-xl ring-1 ${
                  isDone
                    ? "ring-dark-teal-300 bg-dark-teal-50/50"
                    : isCurrent
                      ? "ring-dark-teal-300 bg-dark-teal-50/30"
                      : "ring-border opacity-60"
                }`}
              >
                <div className="flex items-start gap-4 p-4">
                  {/* Número / check */}
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base font-bold text-white ${
                    isDone || isCurrent ? "bg-dark-teal-600" : "bg-platinum-300"
                  }`}>
                    {isDone ? <CheckCircle2 className="h-5 w-5" /> : hito.numero}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className={`font-bold text-base ${
                        isDone ? "text-dark-teal-700" : isCurrent ? "text-dark-teal-900" : "text-platinum-400"
                      }`}>
                        {hito.titulo}
                      </h4>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
                        isDone || isCurrent
                          ? "bg-dark-teal-50 text-dark-teal-700"
                          : "bg-platinum-100 text-platinum-400"
                      }`}>
                        {hito.duracion}
                      </span>
                    </div>

                    {/* Entregable */}
                    <div className={`mt-2 rounded-lg p-3 ${
                      isDone || isCurrent ? "bg-pale-oak-50" : "bg-platinum-50"
                    }`}>
                      <p className={`text-sm leading-relaxed ${
                        isDone || isCurrent ? "text-dark-teal-800" : "text-platinum-400"
                      }`}>
                        <span className="font-semibold">
                          {isDone ? "Entregado:" : "Lo que recibes:"}
                        </span>{" "}
                        {hito.entregable}
                      </p>
                    </div>

                    {/* Progreso del hito actual */}
                    {isCurrent && (
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-dark-teal-100">
                          <div className="h-full w-3/5 rounded-full bg-dark-teal-600" />
                        </div>
                        <span className="text-sm font-bold text-dark-teal-600">60%</span>
                      </div>
                    )}

                    {/* Botón de acción según estado */}
                    <div className="mt-3">
                      {isDone && (
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-dark-teal-600 py-3 text-base font-semibold text-white transition-colors hover:bg-dark-teal-700">
                          <Download className="h-5 w-5" />
                          Ver mi entregable
                        </button>
                      )}
                      {isCurrent && (
                        <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-platinum-100 py-3 text-base font-semibold text-platinum-500">
                          <Clock className="h-5 w-5" />
                          En proceso
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Sesión final */}
          <div className="rounded-xl bg-dark-teal-50 p-4 ring-1 ring-dark-teal-200 opacity-60">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dark-teal-600 text-base font-bold text-white">
                {plan.hitos.length + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-dark-teal-900">Al final: te enseñamos a continuar sola</h4>
                <p className="mt-1 text-sm leading-relaxed text-dark-teal-700">{plan.sesionFinal}</p>
                <span className="mt-2 inline-block rounded-full bg-dark-teal-100 px-3 py-1 text-sm font-medium text-dark-teal-700">
                  Incluida en el plan
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Vista principal ── */
export function ProyectoSimulado() {
  const { planesAdquiridos, navigateTo } = useApp()

  const misPlanes = planesData.filter((p) => planesAdquiridos.includes(p.id))

  if (misPlanes.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center animate-fade-in-up">
        <FolderOpen className="mx-auto mb-4 h-14 w-14 text-platinum-300" />
        <h1 className="text-2xl font-bold text-dark-teal-900">Aún no tienes proyectos</h1>
        <p className="mt-2 text-base text-platinum-500">
          Adquiere un plan para ver el avance de tu proyecto aquí.
        </p>
        <Button
          size="lg"
          onClick={() => navigateTo("mis-planes")}
          className="mt-8 bg-dark-teal-600 py-6 text-base font-bold text-white hover:bg-dark-teal-700"
        >
          Ver planes disponibles
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="animate-fade-in-up mb-8">
        <h1 className="text-2xl font-bold text-dark-teal-900">Tus proyectos</h1>
        <p className="mt-2 text-base text-platinum-500">
          {misPlanes.length === 1
            ? "Aquí puedes seguir el avance de tu plan."
            : `Tienes ${misPlanes.length} planes activos. Aquí puedes seguir el avance de cada uno.`}
        </p>
      </div>

      {/* Planes */}
      <div className="space-y-6 mb-8">
        {misPlanes.map((plan, idx) => (
          <div key={plan.id} className="animate-fade-in-up" style={{ animationDelay: `${100 + idx * 100}ms` }}>
            <PlanProyectoCard plan={plan} />
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={() => navigateTo("dashboard")}
        className="animate-fade-in-up delay-600 w-full border-border py-6 text-base text-dark-teal-700 hover:bg-dark-teal-50"
      >
        <Home className="mr-2 h-5 w-5" />
        Volver al inicio
      </Button>
    </div>
  )
}
