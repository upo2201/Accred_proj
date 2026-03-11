"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, CheckCircle2, Search, ArrowRight, GraduationCap, Building2, Wallet, FileCheck, Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { VerificationModal } from "@/components/verification-modal"
import { useUser } from "@/lib/user-context"

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationResult, setVerificationResult] = useState<"verified" | "not-found" | null>(null)
  
  const { user } = useUser()

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Simulate verification - in production this would check against blockchain
      const isVerified = searchQuery.toLowerCase().includes("valid") || searchQuery.length > 10
      setVerificationResult(isVerified ? "verified" : "not-found")
      setShowVerificationModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">ACCRED</span>
          </Link>
          
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/verify" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Verify
            </Link>
            {user ? (
              <Link href={`/dashboard/${user.role}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/sign-in" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Sign In
                </Link>
                <Link href="/role-select" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Get Started
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden gap-2 border-border/50 bg-card/50 backdrop-blur sm:flex">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
            <Link href={user ? `/dashboard/${user.role}` : "/role-select"}>
              <Button size="sm" className="gap-2">
                {user ? "Go to Dashboard" : "Launch App"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-16">
        {/* Gradient Orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <section className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm backdrop-blur">
              <Lock className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">Blockchain-Verified Credentials</span>
            </div>
            
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Secure Academic{" "}
              <span className="text-primary">Truth.</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              Issue, manage, and verify academic credentials with cryptographic proof. 
              Tamper-proof certificates anchored to the blockchain.
            </p>

            {/* Public Verification Search */}
            <form onSubmit={handleVerification} className="mx-auto mt-10 max-w-xl">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl" />
                <div className="relative flex items-center gap-2 rounded-xl border border-border/50 bg-card/80 p-2 backdrop-blur-xl">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter credential ID or hash to verify..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button type="submit" className="shrink-0">
                    Verify
                  </Button>
                </div>
              </div>
            </form>

            <p className="mt-4 text-sm text-muted-foreground">
              Try: &quot;VALID-CERT-2024-001&quot; or any hash longer than 10 characters
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-3"
          >
            {[
              {
                icon: FileCheck,
                title: "Issue Credentials",
                description: "Bulk mint verifiable certificates with AI-powered transcript processing."
              },
              {
                icon: Shield,
                title: "Merkle Proofs",
                description: "Every credential anchored with cryptographic proofs on-chain."
              },
              {
                icon: Zap,
                title: "Instant Verification",
                description: "Verify any credential in seconds with our public portal."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Role Selection CTA */}
        <section className="relative border-t border-border/50 bg-card/30">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-balance text-3xl font-bold tracking-tight">
                Choose Your Path
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Whether you&apos;re an institution issuing credentials or a student managing your academic records.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2"
            >
              <Link href="/role-select?role=student" className="group">
                <div className="relative h-full rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-card/80">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Student</h3>
                  <p className="text-sm text-muted-foreground">
                    Access your credential vault, share verifiable proofs, and manage your academic identity.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              <Link href="/role-select?role=institution" className="group">
                <div className="relative h-full rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-card/80">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Building2 className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Institution</h3>
                  <p className="text-sm text-muted-foreground">
                    Issue bulk credentials, manage student records, and leverage AI-powered processing.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t border-border/50">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { value: "50K+", label: "Credentials Issued" },
                { value: "200+", label: "Institutions" },
                { value: "99.9%", label: "Uptime" },
                { value: "<1s", label: "Verification Time" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">ACCRED</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Decentralized Academic Credentials Platform
            </p>
          </div>
        </div>
      </footer>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => {
          setShowVerificationModal(false)
          setVerificationResult(null)
        }}
        result={verificationResult}
        credentialId={searchQuery}
      />
    </div>
  )
}
