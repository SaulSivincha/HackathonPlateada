"use client"

import { useApp } from "@/lib/app-context"
import { ArrowLeft, LayoutDashboard, LogOut, CalendarDays, BookOpen, FolderKanban } from "lucide-react"
import { Button } from "@/components/ui/button"

const emprendedorNav = [
  { label: "Consultoria Gratis", view: "agendar-diagnostico" as const, icon: CalendarDays },
  { label: "Planes", view: "mis-planes" as const, icon: BookOpen },
  { label: "Tus Proyectos", view: "proyecto-simulado" as const, icon: FolderKanban },
]

export function Header() {
  const { currentView, navigateTo, role, userName, logout } = useApp()

  const handleBack = () => {
    if (currentView === "dashboard") return

    // Emprendedor: most views go back to dashboard
    if (role === "emprendedor") {
      const backMap: Record<string, string> = {
        talleres: "dashboard",
        "taller-confirmacion": "talleres",
        "conversion-card": "dashboard",
        "agendar-diagnostico": "conversion-card",
        "plan-propuesta": "dashboard",
        "contrato-digital": "plan-propuesta",
        "mis-planes": "dashboard",
        "proyecto-simulado": "mis-planes",
      }
      navigateTo((backMap[currentView] as typeof currentView) || "dashboard")
    } else if (role === "practicante") {
      const backMap: Record<string, string> = {
        "practicante-registro": "dashboard",
        "practicante-post-taller": "dashboard",
        "practicante-proyecto": "practicante-post-taller",
      }
      navigateTo((backMap[currentView] as typeof currentView) || "dashboard")
    } else {
      navigateTo("dashboard")
    }
  }

  const roleLabel =
    role === "emprendedor"
      ? "Emprendedor"
      : role === "practicante"
        ? "Practicante"
        : "Supervisor"

  const firstName = userName.split(" ")[0]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* LEFT: back button + logo */}
        <div className="flex items-center gap-3">
          {currentView !== "dashboard" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="text-dark-teal-700 hover:bg-dark-teal-50"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Volver</span>
            </Button>
          )}
          <button
            onClick={() => navigateTo("dashboard")}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-teal-600 text-primary-foreground">
              <span className="text-sm font-bold">A+</span>
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-bold leading-tight text-dark-teal-900">
                ACTIVA 50+
              </span>
              <span className="text-[10px] leading-tight text-platinum-500">
                Ejecutamos juntos
              </span>
            </div>
          </button>
        </div>

        {/* CENTER: nav links — solo emprendedor */}
        {role === "emprendedor" && (
          <nav className="hidden items-center gap-1 md:flex">
            {emprendedorNav.map(({ label, view, icon: Icon }) => {
              const isActive = currentView === view
              return (
                <button
                  key={view}
                  onClick={() => navigateTo(view)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-dark-teal-600 text-white"
                      : "text-platinum-600 hover:bg-dark-teal-50 hover:text-dark-teal-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              )
            })}
          </nav>
        )}

        {/* RIGHT: user info + logout */}
        <div className="flex items-center gap-2">
          {currentView !== "dashboard" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateTo("dashboard")}
              className="hidden text-platinum-500 hover:bg-dark-teal-50 hover:text-dark-teal-700 sm:flex"
            >
              <LayoutDashboard className="mr-1.5 h-4 w-4" />
              Inicio
            </Button>
          )}

          <span className="rounded-full bg-dark-teal-50 px-3 py-1 text-xs font-medium text-dark-teal-700">
            {firstName} &middot; {roleLabel}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="text-platinum-500 hover:bg-dark-wine-50 hover:text-dark-wine-500"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Cerrar sesion</span>
          </Button>
        </div>
      </div>

      {/* MOBILE nav — solo emprendedor */}
      {role === "emprendedor" && (
        <div className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
          {emprendedorNav.map(({ label, view, icon: Icon }) => {
            const isActive = currentView === view
            return (
              <button
                key={view}
                onClick={() => navigateTo(view)}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-dark-teal-600 text-white"
                    : "text-platinum-600 hover:bg-dark-teal-50 hover:text-dark-teal-800"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            )
          })}
        </div>
      )}
    </header>
  )
}
