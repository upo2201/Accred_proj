"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, GraduationCap, FileCheck, ExternalLink, Filter, Download } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface StudentRecord {
  id: string
  name: string
  studentId: string
  degree: string
  major: string
  graduationDate: string
  merkleRoot: string
  credentialId: string
  status: "active" | "revoked"
}

const studentRecords: StudentRecord[] = [
  { 
    id: "1", 
    name: "Alex Johnson", 
    studentId: "STU-2024-001", 
    degree: "Bachelor of Science", 
    major: "Computer Science", 
    graduationDate: "May 2024", 
    merkleRoot: "0x7f83b165...d9069", 
    credentialId: "CRED-2024-4521",
    status: "active"
  },
  { 
    id: "2", 
    name: "Maria Garcia", 
    studentId: "STU-2024-002", 
    degree: "Master of Arts", 
    major: "Psychology", 
    graduationDate: "May 2024", 
    merkleRoot: "0x8a92c276...e1170", 
    credentialId: "CRED-2024-4520",
    status: "active"
  },
  { 
    id: "3", 
    name: "James Wilson", 
    studentId: "STU-2024-003", 
    degree: "Bachelor of Arts", 
    major: "Economics", 
    graduationDate: "May 2024", 
    merkleRoot: "0x9b03d387...f2281", 
    credentialId: "CRED-2024-4519",
    status: "active"
  },
  { 
    id: "4", 
    name: "Emily Brown", 
    studentId: "STU-2024-004", 
    degree: "Bachelor of Science", 
    major: "Biology", 
    graduationDate: "May 2024", 
    merkleRoot: "0xac14e498...03392", 
    credentialId: "CRED-2024-4518",
    status: "active"
  },
  { 
    id: "5", 
    name: "Michael Davis", 
    studentId: "STU-2023-089", 
    degree: "Ph.D.", 
    major: "Physics", 
    graduationDate: "Dec 2023", 
    merkleRoot: "0xbd25f509...14403", 
    credentialId: "CRED-2023-3201",
    status: "active"
  },
  { 
    id: "6", 
    name: "Sarah Miller", 
    studentId: "STU-2023-045", 
    degree: "Master of Science", 
    major: "Chemistry", 
    graduationDate: "Dec 2023", 
    merkleRoot: "0xce36g610...25514", 
    credentialId: "CRED-2023-3102",
    status: "revoked"
  },
]

export default function StudentRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "revoked">("all")

  const filteredRecords = studentRecords.filter(record => {
    const matchesSearch = 
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.credentialId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || record.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <>
      <DashboardHeader 
        title="Student Records" 
        description="Searchable database of issued credentials"
        userName="SC"
      />

      <div className="p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <p className="text-sm text-muted-foreground">Total Records</p>
            <p className="text-2xl font-bold">{studentRecords.length}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <p className="text-sm text-muted-foreground">Active Credentials</p>
            <p className="text-2xl font-bold text-primary">
              {studentRecords.filter(r => r.status === "active").length}
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <p className="text-sm text-muted-foreground">Revoked</p>
            <p className="text-2xl font-bold text-destructive">
              {studentRecords.filter(r => r.status === "revoked").length}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, student ID, or credential ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card/50 pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("active")}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "revoked" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("revoked")}
            >
              Revoked
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Records Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border/50 bg-card/50 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Student</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Degree</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Credential ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Merkle Root</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-secondary/20">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{record.name}</p>
                          <p className="text-sm text-muted-foreground">{record.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{record.degree}</p>
                      <p className="text-sm text-muted-foreground">{record.major}</p>
                    </td>
                    <td className="px-6 py-4">
                      <code className="font-mono text-sm">{record.credentialId}</code>
                      <p className="text-xs text-muted-foreground">{record.graduationDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <code className="font-mono text-xs text-muted-foreground">{record.merkleRoot}</code>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant="outline" 
                        className={record.status === "active" 
                          ? "bg-primary/10 text-primary border-primary/20" 
                          : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {record.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <FileCheck className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="p-12 text-center">
              <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No records found</p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}
