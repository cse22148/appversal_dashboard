"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const UpcomingInterviews = () => {
  const { isDarkMode } = useSelector((state) => state.theme)
  const [showAll, setShowAll] = useState(false)

  const interviews = [
    {
      id: 1,
      name: "John Smith",
      position: "Frontend Developer",
      time: "10:00 AM",
      date: "Today",
      avatar: "/professional-headshot.png",
      status: "confirmed",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "UI/UX Designer",
      time: "2:30 PM",
      date: "Today",
      avatar: "/professional-woman-headshot.png",
      status: "pending",
    },
    {
      id: 3,
      name: "Mike Chen",
      position: "Backend Developer",
      time: "11:00 AM",
      date: "Tomorrow",
      avatar: "/professional-asian-man.png",
      status: "confirmed",
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Product Manager",
      time: "3:00 PM",
      date: "Tomorrow",
      avatar: "/professional-woman-manager.png",
      status: "rescheduled",
    },
  ]

  const displayedInterviews = showAll ? interviews : interviews.slice(0, 2)

  const getStatusColor = (status) => {
    if (isDarkMode) {
      switch (status) {
        case "confirmed":
          return "bg-green-900/50 text-green-300 border-green-700"
        case "pending":
          return "bg-yellow-900/50 text-yellow-300 border-yellow-700"
        case "rescheduled":
          return "bg-blue-900/50 text-blue-300 border-blue-700"
        default:
          return "bg-gray-700 text-gray-300 border-gray-600"
      }
    } else {
      switch (status) {
        case "confirmed":
          return "bg-green-100 text-green-800"
        case "pending":
          return "bg-yellow-100 text-yellow-800"
        case "rescheduled":
          return "bg-blue-100 text-blue-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }
  }

  return (
    <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} dark-transition`}>
      <CardHeader className="pb-4">
        <CardTitle className={`text-lg font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayedInterviews.map((interview) => (
            <div
              key={interview.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"}`}
            >
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={interview.avatar || "/placeholder.svg"} alt={interview.name} />
                <AvatarFallback>
                  {interview.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {interview.name}
                </p>
                <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {interview.position}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <div
                  className={`flex items-center gap-1 text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  <Clock className="h-3 w-3" />
                  <span className="hidden sm:inline">{interview.time}</span>
                  <span className="sm:hidden">{interview.time.split(" ")[0]}</span>
                </div>
                <Badge variant="secondary" className={`text-xs ${getStatusColor(interview.status)}`}>
                  <span className="hidden sm:inline">{interview.status}</span>
                  <span className="sm:hidden">{interview.status.charAt(0).toUpperCase()}</span>
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-4 pt-4 border-t ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
          <button
            onClick={() => setShowAll(!showAll)}
            className={`w-full text-sm font-medium transition-colors ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-[#6366f1] hover:text-[#4f46e5]"}`}
          >
            {showAll ? "Show Less" : "View All Interviews"}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default UpcomingInterviews
