import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Activity } from "lucide-react"

const StatusSummary = () => {
  const { members } = useSelector((state) => state.members)

  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1
    return acc
  }, {})

  const statusColors = {
    Working: "bg-green-500",
    Meeting: "bg-blue-500",
    Break: "bg-yellow-500",
    Offline: "bg-gray-500",
  }

  const statusVariants = {
    Working: "default",
    Meeting: "secondary",
    Break: "outline",
    Offline: "secondary",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Team Status Overview</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <Badge key={status} variant={statusVariants[status]} className="gap-2">
                <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
                {count} {status}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {members.filter((m) => m.status !== "Offline").length} of {members.length} members active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quick Summary</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statusCounts["Working"] || 0} Working · {statusCounts["Meeting"] || 0} Meeting ·{" "}
            {statusCounts["Break"] || 0} Break
          </div>
          <p className="text-xs text-muted-foreground">
            Team productivity at {Math.round(((statusCounts["Working"] || 0) / members.length) * 100)}%
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatusSummary
