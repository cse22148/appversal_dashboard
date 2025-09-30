"use client"

import { useSelector, useDispatch } from "react-redux"
import { updateMemberStatus, updateTaskProgress } from "../redux/slices/membersSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, CheckCircle, Minus, Plus } from "lucide-react"

const TeamMemberDashboard = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.role)
  const { members } = useSelector((state) => state.members)
  const { isDarkMode } = useSelector((state) => state.theme)

  const currentMember = members.find((member) => member.name === currentUser) || members[0]

  const statusOptions = ["Working", "Break", "Meeting", "Offline"]
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

  const handleStatusUpdate = (status) => {
    dispatch(
      updateMemberStatus({
        memberId: currentMember.id,
        status: status,
      }),
    )
  }

  const handleProgressUpdate = (taskId, change) => {
    const task = currentMember.tasks.find((t) => t.id === taskId)
    if (task) {
      const newProgress = Math.max(0, Math.min(100, task.progress + change))
      dispatch(
        updateTaskProgress({
          memberId: currentMember.id,
          taskId: taskId,
          progress: newProgress,
        }),
      )
    }
  }

  const activeTasks = currentMember.tasks.filter((task) => task.progress < 100)
  const completedTasks = currentMember.tasks.filter((task) => task.progress === 100)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-foreground">Team Member Dashboard</h2>
        <p className="text-muted-foreground">Manage your status and tasks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Update Section */}
        <Card className="bg-card border-border transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Clock className="h-5 w-5" />
              Update Your Status
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Let your team know what you're working on
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Current Status:</span>
                <Badge className={statusColors[currentMember.status]}>{currentMember.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    variant={currentMember.status === status ? "default" : "outline"}
                    onClick={() => handleStatusUpdate(status)}
                    className="w-full"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Summary */}
        <Card className="bg-card border-border transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <CheckCircle className="h-5 w-5" />
              Task Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <span className="text-sm font-medium text-foreground">Active Tasks</span>
                <span className="text-2xl font-bold text-blue-600">{activeTasks.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <span className="text-sm font-medium text-foreground">Completed Tasks</span>
                <span className="text-2xl font-bold text-green-600">{completedTasks.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted border border-border">
                <span className="text-sm font-medium text-foreground">Total Tasks</span>
                <span className="text-2xl font-bold text-muted-foreground">{currentMember.tasks.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Tasks */}
      <Card className="bg-card border-border transition-colors">
        <CardHeader>
          <CardTitle className="text-foreground">Your Tasks</CardTitle>
          <CardDescription className="text-muted-foreground">Track progress on your assigned tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentMember.tasks.map((task) => (
              <div key={task.id} className="border border-border rounded-lg p-4 bg-card/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{task.title}</h4>
                    <p className="text-sm flex items-center gap-1 mt-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={task.progress === 100 ? "default" : "secondary"}>
                    {task.progress === 100 ? "Completed" : "In Progress"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress: {task.progress}%</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProgressUpdate(task.id, -10)}
                        disabled={task.progress <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProgressUpdate(task.id, 10)}
                        disabled={task.progress >= 100}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Progress value={task.progress} className="w-full" />
                </div>
              </div>
            ))}

            {currentMember.tasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tasks assigned yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeamMemberDashboard
