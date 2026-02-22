"use client"

import { useApp } from "@/lib/app-context"
import {
  ArrowRight,
  GraduationCap,
  CalendarDays,
  BookOpen,
  FolderKanban,
  Sparkles,
} from "lucide-react"

export function DashboardView() {
  const {
    userName,
    navigateTo,
    reunionAgendada,
    contratoFirmado,
    planesAdquiridos,
    talleresAgendados,
    planPreparando,
  } = useApp()

  const firstName = userName.split(" ")[0]

  /* ── Estado dinámico de cada sección ── */
  const talleresCount = talleresAgendados.length
  const tieneReunion = !!reunionAgendada
  const tienePlan = planesAdquiridos.length > 0
  const tieneProyecto = contratoFirmado
  const esNuevo = !tieneReunion && !tienePlan && !tieneProyecto && talleresCount === 0 && !planPreparando

  const secciones = [
    {
      icon: GraduationCap,
      titulo: "Capacitate",
      descripcion: talleresCount > 0
        ? `Tienes ${talleresCount} taller${talleresCount > 1 ? "es" : ""} agendado${talleresCount > 1 ? "s" : ""}`
        : "Talleres virtuales gratis de 60 minutos para tu negocio",
      boton: talleresCount > 0 ? "Ver mis talleres" : "Explorar talleres",
      destino: "talleres" as const,
      activo: talleresCount > 0,
    },
    {
      icon: CalendarDays,
      titulo: "Consultoria Gratis",
      descripcion: planPreparando
        ? "Tu plan esta listo. Revisalo cuando quieras"
        : tieneReunion
          ? `Reunion agendada para ${reunionAgendada!.fecha}`
          : "Agenda una reunion gratuita de 30 minutos con un especialista",
      boton: planPreparando
        ? "Ver mi plan sugerido"
        : tieneReunion
          ? "Ver mi reunion"
          : "Agendar reunion gratis",
      destino: "agendar-diagnostico" as const,
      activo: tieneReunion || planPreparando,
    },
    {
      icon: BookOpen,
      titulo: "Planes",
      descripcion: tienePlan
        ? "Ya tienes un plan contratado. Puedes ver los detalles"
        : "Planes con entregables concretos para hacer crecer tu negocio",
      boton: tienePlan ? "Ver mis planes" : "Ver planes disponibles",
      destino: "mis-planes" as const,
      activo: tienePlan,
    },
    {
      icon: FolderKanban,
      titulo: "Tus Proyectos",
      descripcion: tieneProyecto
        ? "Tu proyecto esta en marcha. Revisa el avance de tus entregables"
        : "Aqui veras el avance de tu proyecto cuando lo inicies",
      boton: tieneProyecto ? "Ver mi proyecto" : "Conocer mas",
      destino: "proyecto-simulado" as const,
      activo: tieneProyecto,
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">

      {/* ===== Saludo ===== */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-dark-teal-900">
          Hola, {firstName}
        </h1>
        <p className="mt-3 text-lg text-platinum-500">
          Bienvenida a tu espacio en ACTIVA 50+. Desde aqui puedes ver todo lo que esta pasando con tu negocio.
        </p>
      </div>

      {/* ===== 4 tarjetas de resumen ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {secciones.map((sec) => {
          const Icon = sec.icon
          return (
            <button
              key={sec.titulo}
              onClick={() => navigateTo(sec.destino)}
              className="flex flex-col items-start rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border text-left transition-all hover:shadow-md hover:ring-dark-teal-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                  sec.activo ? "bg-dark-teal-600 text-white" : "bg-dark-teal-50 text-dark-teal-600"
                }`}>
                  <Icon className="h-7 w-7" />
                </div>
                {sec.activo && (
                  <span className="rounded-full bg-dark-teal-100 px-3 py-1 text-base font-bold text-dark-teal-700">
                    Activo
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold text-dark-teal-900 mb-1">{sec.titulo}</h2>
              <p className="text-base text-platinum-500 mb-5 flex-1">{sec.descripcion}</p>

              <span className="flex items-center gap-2 rounded-xl bg-dark-teal-600 px-5 py-3 text-base font-bold text-white transition-colors hover:bg-dark-teal-700 self-stretch justify-center">
                {sec.boton}
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>
          )
        })}
      </div>

      {/* ===== Cómo funciona — solo si es nuevo ===== */}
      {esNuevo && (
        <section className="rounded-2xl bg-pale-oak-50 p-8 ring-1 ring-pale-oak-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dark-teal-600 text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-dark-teal-900">
              Como funciona ACTIVA 50+?
            </h2>
          </div>

          <p className="text-base text-platinum-600 mb-6 leading-relaxed">
            Conectamos emprendedores mayores de 50 con personal especializado que ejecutan contigo
            las tareas que tu negocio necesita para crecer. Asi de simple:
          </p>

          <div className="space-y-5">
            {[
              {
                paso: "1",
                titulo: "Capacitate gratis",
                desc: "Asiste a un taller virtual de 60 minutos y llevate herramientas concretas para tu negocio.",
              },
              {
                paso: "2",
                titulo: "Recibe una consultoria personalizada",
                desc: "Agenda una reunion gratuita de 30 minutos. Un especialista escuchara tu negocio y te propondra un plan.",
              },
              {
                paso: "3",
                titulo: "Recibe entregables concretos",
                desc: "Contrata un plan y recibe paso a paso lo que tu negocio necesita. Solo pagas por lo que recibes.",
              },
            ].map((step) => (
              <div key={step.paso} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark-teal-600 text-white">
                  <span className="text-lg font-bold">{step.paso}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-teal-900">{step.titulo}</h3>
                  <p className="mt-1 text-base text-platinum-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigateTo("talleres")}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-dark-teal-600 py-4 text-base font-bold text-white transition-colors hover:bg-dark-teal-700"
          >
            Empezar con un taller gratis
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>
      )}
    </div>
  )
}
