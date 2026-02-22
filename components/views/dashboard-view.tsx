"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import type { TallerInfo } from "@/lib/app-context"
import {
  ArrowRight,
  CalendarDays,
  Clock,
  BookOpen,
  FileText,
  CheckCircle2,
  Video,
  MapPin,
  Palette,
  Star,
  BarChart3,
  Circle,
  Package,
  CalendarCheck,
  Lightbulb,
  X,
  Mic2,
  AlertTriangle,
  HeartHandshake,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { talleres } from "@/lib/talleres-data"

const iconMap: Record<string, React.ElementType> = {
  "map-pin": MapPin,
  mic: Mic2,
  "alert-triangle": AlertTriangle,
  "heart-handshake": HeartHandshake,
  brain: Brain,
  clock: Clock,
  "book-open": BookOpen,
}

/* ---- Plan data (same shape as plan-propuesta) ---- */
interface HitoPlan {
  numero: number
  titulo: string
  entregable: string
  duracion: string
}

interface PlanInfo {
  titulo: string
  icon: React.ElementType
  desc: string
  hitos: HitoPlan[]
  precioTotal: string
  preciosPorHito: string[]
}

const planesInfo: Record<string, PlanInfo> = {
  digital: {
    titulo: "Presencia Digital",
    icon: Palette,
    desc: "Logo, redes sociales, contenido y catalogo WhatsApp",
    precioTotal: "S/ 280",
    preciosPorHito: ["S/ 70", "S/ 50", "S/ 100", "S/ 60"],
    hitos: [
      { numero: 1, titulo: "Identidad visual", entregable: "Logo, colores y plantillas para redes", duracion: "Semana 1" },
      { numero: 2, titulo: "Redes configuradas", entregable: "Instagram y Facebook Business listos", duracion: "Semana 1-2" },
      { numero: 3, titulo: "Contenido primer mes", entregable: "12 publicaciones + calendario de 30 dias", duracion: "Semana 2-3" },
      { numero: 4, titulo: "Catalogo WhatsApp", entregable: "WhatsApp Business con catalogo y respuestas", duracion: "Semana 3-4" },
    ],
  },
  precios: {
    titulo: "Gestion Basica",
    icon: BarChart3,
    desc: "Costos, precios rentables y control financiero",
    precioTotal: "S/ 320",
    preciosPorHito: ["S/ 80", "S/ 70", "S/ 90", "S/ 80"],
    hitos: [
      { numero: 1, titulo: "Inventario y costos", entregable: "Lista completa con costo real de cada producto", duracion: "Semana 1" },
      { numero: 2, titulo: "Precios rentables", entregable: "Tabla de precios con margen de ganancia", duracion: "Semana 2" },
      { numero: 3, titulo: "Control financiero", entregable: "Hoja de calculo para ingresos y gastos", duracion: "Semana 2-3" },
      { numero: 4, titulo: "Reporte financiero", entregable: "Analisis y recomendaciones para tu negocio", duracion: "Semana 3-4" },
    ],
  },
  web: {
    titulo: "Pagina Web",
    icon: FileText,
    desc: "Tu pagina web con catalogo y presencia en Google",
    precioTotal: "S/ 350",
    preciosPorHito: ["S/ 70", "S/ 150", "S/ 70", "S/ 60"],
    hitos: [
      { numero: 1, titulo: "Diseno de la web", entregable: "Prototipo visual aprobado por ti", duracion: "Semana 1" },
      { numero: 2, titulo: "Web publicada", entregable: "Web con catalogo, contacto y WhatsApp", duracion: "Semana 2-3" },
      { numero: 3, titulo: "Google optimizado", entregable: "Aparecer en busquedas locales de Google", duracion: "Semana 3" },
      { numero: 4, titulo: "Material de difusion", entregable: "Tarjeta digital y QR con link a tu web", duracion: "Semana 4" },
    ],
  },
}

/* Simulated progress -- hito 1 done, hito 2 in progress */
const HITO_COMPLETADO = 1
const HITO_ACTUAL = 2

function ModalAprender({ taller, onClose }: { taller: TallerInfo; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-platinum-400 hover:bg-muted hover:text-platinum-700"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold leading-tight text-teal-900">Qué aprenderás</h2>
        </div>
        <p className="mb-1 text-sm font-semibold text-teal-800">{taller.title}</p>
        <p className="mb-4 text-sm text-platinum-500">{taller.description}</p>
        {taller.prereqs && (
          <div className="mb-4 rounded-xl bg-pale-oak-50 px-4 py-3">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-pale-oak-600">Antes del taller</p>
            <p className="text-sm text-platinum-700">{taller.prereqs}</p>
          </div>
        )}
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-teal-700">Lo que te llevas</p>
        <ul className="space-y-2">
          {taller.deliverables.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
              <span className="text-sm text-platinum-800">{d}</span>
            </li>
          ))}
        </ul>
        <Button onClick={onClose} className="mt-6 w-full bg-teal-600 text-primary-foreground hover:bg-teal-700">
          Entendido
        </Button>
      </div>
    </div>
  )
}

