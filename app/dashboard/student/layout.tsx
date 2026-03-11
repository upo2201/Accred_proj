import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        role="student"
        userName="Alex Johnson"
        userEmail="alex.johnson@stanford.edu"
      />
      <main className="pl-64">
        {children}
      </main>
    </div>
  )
}
