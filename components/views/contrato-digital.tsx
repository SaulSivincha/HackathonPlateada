"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"

interface HitoContrato {
  numero: number
  titulo: string
  entregable: string
  precio: string
  plazo: string
}

const contratosData: Record<
  string,
  { titulo: string; hitos: HitoContrato[]; total: string }
> = {
  digital: {
    titulo: "Plan Presencia Digital",
    total: "S/ 280",
    hitos: [
      { numero: 1, titulo: "Identidad visual del negocio", entregable: "Logo, colores y plantillas para redes", precio: "S/ 70", plazo: "Semana 1" },
      { numero: 2, titulo: "Perfiles de redes configurados", entregable: "Instagram y Facebook Business listos", precio: "S/ 50", plazo: "Semana 1-2" },
      { numero: 3, titulo: "Contenido del primer mes", entregable: "12 publicaciones + calendario de 30 dias", precio: "S/ 100", plazo: "Semana 2-3" },
      { numero: 4, titulo: "Catalogo digital en WhatsApp", entregable: "WhatsApp Business con catalogo y respuestas automaticas", precio: "S/ 60", plazo: "Semana 3-4" },
    ],
  },
  precios: {
    titulo: "Plan Gestion Basica",
    total: "S/ 320",
    hitos: [
      { numero: 1, titulo: "Inventario de productos y costos", entregable: "Lista completa con costo real de cada producto", precio: "S/ 80", plazo: "Semana 1" },
      { numero: 2, titulo: "Tabla de precios rentables", entregable: "Precios con margen de ganancia, lista para imprimir", precio: "S/ 70", plazo: "Semana 2" },
      { numero: 3, titulo: "Plantilla de control financiero", entregable: "Hoja de calculo para ingresos, gastos y ganancias", precio: "S/ 90", plazo: "Semana 2-3" },
      { numero: 4, titulo: "Reporte de situacion financiera", entregable: "Analisis y recomendaciones para tu negocio", precio: "S/ 80", plazo: "Semana 3-4" },
    ],
  },
  web: {
    titulo: "Plan Pagina Web",
    total: "S/ 350",
    hitos: [
      { numero: 1, titulo: "Diseno y estructura de la web", entregable: "Prototipo visual aprobado por ti", precio: "S/ 70", plazo: "Semana 1" },
      { numero: 2, titulo: "Pagina web publicada", entregable: "Web con catalogo, contacto y link a WhatsApp", precio: "S/ 150", plazo: "Semana 2-3" },
      { numero: 3, titulo: "Optimizacion para Google", entregable: "Configuracion SEO para busquedas locales", precio: "S/ 70", plazo: "Semana 3" },
      { numero: 4, titulo: "Material de difusion", entregable: "Tarjeta digital y QR con link a tu web", precio: "S/ 60", plazo: "Semana 4" },
    ],
  },
}

