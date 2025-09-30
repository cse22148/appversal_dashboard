import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const StatusChart = () => {
  const { members } = useSelector((state) => state.members)

  // Prepare data for pie chart
  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1
    return acc
  }, {})

  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    percentage: Math.round((count / members.length) * 100),
  }))

  // Prepare data for task progress bar chart
  const taskProgressData = members.map((member) => {
    const activeTasks = member.tasks.filter((task) => task.progress < 100).length
    const completedTasks = member.tasks.filter((task) => task.progress === 100).length
    const averageProgress =
      member.tasks.length > 0 ? member.tasks.reduce((acc, task) => acc + task.progress, 0) / member.tasks.length : 0

    return {
      name: member.name.split(" ")[0], // First name only for chart
      active: activeTasks,
      completed: completedTasks,
      progress: Math.round(averageProgress),
    }
  })

  const COLORS = {
    Working: "#22c55e",
    Meeting: "#3b82f6",
    Break: "#eab308",
    Offline: "#6b7280",
  }

  const chartConfig = {
    Working: {
      label: "Working",
      color: "hsl(var(--chart-1))",
    },
    Meeting: {
      label: "Meeting",
      color: "hsl(var(--chart-2))",
    },
    Break: {
      label: "Break",
      color: "hsl(var(--chart-3))",
    },
    Offline: {
      label: "Offline",
      color: "hsl(var(--chart-4))",
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Team Status Distribution</CardTitle>
          <CardDescription>Current status breakdown of all team members</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[entry.name] }} />
                <span className="text-sm">
                  {entry.name} ({entry.value})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Progress Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Task Progress Overview</CardTitle>
          <CardDescription>Active vs completed tasks by team member</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              active: {
                label: "Active Tasks",
                color: "hsl(var(--chart-1))",
              },
              completed: {
                label: "Completed Tasks",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="active" fill="var(--color-active)" name="Active Tasks" />
                <Bar dataKey="completed" fill="var(--color-completed)" name="Completed Tasks" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatusChart
