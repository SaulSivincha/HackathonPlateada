"use client"

import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Smartphone,
  Calculator,
  Globe,
  Clock,
  CheckCircle2,
  Home,
} from "lucide-react"

interface PlanActivo {
  id: string
  titulo: string
  descripcion: string
  icon: typeof Smartphone
  precio: string
  progreso: number
  hitoActual: string
  hitosCompletados: number
  hitosTotal: number
  estado: "en-curso" | "por-iniciar"
}

const planesActivos: PlanActivo[] = [
  {
    id: "digital",
    titulo: "Plan Presencia Digital",
    descripcion: "Logo, redes sociales, contenido y catalogo WhatsApp",
    icon: Smartphone,
    precio: "S/ 280",
    progreso: 60,
    hitoActual: "Contenido del primer mes",
    hitosCompletados: 2,
    hitosTotal: 4,
    estado: "en-curso",
  },
]

const planesDisponibles: { id: string; titulo: string; descripcion: string; icon: typeof Smartphone; precio: string }[] = [
  {
    id: "precios",
    titulo: "Plan Gestion Basica",
    descripcion: "Inventario, precios, control financiero y reporte",
    icon: Calculator,
    precio: "S/ 320",
  },
  {
    id: "web",
    titulo: "Plan Pagina Web",
    descripcion: "Diseno web, publicacion, SEO y material de difusion",
    icon: Globe,
    precio: "S/ 350",
  },
]

export function MisPlanes() {
  const { navigateTo, setSelectedService } = useApp()

  const handleVerPlan = (planId: string) => {
    setSelectedService(planId)
    navigateTo("proyecto-simulado")
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-teal-900">Mis planes</h1>
        <p className="mt-1 text-platinum-500">
          Aqui puedes ver el avance de los planes que tienes contratados.
        </p>
      </div>

      {/* Active plans */}
      <div className="mb-10">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-dark-teal-600">
          Planes activos
        </h2>
        <div className="space-y-4">
          {planesActivos.map((plan) => (
            <button
              key={plan.id}
              onClick={() => handleVerPlan(plan.id)}
              className="group w-full rounded-2xl bg-card p-5 text-left shadow-sm ring-1 ring-border transition-all hover:shadow-md hover:ring-dark-teal-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark-teal-50 text-dark-teal-600 transition-colors group-hover:bg-dark-teal-100">
                  <plan.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-dark-teal-900">{plan.titulo}</h3>
                      <p className="mt-0.5 text-sm text-platinum-500">{plan.descripcion}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-dark-teal-50 px-3 py-1 text-sm font-bold text-dark-teal-600">
                      {plan.precio}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-dark-teal-700">
                        <Clock className="h-3.5 w-3.5" />
                        Hito actual: <span className="font-semibold">{plan.hitoActual}</span>
                      </span>
                      <span className="font-bold text-dark-teal-600">
                        {plan.hitosCompletados}/{plan.hitosTotal}
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-platinum-100">
                      <div
                        className="h-full rounded-full bg-dark-teal-500 transition-all"
                        style={{ width: `${plan.progreso}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA hint */}
                  <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-dark-teal-500 transition-colors group-hover:text-dark-teal-700">
                    Ver detalle del proyecto
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Completed milestones summary */}
      <div className="mb-10 rounded-2xl bg-dark-teal-50 p-5">
        <h3 className="mb-3 text-sm font-bold text-dark-teal-800">Resumen general</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-dark-teal-600">2</p>
            <p className="text-xs text-dark-teal-700">Hitos completados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pale-oak-500">S/ 120</p>
            <p className="text-xs text-dark-teal-700">Pagado hasta hoy</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-deep-ocean-600">1</p>
            <p className="text-xs text-dark-teal-700">Plan activo</p>
          </div>
        </div>
      </div>

      {/* Other available plans */}
      <div className="mb-8">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-platinum-500">
          Otros planes disponibles
        </h2>
        <div className="space-y-3">
          {planesDisponibles.map((plan) => (
            <div
              key={plan.id}
              className="flex items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-border"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-platinum-50 text-platinum-500">
                <plan.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-dark-teal-900">{plan.titulo}</h3>
                <p className="text-xs text-platinum-500">{plan.descripcion}</p>
              </div>
              <span className="text-sm font-bold text-platinum-500">{plan.precio}</span>
            </div>
          ))}
        </div>
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
