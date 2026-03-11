"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { useState } from "react"

export default function InstitutionDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Mock institution verification status - in production this would come from API/context
  const [isVerified] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        role="institution"
        userName="Dr. Sarah Chen"
        userEmail="sarah.chen@stanford.edu"
        institutionName="Stanford University"
        isVerified={isVerified}
      />
      <main className="pl-64">
        {children}
      </main>
    </div>
  )
}
