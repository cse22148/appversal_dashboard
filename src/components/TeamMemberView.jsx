import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StatusSelector from "./StatusSelector"
import TaskList from "./TaskList"
import { CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react"

const TeamMemberView = () => {
  const { currentUser } = useSelector((state) => state.role)
  const { members } = useSelector((state) => state.members)

  // Find current user's data
  const currentMember = members.find((member) => member.name === currentUser)

  if (!currentMember) {
    return <div>User not found</div>
  }

  const activeTasks = currentMember.tasks.filter((task) => task.progress < 100)
  const completedTasks = currentMember.tasks.filter((task) => task.progress === 100)
  const averageProgress =
    currentMember.tasks.length > 0
      ? currentMember.tasks.reduce((acc, task) => acc + task.progress, 0) / currentMember.tasks.length
      : 0

  // Calculate overdue tasks
  const overdueTasks = activeTasks.filter((task) => new Date(task.dueDate) < new Date())

  return (
    <div className="space-y-6">
      {/* Personal Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTasks.length}</div>
            <p className="text-xs text-muted-foreground">{overdueTasks.length} overdue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {currentMember.tasks.length > 0
                ? Math.round((completedTasks.length / currentMember.tasks.length) * 100)
                : 0}
              % completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageProgress)}%</div>
            <p className="text-xs text-muted-foreground">Across all tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Status</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMember.status}</div>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date(currentMember.lastActive).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Update Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Update Your Status</h2>
          <StatusSelector currentMember={currentMember} />

          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Today's Overview</CardTitle>
              <CardDescription>Your productivity summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tasks in progress</span>
                <span className="font-medium">{activeTasks.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tasks completed</span>
                <span className="font-medium">{completedTasks.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average progress</span>
                <span className="font-medium">{Math.round(averageProgress)}%</span>
              </div>
              {overdueTasks.length > 0 && (
                <div className="flex justify-between items-center text-red-600">
                  <span className="text-sm">Overdue tasks</span>
                  <span className="font-medium">{overdueTasks.length}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tasks Section */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Your Tasks</h2>
          <TaskList tasks={currentMember.tasks} memberId={currentMember.id} />
        </div>
      </div>
    </div>
  )
}

export default TeamMemberView
