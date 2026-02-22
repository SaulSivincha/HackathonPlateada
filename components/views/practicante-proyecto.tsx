"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Wrench,
  Search,
  CheckCircle2,
  Award,
  Home,
  Download,
} from "lucide-react"

const timeline = [
  {
    icon: FileText,
    label: "Briefing recibido",
    description: "Recibes la ficha del cliente: contexto, productos, objetivos y restricciones.",
    status: "done" as const,
  },
  {
    icon: Wrench,
    label: "Trabajo en curso",
    description: "Creas el contenido, configuras herramientas y preparas los entregables.",
    status: "done" as const,
  },
  {
    icon: Search,
    label: "Mentor revisa",
    description: "El supervisor revisa tu trabajo. Maximo 2 rondas de revision.",
    status: "done" as const,
  },
  {
    icon: CheckCircle2,
    label: "Cliente aprueba",
    description: "Mercedes reviso y aprobo tu trabajo. Excelente labor.",
    status: "done" as const,
  },
  {
    icon: Award,
    label: "Certificado generado",
    description: "Tu certificado de practicas preprofesionales esta listo.",
    status: "current" as const,
  },
]

export function PracticanteProyecto() {
  const { practicanteData, navigateTo } = useApp()
  const [showCertificado, setShowCertificado] = useState(false)

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <span className="mb-2 inline-block rounded-full bg-ocean-500/15 px-3 py-1 text-xs font-semibold text-ocean-600">
          Proyecto completado
        </span>
        <h1 className="mb-2 text-2xl font-bold text-teal-900">
          Proyecto: Inicio Digital - Mercedes R.
        </h1>
        <p className="text-platinum-500">
          8 horas de practica preprofesional certificadas.
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        {timeline.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  step.status === "done"
                    ? "bg-teal-600 text-primary-foreground"
                    : "bg-ocean-500 text-accent-foreground ring-4 ring-ocean-500/20"
                }`}
              >
                {step.status === "done" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              {i < timeline.length - 1 && (
                <div className="w-0.5 flex-1 bg-teal-500" />
              )}
            </div>
            <div className="flex-1 pb-8">
              <p
                className={`font-bold ${step.status === "current" ? "text-ocean-600" : "text-teal-700"}`}
              >
                {step.label}
              </p>
              <p className="mt-1 text-sm text-platinum-500">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Certificado */}
      <Button
        size="lg"
        onClick={() => setShowCertificado(!showCertificado)}
        className="w-full bg-teal-600 text-primary-foreground hover:bg-teal-700"
      >
        <Award className="mr-2 h-4 w-4" />
        {showCertificado ? "Ocultar certificado" : "Ver certificado"}
      </Button>

      {showCertificado && (
        <div className="mt-6 overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border">
          {/* Certificate content */}
          <div className="bg-teal-800 px-8 py-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ocean-500 text-xs font-bold text-accent-foreground">
                A+
              </div>
              <span className="text-lg font-bold text-primary-foreground">
                ACTIVA 50+
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-teal-300">
              Certificado de Practicas Preprofesionales
            </p>
          </div>

          <div className="px-8 py-8 text-center">
            <p className="mb-1 text-sm text-platinum-500">
              Se certifica que
            </p>
            <p className="mb-4 text-2xl font-bold text-teal-900">
              {practicanteData?.name || "Practicante"}
            </p>
            <p className="mb-1 text-sm text-platinum-500">de</p>
            <p className="mb-6 font-semibold text-teal-700">
              {practicanteData?.university || "Universidad"} -{" "}
              {practicanteData?.career || "Carrera"}
            </p>

            <p className="mb-6 text-sm leading-relaxed text-platinum-500">
              Ha completado satisfactoriamente{" "}
              <span className="font-bold text-teal-800">8 horas</span> de
              practica preprofesional en el programa ACTIVA 50+, realizando
              acompanamiento digital al emprendedor Mercedes R. en el
              proyecto de Inicio Digital.
            </p>

            <div className="flex justify-center gap-12">
              <div className="text-center">
                <div className="mb-1 h-0.5 w-28 bg-teal-800" />
                <p className="text-xs text-platinum-500">
                  Director ACTIVA 50+
                </p>
              </div>
              <div className="text-center">
                <div className="mb-1 h-0.5 w-28 bg-teal-800" />
                <p className="text-xs text-platinum-500">
                  Supervisor / Mentor
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs text-platinum-300">
              Lima, marzo 2026 | Codigo: ACTIVA-2026-001
            </p>
          </div>

          <div className="border-t border-border px-8 py-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-border text-teal-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar certificado (simulado)
            </Button>
          </div>
        </div>
      )}

      <Button
        variant="outline"
        size="lg"
        onClick={() => navigateTo("dashboard")}
        className="mt-4 w-full border-border text-teal-700 hover:bg-teal-50"
      >
        <Home className="mr-2 h-4 w-4" />
        Volver al inicio
      </Button>
    </div>
  )
}
