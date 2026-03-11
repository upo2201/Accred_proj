"use client"

import { motion } from "framer-motion"
import { FileCheck, Eye, Share2, Shield, ArrowRight, Clock, CheckCircle2 } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useUser } from "@/lib/user-context"

const stats = [
  { 
    label: "Total Credentials", 
    value: "4", 
    icon: FileCheck,
  },
  { 
    label: "Verification Views", 
    value: "127", 
    icon: Eye,
  },
  { 
    label: "Active Shares", 
    value: "3", 
    icon: Share2,
  },
]

const credentials = [
  {
    id: "CRED-2024-4521",
    degree: "Bachelor of Science",
    major: "Computer Science",
    institution: "Stanford University",
    graduationDate: "May 2024",
    status: "verified"
  },
  {
    id: "CRED-2023-3102",
    degree: "Associate Degree",
    major: "General Studies",
    institution: "Community College of Denver",
    graduationDate: "May 2022",
    status: "verified"
  }
]

const recentActivity = [
  { action: "Credential viewed", by: "TechCorp Inc.", time: "2 hours ago" },
  { action: "Share link created", for: "CRED-2024-4521", time: "1 day ago" },
  { action: "Verification completed", by: "Google HR", time: "3 days ago" },
]

export default function StudentDashboardPage() {
  const { user } = useUser()

  return (
    <>
      <DashboardHeader 
        title="My Dashboard" 
        description="Manage your academic credentials"
        userName="AJ"
      />

      <div className="p-6">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">Welcome back, {user?.name?.split(" ")[0] || "Student"}!</h2>
              <p className="mt-1 text-muted-foreground">
                Your credentials are secure and verified on-chain.
              </p>
            </div>
            <div className="rounded-xl bg-primary/20 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Link href="/dashboard/student/vault">
              <Button size="sm">View My Vault</Button>
            </Link>
            <Link href="/dashboard/student/share">
              <Button size="sm" variant="outline">Share Credentials</Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Credentials Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 rounded-xl border border-border/50 bg-card/50 backdrop-blur"
          >
            <div className="flex items-center justify-between border-b border-border/50 p-6">
              <div>
                <h2 className="font-semibold">My Credentials</h2>
                <p className="text-sm text-muted-foreground">Your verified academic records</p>
              </div>
              <Link href="/dashboard/student/vault">
                <Button variant="outline" size="sm" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="divide-y divide-border/50">
              {credentials.map((cred) => (
                <div key={cred.id} className="flex items-center justify-between p-6">
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
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                      Verified
                    </div>
                    <p className="text-xs text-muted-foreground">{cred.graduationDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl border border-border/50 bg-card/50 backdrop-blur"
          >
            <div className="border-b border-border/50 p-6">
              <h2 className="font-semibold">Recent Activity</h2>
              <p className="text-sm text-muted-foreground">Verification and sharing events</p>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {i < recentActivity.length - 1 && (
                        <div className="mt-1 h-full w-px bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-sm font-medium text-primary">
                        {activity.by || activity.for}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
