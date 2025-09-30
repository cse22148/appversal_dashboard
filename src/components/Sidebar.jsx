"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { switchRole } from "../redux/slices/roleSlice"
import { toggleRtlMode, toggleDarkMode } from "../redux/slices/themeSlice"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  LayoutDashboard,
  FolderOpen,
  Ticket,
  Users,
  UserCheck,
  CreditCard,
  DollarSign,
  Smartphone,
  FileText,
  Layers,
  CheckSquare,
  RotateCcw,
  User,
  Crown,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

const Sidebar = () => {
  const dispatch = useDispatch()
  const { currentRole } = useSelector((state) => state.role)
  const { isDarkMode, rtlMode } = useSelector((state) => state.theme)
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleRoleToggle = () => {
    const newRole = currentRole === "lead" ? "member" : "lead"
    dispatch(switchRole(newRole))
  }

  const handleRtlModeToggle = () => {
    dispatch(toggleRtlMode())
  }

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: FolderOpen, label: "Projects" },
    { icon: Ticket, label: "Tickets" },
    { icon: Users, label: "Our Clients" },
    { icon: UserCheck, label: "Employees" },
    { icon: CreditCard, label: "Accounts" },
    { icon: DollarSign, label: "Payroll" },
    { icon: Smartphone, label: "App" },
  ]

  const bottomNavigationItems = [
    { icon: FileText, label: "Other Pages" },
    { icon: Layers, label: "UI Components" },
  ]

  return (
    <aside className="w-64 h-screen overflow-y-auto rounded-r-3xl shadow-2xl bg-sidebar text-sidebar-foreground transition-colors duration-300">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-8 p-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center shadow-md transition-colors duration-300">
            <CheckSquare className="h-5 w-5 text-sidebar-accent-foreground" />
          </div>
          <span className="text-lg font-semibold">My Task</span>
        </div>

        <div className="mb-6 p-3 rounded-xl border border-sidebar-border bg-sidebar-accent/20 transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {currentRole === "lead" ? (
                <Crown className="h-4 w-4 text-yellow-300" />
              ) : (
                <User className="h-4 w-4 text-blue-300" />
              )}
              <span className="text-sm font-medium capitalize">
                {currentRole === "lead" ? "Team Leader" : "Team Member"}
              </span>
            </div>
            <Switch
              checked={currentRole === "lead"}
              onCheckedChange={handleRoleToggle}
              className="data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-blue-500"
            />
          </div>
          <p className="text-xs text-sidebar-foreground/70">
            {currentRole === "lead" ? "Managing team operations" : "Individual contributor"}
          </p>
        </div>

        <div className="space-y-1 flex-1">
          {navigationItems.map((item, index) => (
            <div key={index}>
              <Button
                onClick={() => toggleDropdown(index)}
                variant="ghost"
                className={`w-full justify-start gap-3 h-12 px-4 text-sidebar-foreground transition-all duration-200 rounded-xl hover:scale-105 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-lg ${
                  item.active ? "bg-sidebar-accent/70 shadow-md scale-105" : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {openDropdown === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              {openDropdown === index && (
                <div className="mt-1 ml-4 p-3 rounded-lg bg-sidebar-accent/20 border border-sidebar-border text-center animate-in slide-in-from-top-2 duration-200">
                  <p className="text-sm text-sidebar-foreground/70">Nothing here buddy</p>
                </div>
              )}
            </div>
          ))}

          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors cursor-pointer hover:bg-sidebar-accent/30">
              <div className="flex items-center gap-3">
                <RotateCcw className="h-4 w-4 rotate-90" />
                <span className="text-sm font-medium">Enable Dark Mode</span>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={() => dispatch(toggleDarkMode())}
                className="data-[state=checked]:bg-sidebar-primary data-[state=unchecked]:bg-sidebar-accent"
              />
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors cursor-pointer hover:bg-sidebar-accent/30">
              <div className="flex items-center gap-3">
                <RotateCcw className="h-4 w-4" />
                <span className="text-sm font-medium">Enable RTL Mode</span>
              </div>
              <Switch
                checked={rtlMode}
                onCheckedChange={handleRtlModeToggle}
                className="data-[state=checked]:bg-sidebar-primary data-[state=unchecked]:bg-sidebar-accent"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1 mt-4 pt-4 border-t border-sidebar-border transition-colors duration-300">
          {bottomNavigationItems.map((item, index) => {
            const dropdownIndex = navigationItems.length + index
            return (
              <div key={index}>
                <Button
                  onClick={() => toggleDropdown(dropdownIndex)}
                  variant="ghost"
                  className="w-full justify-start gap-3 h-12 px-4 text-sidebar-foreground transition-all duration-200 rounded-xl hover:scale-105 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-lg"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {openDropdown === dropdownIndex ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                {openDropdown === dropdownIndex && (
                  <div className="mt-1 ml-4 p-3 rounded-lg bg-sidebar-accent/20 border border-sidebar-border text-center animate-in slide-in-from-top-2 duration-200">
                    <p className="text-sm text-sidebar-foreground/70">Nothing here buddy</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
