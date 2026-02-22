"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  ArrowRight,
  CheckCircle2,
  Users,
  ClipboardList,
  Upload,
  LogOut,
  MonitorUp,
  MessageSquare,
  Circle,
} from "lucide-react"

const seniors = [
  { name: "Mercedes R.", business: "Reposteria artesanal", initials: "MR" },
  { name: "Roberto G.", business: "Carpinteria fina", initials: "RG" },
]

const tasks = [
  "Configurar perfil de Instagram del emprendedor",
  "Subir foto de perfil y completar bio",
  "Publicar primer post con producto",
  "Crear primera story de presentacion",
]

const etapas = [
  {
    label: "Apertura",
    titulo: "El taller esta por empezar",
    descripcion:
      "El facilitador explica el objetivo. Pronto conoceras a tus emprendedores asignados.",
    icon: Users,
  },
  {
    label: "Trabajo 1:1",
    titulo: "Trabaja con tu emprendedor",
    descripcion:
      "Completa las tareas junto a tu emprendedor. Tu ejecutas, el o ella aprueba.",
    icon: ClipboardList,
  },
  {
    label: "Subir avance",
    titulo: "Sube tu avance",
    descripcion:
      "El trabajo esta listo. Sube evidencia de lo que completaste.",
    icon: Upload,
  },
  {
    label: "Cierre",
    titulo: "Cierre del taller",
    descripcion:
      "Presentas lo que lograste y el facilitador cierra la sesion.",
    icon: CheckCircle2,
  },
]

const participants = [
  { initials: "FM", name: "Facilitador Maria", role: "Facilitadora" },
  { initials: "TU", name: "Tu", role: "Practicante", isSelf: true },
  { initials: "MR", name: "Mercedes R.", role: "Emprendedor" },
  { initials: "RG", name: "Roberto G.", role: "Emprendedor" },
  { initials: "AL", name: "Andrea L.", role: "Practicante" },
  { initials: "CS", name: "Carlos S.", role: "Emprendedor" },
]