export function ContratoDigital() {
  const { selectedService, navigateTo, setContratoFirmado } = useApp()
  const [firmaNombre, setFirmaNombre] = useState("")
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const [firmado, setFirmado] = useState(false)

  const contrato = contratosData[selectedService || "digital"]
  const fechaHoy = new Date().toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const handleFirmar = () => {
    if (firmaNombre.trim() && aceptaTerminos) {
      setContratoFirmado(true)
      setFirmado(true)
    }
  }

  if (firmado) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-dark-teal-50">
            <ShieldCheck className="h-10 w-10 text-dark-teal-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-dark-teal-900">
            Contrato firmado con exito
          </h1>
          <p className="mb-2 text-lg text-platinum-500">{contrato.titulo}</p>
          <p className="mb-8 text-sm text-platinum-300">
            Firmado por:{" "}
            <span className="font-semibold text-dark-teal-700">{firmaNombre}</span> el{" "}
            {fechaHoy}
          </p>
          <div className="mb-8 rounded-2xl bg-dark-teal-50 p-5 text-left">
            <p className="mb-3 text-sm font-semibold text-dark-teal-800">Proximos pasos:</p>
            <div className="space-y-2">
              {[
                "Recibiras un correo con la copia del contrato",
                "En 48 horas te asignaremos tu practicante",
                "Tu practicante te contactara para empezar el Hito 1",
              ].map((paso, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-dark-teal-600" />
                  <span className="text-sm text-dark-teal-700">{paso}</span>
                </div>
              ))}
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => navigateTo("dashboard")}
            className="w-full bg-dark-teal-600 py-6 text-lg font-semibold text-primary-foreground hover:bg-dark-teal-700"
          >
            Volver a mi inicio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-platinum-50 px-4 py-8 sm:py-12">
      {/* A4 Document */}
      <div className="mx-auto w-full max-w-[210mm] rounded-lg bg-card shadow-2xl ring-1 ring-border">
        {/* ====== PAGE CONTENT ====== */}
        <div className="px-8 py-10 sm:px-12 sm:py-14">
          {/* Document header */}
          <div className="mb-8 border-b-2 border-dark-teal-600 pb-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-platinum-500">
                  Contrato de Servicio
                </p>
                <h1 className="mt-1 text-2xl font-bold text-dark-teal-900">
                  {contrato.titulo}
                </h1>
                <p className="mt-1 text-sm text-platinum-500">
                  ACTIVA 50+ -- Acompanamiento digital para emprendedores
                </p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-xs text-platinum-300">Fecha de emision</p>
                <p className="text-sm font-semibold text-dark-teal-800">{fechaHoy}</p>
                <p className="mt-2 text-xs text-platinum-300">N.o de contrato</p>
                <p className="text-sm font-semibold text-dark-teal-800">ACT-2026-0042</p>
              </div>
            </div>
          </div>

          {/* Section: How payment works */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-dark-teal-800">
              1. Como funciona el pago por hitos
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-dark-teal-700">
              <p>
                <span className="font-bold text-dark-teal-900">Solo pagas cuando recibes.</span>{" "}
                Cada hito tiene un costo fijo. Pagas ese monto unicamente cuando te entregamos el
                trabajo completado.
              </p>
              <p>
                <span className="font-bold text-dark-teal-900">Tu apruebas cada entrega.</span>{" "}
                Si el entregable no cumple lo acordado, se corrige sin costo adicional antes de
                pasar al siguiente hito.
              </p>
              <p>
                <span className="font-bold text-dark-teal-900">
                  Puedes cancelar en cualquier momento.
                </span>{" "}
                Solo pagas los hitos que ya fueron entregados y aprobados por ti.
              </p>
            </div>
          </div>

          {/* Section: Milestones table */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-dark-teal-800">
              2. Desglose de hitos y costos
            </h2>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-dark-teal-600">
                  <th className="py-2 pr-3 text-left font-semibold text-dark-teal-900">N.o</th>
                  <th className="py-2 pr-3 text-left font-semibold text-dark-teal-900">Hito</th>
                  <th className="hidden py-2 pr-3 text-left font-semibold text-dark-teal-900 sm:table-cell">
                    Plazo
                  </th>
                  <th className="py-2 text-right font-semibold text-dark-teal-900">Costo</th>
                </tr>
              </thead>
              <tbody>
                {contrato.hitos.map((hito) => (
                  <tr key={hito.numero} className="border-b border-platinum-100">
                    <td className="py-3 pr-3 align-top font-bold text-dark-teal-600">
                      {hito.numero}
                    </td>
                    <td className="py-3 pr-3 align-top">
                      <p className="font-semibold text-dark-teal-900">{hito.titulo}</p>
                      <p className="mt-0.5 text-xs text-platinum-500">{hito.entregable}</p>
                    </td>
                    <td className="hidden py-3 pr-3 align-top text-platinum-500 sm:table-cell">
                      {hito.plazo}
                    </td>
                    <td className="py-3 text-right align-top font-bold text-dark-teal-800">
                      {hito.precio}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-dark-teal-600">
                  <td colSpan={2} className="py-3 text-base font-bold text-dark-teal-900 sm:hidden">
                    Total del plan
                  </td>
                  <td className="hidden py-3 text-base font-bold text-dark-teal-900 sm:table-cell" colSpan={3}>
                    Total del plan
                  </td>
                  <td className="py-3 text-right text-xl font-bold text-dark-teal-600">
                    {contrato.total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Note */}
          <div className="mb-8 rounded-lg bg-pale-oak-50 px-5 py-4">
            <p className="text-sm leading-relaxed text-dark-teal-700">
              <span className="font-bold">Incluido sin costo adicional:</span> Una sesion final de
              capacitacion (1 hora) para que aprendas a continuar solo/a con todo lo que se
              construyo.
            </p>
          </div>

          {/* Section: Terms */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-dark-teal-800">
              3. Condiciones generales
            </h2>
            <ul className="space-y-2 text-sm leading-relaxed text-dark-teal-700">
              <li className="flex gap-2">
                <span className="shrink-0 text-dark-teal-500">{"a)"}</span>
                El servicio es prestado por practicantes universitarios supervisados por profesionales de ACTIVA 50+.
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-dark-teal-500">{"b)"}</span>
                Cada hito se paga una vez entregado y aprobado por el cliente. No se requieren pagos por adelantado.
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-dark-teal-500">{"c)"}</span>
                El cliente puede solicitar correcciones antes de aprobar cada entregable, sin costo adicional.
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-dark-teal-500">{"d)"}</span>
                El cliente puede cancelar el servicio en cualquier momento. Solo se cobran los hitos ya aprobados.
              </li>
            </ul>
          </div>

          {/* Divider before signature */}
          <hr className="mb-8 border-platinum-100" />

          {/* Section: Signature */}
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-dark-teal-800">
              4. Firma del cliente
            </h2>
            <div className="mb-4">
              <label
                htmlFor="firma-nombre"
                className="mb-1.5 block text-sm font-semibold text-dark-teal-800"
              >
                Nombre completo
              </label>
              <input
                id="firma-nombre"
                type="text"
                value={firmaNombre}
                onChange={(e) => setFirmaNombre(e.target.value)}
                placeholder="Ej: Mercedes Rodriguez"
                className="w-full rounded-lg border border-platinum-100 bg-background px-4 py-3 text-base text-foreground placeholder-platinum-300 outline-none focus:border-dark-teal-500 focus:ring-2 focus:ring-dark-teal-500/20"
              />
            </div>

            {firmaNombre.trim() && (
              <div className="mb-5 border-b-2 border-dark-teal-800 pb-1">
                <p
                  className="font-serif text-2xl italic text-dark-teal-900"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {firmaNombre}
                </p>
              </div>
            )}

            <label className="mb-6 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-platinum-300 accent-dark-teal-600"
              />
              <span className="text-sm leading-relaxed text-dark-teal-700">
                Acepto los terminos del servicio. Entiendo que solo pagare por cada hito cuando sea
                entregado y aprobado por mi, y que puedo cancelar en cualquier momento.
              </span>
            </label>

            <Button
              size="lg"
              onClick={handleFirmar}
              disabled={!firmaNombre.trim() || !aceptaTerminos}
              className="w-full bg-dark-teal-600 py-6 text-lg font-semibold text-primary-foreground hover:bg-dark-teal-700 disabled:opacity-40"
            >
              Firmar contrato
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
