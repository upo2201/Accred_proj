"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Shield, 
  LayoutDashboard, 
  Building2, 
  Users, 
  Settings, 
  LogOut,
  GraduationCap,
  FileCheck,
  Share2,
  ChevronDown,
  Bell,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface SidebarProps {
  role: "hq" | "institution" | "student"
  userName?: string
  userEmail?: string
  institutionName?: string
  isVerified?: boolean
}

export function DashboardSidebar({ 
  role, 
  userName = "Admin User",
  userEmail = "admin@accred.io",
  institutionName,
  isVerified = true
}: SidebarProps) {
  const pathname = usePathname()

  const navItems = {
    hq: [
      { href: "/dashboard/hq", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/hq/institutions", label: "Institutions", icon: Building2 },
      { href: "/dashboard/hq/users", label: "Users", icon: Users },
      { href: "/dashboard/hq/settings", label: "Settings", icon: Settings },
    ],
    institution: [
      { href: "/dashboard/institution", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/institution/create", label: "Create Credential", icon: FileCheck },
      { href: "/dashboard/institution/students", label: "Student Records", icon: GraduationCap },
      { href: "/dashboard/institution/settings", label: "Settings", icon: Settings },
    ],
    student: [
      { href: "/dashboard/student", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/student/vault", label: "My Vault", icon: FileCheck },
      { href: "/dashboard/student/share", label: "Share", icon: Share2 },
      { href: "/dashboard/student/settings", label: "Settings", icon: Settings },
    ]
  }

  const items = navItems[role]

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border/50 bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border/50 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Shield className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold">ACCRED</span>
        <span className="ml-auto rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary capitalize">
          {role}
        </span>
      </div>

      {/* Search */}
      <div className="border-b border-border/50 p-4">
        <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "text-sidebar-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-sidebar-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={cn("relative h-4 w-4", isActive && "text-sidebar-primary-foreground")} />
              <span className="relative">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Institution Status (for institution role) */}
      {role === "institution" && (
        <div className="border-t border-border/50 p-4">
          <div className={cn(
            "rounded-lg p-3",
            isVerified ? "bg-primary/10" : "bg-destructive/10"
          )}>
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-2 w-2 rounded-full",
                isVerified ? "bg-primary" : "bg-destructive"
              )} />
              <span className="text-xs font-medium">
                {isVerified ? "Verified Institution" : "Pending Verification"}
              </span>
            </div>
            {institutionName && (
              <p className="mt-1 text-xs text-muted-foreground truncate">{institutionName}</p>
            )}
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="border-t border-border/50 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {userName.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
