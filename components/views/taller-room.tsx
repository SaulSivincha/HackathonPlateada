"use client"

import { useState, useEffect, useCallback } from "react"
import { useApp } from "@/lib/app-context"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MonitorUp,
  MessageSquare,
  PhoneOff,
  Users,
  X,
} from "lucide-react"

const participants = [
  { initials: "FM", name: "Facilitadora Maria", role: "host" },
  { initials: "TU", name: "Tu", role: "self" },
  { initials: "MP", name: "Maria P.", role: "practicante" },
  { initials: "RG", name: "Roberto G.", role: "emprendedor" },
  { initials: "LC", name: "Laura C.", role: "practicante" },
  { initials: "JV", name: "Jose V.", role: "emprendedor" },
]

const chatMessages = [
  { from: "Facilitadora Maria", text: "Bienvenidos al taller, en un momento comenzamos." },
  { from: "Maria P.", text: "Hola a todos!" },
  { from: "Roberto G.", text: "Buenos dias, listo para aprender." },
]

export function TallerRoom() {
  const { selectedTaller, navigateTo, completarTaller } = useApp()
  const [videoOn, setVideoOn] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)
  const [meetingEnded, setMeetingEnded] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  // Timer del meeting
  useEffect(() => {
    if (meetingEnded) return
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [meetingEnded])

  // Redirige inmediatamente a conversion-card al terminar el taller
  useEffect(() => {
    if (!meetingEnded) return
    if (selectedTaller) completarTaller(selectedTaller.id)
    navigateTo("conversion-card")
  }, [meetingEnded, navigateTo, completarTaller, selectedTaller])

  const formatTime = useCallback((secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0")
    const s = (secs % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }, [])

  if (!selectedTaller) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#202124]">
        <p className="text-xl text-[#e8eaed]">No hay taller seleccionado.</p>
        <button
          onClick={() => navigateTo("dashboard")}
          className="rounded-full bg-[#8ab4f8] px-8 py-3 text-base font-semibold text-[#202124] hover:bg-[#aecbfa]"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  /* ===== ACTIVE MEETING ===== */
  return (
    <div className="flex h-screen flex-col bg-[#202124]">
      {/* TOP BAR */}
      <header className="flex shrink-0 items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-[#e8eaed]">
            {selectedTaller.title}
          </span>
          <span className="hidden items-center gap-1.5 text-xs text-[#9aa0a6] sm:flex">
            <span className="inline-block h-2 w-2 rounded-full bg-[#34a853]" />
            En vivo
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#9aa0a6]">
          <span className="font-mono">{formatTime(elapsed)}</span>
          <div className="h-4 w-px bg-[#3c4043]" />
          <Users className="h-4 w-4" />
          <span>{participants.length}</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex min-h-0 flex-1">
        {/* Video grid */}
        <main className="flex flex-1 flex-col p-2">
          <div className="grid flex-1 auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-3">
            {participants.map((p, i) => (
              <div
                key={i}
                className={`relative flex flex-col items-center justify-center overflow-hidden rounded-lg bg-[#3c4043] ${
                  p.role === "self" ? "ring-2 ring-[#8ab4f8]" : ""
                }`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold sm:h-20 sm:w-20 sm:text-2xl ${
                    p.role === "host"
                      ? "bg-[#8ab4f8] text-[#202124]"
                      : p.role === "practicante"
                        ? "bg-[#81c995] text-[#202124]"
                        : p.role === "self"
                          ? "bg-[#f28b82] text-[#202124]"
                          : "bg-[#e8eaed]/20 text-[#e8eaed]"
                  }`}
                >
                  {p.initials}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000]/60 to-transparent px-3 pb-2 pt-6">
                  <span className="text-xs font-medium text-[#e8eaed] sm:text-sm">
                    {p.role === "self" ? "Tu" : p.name}
                  </span>
                </div>
                {p.role === "self" && !micOn && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#ea4335]">
                    <MicOff className="h-3 w-3 text-[#fff]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        {/* Chat panel */}
        {chatOpen && (
          <aside className="flex w-72 flex-col border-l border-[#3c4043] bg-[#292a2d] lg:w-80">
            <div className="flex items-center justify-between border-b border-[#3c4043] px-4 py-3">
              <span className="text-sm font-semibold text-[#e8eaed]">Chat</span>
              <button
                onClick={() => setChatOpen(false)}
                className="rounded-full p-1 text-[#9aa0a6] hover:bg-[#3c4043]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {chatMessages.map((msg, i) => (
                <div key={i}>
                  <p className="text-xs font-semibold text-[#8ab4f8]">{msg.from}</p>
                  <p className="mt-0.5 text-sm text-[#e8eaed]">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[#3c4043] p-3">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="w-full rounded-full bg-[#3c4043] px-4 py-2 text-sm text-[#e8eaed] placeholder-[#9aa0a6] outline-none focus:ring-1 focus:ring-[#8ab4f8]"
              />
            </div>
          </aside>
        )}
      </div>

      {/* BOTTOM CONTROLS */}
      <footer className="flex shrink-0 items-center justify-center gap-3 px-4 py-3 sm:gap-4">
        <button
          onClick={() => setMicOn(!micOn)}
          aria-label={micOn ? "Silenciar microfono" : "Activar microfono"}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            micOn
              ? "bg-[#3c4043] text-[#e8eaed] hover:bg-[#4a4b4e]"
              : "bg-[#ea4335] text-[#fff]"
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
              : "bg-[#ea4335] text-[#fff]"
          }`}
        >
          {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </button>

        <button
          aria-label="Compartir pantalla"
          className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#3c4043] text-[#e8eaed] hover:bg-[#4a4b4e] sm:flex"
        >
          <MonitorUp className="h-5 w-5" />
        </button>

        <button
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Abrir chat"
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            chatOpen
              ? "bg-[#8ab4f8] text-[#202124]"
              : "bg-[#3c4043] text-[#e8eaed] hover:bg-[#4a4b4e]"
          }`}
        >
          <MessageSquare className="h-5 w-5" />
        </button>

        <div className="mx-1 h-8 w-px bg-[#3c4043] sm:mx-2" />

        <button
          onClick={() => setMeetingEnded(true)}
          className="flex h-12 items-center gap-2 rounded-full bg-[#ea4335] px-6 font-semibold text-[#fff] hover:bg-[#d93025]"
        >
          <PhoneOff className="h-5 w-5" />
          <span className="hidden text-sm sm:inline">Salir</span>
        </button>
      </footer>
    </div>
  )
}
