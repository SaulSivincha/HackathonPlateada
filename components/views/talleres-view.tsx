"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { talleres } from "@/lib/talleres-data"
import {
  Instagram,
  MessageCircle,
  Calculator,
  Palette,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  MapPin,
  BookOpen,
  Video,
  X,
  CalendarCheck,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TallerInfo } from "@/lib/app-context"

const iconMap: Record<string, React.ElementType> = {
  instagram: Instagram,
  "message-circle": MessageCircle,
  calculator: Calculator,
  palette: Palette,
  "map-pin": MapPin,
  "book-open": BookOpen,
}

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
          <h2 className="text-lg font-bold leading-tight text-teal-900">
            Qué aprenderás
          </h2>
        </div>

        <p className="mb-1 text-sm font-semibold text-teal-800">{taller.title}</p>
        <p className="mb-4 text-sm text-platinum-500">{taller.description}</p>

        {taller.prereqs && (
          <div className="mb-4 rounded-xl bg-pale-oak-50 px-4 py-3">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-pale-oak-600">
              Antes del taller
            </p>
            <p className="text-sm text-platinum-700">{taller.prereqs}</p>
          </div>
        )}

        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-teal-700">
          Lo que te llevas
        </p>
        <ul className="space-y-2">
          {taller.deliverables.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
              <span className="text-sm text-platinum-800">{d}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={onClose}
          className="mt-6 w-full bg-teal-600 text-primary-foreground hover:bg-teal-700"
        >
          Entendido
        </Button>
      </div>
    </div>
  )
}

export function TalleresView() {
  const { setSelectedTaller, navigateTo, agendarTaller, talleresAgendados } = useApp()
  const [tallerModal, setTallerModal] = useState<TallerInfo | null>(null)

  return (
    <>
      {tallerModal && (
        <ModalAprender taller={tallerModal} onClose={() => setTallerModal(null)} />
      )}

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <span className="mb-2 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            Talleres Manos a la Obra
          </span>
          <h1 className="mb-2 text-3xl font-bold text-teal-900">
            Elige tu taller
          </h1>
          <p className="max-w-lg text-platinum-500">
            Sesiones virtuales de 60 minutos por Google Meet donde sales con algo funcionando.
            No aprendes como se hace. Lo haces.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {talleres.map((taller) => {
            const Icon = iconMap[taller.icon] || Calculator
            const yaAgendado = talleresAgendados.includes(taller.id)
            return (
              <div
                key={taller.id}
                className="group flex flex-col rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-md hover:ring-teal-200"
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold leading-tight text-teal-900">
                      {taller.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-platinum-500">
                      {taller.description}
                    </p>
                  </div>
                </div>

                <div className="mb-4 space-y-1.5">
                  {taller.deliverables.slice(0, 3).map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ocean-600" />
                      <span className="text-xs text-platinum-800">{d}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-3 border-t border-border pt-4">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1 text-xs text-platinum-500">
                      <Video className="h-3.5 w-3.5" /> Virtual
                    </span>
                    <span className="flex items-center gap-1 text-xs text-platinum-500">
                      <Clock className="h-3.5 w-3.5" /> 60 min
                    </span>
                    <span className="flex items-center gap-1 text-xs text-platinum-500">
                      <Users className="h-3.5 w-3.5" /> {taller.capacity}
                    </span>
                    <span className="font-semibold text-dark-teal-600 text-xs">Gratis</span>
                  </div>

                  <div className="flex gap-2">
                    {/* Botón Agendar */}
                    {yaAgendado ? (
                      <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700 ring-1 ring-teal-200">
                        <CalendarCheck className="h-4 w-4" />
                        Agendado
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 bg-teal-600 text-primary-foreground hover:bg-teal-700"
                        onClick={() => {
                          agendarTaller(taller.id)
                          setSelectedTaller(taller)
                          navigateTo("taller-confirmacion")
                        }}
                      >
                        <CalendarCheck className="mr-1.5 h-3.5 w-3.5" />
                        Agendar
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    )}

                    {/* Botón Qué aprenderé */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-teal-200 text-teal-700 hover:bg-teal-50"
                      onClick={() => setTallerModal(taller)}
                    >
                      <Lightbulb className="mr-1.5 h-3.5 w-3.5" />
                      Qué aprenderé
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
