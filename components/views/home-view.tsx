"use client"

import { useApp } from "@/lib/app-context"
import { Users, GraduationCap, ArrowRight, Sparkles, Heart, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeView() {
  const { navigateTo } = useApp()

  const handleSenior = () => {
    navigateTo("dashboard")
  }

  const handlePracticante = () => {
    navigateTo("practicante-registro")
  }

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-dark-teal-800 px-4 py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-deep-ocean-500" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-dark-teal-500" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-dark-teal-700/50 px-4 py-1.5 text-sm text-dark-teal-100">
            <Sparkles className="h-4 w-4" />
            Hackaton Plateada 50+ 2026
          </div>
          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            No ensenamos.{" "}
            <span className="text-deep-ocean-400">Ejecutamos juntos.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-pretty text-lg leading-relaxed text-dark-teal-100/80">
            Conectamos emprendedores +50 con personal especializado para
            ejecutar las tareas digitales y de gestion que no puedes hacer solo.
          </p>

          <div className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
            <button
              onClick={handleSenior}
              className="group flex flex-1 items-center gap-4 rounded-xl bg-card p-5 text-left shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-dark-teal-50 text-dark-teal-600 transition-colors group-hover:bg-dark-teal-600 group-hover:text-primary-foreground">
                <Users className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-dark-teal-900">Soy Emprendedor +50</p>
                <p className="text-sm text-platinum-500">
                  Quiero participar en un taller gratuito
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-platinum-300 transition-transform group-hover:translate-x-1 group-hover:text-dark-teal-600" />
            </button>

            <button
              onClick={handlePracticante}
              className="group flex flex-1 items-center gap-4 rounded-xl bg-dark-teal-700/40 p-5 text-left shadow-lg backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-deep-ocean-500/20 text-deep-ocean-400 transition-colors group-hover:bg-deep-ocean-500 group-hover:text-dark-teal-900">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-primary-foreground">
                  Soy Practicante
                </p>
                <p className="text-sm text-dark-teal-200/70">
                  Quiero ganar experiencia real
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-dark-teal-300/50 transition-transform group-hover:translate-x-1 group-hover:text-deep-ocean-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-background px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-dark-teal-600">
            Como funciona
          </h2>
          <p className="mb-12 text-center text-2xl font-bold text-dark-teal-900 md:text-3xl">
            Tres pasos para transformar tu negocio
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Asiste a un taller",
                description:
                  "Sesion de 60 min donde sales con algo funcionando: tu Instagram, tu catalogo o tu precio listo.",
                color: "bg-dark-wine-500",
              },
              {
                icon: Target,
                title: "Conecta con tu practicante",
                description:
                  "Un estudiante universitario te acompana 1:1 para ejecutar juntos las tareas de tu negocio.",
                color: "bg-dark-teal-600",
              },
              {
                icon: Sparkles,
                title: "Crece con acompanamiento",
                description:
                  "Contrata un paquete mensual y recibe contenido, gestion de precios y presencia digital continua.",
                color: "bg-deep-ocean-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-primary-foreground`}
                >
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-dark-teal-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-platinum-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pale-oak-50 px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-2xl font-bold text-dark-teal-900">
            El emprendedor +50 no necesita otro curso.
          </p>
          <p className="mb-8 text-platinum-500">
            Necesita que alguien haga con el lo que no puede hacer solo.
          </p>
          <Button
            size="lg"
            onClick={handleSenior}
            className="bg-dark-teal-600 text-primary-foreground hover:bg-dark-teal-700"
          >
            Quiero participar en un taller
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
