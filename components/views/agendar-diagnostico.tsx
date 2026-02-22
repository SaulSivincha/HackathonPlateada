"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Video,
  Play,
  Sparkles,
  CalendarPlus,
  Palette,
  BarChart3,
  FileText,
  MessageCircle,
  Users,
} from "lucide-react"

const slots = [
  { day: "Lunes 10 Mar", time: "4:00 PM", available: true },
  { day: "Martes 11 Mar", time: "6:00 PM", available: true },
  { day: "Jueves 13 Mar", time: "5:00 PM", available: true },
  { day: "Viernes 14 Mar", time: "10:00 AM", available: false },
  { day: "Sabado 15 Mar", time: "11:00 AM", available: true },
]

function ReunionAgendadaCard({
  fecha,
  hora,
  onEntrar,
  onVolver,
}: {
  fecha: string
  hora: string
  onEntrar: () => void
  onVolver: () => void
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">

        {/* Header */}
        <div className="bg-dark-teal-700 px-6 py-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Reunion agendada</h1>
          <p className="mt-2 text-base text-dark-teal-100">
            Te enviaremos el link de Google Meet un dia antes
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-7">
          <p className="mb-6 text-center text-base leading-relaxed text-platinum-600">
            Un especialista y un supervisor de ACTIVA 50+ revisaran tu negocio contigo y te propondran el mejor plan.
          </p>

          {/* Detalles */}
          <div className="mb-6 space-y-4 rounded-xl bg-dark-teal-50 px-5 py-5">
            <div className="flex items-center gap-3 text-base font-medium text-dark-teal-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dark-teal-600 text-white">
                <Calendar className="h-5 w-5" />
              </div>
              {fecha}
            </div>
            <div className="flex items-center gap-3 text-base font-medium text-dark-teal-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dark-teal-600 text-white">
                <Clock className="h-5 w-5" />
              </div>
              {hora} · 30 minutos
            </div>
            <div className="flex items-center gap-3 text-base font-medium text-dark-teal-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dark-teal-600 text-white">
                <Video className="h-5 w-5" />
              </div>
              Google Meet · Virtual
            </div>
          </div>

          <button
            onClick={onEntrar}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-dark-teal-600 py-4 text-base font-bold text-white transition-colors hover:bg-dark-teal-700"
          >
            <Play className="h-5 w-5" />
            Entrar a la reunion
          </button>
          <button
            onClick={onVolver}
            className="mt-4 w-full text-center text-base font-medium text-platinum-500 hover:text-dark-teal-600"
          >
            Volver al inicio
          </button>
        </div>

      </div>
    </div>
  )
}

/* ── Planes estándar (resumen para la vista de sugerencia) ── */
const planesSugeridos: Record<string, {
  titulo: string
  descripcion: string
  icon: React.ElementType
  puntos: string[]
}> = {
  digital: {
    titulo: "Plan Presencia Digital",
    descripcion: "Basado en tu diagnostico, tu negocio necesita presencia en redes sociales y un canal de ventas digital.",
    icon: Palette,
    puntos: [
      "Logo, paleta de colores y plantillas para redes sociales",
      "Instagram y Facebook Business configurados",
      "12 publicaciones + calendario de contenido para 30 dias",
      "WhatsApp Business con catalogo y respuestas automaticas",
      "Sesion de capacitacion para que continues sola (1 hora)",
    ],
  },
  precios: {
    titulo: "Plan Gestion Basica",
    descripcion: "Tu diagnostico revelo que necesitas ordenar costos, fijar precios rentables y controlar tus finanzas.",
    icon: BarChart3,
    puntos: [
      "Inventario completo de productos con costo real",
      "Tabla de precios con margen de ganancia por producto",
      "Plantilla para registrar ingresos, gastos y ganancias",
      "Reporte con analisis y recomendaciones de mejora",
      "Sesion de capacitacion para que continues sola (1 hora)",
    ],
  },
  web: {
    titulo: "Plan Pagina Web",
    descripcion: "Tu negocio necesita una pagina web con catalogo para que tus clientes te encuentren y hagan pedidos.",
    icon: FileText,
    puntos: [
      "Diseno y estructura de la pagina aprobada por ti",
      "Sitio web publicado con dominio y hosting por 1 ano",
      "Catalogo de productos en linea actualizable",
      "Boton de WhatsApp y formulario de contacto",
      "Sesion de capacitacion para que continues sola (1 hora)",
    ],
  },
  whatsapp: {
    titulo: "Plan Ventas por WhatsApp",
    descripcion: "Tu negocio tiene potencial para vender mas por WhatsApp con las herramientas y mensajes correctos.",
    icon: MessageCircle,
    puntos: [
      "WhatsApp Business profesional configurado completo",
      "Catalogo de productos con fotos y precios",
      "Plantillas de mensajes de venta y seguimiento",
      "Plan de estados para 4 semanas",
      "Sesion de capacitacion para que continues sola (1 hora)",
    ],
  },
  clientes: {
    titulo: "Plan Fidelizacion de Clientes",
    descripcion: "Tus clientes actuales son tu mayor activo. Este plan te ayuda a mantenerlos y que te recomienden.",
    icon: Users,
    puntos: [
      "Base de datos organizada de todos tus clientes",
      "Protocolo de seguimiento post-venta",
      "Perfil de Google Business y guia de resenas",
      "Programa de referidos con tarjeta lista para compartir",
      "Sesion de capacitacion para que continues sola (1 hora)",
    ],
  },
}

