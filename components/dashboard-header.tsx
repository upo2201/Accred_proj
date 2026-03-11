"use client"

import { Bell, Wallet, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface DashboardHeaderProps {
  title: string
  description?: string
  userName?: string
}

export function DashboardHeader({ title, description, userName = "AU" }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="hidden gap-2 border-border/50 bg-card/50 backdrop-blur sm:flex">
          <Wallet className="h-4 w-4" />
          0x7f83...9069
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
        </Button>

        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {userName}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
