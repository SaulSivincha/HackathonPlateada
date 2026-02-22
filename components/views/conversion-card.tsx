"use client"

import { useApp } from "@/lib/app-context"
import {
  Smartphone,
  DollarSign,
  Globe,
  BarChart3,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Home,
} from "lucide-react"

const whatWeDo = [
  {
    icon: Smartphone,
    label: "Redes sociales y WhatsApp Business",
  },
  {
    icon: DollarSign,
    label: "Costeo de productos y fijacion de precios",
  },
  {
    icon: Globe,
    label: "Pagina web o tienda online",
  },
  {
    icon: BarChart3,
    label: "Control de gastos y finanzas basicas",
  },
  {
    icon: ShoppingCart,
    label: "Sistema de pedidos y ventas",
  },
]

export function ConversionCard() {
  const { navigateTo } = useApp()

  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Single descriptive card */}
        <div className="overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border">
          {/* Card header with accent */}
          <div className="bg-teal-600 px-6 py-5 text-center">
            <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#fff]/20">
              <Sparkles className="h-7 w-7 text-[#fff]" />
            </div>
            <h1 className="text-2xl font-bold text-[#fff]">
              Completaste el taller
            </h1>
            <p className="mt-1 text-teal-100">
              Ahora puedes recibir acompanamiento personalizado
            </p>
          </div>

          {/* Card body */}
          <div className="px-6 py-6">
            <p className="mb-5 text-center text-base leading-relaxed text-platinum-800">
              En ACTIVA 50+ conectamos a emprendedores como tu con personal
              especializado que te ayuda con las tareas digitales y de gestion
              que necesitas. Esto es lo que podemos hacer juntos:
            </p>

            {/* What we do - simple list */}
            <div className="mb-6 space-y-3">
              {whatWeDo.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-teal-50 px-4 py-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-[#fff]">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-teal-900">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="mb-6 text-center text-sm text-platinum-500">
              Agendaremos una reunion gratuita de 30 minutos para entender tu
              negocio y proponerte el mejor plan.
            </p>

            {/* CTA buttons */}
            <button
              onClick={() => navigateTo("agendar-diagnostico")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-base font-bold text-[#fff] transition-colors hover:bg-teal-700"
            >
              Si, me interesa
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => navigateTo("dashboard")}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-platinum-500 ring-1 ring-border transition-colors hover:bg-muted"
            >
              <Home className="h-4 w-4" />
              No por ahora, volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