export function AgendarDiagnostico() {
  const { navigateTo, setReunionAgendada, reunionAgendada, planPreparando, selectedService, setSelectedService, setPlanPreparando } = useApp()
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const planSugerido = planesSugeridos[selectedService || "digital"]
  const PlanIcon = planSugerido.icon

  /* ── Si ya pasó por la reunión, mostrar plan sugerido ── */
  if (planPreparando) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
          {/* Header */}
          <div className="bg-dark-teal-700 px-6 py-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Te recomendamos este plan
            </h1>
            <p className="mt-2 text-base text-dark-teal-100">
              Basado en lo que conversamos en tu reunion
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-7">
            {/* Plan sugerido */}
            <div className="mb-6 rounded-2xl bg-dark-teal-50 px-5 py-5">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-dark-teal-600 text-white">
                  <PlanIcon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-dark-teal-900">{planSugerido.titulo}</h2>
                  <span className="text-base font-medium text-dark-teal-600">Recomendado para ti</span>
                </div>
              </div>
              <p className="mb-4 text-base leading-relaxed text-dark-teal-800">
                {planSugerido.descripcion}
              </p>
              <div className="space-y-3">
                {planSugerido.puntos.map((punto: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-dark-teal-600" />
                    <p className="text-base font-medium text-dark-teal-800">{punto}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones */}
            <button
              onClick={() => navigateTo("plan-propuesta")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-dark-teal-600 py-4 text-base font-bold text-white transition-colors hover:bg-dark-teal-700"
            >
              Ver detalle completo del plan
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => {
                setPlanPreparando(false)
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dark-teal-200 bg-white py-4 text-base font-semibold text-dark-teal-700 transition-colors hover:bg-dark-teal-50"
            >
              <CalendarPlus className="h-5 w-5" />
              No me convence, agendar otra reunion
            </button>

            <button
              onClick={() => {
                setPlanPreparando(false)
                navigateTo("mis-planes")
              }}
              className="mt-4 w-full text-center text-base font-medium text-platinum-500 hover:text-dark-teal-600"
            >
              Prefiero elegir otro plan yo misma
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleConfirm = () => {
    if (selectedSlot === null) return
    const slot = slots[selectedSlot]
    setReunionAgendada({
      tipo: "diagnostico",
      titulo: "Reunion de diagnostico personalizado",
      fecha: slot.day,
      hora: slot.time,
    })
    setConfirmed(true)
  }

  // Si ya tiene reunion agendada (desde contexto global) o acaba de confirmar, mostrar la tarjeta
  if (reunionAgendada || confirmed) {
    const fecha = reunionAgendada?.fecha ?? (selectedSlot !== null ? slots[selectedSlot].day : "")
    const hora = reunionAgendada?.hora ?? (selectedSlot !== null ? slots[selectedSlot].time : "")
    return (
      <ReunionAgendadaCard
        fecha={fecha}
        hora={hora}
        onEntrar={() => navigateTo("diagnostico-room")}
        onVolver={() => navigateTo("dashboard")}
      />
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <div className="mb-8">
        <span className="mb-3 inline-block rounded-full bg-dark-teal-50 px-4 py-1.5 text-base font-semibold text-dark-teal-700">
          Reunion gratuita
        </span>
        <h1 className="text-2xl font-bold text-dark-teal-900">
          Agenda tu reunion personalizada
        </h1>
        <p className="mt-2 text-base text-platinum-500">
          30 minutos por Google Meet. Un especialista y un supervisor escucharan
          tu negocio y te propondran un plan a medida.
        </p>
      </div>

      <div className="space-y-3">
        {slots.map((slot, i) => (
          <button
            key={i}
            disabled={!slot.available}
            onClick={() => setSelectedSlot(i)}
            className={`flex w-full items-center gap-4 rounded-xl p-5 text-left transition-all ring-1 ${
              !slot.available
                ? "cursor-not-allowed bg-muted text-platinum-300 ring-border"
                : selectedSlot === i
                  ? "bg-dark-teal-50 ring-2 ring-dark-teal-500 shadow-sm"
                  : "bg-card ring-border hover:ring-dark-teal-200 hover:shadow-sm"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                selectedSlot === i
                  ? "bg-dark-teal-600 text-white"
                  : slot.available
                    ? "bg-dark-teal-50 text-dark-teal-600"
                    : "bg-muted text-platinum-300"
              }`}
            >
              <Calendar className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p
                className={`text-base font-bold ${selectedSlot === i ? "text-dark-teal-800" : slot.available ? "text-dark-teal-900" : "text-platinum-300"}`}
              >
                {slot.day}
              </p>
              <p
                className={`text-base ${selectedSlot === i ? "text-dark-teal-600" : slot.available ? "text-platinum-500" : "text-platinum-300"}`}
              >
                {slot.time} - 30 minutos
              </p>
            </div>
            {!slot.available && (
              <span className="rounded-full bg-muted px-3 py-1 text-base text-platinum-500">
                Ocupado
              </span>
            )}
            {selectedSlot === i && (
              <CheckCircle className="h-6 w-6 text-dark-teal-600" />
            )}
          </button>
        ))}
      </div>

      <button
        disabled={selectedSlot === null}
        onClick={handleConfirm}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-dark-teal-600 py-4 text-base font-bold text-white transition-colors hover:bg-dark-teal-700 disabled:opacity-40"
      >
        Confirmar reunion
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  )
}
