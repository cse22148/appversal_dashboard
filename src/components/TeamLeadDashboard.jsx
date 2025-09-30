"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addTask, setStatusFilter, setSortBy } from "../redux/slices/membersSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, CheckCircle, Calendar, UserCheck, BarChart3, FileText } from "lucide-react"
import EmployeeInfoChart from "./EmployeeInfoChart"
import TotalEmployeesChart from "./TotalEmployeesChart"
import EmployeeAvailability from "./EmployeeAvailability"
import UpcomingInterviews from "./UpcomingInterviews"

const TeamLeadDashboard = () => {
  const dispatch = useDispatch()
  const { members, statusFilter, sortBy } = useSelector((state) => state.members)
  const { isDarkMode } = useSelector((state) => state.theme)
  const [taskForm, setTaskForm] = useState({
    memberId: "",
    title: "",
    dueDate: "",
  })

  const statusColors = {
    Working: isDarkMode
      ? "bg-green-900/50 text-green-300 border-green-700"
      : "bg-green-100 text-green-800 border-green-200",
    Break: isDarkMode
      ? "bg-yellow-900/50 text-yellow-300 border-yellow-700"
      : "bg-yellow-100 text-yellow-800 border-yellow-200",
    Meeting: isDarkMode ? "bg-blue-900/50 text-blue-300 border-blue-700" : "bg-blue-100 text-blue-800 border-blue-200",
    Offline: isDarkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-gray-100 text-gray-800 border-gray-200",
  }

  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1
    return acc
  }, {})

  const filteredMembers = members.filter((member) => statusFilter === "All" || member.status === statusFilter)

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "tasks") {
      const aActiveTasks = a.tasks.filter((task) => task.progress < 100).length
      const bActiveTasks = b.tasks.filter((task) => task.progress < 100).length
      return bActiveTasks - aActiveTasks
    }
    return 0
  })

  const handleAddTask = (e) => {
    e.preventDefault()
    if (taskForm.memberId && taskForm.title && taskForm.dueDate) {
      dispatch(
        addTask({
          memberId: Number.parseInt(taskForm.memberId),
          task: {
            title: taskForm.title,
            dueDate: taskForm.dueDate,
          },
        }),
      )
      setTaskForm({ memberId: "", title: "", dueDate: "" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Employee Info and Total Employees */}
        <div className="lg:col-span-2 space-y-6">
          <EmployeeInfoChart />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmployeeAvailability />
            <TotalEmployeesChart />
          </div>
        </div>

        {/* Right side - Stats cards and Upcoming Interviews */}
        <div className="space-y-4">
          <div className="group relative">
            <Card className="relative overflow-hidden rounded-xl border border-sidebar-border bg-sidebar transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
              <CardContent className="p-6">
                {/* top-left circular icon */}
                <div className="absolute left-6 top-6 h-10 w-10 rounded-full bg-sidebar-primary/30 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-sidebar-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="pt-6">
                    <p className="text-5xl font-bold leading-none text-sidebar-foreground">1546</p>
                    <p className="mt-2 text-base/6 text-sidebar-foreground/80">Applications</p>
                  </div>
                  {/* right decorative illustration substitute */}
                  <div className="relative">
                    <div className="h-28 w-28 rounded-full bg-sidebar-accent/30 backdrop-blur-sm" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-sidebar-accent/50" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Hover tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <div className="bg-popover text-popover-foreground px-4 py-2 rounded-lg shadow-lg border border-border whitespace-nowrap">
                <p className="text-sm font-medium">Total Applications Received</p>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </div>
            </div>
          </div>

          <div className="group relative">
            <Card className="rounded-xl border bg-card shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-3xl font-bold tracking-tight text-foreground">246</p>
                      <p className="text-sm font-medium text-muted-foreground">Interviews</p>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Hover tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <div className="bg-popover text-popover-foreground px-4 py-2 rounded-lg shadow-lg border border-border whitespace-nowrap">
                <p className="text-sm font-medium">Scheduled Interviews</p>
                <p className="text-xs text-muted-foreground">18 pending this week</p>
              </div>
            </div>
          </div>

          <div className="group relative">
            <Card className="rounded-xl border bg-card shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-500 text-white flex items-center justify-center">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-3xl font-bold tracking-tight text-foreground">101</p>
                      <p className="text-sm font-medium text-muted-foreground">Hired</p>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Hover tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <div className="bg-popover text-popover-foreground px-4 py-2 rounded-lg shadow-lg border border-border whitespace-nowrap">
                <p className="text-sm font-medium">Successfully Hired</p>
                <p className="text-xs text-muted-foreground">8 joined this month</p>
              </div>
            </div>
          </div>

          <UpcomingInterviews />
        </div>
      </div>

      {/* Team Status Summary */}
      <Card className="bg-card border-border transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5" />
            Team Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">{statusCounts.Working || 0} Working</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">{statusCounts.Meeting || 0} Meeting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">{statusCounts.Break || 0} Break</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">{statusCounts.Offline || 0} Offline</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members List */}
        <Card className="bg-card border-border transition-colors">
          <CardHeader>
            <CardTitle className="text-foreground">Team Members</CardTitle>
            <CardDescription className="text-muted-foreground">Monitor team member status and tasks</CardDescription>
            <div className="flex gap-2 mt-4">
              <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Working">Working</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Break">Break</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value) => dispatch(setSortBy(value))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="tasks">Sort by Tasks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedMembers.map((member) => {
                const activeTasks = member.tasks.filter((task) => task.progress < 100).length
                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg bg-card/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                        <span className="text-sm font-medium text-foreground">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[member.status]}>{member.status}</Badge>
                      <span className="text-sm text-muted-foreground">{activeTasks} active tasks</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Assign Task Form */}
        <Card className="bg-card border-border transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <CheckCircle className="h-5 w-5" />
              Assign New Task
            </CardTitle>
            <CardDescription className="text-muted-foreground">Create and assign tasks to team members</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <Label htmlFor="member" className="text-foreground">
                  Select Member
                </Label>
                <Select
                  value={taskForm.memberId}
                  onValueChange={(value) => setTaskForm({ ...taskForm, memberId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title" className="text-foreground">
                  Task Title
                </Label>
                <Input
                  id="title"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  placeholder="Enter task description"
                />
              </div>
              <div>
                <Label htmlFor="dueDate" className="text-foreground">
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                Assign Task
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TeamLeadDashboard
