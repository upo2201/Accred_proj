"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Shield, Upload, FileText, CheckCircle2, XCircle, Loader2, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { VerificationModal } from "@/components/verification-modal"

export default function VerifyPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "verified" | "not-found">("idle")
  const [searchQuery, setSearchQuery] = useState("")
  const [showModal, setShowModal] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileVerification(droppedFile)
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileVerification(selectedFile)
    }
  }

  const handleFileVerification = async (selectedFile: File) => {
    setFile(selectedFile)
    setVerificationStatus("verifying")

    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock verification - files with "valid" in name are verified
    const isVerified = selectedFile.name.toLowerCase().includes("valid") || selectedFile.size > 5000
    setVerificationStatus(isVerified ? "verified" : "not-found")
  }

  const handleSearchVerification = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const isVerified = searchQuery.toLowerCase().includes("valid") || searchQuery.length > 10
      setShowModal(true)
    }
  }

  const resetVerification = () => {
    setFile(null)
    setVerificationStatus("idle")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
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
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight">Verification Portal</h1>
          <p className="mt-2 text-muted-foreground">
            Verify any academic credential against our Merkle Root registry
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSearchVerification}
          className="mt-10"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl" />
            <div className="relative flex items-center gap-2 rounded-xl border border-border/50 bg-card/80 p-2 backdrop-blur-xl">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Enter credential ID, hash, or student email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button type="submit" className="shrink-0">
                Verify
              </Button>
            </div>
          </div>
        </motion.form>

        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-sm text-muted-foreground">or drop a file</span>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        {/* File Drop Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {verificationStatus === "idle" ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-2xl border-2 border-dashed p-16 text-center transition-all ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50"
              }`}
            >
              <input
                type="file"
                onChange={handleFileInput}
                className="absolute inset-0 cursor-pointer opacity-0"
                accept=".pdf,.json,.txt"
              />
              <div className="pointer-events-none">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                  <Upload className={`h-8 w-8 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h3 className="text-lg font-medium">Drop your credential file here</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Supports PDF certificates or JSON proof files
                </p>
                <Button variant="outline" className="mt-6 pointer-events-none">
                  Browse Files
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border/50 bg-card/50 p-8">
              {/* File Info */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                  <FileText className="h-7 w-7 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{file?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {file ? (file.size / 1024).toFixed(2) : 0} KB
                  </p>
                </div>
                {verificationStatus === "verifying" && (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                )}
                {verificationStatus === "verified" && (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                )}
                {verificationStatus === "not-found" && (
                  <XCircle className="h-6 w-6 text-destructive" />
                )}
              </div>

              {/* Verification Progress */}
              {verificationStatus === "verifying" && (
                <div className="mt-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Verifying against Merkle Root...</span>
                    <span className="text-primary">Processing</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              )}

              {/* Result */}
              {(verificationStatus === "verified" || verificationStatus === "not-found") && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <div className={`rounded-xl p-6 ${
                    verificationStatus === "verified"
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-destructive/10 border border-destructive/20"
                  }`}>
                    <div className="flex items-start gap-4">
                      {verificationStatus === "verified" ? (
                        <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                      ) : (
                        <XCircle className="h-6 w-6 shrink-0 text-destructive" />
                      )}
                      <div>
                        <h3 className="font-semibold">
                          {verificationStatus === "verified"
                            ? "Credential Verified"
                            : "Verification Failed"}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {verificationStatus === "verified"
                            ? "This credential is authentic and matches our on-chain Merkle Root."
                            : "This credential could not be verified. It may be invalid or not yet registered."}
                        </p>
                        {verificationStatus === "verified" && (
                          <div className="mt-4 rounded-lg bg-background/50 p-4">
                            <p className="text-xs text-muted-foreground">Merkle Root</p>
                            <code className="mt-1 block truncate font-mono text-xs">
                              0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button variant="outline" onClick={resetVerification} className="flex-1">
                      Verify Another
                    </Button>
                    {verificationStatus === "verified" && (
                      <Button className="flex-1">View Full Details</Button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-xl border border-border/50 bg-card/30 p-6">
            <h3 className="font-medium">What is Merkle Verification?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Merkle trees allow us to efficiently verify that a credential belongs to a batch 
              of issued certificates without exposing other records.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/30 p-6">
            <h3 className="font-medium">Privacy Protected</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your verification queries are not logged. Only the cryptographic proof is 
              checked against our on-chain registry.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        result={searchQuery.toLowerCase().includes("valid") || searchQuery.length > 10 ? "verified" : "not-found"}
        credentialId={searchQuery}
      />
    </div>
  )
}
