"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CheckCircle, ArrowRight, Video, LayoutDashboard } from "lucide-react"

const slots = [
  { day: "Lunes 10 Mar", time: "4:00 PM", available: true },
  { day: "Martes 11 Mar", time: "6:00 PM", available: true },
  { day: "Jueves 13 Mar", time: "5:00 PM", available: true },
  { day: "Viernes 14 Mar", time: "10:00 AM", available: false },
  { day: "Sabado 15 Mar", time: "11:00 AM", available: true },
]

export function AgendarDiagnostico() {
  const { navigateTo, setReunionAgendada } = useApp()
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)

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

  if (confirmed) {
    const slot = slots[selectedSlot!]
    return (
      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border">

          {/* Header */}
          <div className="bg-dark-teal-700 px-6 py-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Reunion agendada</h1>
            <p className="mt-1 text-dark-teal-100">
              Te enviaremos el link de Google Meet un dia antes
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-7">
            <p className="mb-5 text-center text-sm leading-relaxed text-platinum-600">
              Un especialista y un supervisor de ACTIVA 50+ revisaran tu negocio contigo y te propondran el mejor plan.
            </p>

            {/* Detalles */}
            <div className="mb-6 space-y-3 rounded-xl bg-dark-teal-50 px-5 py-4">
              <div className="flex items-center gap-3 text-sm font-medium text-dark-teal-800">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-teal-600 text-white">
                  <Calendar className="h-4 w-4" />
                </div>
                {slot.day}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-dark-teal-800">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-teal-600 text-white">
                  <Clock className="h-4 w-4" />
                </div>
                {slot.time} · 30 minutos
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-dark-teal-800">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark-teal-600 text-white">
                  <Video className="h-4 w-4" />
                </div>
                Google Meet · Virtual
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => navigateTo("dashboard")}
              className="w-full bg-dark-teal-600 py-5 text-base font-semibold text-primary-foreground hover:bg-dark-teal-700"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Volver a mi inicio
            </Button>
            <p className="mt-3 text-center text-xs text-platinum-400">
              Podras entrar a la reunion desde tu pagina de inicio cuando sea la hora.
            </p>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 text-center">
        <span className="mb-2 inline-block rounded-full bg-dark-teal-50 px-3 py-1 text-xs font-semibold text-dark-teal-700">
          Reunion gratuita
        </span>
        <h1 className="mb-2 text-2xl font-bold text-dark-teal-900">
          Agenda tu reunion personalizada
        </h1>
        <p className="text-platinum-500">
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
            className={`flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all ring-1 ${
              !slot.available
                ? "cursor-not-allowed bg-muted text-platinum-300 ring-border"
                : selectedSlot === i
                  ? "bg-dark-teal-50 ring-2 ring-dark-teal-500 shadow-sm"
                  : "bg-card ring-border hover:ring-dark-teal-200 hover:shadow-sm"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                selectedSlot === i
                  ? "bg-dark-teal-600 text-primary-foreground"
                  : slot.available
                    ? "bg-dark-teal-50 text-dark-teal-600"
                    : "bg-muted text-platinum-300"
              }`}
            >
              <Calendar className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p
                className={`font-semibold ${selectedSlot === i ? "text-dark-teal-800" : slot.available ? "text-dark-teal-900" : "text-platinum-300"}`}
              >
                {slot.day}
              </p>
              <p
                className={`text-sm ${selectedSlot === i ? "text-dark-teal-600" : slot.available ? "text-platinum-500" : "text-platinum-300"}`}
              >
                {slot.time} - 30 minutos
              </p>
            </div>
            {!slot.available && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-platinum-500">
                Ocupado
              </span>
            )}
            {selectedSlot === i && (
              <CheckCircle className="h-5 w-5 text-dark-teal-600" />
            )}
          </button>
        ))}
      </div>

      <Button
        size="lg"
        disabled={selectedSlot === null}
        onClick={handleConfirm}
        className="mt-6 w-full bg-dark-teal-600 text-primary-foreground hover:bg-dark-teal-700 disabled:opacity-40"
      >
        Confirmar reunion
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
