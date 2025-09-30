import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

const ProductivityMetrics = () => {
  const { members } = useSelector((state) => state.members)

  // Generate mock productivity data for the last 7 days
  const generateProductivityData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return days.map((day, index) => {
      const activeMembers = Math.floor(Math.random() * 3) + 2 // 2-4 active members
      const tasksCompleted = Math.floor(Math.random() * 8) + 3 // 3-10 tasks
      const productivity = Math.floor(Math.random() * 30) + 60 // 60-90% productivity

      return {
        day,
        activeMembers,
        tasksCompleted,
        productivity,
        date: new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      }
    })
  }

  const productivityData = generateProductivityData()

  // Calculate current metrics
  const currentActiveMembers = members.filter((m) => m.status !== "Offline").length
  const totalTasks = members.reduce((acc, member) => acc + member.tasks.length, 0)
  const completedTasks = members.reduce(
    (acc, member) => acc + member.tasks.filter((task) => task.progress === 100).length,
    0,
  )
  const currentProductivity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Calculate trends (mock data for demo)
  const productivityTrend = 12 // +12% from last week
  const taskCompletionTrend = -3 // -3% from last week

  const chartConfig = {
    activeMembers: {
      label: "Active Members",
      color: "hsl(var(--chart-1))",
    },
    tasksCompleted: {
      label: "Tasks Completed",
      color: "hsl(var(--chart-2))",
    },
    productivity: {
      label: "Productivity %",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <div className="space-y-6">
      {/* Current Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Productivity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentProductivity}%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {productivityTrend > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{productivityTrend}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{productivityTrend}%</span>
                </>
              )}
              from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentActiveMembers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((currentActiveMembers / members.length) * 100)}% of team online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedTasks}/{totalTasks}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {taskCompletionTrend > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{taskCompletionTrend}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{taskCompletionTrend}%</span>
                </>
              )}
              from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Productivity Trends Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity Trends</CardTitle>
            <CardDescription>Active members and task completion over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="activeMembers"
                    stroke="var(--color-activeMembers)"
                    strokeWidth={2}
                    name="Active Members"
                  />
                  <Line
                    type="monotone"
                    dataKey="tasksCompleted"
                    stroke="var(--color-tasksCompleted)"
                    strokeWidth={2}
                    name="Tasks Completed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Productivity Percentage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Productivity Percentage</CardTitle>
            <CardDescription>Team productivity percentage over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="productivity"
                    stroke="var(--color-productivity)"
                    fill="var(--color-productivity)"
                    fillOpacity={0.3}
                    name="Productivity %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProductivityMetrics
