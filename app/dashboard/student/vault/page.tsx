"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileCheck, CheckCircle2, Download, Share2, ExternalLink, Eye, Shield, GraduationCap } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Credential {
  id: string
  degree: string
  major: string
  institution: string
  graduationDate: string
  merkleRoot: string
  issuedAt: string
  gpa: string
}

const credentials: Credential[] = [
  {
    id: "CRED-2024-4521",
    degree: "Bachelor of Science",
    major: "Computer Science",
    institution: "Stanford University",
    graduationDate: "May 2024",
    merkleRoot: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    issuedAt: "June 1, 2024",
    gpa: "3.85"
  },
  {
    id: "CRED-2023-3102",
    degree: "Associate Degree",
    major: "General Studies",
    institution: "Community College of Denver",
    graduationDate: "May 2022",
    merkleRoot: "0x8a92c2767ff2fc64b92dc28258a2d65efc3d5c2fb4d788395bdee311237e2180",
    issuedAt: "June 15, 2022",
    gpa: "3.72"
  },
  {
    id: "CRED-2024-0045",
    degree: "Certificate",
    major: "Machine Learning Specialization",
    institution: "Coursera / Stanford Online",
    graduationDate: "March 2024",
    merkleRoot: "0x9b03d3877ff3fc75c92dc38369a3d76ffd4e6d3gc5e899406ceef422348f3291",
    issuedAt: "March 20, 2024",
    gpa: "N/A"
  },
  {
    id: "CRED-2023-1892",
    degree: "Certificate",
    major: "AWS Solutions Architect",
    institution: "Amazon Web Services",
    graduationDate: "October 2023",
    merkleRoot: "0xac14e4987ff4fc86d92dc48470a4d87gge5f7e4hd6f900517dffg533459g4302",
    issuedAt: "October 25, 2023",
    gpa: "N/A"
  },
]

export default function VaultPage() {
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <>
      <DashboardHeader 
        title="My Vault" 
        description="Your verified academic credentials"
        userName="AJ"
      />

      <div className="p-6">
        {/* Header Actions */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>{credentials.length} verified credentials</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        {/* Credentials Grid */}
        {viewMode === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Certificate Preview */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary via-secondary/80 to-secondary/50 p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent)]" />
                  
                  <div className="relative h-full flex flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </div>
                    </div>

                    <div className="mt-auto">
                      <p className="text-lg font-semibold">{cred.degree}</p>
                      <p className="text-sm text-muted-foreground">{cred.major}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-px flex-1 bg-border/50" />
                        <p className="text-xs text-muted-foreground">{cred.institution}</p>
                        <div className="h-px flex-1 bg-border/50" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <code className="font-mono text-xs text-muted-foreground">{cred.id}</code>
                      <p className="text-xs text-muted-foreground">{cred.graduationDate}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => setSelectedCredential(cred)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
            <div className="divide-y divide-border/50">
              {credentials.map((cred, i) => (
                <motion.div
                  key={cred.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-6 hover:bg-secondary/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <FileCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{cred.degree}</p>
                      <p className="text-sm text-muted-foreground">{cred.major}</p>
                      <p className="text-xs text-muted-foreground">{cred.institution}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                        Verified
                      </div>
                      <code className="font-mono text-xs text-muted-foreground">{cred.id}</code>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => setSelectedCredential(cred)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Credential Detail Modal */}
      <Dialog open={!!selectedCredential} onOpenChange={() => setSelectedCredential(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Credential Details</DialogTitle>
          </DialogHeader>
          
          {selectedCredential && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{selectedCredential.degree}</p>
                    <p className="text-sm text-muted-foreground">{selectedCredential.major}</p>
                    <p className="text-sm text-muted-foreground">{selectedCredential.institution}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-secondary/30 p-3">
                  <p className="text-xs text-muted-foreground">Credential ID</p>
                  <code className="font-mono text-sm">{selectedCredential.id}</code>
                </div>
                <div className="rounded-lg bg-secondary/30 p-3">
                  <p className="text-xs text-muted-foreground">Graduation Date</p>
                  <p className="text-sm font-medium">{selectedCredential.graduationDate}</p>
                </div>
                <div className="rounded-lg bg-secondary/30 p-3">
                  <p className="text-xs text-muted-foreground">GPA</p>
                  <p className="text-sm font-medium">{selectedCredential.gpa}</p>
                </div>
                <div className="rounded-lg bg-secondary/30 p-3">
                  <p className="text-xs text-muted-foreground">Issued</p>
                  <p className="text-sm font-medium">{selectedCredential.issuedAt}</p>
                </div>
              </div>

              <div className="rounded-lg bg-secondary/30 p-3">
                <p className="text-xs text-muted-foreground">Merkle Root</p>
                <code className="mt-1 block truncate font-mono text-xs">{selectedCredential.merkleRoot}</code>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button className="flex-1 gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
