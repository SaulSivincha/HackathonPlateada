"use client"

import { useApp } from "@/lib/app-context"
import { ArrowRight, Clock, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PlanPreparando() {
  const { navigateTo, userName } = useApp()
  const firstName = userName.split(" ")[0]

  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border">

          {/* Header */}
          <div className="bg-dark-teal-700 px-6 py-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              ¡Gracias, {firstName}!
            </h1>
            <p className="mt-2 text-dark-teal-100">
              Tu reunion de diagnostico fue un exito
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-7">
            <div className="mb-6 rounded-2xl bg-pale-oak-50 px-5 py-5">
              <div className="mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-pale-oak-500" />
                <p className="text-base font-bold text-dark-teal-900">
                  Tu plan personalizado esta siendo preparado
                </p>
              </div>
              <p className="text-sm leading-relaxed text-platinum-600">
                Nuestro equipo esta analizando lo que conversamos para armar un plan a la medida de tu negocio.
                En las proximas horas lo tendras disponible en tu panel principal.
              </p>
            </div>

            <div className="mb-6 space-y-3">
              {[
                "Revisaremos tus objetivos y situacion actual",
                "Seleccionaremos al personal mas adecuado para ti",
                "Prepararemos un plan con entregables claros y precio justo",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-dark-teal-500" />
                  <p className="text-sm text-platinum-700">{step}</p>
                </div>
              ))}
            </div>

            <Button
              onClick={() => navigateTo("dashboard")}
              className="w-full bg-dark-teal-600 py-5 text-base font-semibold text-primary-foreground hover:bg-dark-teal-700"
            >
              Volver a mi inicio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
