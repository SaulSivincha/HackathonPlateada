"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import { Header } from "@/components/layout/header"
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
import { PracticanteRegistro } from "@/components/views/practicante-registro"
import { PracticanteTallerRoom } from "@/components/views/practicante-taller-room"
import { PracticantePostTaller } from "@/components/views/practicante-post-taller"
import { PracticanteProyecto } from "@/components/views/practicante-proyecto"

function AppShell() {
  const { currentView, isLoggedIn } = useApp()

  // Login screen — no header
  if (!isLoggedIn || currentView === "login") {
    return <LoginView />
  }

  // Immersive views — no header (Meet rooms)
  const isImmersive =
    currentView === "taller-room" ||
    currentView === "practicante-taller-room" ||
    currentView === "diagnostico-room"

  if (isImmersive) {
    return (
      <>
        {currentView === "taller-room" && <TallerRoom />}
        {currentView === "practicante-taller-room" && <PracticanteTallerRoom />}
        {currentView === "diagnostico-room" && <DiagnosticoRoom />}
      </>
    )
  }

  // Standard views with header
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
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
        {currentView === "practicante-registro" && <PracticanteRegistro />}
        {currentView === "practicante-post-taller" && <PracticantePostTaller />}
        {currentView === "practicante-proyecto" && <PracticanteProyecto />}
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
