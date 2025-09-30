"use client"
import { useDispatch } from "react-redux"
import { updateTaskProgress } from "../redux/slices/membersSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Minus, Plus } from "lucide-react"
import { format, isBefore, addDays } from "date-fns"

const TaskList = ({ tasks, memberId }) => {
  const dispatch = useDispatch()

  const handleProgressChange = (taskId, change) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      const newProgress = Math.max(0, Math.min(100, task.progress + change))
      dispatch(
        updateTaskProgress({
          memberId,
          taskId,
          progress: newProgress,
        }),
      )
    }
  }

  const getTaskPriority = (task) => {
    const dueDate = new Date(task.dueDate)
    const today = new Date()
    const tomorrow = addDays(today, 1)

    if (isBefore(dueDate, today) && task.progress < 100) {
      return { label: "Overdue", variant: "destructive" }
    } else if (isBefore(dueDate, tomorrow) && task.progress < 100) {
      return { label: "Due Today", variant: "secondary" }
    } else if (task.progress === 100) {
      return { label: "Completed", variant: "default" }
    } else {
      return { label: "In Progress", variant: "outline" }
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first (incomplete first), then by due date
    if (a.progress === 100 && b.progress !== 100) return 1
    if (a.progress !== 100 && b.progress === 100) return -1
    return new Date(a.dueDate) - new Date(b.dueDate)
  })

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No tasks assigned</h3>
          <p className="text-muted-foreground text-center">
            You don't have any tasks assigned yet. Check back later or contact your team lead.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => {
        const priority = getTaskPriority(task)
        const isCompleted = task.progress === 100

        return (
          <Card key={task.id} className={isCompleted ? "opacity-75" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className={`text-base ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
                    </div>
                    <Badge variant={priority.variant}>{priority.label}</Badge>
                  </div>
                </div>
                {isCompleted && <CheckCircle className="h-5 w-5 text-green-500 mt-1" />}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>

              {/* Progress Controls */}
              {!isCompleted && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleProgressChange(task.id, -10)}
                      disabled={task.progress <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">Adjust progress</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleProgressChange(task.id, 10)}
                      disabled={task.progress >= 100}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {task.progress >= 90 && task.progress < 100 && (
                    <Button
                      size="sm"
                      onClick={() => handleProgressChange(task.id, 100 - task.progress)}
                      className="gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Mark Complete
                    </Button>
                  )}
                </div>
              )}

              {isCompleted && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>Task completed successfully!</span>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default TaskList
