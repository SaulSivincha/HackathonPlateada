"use client"

import { useState } from "react"
import { useApp, type UserRole } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, Shield, Eye, EyeOff, ArrowRight } from "lucide-react"

const roles: {
  value: UserRole
  label: string
  desc: string
  icon: typeof Users
}[] = [
  {
    value: "emprendedor",
    label: "Emprendedor +50",
    desc: "Quiero hacer crecer mi negocio con ayuda",
    icon: Users,
  },
  {
    value: "practicante",
    label: "Practicante universitario",
    desc: "Quiero ganar experiencia profesional real",
    icon: GraduationCap,
  },
  {
    value: "supervisor",
    label: "Supervisor",
    desc: "Gestiono practicantes y proyectos",
    icon: Shield,
  },
]

export function LoginView() {
  const { login } = useApp()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("emprendedor")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    login(name.trim(), selectedRole)
  }

  return (
    <div className="flex min-h-screen flex-col bg-pale-oak-50">
      {/* Top accent bar */}
      <div className="h-1.5 bg-dark-teal-600" />

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-dark-teal-600 shadow-lg shadow-dark-teal-600/20">
            <span className="text-xl font-bold text-primary-foreground">A+</span>
          </div>
          <h1 className="text-2xl font-bold text-dark-teal-900">ACTIVA 50+</h1>
          <p className="mt-1 text-sm text-platinum-500">
            Acompanamiento digital para emprendedores
          </p>
        </div>

        {/* Form card */}
        <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-lg shadow-dark-teal-900/5 ring-1 ring-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="login-name"
                className="mb-1.5 block text-sm font-semibold text-dark-teal-800"
              >
                Tu nombre
              </label>
              <input
                id="login-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre completo"
                autoComplete="name"
                className="w-full rounded-xl border border-border bg-pale-oak-50 px-4 py-3 text-base text-foreground placeholder:text-platinum-300 focus:border-dark-teal-500 focus:ring-2 focus:ring-dark-teal-500/20 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-pass"
                className="mb-1.5 block text-sm font-semibold text-dark-teal-800"
              >
                Contrasena
              </label>
              <div className="relative">
                <input
                  id="login-pass"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contrasena"
                  className="w-full rounded-xl border border-border bg-pale-oak-50 px-4 py-3 pr-12 text-base text-foreground placeholder:text-platinum-300 focus:border-dark-teal-500 focus:ring-2 focus:ring-dark-teal-500/20 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-platinum-500 hover:text-dark-teal-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Ocultar" : "Mostrar"} contrasena
                  </span>
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-dark-teal-800">
                Ingreso como...
              </label>
              <div className="space-y-2">
                {roles.map((r) => {
                  const isActive = selectedRole === r.value
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setSelectedRole(r.value)}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                        isActive
                          ? "border-dark-teal-500 bg-dark-teal-50"
                          : "border-border bg-card hover:border-platinum-300"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          isActive
                            ? "bg-dark-teal-600 text-primary-foreground"
                            : "bg-platinum-50 text-platinum-500"
                        }`}
                      >
                        <r.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-semibold ${
                            isActive
                              ? "text-dark-teal-800"
                              : "text-platinum-800"
                          }`}
                        >
                          {r.label}
                        </p>
                        <p className="text-xs text-platinum-500">{r.desc}</p>
                      </div>
                      {/* Radio indicator */}
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          isActive
                            ? "border-dark-teal-600 bg-dark-teal-600"
                            : "border-platinum-300"
                        }`}
                      >
                        {isActive && (
                          <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={!name.trim()}
              className="w-full bg-dark-teal-600 py-3 text-base font-bold text-primary-foreground shadow-md shadow-dark-teal-600/20 hover:bg-dark-teal-700 disabled:opacity-40 disabled:shadow-none"
            >
              Entrar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-platinum-300">
            Demo &mdash; Acepta cualquier dato para explorar
          </p>
        </div>
      </div>
    </div>
  )
}
