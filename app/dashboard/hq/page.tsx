"use client"

import { motion } from "framer-motion"
import { Building2, Users, FileCheck, Clock, TrendingUp, ArrowUpRight, ArrowRight } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  { 
    label: "Total Institutions", 
    value: "234", 
    change: "+12%", 
    icon: Building2,
    trend: "up"
  },
  { 
    label: "Active Users", 
    value: "12.4K", 
    change: "+8%", 
    icon: Users,
    trend: "up"
  },
  { 
    label: "Credentials Issued", 
    value: "54.2K", 
    change: "+23%", 
    icon: FileCheck,
    trend: "up"
  },
  { 
    label: "Pending Approvals", 
    value: "18", 
    change: "-5", 
    icon: Clock,
    trend: "down"
  },
]

const pendingInstitutions = [
  {
    id: 1,
    name: "Harvard University",
    type: "University",
    submittedAt: "2 hours ago",
    email: "admin@harvard.edu"
  },
  {
    id: 2,
    name: "MIT",
    type: "University",
    submittedAt: "5 hours ago",
    email: "credentials@mit.edu"
  },
  {
    id: 3,
    name: "Stanford School of Medicine",
    type: "College",
    submittedAt: "1 day ago",
    email: "med-admin@stanford.edu"
  },
]

const recentActivity = [
  { action: "Institution verified", target: "Yale University", time: "10 min ago" },
  { action: "Batch minted", target: "2,340 credentials", time: "1 hour ago" },
  { action: "Institution verified", target: "Columbia University", time: "2 hours ago" },
  { action: "User registered", target: "Princeton University", time: "3 hours ago" },
]

export default function HQDashboardPage() {
  return (
    <>
      <DashboardHeader 
        title="HQ Dashboard" 
        description="System overview and institution management"
        userName="SA"
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
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  stat.trend === "up" ? "text-primary" : "text-destructive"
                }`}>
                  <TrendingUp className={`h-3 w-3 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Pending Institutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 rounded-xl border border-border/50 bg-card/50 backdrop-blur"
          >
            <div className="flex items-center justify-between border-b border-border/50 p-6">
              <div>
                <h2 className="font-semibold">Pending Institutions</h2>
                <p className="text-sm text-muted-foreground">Institutions awaiting verification</p>
              </div>
              <Link href="/dashboard/hq/institutions">
                <Button variant="outline" size="sm" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="divide-y divide-border/50">
              {pendingInstitutions.map((inst) => (
                <div key={inst.id} className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{inst.name}</p>
                      <p className="text-sm text-muted-foreground">{inst.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm">{inst.type}</p>
                      <p className="text-xs text-muted-foreground">{inst.submittedAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                      <Button size="sm">
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl border border-border/50 bg-card/50 backdrop-blur"
          >
            <div className="border-b border-border/50 p-6">
              <h2 className="font-semibold">Recent Activity</h2>
              <p className="text-sm text-muted-foreground">Latest platform events</p>
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
                      <p className="text-sm font-medium text-primary">{activity.target}</p>
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
