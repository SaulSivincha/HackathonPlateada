"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  label: string
  completed?: boolean
  active?: boolean
}

export function StepIndicator({ steps }: { steps: Step[] }) {
  return (
    <nav aria-label="Progreso del taller" className="w-full">
      <ol className="flex items-center justify-between gap-0">
        {steps.map((step, i) => (
          <li key={i} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  step.completed
                    ? "bg-dark-teal-200 text-dark-teal-800"
                    : step.active
                      ? "bg-primary-foreground text-dark-teal-800 ring-4 ring-dark-teal-300"
                      : "bg-dark-teal-700 text-dark-teal-400"
                )}
                aria-current={step.active ? "step" : undefined}
              >
                {step.completed ? (
                  <Check className="h-5 w-5" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  "text-center text-xs leading-tight",
                  step.active
                    ? "font-bold text-primary-foreground"
                    : step.completed
                      ? "font-medium text-dark-teal-200"
                      : "text-dark-teal-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-1 mb-5 h-1 flex-1 rounded-full",
                  step.completed ? "bg-dark-teal-300" : "bg-dark-teal-700"
                )}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
