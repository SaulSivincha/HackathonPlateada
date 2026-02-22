"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  Stethoscope,
  UserCheck,
  Wrench,
  Search,
  Package,
  CheckCircle2,
  ArrowRight,
  Eye,
  Home,
} from "lucide-react"

const timeline = [
  {
    icon: Stethoscope,
    label: "Diagnostico completado",
    description: "Un especialista de ACTIVA 50+ reviso tu negocio y definio el plan.",
    status: "done" as const,
  },
  {
    icon: UserCheck,
    label: "Practicante asignado",
    description: "Maria, estudiante de Marketing de UPC, trabajara en tu proyecto.",
    status: "done" as const,
  },
  {
    icon: Wrench,
    label: "Trabajo en curso",
    description: "Maria esta creando tu contenido / configurando tus herramientas.",
    status: "current" as const,
  },
  {
    icon: Search,
    label: "Revision del mentor",
    description: "El supervisor revisa la calidad antes de entregarte el trabajo.",
    status: "pending" as const,
  },
  {
    icon: Package,
    label: "Entrega y aprobacion",
    description: "Te presentamos el trabajo terminado y te ensenamos a usarlo.",
    status: "pending" as const,
  },
]

export function ProyectoSimulado() {
  const { selectedService, navigateTo } = useApp()
  const [showEntregable, setShowEntregable] = useState(false)

  const serviceLabel: Record<string, string> = {
    digital: "Paquete Inicio Digital",
    precios: "Gestion Basica",
    web: "Landing Page",
  }

  const servicePrice: Record<string, string> = {
    digital: "S/ 120",
    precios: "S/ 150",
    web: "S/ 200-350",
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <span className="mb-2 inline-block rounded-full bg-ocean-500/15 px-3 py-1 text-xs font-semibold text-ocean-600">
          Simulacion de proyecto
        </span>
        <h1 className="mb-2 text-2xl font-bold text-teal-900">
          {serviceLabel[selectedService || "digital"]}
        </h1>
        <p className="text-platinum-500">
          Asi se ve un proyecto real con ACTIVA 50+. Precio:{" "}
          <span className="font-bold text-teal-700">
            {servicePrice[selectedService || "digital"]}
          </span>
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        {timeline.map((step, i) => (
          <div key={i} className="flex gap-4">
            {/* Line */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  step.status === "done"
                    ? "bg-teal-600 text-primary-foreground"
                    : step.status === "current"
                      ? "bg-ocean-500 text-accent-foreground ring-4 ring-ocean-500/20"
                      : "bg-platinum-100 text-platinum-500"
                }`}
              >
                {step.status === "done" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              {i < timeline.length - 1 && (
                <div
                  className={`w-0.5 flex-1 ${
                    step.status === "done" ? "bg-teal-500" : "bg-platinum-100"
                  }`}
                />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 pb-8">
              <p
                className={`font-bold ${
                  step.status === "current"
                    ? "text-ocean-600"
                    : step.status === "done"
                      ? "text-teal-700"
                      : "text-platinum-500"
                }`}
              >
                {step.label}
              </p>
              <p className="mt-1 text-sm text-platinum-500">
                {step.description}
              </p>
              {step.status === "current" && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-platinum-100">
                    <div className="h-full w-3/5 rounded-full bg-ocean-500 transition-all" />
                  </div>
                  <span className="text-xs font-semibold text-ocean-600">
                    60%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View deliverable */}
      <Button
        size="lg"
        onClick={() => setShowEntregable(!showEntregable)}
        className="w-full bg-teal-600 text-primary-foreground hover:bg-teal-700"
      >
        <Eye className="mr-2 h-4 w-4" />
        {showEntregable ? "Ocultar avance" : "Ver avance"}
      </Button>

      {showEntregable && (
        <div className="mt-6 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
          <h3 className="mb-4 text-lg font-bold text-teal-900">
            Entregable simulado
          </h3>

          {(selectedService === "digital" || !selectedService) && (
            <div className="space-y-4">
              <div className="rounded-xl bg-teal-50 p-4">
                <p className="mb-2 text-sm font-semibold text-teal-800">
                  Perfil de Instagram configurado
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-primary-foreground">
                    MR
                  </div>
                  <div>
                    <p className="text-sm font-bold text-teal-900">
                      @mercedesreposteria
                    </p>
                    <p className="text-xs text-platinum-500">
                      Reposteria artesanal | Lima, Peru | Pedidos por WhatsApp
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Post 1: Torta de chocolate", "Post 2: Cupcakes del mes", "Story: Detras de escena", "Post 3: Precios de mayo"].map(
                  (item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg bg-oak-50 p-3"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-ocean-600" />
                      <span className="text-xs text-teal-800">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {selectedService === "precios" && (
            <div className="overflow-hidden rounded-xl ring-1 ring-border">
              <table className="w-full text-sm">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-teal-800">
                      Producto
                    </th>
                    <th className="px-4 py-2 text-right font-semibold text-teal-800">
                      Costo
                    </th>
                    <th className="px-4 py-2 text-right font-semibold text-teal-800">
                      Precio
                    </th>
                    <th className="px-4 py-2 text-right font-semibold text-teal-800">
                      Margen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Torta chocolate", cost: "S/ 25", price: "S/ 45", margin: "44%" },
                    { name: "Cupcakes x6", cost: "S/ 12", price: "S/ 24", margin: "50%" },
                    { name: "Galletas x12", cost: "S/ 8", price: "S/ 18", margin: "56%" },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-4 py-2 text-teal-900">{row.name}</td>
                      <td className="px-4 py-2 text-right text-platinum-500">
                        {row.cost}
                      </td>
                      <td className="px-4 py-2 text-right font-semibold text-teal-700">
                        {row.price}
                      </td>
                      <td className="px-4 py-2 text-right font-bold text-ocean-600">
                        {row.margin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedService === "web" && (
            <div className="space-y-3">
              <div className="aspect-video overflow-hidden rounded-xl bg-teal-50 p-4">
                <div className="mb-3 h-3 w-32 rounded bg-teal-200" />
                <div className="mb-2 h-6 w-48 rounded bg-teal-300" />
                <div className="mb-4 h-3 w-full rounded bg-teal-100" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 rounded-lg bg-teal-200" />
                  <div className="h-16 rounded-lg bg-teal-200" />
                  <div className="h-16 rounded-lg bg-teal-200" />
                </div>
              </div>
              <p className="text-sm text-platinum-500">
                Prototipo de tu landing page con catalogo de productos, info de
                contacto y formulario de pedidos.
              </p>
            </div>
          )}
        </div>
      )}

      <Button
        variant="outline"
        size="lg"
        onClick={() => navigateTo("dashboard")}
        className="mt-4 w-full border-border text-teal-700 hover:bg-teal-50"
      >
        <Home className="mr-2 h-4 w-4" />
        Volver a mi inicio
      </Button>
    </div>
  )
}
