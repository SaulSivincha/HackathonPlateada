"use client"

import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  AlertCircle,
  CalendarCheck,
} from "lucide-react"

export function TallerConfirmacion() {
  const { selectedTaller, navigateTo, agendarTaller, talleresAgendados } = useApp()

  if (!selectedTaller) return null

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-ocean-500/15">
          <CheckCircle className="h-8 w-8 text-ocean-600" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-teal-900">
          Tu cupo esta reservado
        </h1>
        <p className="mb-8 text-platinum-500">
          Te enviaremos el enlace de Google Meet a tu correo. Asegurate de tener buena conexion a internet.
        </p>

        <div className="mb-8 space-y-3 rounded-xl bg-teal-50 p-5 text-left">
          <h3 className="font-bold text-teal-800">{selectedTaller.title}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-teal-700">
              <Calendar className="h-4 w-4" />
              <span>Sabado 8 de marzo, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-teal-700">
              <Clock className="h-4 w-4" />
              <span>10:00 AM - 11:00 AM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-teal-700">
              <MapPin className="h-4 w-4" />
              <span>Virtual - Google Meet</span>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-xl bg-oak-50 p-4 text-left">
          <div className="flex gap-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-oak-500" />
            <div>
              <p className="text-sm font-semibold text-teal-800">
                Preparate antes del taller:
              </p>
              <p className="mt-1 text-sm text-platinum-500">
                {selectedTaller.prereqs}
              </p>
              <p className="mt-2 text-xs text-platinum-300">
                Conectate desde tu computadora o celular con buena conexion a internet.
              </p>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => {
            agendarTaller(selectedTaller.id)
            navigateTo("dashboard")
          }}
          className="w-full bg-teal-600 text-primary-foreground hover:bg-teal-700"
        >
          <CalendarCheck className="mr-2 h-4 w-4" />
          Agendar Taller
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
