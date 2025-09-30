"use client"

import { useSelector } from "react-redux"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const employeeData = [
  { date: "6 Jan", value: 20 },
  { date: "31 Jan", value: 35 },
  { date: "22 Feb", value: 25 },
  { date: "15 Mar", value: 45 },
  { date: "05 Apr", value: 40 },
  { date: "26 Apr", value: 50 },
  { date: "17 May", value: 35 },
  { date: "08 Jun", value: 55 },
  { date: "29 Jun", value: 45 },
  { date: "20 Jul", value: 60 },
]

const EmployeeInfoChart = () => {
  const { isDarkMode } = useSelector((state) => state.theme)

  return (
    <Card className="bg-card border-border transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-foreground">Employees Info</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-48 w-full aspect-auto"
          config={{
            value: { label: "Employees", color: "hsl(var(--chart-2))" },
          }}
        >
          <LineChart data={employeeData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#e5e7eb"} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              interval={0}
              tickMargin={8}
              padding={{ left: 10, right: 10 }}
              tick={{ fontSize: 12, fill: isDarkMode ? "#94a3b8" : "#6b7280" }}
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#f97316" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default EmployeeInfoChart
