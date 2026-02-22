"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowRight, CheckCircle2, Award, Briefcase, Users } from "lucide-react"

export function PracticanteRegistro() {
  const { setPracticanteData, navigateTo } = useApp()
  const [name, setName] = useState("")
  const [university, setUniversity] = useState("")
  const [career, setCareer] = useState("")
  const [registered, setRegistered] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPracticanteData({ name: name || "Practicante", university, career })
    setRegistered(true)
  }

  if (registered) {
    return (
      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-ocean-500/15">
            <CheckCircle2 className="h-8 w-8 text-ocean-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-teal-900">
            Bienvenido, {name || "Practicante"}
          </h1>
          <p className="mb-8 text-platinum-500">
            Te hemos asignado al Taller de Instagram. Entra para conocer a los
            emprendedores que acompanarás.
          </p>

          {/* Benefits */}
          <div className="mb-8 space-y-3 text-left">
            {[
              {
                icon: Award,
                text: "Certificado de practicas preprofesionales",
              },
              { icon: Briefcase, text: "Portafolio con proyectos reales" },
              {
                icon: Users,
                text: "Experiencia de acompanamiento 1:1",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-teal-50 p-3"
              >
                <b.icon className="h-5 w-5 text-teal-600" />
                <span className="text-sm text-teal-800">{b.text}</span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            onClick={() => navigateTo("practicante-taller-room")}
            className="w-full bg-teal-600 text-primary-foreground hover:bg-teal-700"
          >
            Entrar al Taller
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-primary-foreground">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-teal-900">
          Registro de Practicante
        </h1>
        <p className="text-platinum-500">
          Completa tus datos para unirte como practicante voluntario en
          ACTIVA 50+.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-teal-800"
          >
            Nombre completo
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-platinum-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="university"
            className="mb-1.5 block text-sm font-medium text-teal-800"
          >
            Universidad / Instituto
          </label>
          <select
            id="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="">Selecciona tu institucion</option>
            <option value="PUCP">PUCP</option>
            <option value="UPC">UPC</option>
            <option value="ULIMA">Universidad de Lima</option>
            <option value="Toulouse">Toulouse Lautrec</option>
            <option value="ISIL">ISIL</option>
            <option value="Otra">Otra</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="career"
            className="mb-1.5 block text-sm font-medium text-teal-800"
          >
            Carrera
          </label>
          <select
            id="career"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="">Selecciona tu carrera</option>
            <option value="Marketing">Marketing</option>
            <option value="Diseño">Diseno Grafico</option>
            <option value="Administración">Administracion</option>
            <option value="Contabilidad">Contabilidad</option>
            <option value="Comunicaciones">Comunicaciones</option>
            <option value="Otra">Otra</option>
          </select>
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full bg-teal-600 text-primary-foreground hover:bg-teal-700"
        >
          Registrarme como practicante
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
