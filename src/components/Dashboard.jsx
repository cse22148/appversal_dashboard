"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { resetInactiveUsers } from "../redux/slices/membersSlice"
import { switchRole } from "../redux/slices/roleSlice"
import { toggleDarkMode } from "../redux/slices/themeSlice"
import Sidebar from "./Sidebar"
import TeamLeadDashboard from "./TeamLeadDashboard"
import TeamMemberDashboard from "./TeamMemberDashboard"
import { Menu, X, Moon, Sun, Search, Bell, Plus, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { currentRole, currentUser } = useSelector((state) => state.role)
  const { isDarkMode } = useSelector((state) => state.theme)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const htmlElement = document.documentElement
    if (isDarkMode) {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Auto-reset inactive users every minute
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(resetInactiveUsers())
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [dispatch])

  const handleRoleToggle = () => {
    const newRole = currentRole === "lead" ? "member" : "lead"
    dispatch(switchRole(newRole))
  }

  return (
    <div className="min-h-screen bg-background transition-colors">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex">
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
        `}
        >
          <Sidebar />
        </div>

        <main className="flex-1 min-h-screen">
          <div className="bg-card border-b border-border p-4 flex items-center justify-between gap-4 transition-colors">
            {/* Left section - Menu and Search */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-muted-foreground hover:bg-accent lg:hidden transition-colors flex-shrink-0"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 h-9 bg-muted/50 border-border focus-visible:ring-primary"
                />
              </div>
            </div>

            {/* Center section - Dark mode toggle */}
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(toggleDarkMode())}
                className="gap-2 hover:bg-accent transition-colors"
              >
                {isDarkMode ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4" />}
                <span className="hidden md:inline">{isDarkMode ? "Light" : "Dark"}</span>
              </Button>
            </div>

            {/* Right section - Profile, Plus, and Notification icons */}
            <div className="flex items-center gap-3">
              {/* Team member avatars */}
              <div className="hidden sm:flex items-center -space-x-2">
                <Avatar className="h-8 w-8 border-2 border-background profile-avatar cursor-pointer">
                  <AvatarImage src="/team-member-one.png" />
                  <AvatarFallback className="bg-blue-500 text-white text-xs">TM</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background profile-avatar cursor-pointer">
                  <AvatarImage src="/team-member-2.png" />
                  <AvatarFallback className="bg-purple-500 text-white text-xs">JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background profile-avatar cursor-pointer">
                  <AvatarImage src="/diverse-team-member-3.png" />
                  <AvatarFallback className="bg-green-500 text-white text-xs">SK</AvatarFallback>
                </Avatar>
              </div>

              {/* Plus icon */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-accent transition-all hover:scale-110"
              >
                <Plus className="h-4 w-4" />
              </Button>

              {/* Notification icon */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-accent transition-all hover:scale-110 relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Current user profile with role and switch button */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-foreground leading-tight">{currentUser}</p>
                    <p className="text-xs text-muted-foreground capitalize leading-tight">
                      {currentRole === "lead" ? "Team Lead" : "Team Member"}
                    </p>
                  </div>
                  <Avatar className="h-9 w-9 border-2 border-primary profile-avatar">
                    <AvatarImage src="/profile-cartoon-avatar.jpg" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                      {currentUser.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRoleToggle}
                  className="h-6 px-2 text-xs gap-1 hover:bg-accent transition-all hover:scale-105 bg-transparent"
                >
                  <ArrowLeftRight className="h-3 w-3" />
                  <span className="hidden md:inline">Switch</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-6 bg-background min-h-screen">
            <div className="max-w-7xl mx-auto">
              {currentRole === "lead" ? <TeamLeadDashboard /> : <TeamMemberDashboard />}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
