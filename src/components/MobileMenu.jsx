"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  LayoutDashboard,
  BarChart3,
  Settings,
  Zap,
  Database,
  Globe,
  Shield,
  Layers,
  Activity,
  FileText,
  AlertTriangle,
} from "lucide-react"

const MobileMenu = () => {
  const [open, setOpen] = useState(false)
  const { isDarkMode } = useSelector((state) => state.theme)

  const navigationItems = [
    {
      section: "OVERVIEW",
      items: [
        { icon: LayoutDashboard, label: "Overview", active: true },
        { icon: FileText, label: "Notebooks", badge: "Internal" },
      ],
    },
    {
      section: "COMPUTE",
      items: [
        { icon: Zap, label: "Team Functions" },
        { icon: Layers, label: "Edge Functions" },
        { icon: Globe, label: "External APIs" },
        { icon: Database, label: "Middleware", badge: "Internal" },
        { icon: Database, label: "Data Cache", badge: "Internal" },
      ],
    },
    {
      section: "EDGE NETWORK",
      items: [
        { icon: Activity, label: "Edge Requests" },
        { icon: BarChart3, label: "Fast Data Transfer" },
        { icon: Shield, label: "Image Optimization" },
        { icon: Settings, label: "ISR" },
      ],
    },
    {
      section: "DEPLOYMENTS",
      items: [{ icon: Settings, label: "Build Diagnostics" }],
    },
    {
      section: "EARLY ACCESS",
      items: [{ icon: AlertTriangle, label: "Errors" }],
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={`w-64 p-0 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""} dark-transition`}
      >
        <div className="p-4 space-y-6">
          {navigationItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              <h3
                className={`text-xs font-medium uppercase tracking-wider px-2 ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`}
              >
                {section.section}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    variant={item.active ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 h-9 px-2"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
