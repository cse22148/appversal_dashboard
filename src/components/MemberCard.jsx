import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, AlertCircle } from "lucide-react"

const MemberCard = ({ member, isLeadView = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Working":
        return "bg-green-500"
      case "Meeting":
        return "bg-blue-500"
      case "Break":
        return "bg-yellow-500"
      case "Offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "Working":
        return "default"
      case "Meeting":
        return "secondary"
      case "Break":
        return "outline"
      case "Offline":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const activeTasks = member.tasks.filter((task) => task.progress < 100)
  const completedTasks = member.tasks.filter((task) => task.progress === 100)
  const averageProgress =
    member.tasks.length > 0 ? member.tasks.reduce((acc, task) => acc + task.progress, 0) / member.tasks.length : 0

  const avatarImages = {
    "John Doe": "/professional-male-avatar.png",
    "Sarah Wilson": "/professional-female-avatar.png",
    "Mike Chen": "/professional-asian-male-avatar.jpg",
    "Emily Rodriguez": "/professional-latina-female-avatar.jpg",
    "David Park": "/professional-korean-male-avatar.jpg",
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatarImages[member.name] || "/placeholder.svg"} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
              />
            </div>
            <div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
          </div>
          <Badge variant={getStatusVariant(member.status)}>{member.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Task Summary */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span>{activeTasks.length} active</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{completedTasks.length} completed</span>
            </div>
          </div>
          <div className="text-muted-foreground">{member.tasks.length} total tasks</div>
        </div>

        {/* Progress Bar */}
        {member.tasks.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(averageProgress)}%</span>
            </div>
            <Progress value={averageProgress} className="h-2" />
          </div>
        )}

        {/* Recent Tasks Preview */}
        {isLeadView && member.tasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Tasks</h4>
            <div className="space-y-1">
              {member.tasks.slice(0, 2).map((task) => (
                <div key={task.id} className="flex items-center justify-between text-sm">
                  <span className="truncate flex-1 mr-2">{task.title}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={task.progress} className="w-16 h-1" />
                    <span className="text-xs text-muted-foreground w-8">{task.progress}%</span>
                  </div>
                </div>
              ))}
              {member.tasks.length > 2 && (
                <p className="text-xs text-muted-foreground">+{member.tasks.length - 2} more tasks</p>
              )}
            </div>
          </div>
        )}

        {/* Last Active */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Last active: {new Date(member.lastActive).toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default MemberCard
