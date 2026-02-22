"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { talleres, talleresMagistrales, type TallerMagistral } from "@/lib/talleres-data"
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
  Star,
  Play,
  Gift,
  Award,
  Quote,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
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

function ModalMagistral({ taller, onClose }: { taller: TallerMagistral; onClose: () => void }) {
  const Icon = iconMap[taller.icon] || BookOpen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-dark-teal-700 px-6 py-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-dark-teal-200">
              {taller.subtitle}
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">{taller.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-dark-teal-200 hover:bg-dark-teal-600 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Descripción */}
          <p className="text-base leading-relaxed text-platinum-600">{taller.description}</p>

          {/* Info rápida */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-xl bg-dark-teal-50 px-4 py-3">
              <Clock className="h-5 w-5 text-dark-teal-600" />
              <div>
                <p className="text-sm font-bold text-dark-teal-900">{taller.duracion}</p>
                <p className="text-sm text-platinum-500">{taller.hora}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-dark-teal-50 px-4 py-3">
              <CalendarCheck className="h-5 w-5 text-dark-teal-600" />
              <div>
                <p className="text-sm font-bold text-dark-teal-900">{taller.fecha.split(",")[0]}</p>
                <p className="text-sm text-platinum-500">{taller.formato.split("(")[0].trim()}</p>
              </div>
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-start gap-4 rounded-xl bg-pale-oak-50 px-5 py-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-dark-teal-600 text-white">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-base font-bold text-dark-teal-900">{taller.instructor}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-platinum-500">{taller.instructorBio}</p>
            </div>
          </div>

          {/* Temario */}
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-dark-teal-700">
              Que veras en el taller
            </p>
            <ol className="space-y-2">
              {taller.temario.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dark-teal-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-base text-dark-teal-800">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Entregables */}
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-dark-teal-700">
              Lo que te llevas
            </p>
            <ul className="space-y-2">
              {taller.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-dark-teal-500" />
                  <span className="text-base text-dark-teal-800">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial */}
          {taller.testimonial && (
            <div className="rounded-xl bg-dark-teal-50 px-5 py-4">
              <Quote className="mb-2 h-5 w-5 text-dark-teal-400" />
              <p className="text-base italic leading-relaxed text-dark-teal-800">
                &ldquo;{taller.testimonial.texto}&rdquo;
              </p>
              <p className="mt-2 text-sm font-bold text-dark-teal-600">
                — {taller.testimonial.nombre}
              </p>
            </div>
          )}

          {/* Precio y CTA */}
          <div className="rounded-2xl bg-dark-teal-800 px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-dark-teal-200">Precio especial de lanzamiento</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-white">{taller.precio}</span>
                  {taller.precioAntes && (
                    <span className="text-lg text-dark-teal-400 line-through">{taller.precioAntes}</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-dark-teal-200">Solo</p>
                <p className="text-sm font-bold text-white">{taller.cupos}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-base font-bold text-dark-teal-800 transition-colors hover:bg-dark-teal-50"
            >
              Reservar mi cupo
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="mt-3 text-center text-sm text-dark-teal-300">
              Incluye grabacion + grupo de soporte por 30 dias
            </p>
          </div>
        </div>
      </div>
    </div>
  )
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
  const [magistralModal, setMagistralModal] = useState<TallerMagistral | null>(null)
  const [carouselIdx, setCarouselIdx] = useState(0)
  const currentMagistral = talleresMagistrales[carouselIdx]

  return (
    <>
      {tallerModal && (
        <ModalAprender taller={tallerModal} onClose={() => setTallerModal(null)} />
      )}
      {magistralModal && (
        <ModalMagistral taller={magistralModal} onClose={() => setMagistralModal(null)} />
      )}

      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-dark-teal-900">
            Capacitate
          </h1>
          <p className="mt-2 text-base text-platinum-500">
            Talleres para emprendedores +50. Aprende, aplica y transforma tu negocio.
          </p>
        </div>

        {/* ═══════ HERO CARRUSEL — TALLERES MAGISTRALES ═══════ */}
        <div className="mb-5 flex items-center gap-2 animate-fade-in-up delay-100">
          <Star className="h-5 w-5 text-pale-oak-500" />
          <h2 className="text-lg font-bold text-dark-teal-900">Taller Magistral</h2>
          <span className="rounded-full bg-dark-teal-700 px-3 py-1 text-base font-bold text-white">
            De pago
          </span>
        </div>

        <div className="relative mb-6 animate-fade-in-up delay-200">
          {/* Flechas laterales */}
          {talleresMagistrales.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCarouselIdx((prev) =>
                    prev === 0 ? talleresMagistrales.length - 1 : prev - 1
                  )
                }
                className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-dark-teal-200 text-dark-teal-700 transition-all hover:bg-dark-teal-50 hover:-translate-y-1/2 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() =>
                  setCarouselIdx((prev) =>
                    prev === talleresMagistrales.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-dark-teal-200 text-dark-teal-700 transition-all hover:bg-dark-teal-50 hover:-translate-y-1/2 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Card premium */}
          {(() => {
            const taller = currentMagistral
            const Icon = iconMap[taller.icon] || BookOpen
            return (
              <div className="overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
                {/* ── Header con gradiente ── */}
                <div className="relative overflow-hidden bg-linear-to-br from-dark-teal-800 to-dark-teal-700 px-6 py-6 sm:px-8 sm:py-7">
                  {/* Círculo decorativo */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-dark-teal-500/10" />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-sm">
                      <Icon className="h-6 w-6 text-dark-teal-200" />
                    </div>
                    <div className="text-right">
                      {taller.precioAntes && (
                        <p className="text-base text-white/50 line-through">{taller.precioAntes}</p>
                      )}
                      <p className="text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-1px" }}>
                        {taller.precio}
                      </p>
                    </div>
                  </div>

                  <h3 className="relative z-10 mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl" style={{ letterSpacing: "-0.5px" }}>
                    {taller.title}
                  </h3>
                </div>

                {/* ── Body ── */}
                <div className="bg-linear-to-b from-white to-dark-teal-50/30 px-8 py-8 sm:px-10 sm:py-10">
                  <p className="mb-8 text-base leading-relaxed text-platinum-600">
                    {taller.description}
                  </p>

                  {/* Info grid */}
                  <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      { icon: Clock, label: "Duración", value: taller.duracion },
                      { icon: CalendarCheck, label: "Fecha", value: taller.fecha.split(",")[0] },
                      { icon: Users, label: "Cupos", value: taller.cupos },
                      { icon: Award, label: "Instructor", value: taller.instructor },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group flex items-center gap-3 rounded-2xl border border-dark-teal-200 bg-linear-to-br from-dark-teal-50 to-dark-teal-100/50 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-dark-teal-200/40"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                          <item.icon className="h-5 w-5 text-dark-teal-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium uppercase tracking-wider text-platinum-500">
                            {item.label}
                          </p>
                          <p className="truncate text-base font-semibold text-dark-teal-900">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botones */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => setMagistralModal(taller)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-dark-teal-600 to-dark-teal-700 py-5 text-base font-semibold text-white shadow-lg shadow-dark-teal-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-dark-teal-600/40"
                    >
                      Reservar mi cupo — {taller.precio}
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setMagistralModal(taller)}
                      className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dark-teal-200 bg-white px-8 py-5 text-base font-semibold text-dark-teal-700 transition-all hover:-translate-y-0.5 hover:border-dark-teal-300 hover:bg-dark-teal-50 hover:shadow-md"
                    >
                      Ver temario
                    </button>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Dots */}
          {talleresMagistrales.length > 1 && (
            <div className="mt-5 flex justify-center gap-2.5">
              {talleresMagistrales.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIdx(idx)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    idx === carouselIdx
                      ? "w-8 bg-dark-teal-600"
                      : "w-3 bg-dark-teal-200 hover:bg-dark-teal-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Indicador hacia talleres gratuitos ── */}
        <div className="mb-8 flex flex-col items-center gap-2 rounded-2xl bg-dark-teal-50 py-6 animate-fade-in-up delay-300">
          <BookOpen className="h-8 w-8 text-dark-teal-600" />
          <p className="text-lg font-bold text-dark-teal-800">
            Talleres gratuitos disponibles abajo
          </p>
          <ChevronDown className="h-8 w-8 text-dark-teal-500 animate-bounce" />
        </div>

        {/* ═══════ TALLERES AGENDADOS ═══════ */}
        {talleresAgendados.length > 0 && (
          <div className="mb-8 animate-fade-in-up delay-400">
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
        <div className="mb-3 flex items-center gap-2 animate-fade-in-up delay-500">
          <BookOpen className="h-4 w-4 text-dark-teal-600" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-dark-teal-600">
            Talleres gratuitos disponibles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {talleres.map((taller, index) => {
            const Icon = iconMap[taller.icon] || Calculator
            const yaAgendado = talleresAgendados.includes(taller.id)
            return (
              <div
                key={taller.id}
                style={{ animationDelay: `${600 + index * 80}ms` }}
                className={`animate-fade-in-up flex flex-col overflow-hidden rounded-2xl shadow-sm ring-1 transition-all ${
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
