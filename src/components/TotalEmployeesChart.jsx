"use client"

import { useSelector } from "react-redux"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TotalEmployeesChart = () => {
  const { isDarkMode } = useSelector((state) => state.theme)

  const data = [
    { name: "Men", value: 60, color: "#ec4899", count: 147 },
    { name: "Women", value: 40, color: "#ef4444", count: 99 },
  ]

  const total = data.reduce((sum, item) => sum + item.count, 0)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div
          className={`p-3 border rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800 border-gray-600 text-gray-100" : "bg-white"}`}
        >
          <p className="font-medium">{data.name}</p>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Count: {data.count}</p>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Percentage: {data.value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card
      className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"} dark-transition`}
    >
      <CardHeader className="pb-2">
        <CardTitle
          className={`text-lg font-medium flex items-center gap-2 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          Total Employees
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="relative w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>{total}</span>
              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total</span>
            </div>
          </div>
          <div className="flex-1 ml-6">
            <div className="space-y-3">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-white/60"}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                      {item.count}
                    </div>
                    <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TotalEmployeesChart
