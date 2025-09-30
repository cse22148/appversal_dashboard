"use client"
import { useDispatch } from "react-redux"
import { updateMemberStatus } from "../redux/slices/membersSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Coffee, Users, PowerOff } from "lucide-react"

const StatusSelector = ({ currentMember }) => {
  const dispatch = useDispatch()

  const statusOptions = [
    {
      value: "Working",
      label: "Working",
      icon: Briefcase,
      color: "bg-green-500",
      variant: "default",
      description: "Actively working on tasks",
    },
    {
      value: "Meeting",
      label: "Meeting",
      icon: Users,
      color: "bg-blue-500",
      variant: "secondary",
      description: "In a meeting or call",
    },
    {
      value: "Break",
      label: "Break",
      icon: Coffee,
      color: "bg-yellow-500",
      variant: "outline",
      description: "Taking a break",
    },
    {
      value: "Offline",
      label: "Offline",
      icon: PowerOff,
      color: "bg-gray-500",
      variant: "secondary",
      description: "Not available",
    },
  ]

  const handleStatusChange = (status) => {
    dispatch(
      updateMemberStatus({
        memberId: currentMember.id,
        status: status,
      }),
    )
  }

  const avatarImages = {
    "John Doe": "/professional-male-avatar.png",
    "Sarah Wilson": "/professional-female-avatar.png",
    "Mike Chen": "/professional-asian-male-avatar.jpg",
    "Emily Rodriguez": "/professional-latina-female-avatar.jpg",
    "David Park": "/professional-korean-male-avatar.jpg",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarImages[currentMember.name] || "/placeholder.svg"} />
              <AvatarFallback>
                {currentMember.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                statusOptions.find((s) => s.value === currentMember.status)?.color
              }`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium truncate">{currentMember.name}</div>
            <div className="text-sm text-muted-foreground truncate">{currentMember.email}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Current status:</span>
          <Badge variant={statusOptions.find((s) => s.value === currentMember.status)?.variant}>
            {currentMember.status}
          </Badge>
        </div>

        {/* Mobile: Stack buttons vertically, Desktop: 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {statusOptions.map((status) => {
            const Icon = status.icon
            const isActive = currentMember.status === status.value

            return (
              <Button
                key={status.value}
                variant={isActive ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-center gap-2 sm:aspect-square"
                onClick={() => handleStatusChange(status.value)}
              >
                <Icon className="h-5 w-5" />
                <div className="text-center">
                  <div className="font-medium text-sm">{status.label}</div>
                  <div className="text-xs text-muted-foreground hidden sm:block">{status.description}</div>
                </div>
              </Button>
            )
          })}
        </div>

        <div className="text-xs text-muted-foreground">
          Last updated: {new Date(currentMember.lastActive).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}

export default StatusSelector
