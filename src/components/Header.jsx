"use client"
import { useSelector, useDispatch } from "react-redux"
import { switchRole } from "../redux/slices/roleSlice"
import { toggleDarkMode } from "../redux/slices/themeSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Settings, HelpCircle, LogOut, Triangle, Moon, Sun } from "lucide-react"
import MobileMenu from "./MobileMenu"

const Header = () => {
  const dispatch = useDispatch()
  const { currentRole, currentUser } = useSelector((state) => state.role)
  const { isDarkMode } = useSelector((state) => state.theme)

  const handleRoleSwitch = () => {
    const newRole = currentRole === "lead" ? "member" : "lead"
    dispatch(switchRole(newRole))
  }

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <header
      className={`h-16 sticky top-0 z-50 border-b dark-transition ${
        isDarkMode
          ? "bg-gray-900/95 border-gray-700 text-gray-100 supports-[backdrop-filter]:bg-gray-900/80"
          : "bg-white/95 border-gray-200 text-gray-900 supports-[backdrop-filter]:bg-white/80"
      } backdrop-blur`}
    >
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Mobile Menu */}
          <MobileMenu />

          <div className="flex items-center gap-2">
            <Triangle className="h-6 w-6 fill-current text-foreground" />
            <span className="font-semibold text-lg text-foreground">Team Pulse</span>
            <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
              Enterprise
            </Badge>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Project
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Deployments
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Analytics
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Speed Insights
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Logs
            </Button>
            <Button variant="ghost" size="sm" className="bg-muted text-foreground">
              Dashboard
            </Button>
          </nav>
        </div>

        {/* Right side - Controls and User */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Environment Selector - Hidden on mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 hidden sm:flex bg-transparent">
                Production
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Production</DropdownMenuItem>
              <DropdownMenuItem>Preview</DropdownMenuItem>
              <DropdownMenuItem>Development</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Time Range Selector - Hidden on mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 hidden md:flex bg-transparent">
                Last 12 hours
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Last hour</DropdownMenuItem>
              <DropdownMenuItem>Last 12 hours</DropdownMenuItem>
              <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={handleDarkModeToggle} className="gap-2 bg-transparent">
            {isDarkMode ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-slate-700" />}
            <span className="hidden md:inline">{isDarkMode ? "Light" : "Dark"}</span>
          </Button>

          {/* Role Toggle */}
          <Button
            onClick={handleRoleSwitch}
            variant={currentRole === "lead" ? "default" : "secondary"}
            size="sm"
            className="gap-2"
          >
            <span className="hidden sm:inline">{currentRole === "lead" ? "Team Lead" : "Team Member"}</span>
            <span className="sm:hidden">{currentRole === "lead" ? "Lead" : "Member"}</span>
          </Button>

          {/* Help and Settings - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Feedback
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Changelog
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Docs
            </Button>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 pl-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/professional-male-avatar.png" />
                  <AvatarFallback>
                    {currentUser
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="lg:hidden">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header
