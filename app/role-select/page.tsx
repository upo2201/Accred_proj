"use client"

import { motion } from "framer-motion"
import { GraduationCap, Building2, Shield, ArrowRight, ArrowLeft, Users, FileCheck, Wallet, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"

function RoleSelectContent() {
  const searchParams = useSearchParams()
  const [selectedRole, setSelectedRole] = useState<"student" | "institution" | null>(null)

  useEffect(() => {
    const role = searchParams.get("role")
    if (role === "student" || role === "institution") {
      setSelectedRole(role)
    }
  }, [searchParams])

  const roles = [
    {
      id: "student" as const,
      title: "Student",
      description: "Access your credential vault, view your verified certificates, and generate shareable proof links.",
      icon: GraduationCap,
      features: [
        "View all your credentials",
        "Generate public proof links",
        "Download verified certificates",
        "Track verification history"
      ],
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: "institution" as const,
      title: "Institution",
      description: "Issue bulk credentials, process transcripts with AI, and manage your student records.",
      icon: Building2,
      features: [
        "AI-powered transcript processing",
        "Bulk credential minting",
        "Student records management",
        "Analytics dashboard"
      ],
      gradient: "from-primary/20 to-emerald-500/20"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">ACCRED</span>
            </Link>
          </div>

          <Button variant="outline" size="sm" className="gap-2 border-border/50 bg-card/50 backdrop-blur">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-6 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm backdrop-blur">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">Select Your Role</span>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            How will you use ACCRED?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Choose your role to get started. You can always switch roles later from your dashboard settings.
          </p>
        </motion.div>

        {/* Role Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {roles.map((role, i) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => setSelectedRole(role.id)}
              className={`group relative text-left rounded-2xl border p-8 transition-all ${
                selectedRole === role.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border/50 bg-card/50 hover:border-border hover:bg-card/80"
              }`}
            >
              {/* Gradient Glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${role.gradient} opacity-0 transition-opacity group-hover:opacity-100 ${selectedRole === role.id ? "opacity-100" : ""}`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
                  selectedRole === role.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}>
                  <role.icon className="h-7 w-7" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold">{role.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{role.description}</p>

                {/* Features */}
                <ul className="mt-6 space-y-2">
                  {role.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileCheck className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Selection Indicator */}
                <div className={`mt-8 flex items-center gap-2 text-sm transition-colors ${
                  selectedRole === role.id ? "text-primary" : "text-muted-foreground"
                }`}>
                  {selectedRole === role.id ? "Selected" : "Select this role"}
                  <ArrowRight className={`h-4 w-4 transition-transform ${
                    selectedRole === role.id ? "translate-x-1" : "group-hover:translate-x-1"
                  }`} />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href={selectedRole ? `/onboarding?role=${selectedRole}` : "#"}>
            <Button
              size="lg"
              disabled={!selectedRole}
              className="gap-2 px-8"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            <Lock className="mr-1 inline h-3.5 w-3.5" />
            Your data is encrypted and secured on-chain
          </p>
        </motion.div>
      </main>
    </div>
  )
}

export default function RoleSelectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    }>
      <RoleSelectContent />
    </Suspense>
  )
}
