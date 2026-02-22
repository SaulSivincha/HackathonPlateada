"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "emprendedor" | "practicante" | "supervisor" | null

export type AppView =
  | "login"
  | "home"
  | "dashboard"
  | "talleres"
  | "taller-confirmacion"
  | "taller-room"
  | "conversion-card"
  | "agendar-diagnostico"
  | "diagnostico-room"
  | "plan-preparando"
  | "plan-propuesta"
  | "contrato-digital"
  | "mis-planes"
  | "proyecto-simulado"
  | "practicante-registro"
  | "practicante-taller-room"
  | "practicante-post-taller"
  | "practicante-proyecto"

export interface TallerInfo {
  id: number
  title: string
  description: string
  icon: string
  prereqs: string
  deliverables: string[]
  price: string
  capacity: string
}

interface ReunionAgendada {
  tipo: "diagnostico" | "taller"
  titulo: string
  fecha: string
  hora: string
}

interface AppContextType {
  // Auth
  isLoggedIn: boolean
  userName: string
  role: UserRole
  login: (name: string, role: UserRole) => void
  logout: () => void
  // Navigation
  currentView: AppView
  navigateTo: (view: AppView) => void
  // Data
  selectedTaller: TallerInfo | null
  setSelectedTaller: (taller: TallerInfo | null) => void
  practicanteData: { name: string; university: string; career: string } | null
  setPracticanteData: (data: { name: string; university: string; career: string } | null) => void
  selectedService: string | null
  setSelectedService: (service: string | null) => void
  reunionAgendada: ReunionAgendada | null
  setReunionAgendada: (r: ReunionAgendada | null) => void
  contratoFirmado: boolean
  setContratoFirmado: (v: boolean) => void
  planesAdquiridos: string[]
  agregarPlan: (v: string) => void
  talleresInscritos: number[]
  inscribirseTaller: (id: number) => void
  talleresAgendados: number[]
  agendarTaller: (id: number) => void
  completarTaller: (id: number) => void
  planPreparando: boolean
  setPlanPreparando: (v: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [role, setRole] = useState<UserRole>(null)
  const [currentView, setCurrentView] = useState<AppView>("login")
  const [selectedTaller, setSelectedTaller] = useState<TallerInfo | null>(null)
  const [practicanteData, setPracticanteData] = useState<{
    name: string
    university: string
    career: string
  } | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [reunionAgendada, setReunionAgendada] = useState<ReunionAgendada | null>(null)
  const [contratoFirmado, setContratoFirmado] = useState(false)
  const [planesAdquiridos, setPlanesAdquiridos] = useState<string[]>([])

  const agregarPlan = (id: string) => {
    setPlanesAdquiridos((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }
  const [talleresInscritos, setTalleresInscritos] = useState<number[]>([])
  const [talleresAgendados, setTalleresAgendados] = useState<number[]>([])
  const [planPreparando, setPlanPreparando] = useState(false)

  const inscribirseTaller = (id: number) => {
    setTalleresInscritos((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const agendarTaller = (id: number) => {
    setTalleresAgendados((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const completarTaller = (id: number) => {
    setTalleresAgendados((prev) => prev.filter((t) => t !== id))
  }

  const login = (name: string, selectedRole: UserRole) => {
    setUserName(name)
    setRole(selectedRole)
    setIsLoggedIn(true)
    if (selectedRole === "emprendedor") {
      setCurrentView("dashboard")
    } else if (selectedRole === "practicante") {
      setCurrentView("practicante-registro")
    } else {
      setCurrentView("dashboard")
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserName("")
    setRole(null)
    setCurrentView("login")
    setSelectedTaller(null)
    setReunionAgendada(null)
    setContratoFirmado(false)
    setSelectedService(null)
    setPlanesAdquiridos([])
    setTalleresInscritos([])
    setTalleresAgendados([])
    setPlanPreparando(false)
  }

  const navigateTo = (view: AppView) => {
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        userName,
        role,
        login,
        logout,
        currentView,
        navigateTo,
        selectedTaller,
        setSelectedTaller,
        practicanteData,
        setPracticanteData,
        selectedService,
        setSelectedService,
        reunionAgendada,
        setReunionAgendada,
        contratoFirmado,
        setContratoFirmado,
        planesAdquiridos,
        agregarPlan,
        talleresInscritos,
        inscribirseTaller,
        talleresAgendados,
        agendarTaller,
        completarTaller,
        planPreparando,
        setPlanPreparando,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
