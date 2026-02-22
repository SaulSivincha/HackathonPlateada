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
  Mic2,
  AlertTriangle,
  HeartHandshake,
  Brain,
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
  mic: Mic2,
  "alert-triangle": AlertTriangle,
  "heart-handshake": HeartHandshake,
  brain: Brain,
  clock: Clock,
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dark-teal-50 text-dark-teal-600">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold leading-tight text-dark-teal-900">
            Qué aprenderás
          </h2>
        </div>

        <p className="mb-1 text-sm font-semibold text-dark-teal-800">{taller.title}</p>
        <p className="mb-4 text-sm text-platinum-500">{taller.description}</p>

        {taller.prereqs && (
          <div className="mb-4 rounded-xl bg-pale-oak-50 px-4 py-3">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-pale-oak-600">
              Antes del taller
            </p>
            <p className="text-sm text-platinum-700">{taller.prereqs}</p>
          </div>
        )}

        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-dark-teal-700">
          Lo que te llevas
        </p>
        <ul className="space-y-2">
          {taller.deliverables.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-dark-teal-500" />
              <span className="text-sm text-platinum-800">{d}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={onClose}
          className="mt-6 w-full bg-dark-teal-600 text-primary-foreground hover:bg-dark-teal-700"
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

      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-dark-teal-900">
            Capacitate gratis
          </h1>
          <p className="mt-2 text-base text-platinum-500">
            Talleres virtuales de 60 minutos por Google Meet. Sales con algo concreto para tu negocio.
          </p>
        </div>

        {/* ── Talleres agendados (por comenzar) ── */}
        {talleresAgendados.length > 0 && (
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-dark-teal-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-dark-teal-700">
                Tus talleres por comenzar
              </h2>
            </div>
            <div className="space-y-3">
              {talleres
                .filter((t) => talleresAgendados.includes(t.id))
                .map((taller) => {
                  const Icon = iconMap[taller.icon] || BookOpen
                  return (
                    <div
                      key={taller.id}
                      className="flex items-center gap-4 rounded-xl bg-dark-teal-50 px-5 py-4 ring-1 ring-dark-teal-200"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-dark-teal-600 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold text-dark-teal-900">
                          {taller.title}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTaller(taller)
                          navigateTo("taller-room")
                        }}
                        className="shrink-0 flex items-center gap-1.5 rounded-xl bg-dark-teal-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-dark-teal-700 transition-colors"
                      >
                        Entrar
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {/* ── Todos los talleres gratuitos ── */}
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-dark-teal-600" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-dark-teal-600">
            Talleres gratuitos disponibles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {talleres.map((taller) => {
            const Icon = iconMap[taller.icon] || Calculator
            const yaAgendado = talleresAgendados.includes(taller.id)
            return (
              <div
                key={taller.id}
                className={`flex flex-col overflow-hidden rounded-2xl shadow-sm ring-1 transition-all ${
                  yaAgendado
                    ? "bg-dark-teal-50/40 ring-dark-teal-300 opacity-70"
                    : "bg-card ring-border"
                }`}
              >
                {/* Badge agendado */}
                {yaAgendado && (
                  <div className="flex items-center gap-2 bg-dark-teal-100 px-5 py-2.5">
                    <CalendarCheck className="h-5 w-5 text-dark-teal-600" />
                    <span className="text-sm font-bold text-dark-teal-700">Ya agendado</span>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-dark-teal-50 text-dark-teal-600">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full bg-dark-teal-600 px-4 py-1.5 text-base font-bold text-white">
                      Gratis
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-dark-teal-900 leading-snug">{taller.title}</h3>
                  <p className="mt-1.5 text-base text-platinum-500">{taller.description}</p>
                </div>

                {/* Botón */}
                <div className="border-t border-border px-5 py-4 mt-auto">
                  {yaAgendado ? (
                    <button
                      onClick={() => {
                        setSelectedTaller(taller)
                        navigateTo("taller-room")
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-dark-teal-600 py-4 text-base font-bold text-white transition-colors hover:bg-dark-teal-700"
                    >
                      Entrar al taller
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        agendarTaller(taller.id)
                        setSelectedTaller(taller)
                        navigateTo("taller-confirmacion")
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-dark-teal-600 py-4 text-base font-bold text-white transition-colors hover:bg-dark-teal-700"
                    >
                      <CalendarCheck className="h-5 w-5" />
                      Agendar taller
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
