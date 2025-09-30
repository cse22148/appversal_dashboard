import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MemberCard from "./MemberCard"
import TaskForm from "./TaskForm"
import StatusSummary from "./StatusSummary"
import TeamFilters from "./TeamFilters"
import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react"
import StatusChart from "./StatusChart"
import ProductivityMetrics from "./ProductivityMetrics"

const TeamLeadView = () => {
  const { members, statusFilter, sortBy } = useSelector((state) => state.members)

  // Filter and sort members
  const filteredMembers = members.filter((member) => statusFilter === "All" || member.status === statusFilter)

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "tasks") {
      const aActiveTasks = a.tasks.filter((task) => task.progress < 100).length
      const bActiveTasks = b.tasks.filter((task) => task.progress < 100).length
      return bActiveTasks - aActiveTasks
    }
    return a.name.localeCompare(b.name)
  })

  // Calculate metrics
  const totalMembers = members.length
  const activeMembers = members.filter((m) => m.status !== "Offline").length
  const totalTasks = members.reduce((acc, member) => acc + member.tasks.length, 0)
  const completedTasks = members.reduce(
    (acc, member) => acc + member.tasks.filter((task) => task.progress === 100).length,
    0,
  )

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">{activeMembers} active now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-xs text-muted-foreground">
              {((activeMembers / totalMembers) * 100).toFixed(0)}% of team
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">{totalTasks - completedTasks} in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(0) : 0}% completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Summary */}
      <StatusSummary />

      {/* Charts and Analytics */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Analytics & Insights</h2>
        </div>

        <StatusChart />
        <ProductivityMetrics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Team Members</h2>
            <TeamFilters />
          </div>

          <div className="grid gap-4">
            {sortedMembers.map((member) => (
              <MemberCard key={member.id} member={member} isLeadView={true} />
            ))}
          </div>
        </div>

        {/* Task Assignment Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Assign New Task</h2>
          <TaskForm />
        </div>
      </div>
    </div>
  )
}

export default TeamLeadView
