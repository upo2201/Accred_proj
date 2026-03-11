"use client"

import { motion } from "framer-motion"
import { FileCheck, Users, TrendingUp, Clock, GraduationCap, ArrowRight, Activity } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  { 
    label: "Total Credentials", 
    value: "4,521", 
    change: "+234 this month", 
    icon: FileCheck,
  },
  { 
    label: "Active Students", 
    value: "12,847", 
    change: "+156 this week", 
    icon: Users,
  },
  { 
    label: "Verification Rate", 
    value: "99.8%", 
    change: "+0.2% vs last month", 
    icon: TrendingUp,
  },
  { 
    label: "Pending Mints", 
    value: "45", 
    change: "From 3 batches", 
    icon: Clock,
  },
]

const recentCredentials = [
  { id: "CRED-2024-4521", student: "Alex Johnson", degree: "B.S. Computer Science", date: "2 hours ago" },
  { id: "CRED-2024-4520", student: "Maria Garcia", degree: "M.A. Psychology", date: "3 hours ago" },
  { id: "CRED-2024-4519", student: "James Wilson", degree: "B.A. Economics", date: "5 hours ago" },
  { id: "CRED-2024-4518", student: "Emily Brown", degree: "Ph.D. Physics", date: "1 day ago" },
]

const quickActions = [
  { 
    title: "Create Credential", 
    description: "Issue new credentials with AI processing", 
    href: "/dashboard/institution/create",
    icon: FileCheck
  },
  { 
    title: "Student Records", 
    description: "Browse and manage student database", 
    href: "/dashboard/institution/students",
    icon: GraduationCap
  },
]

export default function InstitutionDashboardPage() {
  return (
    <>
      <DashboardHeader 
        title="Institution Dashboard" 
        description="Stanford University - Verified Institution"
        userName="SC"
      />

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
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
                <p className="mt-1 text-xs text-primary">{stat.change}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <Link href={action.href} className="group block">
                <div className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur transition-all hover:border-primary/50 hover:bg-card/80">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur"
        >
          <div className="flex items-center justify-between border-b border-border/50 p-6">
            <div>
              <h2 className="font-semibold">Recent Credentials</h2>
              <p className="text-sm text-muted-foreground">Latest issued certificates</p>
            </div>
            <Link href="/dashboard/institution/students">
              <Button variant="outline" size="sm" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-border/50">
            {recentCredentials.map((cred) => (
              <div key={cred.id} className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{cred.student}</p>
                    <p className="text-sm text-muted-foreground">{cred.degree}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm">{cred.id}</p>
                  <p className="text-xs text-muted-foreground">{cred.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur"
        >
          <div className="flex items-center gap-4">
            <Activity className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold">Issuance Activity</h3>
              <p className="text-sm text-muted-foreground">Credentials issued over time</p>
            </div>
          </div>
          <div className="mt-6 flex h-40 items-end justify-around gap-2">
            {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
              <div
                key={i}
                className="w-12 rounded-t-lg bg-primary/20 transition-all hover:bg-primary/40"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-around text-xs text-muted-foreground">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <span key={day} className="w-12 text-center">{day}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