export function DashboardView() {
  const [tallerModal, setTallerModal] = useState<TallerInfo | null>(null)
  const {
    userName,
    navigateTo,
    setSelectedTaller,
    reunionAgendada,
    contratoFirmado,
    planAsignado,
    talleresAgendados,
    agendarTaller,
  } = useApp()

  const firstName = userName.split(" ")[0]
  const plan = planAsignado ? planesInfo[planAsignado] : null
  const PlanIcon = plan?.icon || Star

  return (
    <>
      {tallerModal && (
        <ModalAprender taller={tallerModal} onClose={() => setTallerModal(null)} />
      )}
      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      {/* ===== Greeting ===== */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-teal-900 sm:text-3xl">
          Hola, {firstName}
        </h1>
        <p className="mt-1 text-base text-platinum-500">
          Este es tu espacio. Desde aqui puedes ver todo lo que ACTIVA esta haciendo por tu negocio.
        </p>
      </div>

      {/* ===================================================================
          1) PLAN ASIGNADO -- post diagnostico, pre contrato
          Shows the plan overview and CTA to see full plan / sign contract
      =================================================================== */}
      {planAsignado && !contratoFirmado && (
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-dark-teal-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-dark-teal-600">
              Tu plan personalizado
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-2 ring-pale-oak-300">
            <div className="flex items-center gap-2 bg-pale-oak-100 px-5 py-3">
              <Star className="h-4 w-4 text-pale-oak-500" />
              <span className="text-sm font-bold text-dark-teal-800">
                Tu plan personalizado esta listo
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-dark-teal-50 text-dark-teal-600">
                  <PlanIcon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark-teal-900">
                    {plan?.titulo}
                  </h3>
                  <p className="mt-1 text-base text-platinum-500">{plan?.desc}</p>
                  <p className="mt-1 text-sm text-pale-oak-500">
                    {plan?.hitos.length} entregables -- Inversion total: <span className="font-bold text-dark-teal-700">{plan?.precioTotal}</span>
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Button
                  onClick={() => navigateTo("plan-propuesta")}
                  className="flex-1 bg-dark-teal-600 py-5 text-base font-semibold text-primary-foreground hover:bg-dark-teal-700"
                >
                  Ver plan completo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigateTo("contrato-digital")}
                  className="flex-1 border-dark-teal-200 py-5 text-base text-dark-teal-700 hover:bg-dark-teal-50"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Firmar contrato
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================
          2) PROYECTO ACTIVO -- post contrato -- hitos inline con progreso
          Super sencillo: pasos numerados, check/circle, que se entrega
      =================================================================== */}
      {contratoFirmado && plan && (
        <section className="mb-8">
          <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
            {/* Plan header */}
            <div className="flex items-center justify-between bg-dark-teal-800 px-5 py-4">
              <div className="flex items-center gap-3">
                <PlanIcon className="h-5 w-5 text-dark-teal-200" />
                <span className="text-base font-bold text-primary-foreground">
                  {plan.titulo}
                </span>
              </div>
              <span className="rounded-full bg-dark-teal-600 px-3 py-1 text-xs font-bold text-primary-foreground">
                En curso
              </span>
            </div>

            {/* Hitos - simple vertical list */}
            <div className="divide-y divide-border">
              {plan.hitos.map((hito, idx) => {
                const isDone = hito.numero <= HITO_COMPLETADO
                const isCurrent = hito.numero === HITO_ACTUAL
                const isPending = hito.numero > HITO_ACTUAL

                return (
                  <div
                    key={hito.numero}
                    className={`flex items-start gap-4 px-5 py-4 ${isCurrent ? "bg-dark-teal-50/50" : ""}`}
                  >
                    {/* Status icon */}
                    <div className="flex flex-col items-center pt-0.5">
                      {isDone ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-teal-600">
                          <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                        </div>
                      ) : isCurrent ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-teal-500 ring-4 ring-dark-teal-100">
                          <span className="text-sm font-bold text-primary-foreground">{hito.numero}</span>
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-platinum-100">
                          <span className="text-sm font-bold text-platinum-400">{hito.numero}</span>
                        </div>
                      )}
                      {idx < plan.hitos.length - 1 && (
                        <div className={`mt-1 h-full w-0.5 flex-1 ${isDone ? "bg-dark-teal-400" : "bg-platinum-100"}`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className={`text-base font-bold ${isDone ? "text-dark-teal-600" : isCurrent ? "text-dark-teal-900" : "text-platinum-400"}`}>
                            {hito.titulo}
                          </h4>
                          <p className={`mt-0.5 text-sm ${isDone || isCurrent ? "text-platinum-500" : "text-platinum-300"}`}>
                            {hito.entregable}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className={`text-sm font-bold ${isDone ? "text-dark-teal-600" : isCurrent ? "text-dark-teal-700" : "text-platinum-300"}`}>
                            {plan.preciosPorHito[idx]}
                          </span>
                          {isDone && (
                            <p className="text-xs text-dark-teal-500">Pagado</p>
                          )}
                        </div>
                      </div>
                      {isCurrent && (
                        <div className="mt-3 flex items-center gap-3">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-dark-teal-100">
                            <div className="h-full w-3/5 rounded-full bg-dark-teal-500" />
                          </div>
                          <span className="text-xs font-bold text-dark-teal-600">60%</span>
                        </div>
                      )}
                      {isDone && (
                        <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-dark-teal-600">
                          <CheckCircle2 className="h-3 w-3" /> Entregado y aprobado
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Sesion final */}
              <div className="flex items-start gap-4 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-platinum-100">
                  <Circle className="h-4 w-4 text-platinum-300" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-platinum-400">Sesion de capacitacion</h4>
                  <p className="mt-0.5 text-sm text-platinum-300">Para que puedas continuar solo/a</p>
                  <span className="text-sm font-bold text-platinum-300">Incluida</span>
                </div>
              </div>
            </div>

            {/* Quick actions row */}
            <div className="flex gap-2 border-t border-border bg-muted/50 px-5 py-3">
              <button
                onClick={() => navigateTo("contrato-digital")}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-dark-teal-700 ring-1 ring-border hover:bg-card"
              >
                <FileText className="h-3.5 w-3.5" />
                Ver contrato
              </button>
              <button
                onClick={() => navigateTo("proyecto-simulado")}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-dark-teal-700 ring-1 ring-border hover:bg-card"
              >
                <Package className="h-3.5 w-3.5" />
                Ver entregables
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================
          3) REUNION AGENDADA
      =================================================================== */}
      {reunionAgendada && (
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Video className="h-4 w-4 text-dark-teal-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-dark-teal-600">
              Reunion personalizada agendada
            </h2>
          </div>
          <div className="rounded-2xl bg-card p-5 shadow-sm ring-2 ring-dark-teal-200">
            <h3 className="mb-2 text-lg font-bold text-dark-teal-900">{reunionAgendada.titulo}</h3>
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-platinum-600">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-dark-teal-500" />
                {reunionAgendada.fecha}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-dark-teal-500" />
                {reunionAgendada.hora}
              </span>
              <span className="rounded-full bg-dark-teal-50 px-2.5 py-0.5 text-xs font-semibold text-dark-teal-700">
                Virtual
              </span>
            </div>
            <Button
              onClick={() => navigateTo("diagnostico-room")}
              className="bg-dark-teal-600 py-5 text-base font-semibold text-primary-foreground hover:bg-dark-teal-700"
            >
              Entrar a la reunion
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      )}

      {/* ===================================================================
          4) TALLERES AGENDADOS -- por comenzar
      =================================================================== */}
      {talleresAgendados.length > 0 && (
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-teal-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-teal-700">
              Talleres gratuitos por comenzar
            </h2>
          </div>
          <div className="space-y-3">
            {talleres
              .filter((t) => talleresAgendados.includes(t.id))
              .map((taller) => {
                const Icon = iconMap[taller.icon] || BookOpen
                return (
                  <div
                    key={taller.id}
                    className="flex items-center gap-4 rounded-xl bg-teal-50 px-4 py-3 ring-1 ring-teal-200"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-bold text-teal-900">
                        {taller.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-teal-700">
                        <span className="flex items-center gap-1">
                          <Video className="h-3 w-3" /> Virtual · 60 min
                        </span>
                        <span className="rounded-full bg-teal-100 px-2 py-0.5 font-semibold text-teal-700">
                          Gratis
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTaller(taller)
                        navigateTo("taller-room")
                      }}
                      className="shrink-0 flex items-center gap-1 rounded-lg bg-teal-600 px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-teal-700 transition-colors"
                    >
                      Entrar
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                )
              })}
          </div>
        </section>
      )}

      {/* ===================================================================
          5) TALLERES GRATUITOS
      =================================================================== */}
      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-dark-teal-600">
            Talleres gratuitos
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {talleres.map((taller) => {
            const Icon = iconMap[taller.icon] || BookOpen
            const yaAgendado = talleresAgendados.includes(taller.id)
            return (
              <div
                key={taller.id}
                className="flex flex-col gap-3 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dark-teal-50 text-dark-teal-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold leading-tight text-dark-teal-900">
                      {taller.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-3 text-xs text-platinum-500">
                      <span className="flex items-center gap-1">
                        <Video className="h-3 w-3" /> Virtual
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 60 min
                      </span>
                      <span className="font-semibold text-dark-teal-600">Gratis</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {yaAgendado ? (
                    <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
                      <CalendarCheck className="h-3.5 w-3.5" />
                      Agendado
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedTaller(taller)
                        navigateTo("taller-confirmacion")
                      }}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-dark-teal-600 px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-dark-teal-700 transition-colors"
                    >
                      Me interesa
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ===================================================================
          5) COMO FUNCIONA -- only if no plan / no reunion / no contrato
      =================================================================== */}
      {!contratoFirmado && !reunionAgendada && !planAsignado && (
        <section className="rounded-2xl bg-pale-oak-100 p-6">
          <h2 className="mb-2 text-lg font-bold text-dark-teal-900">
            Como funciona ACTIVA 50+?
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-platinum-600">
            Conectamos emprendedores +50 con practicantes universitarios que
            ejecutan contigo las tareas digitales que tu negocio necesita.
          </p>
          <div className="space-y-2">
            {[
              "Asiste a un taller virtual gratuito de 60 minutos",
              "Si te interesa, agenda una reunion personalizada gratis",
              "Recibe un plan con entregables concretos y paga solo por lo que recibes",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dark-teal-600 text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="text-sm text-dark-teal-800">{step}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
    </>
  )
}
