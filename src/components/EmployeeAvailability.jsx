import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, XCircle, FileText } from "lucide-react"

const EmployeeAvailability = () => {
  const { isDarkMode } = useSelector((state) => state.theme)

  const availabilityMetrics = [
    {
      icon: CheckCircle,
      label: "Attendance",
      value: "80%",
      iconColor: "text-green-500",
      bgColor: isDarkMode ? "bg-green-900/30 border border-green-700" : "bg-green-50",
    },
    {
      icon: Clock,
      label: "Late Coming",
      value: "17",
      iconColor: "text-orange-500",
      bgColor: isDarkMode ? "bg-orange-900/30 border border-orange-700" : "bg-orange-50",
    },
    {
      icon: XCircle,
      label: "Absent",
      value: "5",
      iconColor: "text-red-500",
      bgColor: isDarkMode ? "bg-red-900/30 border border-red-700" : "bg-red-50",
    },
    {
      icon: FileText,
      label: "Leave Apply",
      value: "12",
      iconColor: "text-blue-500",
      bgColor: isDarkMode ? "bg-blue-900/30 border border-blue-700" : "bg-blue-50",
    },
  ]

  return (
    <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} dark-transition`}>
      <CardHeader className="pb-4">
        <CardTitle className={`text-lg font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
          Employees Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {availabilityMetrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-3 p-3">
              <div className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                <metric.icon className={`h-5 w-5 ${metric.iconColor}`} />
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{metric.label}</p>
                <p className={`text-lg font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {metric.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EmployeeAvailability