export function PracticanteTallerRoom() {
  const { practicanteData, navigateTo } = useApp()
  const [etapaActual, setEtapaActual] = useState(0)
  const [videoOn, setVideoOn] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [taskStates, setTaskStates] = useState(tasks.map(() => false))
  const [uploaded, setUploaded] = useState(false)

  const toggleTask = (i: number) => {
    setTaskStates((prev) => prev.map((s, idx) => (idx === i ? !s : s)))
  }

  const etapa = etapas[etapaActual]

  const handleNext = () => {
    if (etapaActual < 3) {
      setEtapaActual(etapaActual + 1)
    } else {
      navigateTo("practicante-post-taller")
    }
  }

  if (!practicanteData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#202124] px-6">
        <p className="text-center text-xl text-[#e8eaed]">
          Primero debes registrarte.
        </p>
        <Button
          size="lg"
          onClick={() => navigateTo("practicante-registro")}
          className="h-14 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground hover:bg-dark-teal-500"
        >
          Ir al registro
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#202124]">
      {/* ===== TOP BAR ===== */}
      <header className="flex items-center justify-between border-b border-[#3c4043] px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-deep-ocean-600">
            <span className="text-sm font-bold text-[#e8eaed]">A+</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-tight text-[#e8eaed]">
              Taller: Instagram para negocios
            </h1>
            <p className="flex items-center gap-1.5 text-xs text-[#9aa0a6]">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#34a853]" />
              En vivo — Vista Practicante
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            {etapas.map((e, i) => (
              <button
                key={i}
                onClick={() => i <= etapaActual && setEtapaActual(i)}
                disabled={i > etapaActual}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  i === etapaActual
                    ? "bg-deep-ocean-600 text-[#e8eaed]"
                    : i < etapaActual
                      ? "bg-[#3c4043] text-[#e8eaed]"
                      : "text-[#5f6368]"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
          <span className="rounded-full bg-[#3c4043] px-3 py-1 text-xs font-medium text-[#e8eaed]">
            {practicanteData.name}
          </span>
        </div>
      </header>

      {/* ===== MAIN AREA ===== */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Video grid */}
        <main className="flex flex-1 flex-col gap-4 p-3 sm:p-4">
          <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {participants.map((p, i) => (
              <div
                key={i}
                className={`relative flex flex-col items-center justify-center rounded-xl ${
                  p.isSelf
                    ? "bg-[#3c4043] ring-2 ring-deep-ocean-500"
                    : "bg-[#3c4043]"
                }`}
                style={{ minHeight: "120px" }}
              >
                <div
                  className={`mb-2 flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold sm:h-16 sm:w-16 sm:text-xl ${
                    p.role === "Facilitadora"
                      ? "bg-primary text-primary-foreground"
                      : p.role === "Practicante"
                        ? "bg-deep-ocean-600 text-[#e8eaed]"
                        : "bg-[#5f6368] text-[#e8eaed]"
                  }`}
                >
                  {p.initials}
                </div>
                <span className="rounded bg-[#202124]/80 px-2 py-0.5 text-xs font-medium text-[#e8eaed]">
                  {p.isSelf ? `Tu (${practicanteData.name})` : p.name}
                </span>
                <span
                  className={`mt-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    p.role === "Facilitadora"
                      ? "bg-primary/20 text-dark-teal-300"
                      : p.role === "Practicante"
                        ? "bg-deep-ocean-600/20 text-deep-ocean-300"
                        : "bg-[#5f6368]/20 text-[#9aa0a6]"
                  }`}
                >
                  {p.role}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile step tabs */}
          <div className="flex gap-1.5 sm:hidden">
            {etapas.map((e, i) => (
              <button
                key={i}
                onClick={() => i <= etapaActual && setEtapaActual(i)}
                disabled={i > etapaActual}
                className={`flex-1 rounded-lg py-2 text-center text-xs font-semibold transition-colors ${
                  i === etapaActual
                    ? "bg-deep-ocean-600 text-[#e8eaed]"
                    : i < etapaActual
                      ? "bg-[#3c4043] text-[#e8eaed]"
                      : "bg-[#2d2e30] text-[#5f6368]"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </main>

        {/* ===== SIDE PANEL ===== */}
        <aside className="flex w-full flex-col border-t border-[#3c4043] bg-[#292a2d] lg:w-80 lg:border-l lg:border-t-0">
          {/* Panel header */}
          <div className="flex items-center gap-2 border-b border-[#3c4043] px-4 py-3">
            <ClipboardList className="h-4 w-4 text-[#9aa0a6]" />
            <span className="text-sm font-semibold text-[#e8eaed]">
              Panel de trabajo
            </span>
            <span className="ml-auto rounded-full bg-deep-ocean-600/20 px-2 py-0.5 text-xs font-medium text-deep-ocean-300">
              Paso {etapaActual + 1}/4
            </span>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Current stage */}
            <div className="mb-4 rounded-xl bg-[#3c4043] p-4">
              <h2 className="mb-1 text-lg font-bold text-[#e8eaed]">
                {etapa.titulo}
              </h2>
              <p className="text-sm leading-relaxed text-[#9aa0a6]">
                {etapa.descripcion}
              </p>
            </div>

            {/* Stage 0: Assigned seniors */}
            {etapaActual === 0 && (
              <div className="mb-4 rounded-xl border border-[#3c4043] p-4">
                <p className="mb-3 text-xs font-semibold tracking-wide text-deep-ocean-400 uppercase">
                  Emprendedores asignados
                </p>
                <div className="space-y-3">
                  {seniors.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5f6368] text-sm font-bold text-[#e8eaed]">
                        {s.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#e8eaed]">
                          {s.name}
                        </p>
                        <p className="text-xs text-[#9aa0a6]">{s.business}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 1: Task checklist */}
            {etapaActual === 1 && (
              <div className="mb-4 space-y-2">
                <p className="text-xs font-semibold tracking-wide text-deep-ocean-400 uppercase">
                  Tareas por completar
                </p>
                {tasks.map((task, i) => (
                  <button
                    key={i}
                    onClick={() => toggleTask(i)}
                    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                      taskStates[i]
                        ? "bg-[#34a853]/10"
                        : "bg-[#3c4043] hover:bg-[#4a4b4e]"
                    }`}
                  >
                    {taskStates[i] ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#34a853]" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-[#5f6368]" />
                    )}
                    <span
                      className={`text-sm leading-relaxed ${
                        taskStates[i]
                          ? "text-[#9aa0a6] line-through"
                          : "text-[#e8eaed]"
                      }`}
                    >
                      {task}
                    </span>
                  </button>
                ))}
                <p className="pt-1 text-center text-xs text-[#9aa0a6]">
                  {taskStates.filter(Boolean).length}/{tasks.length} completadas
                </p>
              </div>
            )}

            {/* Stage 2: Upload */}
            {etapaActual === 2 && (
              <div className="mb-4 rounded-xl border border-dashed border-[#5f6368] p-5 text-center">
                {uploaded ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="h-10 w-10 text-[#34a853]" />
                    <p className="text-sm font-semibold text-[#34a853]">
                      Avance subido correctamente
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="h-10 w-10 text-[#5f6368]" />
                    <p className="text-sm text-[#9aa0a6]">
                      Sube captura o foto de lo completado
                    </p>
                    <Button
                      size="sm"
                      onClick={() => setUploaded(true)}
                      className="rounded-full bg-deep-ocean-600 px-6 text-sm font-semibold text-[#e8eaed] hover:bg-deep-ocean-700"
                    >
                      Subir avance
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Stage 3: Summary */}
            {etapaActual === 3 && (
              <div className="mb-4 rounded-xl border border-[#34a853]/30 bg-[#34a853]/10 p-4">
                <p className="mb-2 text-xs font-semibold tracking-wide text-[#34a853] uppercase">
                  Resumen del taller
                </p>
                <p className="text-sm leading-relaxed text-[#e8eaed]">
                  Completaste {taskStates.filter(Boolean).length} de{" "}
                  {tasks.length} tareas con tus emprendedores asignados.
                  {uploaded && " Tu avance fue subido exitosamente."}
                </p>
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="border-t border-[#3c4043] p-4">
            <Button
              size="lg"
              onClick={handleNext}
              className="h-12 w-full rounded-full bg-deep-ocean-600 text-base font-bold text-[#e8eaed] hover:bg-deep-ocean-700"
            >
              {etapaActual < 3 ? "Siguiente paso" : "Terminar taller"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </aside>
      </div>

      {/* ===== BOTTOM CONTROL BAR ===== */}
      <footer className="flex items-center justify-center gap-3 border-t border-[#3c4043] bg-[#202124] px-4 py-3">
        <button
          onClick={() => setMicOn(!micOn)}
          aria-label={micOn ? "Silenciar microfono" : "Activar microfono"}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            micOn
              ? "bg-[#3c4043] text-[#e8eaed] hover:bg-[#4a4b4e]"
              : "bg-[#ea4335] text-[#fff] hover:bg-[#d93025]"
          }`}
        >
          {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </button>
        <button
          onClick={() => setVideoOn(!videoOn)}
          aria-label={videoOn ? "Apagar camara" : "Encender camara"}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            videoOn
              ? "bg-[#3c4043] text-[#e8eaed] hover:bg-[#4a4b4e]"
              : "bg-[#ea4335] text-[#fff] hover:bg-[#d93025]"
          }`}
        >
          {videoOn ? (
            <Video className="h-5 w-5" />
          ) : (
            <VideoOff className="h-5 w-5" />
          )}
        </button>
        <button
          aria-label="Compartir pantalla"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3c4043] text-[#e8eaed] transition-colors hover:bg-[#4a4b4e]"
        >
          <MonitorUp className="h-5 w-5" />
        </button>
        <button
          aria-label="Chat"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3c4043] text-[#e8eaed] transition-colors hover:bg-[#4a4b4e]"
        >
          <MessageSquare className="h-5 w-5" />
        </button>

        <div className="mx-2 h-8 w-px bg-[#3c4043]" />

        <button
          onClick={() => navigateTo("practicante-post-taller")}
          aria-label="Salir del taller"
          className="flex h-12 items-center gap-2 rounded-full bg-[#ea4335] px-5 text-sm font-semibold text-[#fff] transition-colors hover:bg-[#d93025]"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </footer>
    </div>
  )
}
