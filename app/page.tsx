"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import type { AppView } from "@/lib/app-context"
import { Header } from "@/components/layout/header"
import { PageTransition } from "@/components/shared/page-transition"
import { LoginView } from "@/components/views/login-view"
import { DashboardView } from "@/components/views/dashboard-view"
import { HomeView } from "@/components/views/home-view"
import { TallerConfirmacion } from "@/components/views/taller-confirmacion"
import { TallerRoom } from "@/components/views/taller-room"
import { ConversionCard } from "@/components/views/conversion-card"
import { AgendarDiagnostico } from "@/components/views/agendar-diagnostico"
import { DiagnosticoRoom } from "@/components/views/diagnostico-room"
import { PlanPropuesta } from "@/components/views/plan-propuesta"
import { PlanPreparando } from "@/components/views/plan-preparando"
import { ContratoDigital } from "@/components/views/contrato-digital"
import { MisPlanes } from "@/components/views/mis-planes"
import { ProyectoSimulado } from "@/components/views/proyecto-simulado"
import { TalleresView } from "@/components/views/talleres-view"
import { PracticanteRegistro } from "@/components/views/practicante-registro"
import { PracticanteTallerRoom } from "@/components/views/practicante-taller-room"
import { PracticantePostTaller } from "@/components/views/practicante-post-taller"
import { PracticanteProyecto } from "@/components/views/practicante-proyecto"

/* Tipo de transición según la vista destino */
function getTransitionType(view: AppView): "fade" | "slide" | "zoom" {
  switch (view) {
    // Vistas inmersivas / de acción: zoom
    case "contrato-digital":
    case "plan-propuesta":
    case "plan-preparando":
    case "conversion-card":
      return "zoom"
    // Flujo lineal / pasos intermedios: slide
    case "taller-confirmacion":
    case "agendar-diagnostico":
    case "diagnostico-room":
    case "taller-room":
    case "practicante-taller-room":
    case "practicante-post-taller":
    case "practicante-proyecto":
    case "proyecto-simulado":
      return "slide"
    // Navegación principal: fade
    default:
      return "fade"
  }
}

function AppShell() {
  const { currentView, isLoggedIn } = useApp()

  // Login screen — no header
  if (!isLoggedIn || currentView === "login") {
    return (
      <PageTransition viewKey="login" type="fade">
        <LoginView />
      </PageTransition>
    )
  }

  // Immersive views — no header (Meet rooms)
  const isImmersive =
    currentView === "taller-room" ||
    currentView === "practicante-taller-room" ||
    currentView === "diagnostico-room"

  if (isImmersive) {
    return (
      <PageTransition viewKey={currentView} type="slide">
        {currentView === "taller-room" && <TallerRoom />}
        {currentView === "practicante-taller-room" && <PracticanteTallerRoom />}
        {currentView === "diagnostico-room" && <DiagnosticoRoom />}
      </PageTransition>
    )
  }

  const transitionType = getTransitionType(currentView)

  // Standard views with header
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageTransition viewKey={currentView} type={transitionType}>
          {currentView === "home" && <HomeView />}
          {currentView === "dashboard" && <DashboardView />}
          {currentView === "taller-confirmacion" && <TallerConfirmacion />}
          {currentView === "conversion-card" && <ConversionCard />}
          {currentView === "agendar-diagnostico" && <AgendarDiagnostico />}
          {currentView === "plan-propuesta" && <PlanPropuesta />}
          {currentView === "plan-preparando" && <PlanPreparando />}
          {currentView === "contrato-digital" && <ContratoDigital />}
          {currentView === "mis-planes" && <MisPlanes />}
          {currentView === "proyecto-simulado" && <ProyectoSimulado />}
          {currentView === "talleres" && <TalleresView />}
          {currentView === "practicante-registro" && <PracticanteRegistro />}
          {currentView === "practicante-post-taller" && <PracticantePostTaller />}
          {currentView === "practicante-proyecto" && <PracticanteProyecto />}
        </PageTransition>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
