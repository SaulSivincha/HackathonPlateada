"use client"

import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { UserPlus, ArrowRight, Bell } from "lucide-react"

export function PracticantePostTaller() {
  const { navigateTo } = useApp()

  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-ocean-500/15">
          <Bell className="h-8 w-8 text-ocean-600" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-teal-900">
          1 participante solicito acompanamiento
        </h1>
        <p className="mb-8 text-platinum-500">
          Mercedes R. (Reposteria artesanal) quiere continuar con un proyecto
          de presencia digital. Puedes tomar este proyecto como practicante asignado.
        </p>

        <div className="mb-8 rounded-2xl bg-card p-6 text-left shadow-sm ring-1 ring-border">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-oak-100 text-lg font-bold text-oak-500">
              M
            </div>
            <div>
              <p className="font-bold text-teal-900">Mercedes R.</p>
              <p className="text-sm text-platinum-500">
                Reposteria artesanal - Lima
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-platinum-500">Servicio</span>
              <span className="font-semibold text-teal-800">
                Paquete Inicio Digital
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-platinum-500">Duracion</span>
              <span className="font-semibold text-teal-800">1 semana</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-platinum-500">Horas estimadas</span>
              <span className="font-semibold text-teal-800">8 horas</span>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => navigateTo("practicante-proyecto")}
          className="w-full bg-teal-600 text-primary-foreground hover:bg-teal-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Tomar proyecto
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
