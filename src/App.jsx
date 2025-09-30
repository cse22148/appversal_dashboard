"use client"

import { Provider } from "react-redux"
import { useSelector, useDispatch } from "react-redux"
import { store } from "./redux/store"
import Dashboard from "./components/Dashboard"
import React from "react"
import { setDarkMode } from "./redux/slices/themeSlice"

function AppContent() {
  const dispatch = useDispatch()
  const { isDarkMode, rtlMode } = useSelector((state) => state.theme)

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("isDarkMode")
      if (saved !== null) {
        dispatch(setDarkMode(saved === "true"))
      }
    } catch (_) {
      // ignore read errors (Safari private mode, etc.)
    }
  }, [dispatch])

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement
      if (isDarkMode) {
        root.classList.add("dark")
        root.style.colorScheme = "dark"
      } else {
        root.classList.remove("dark")
        root.style.colorScheme = "light"
      }
      try {
        localStorage.setItem("isDarkMode", String(isDarkMode))
      } catch (_) {
        // ignore write errors
      }
    }
  }, [isDarkMode])

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
      dir={rtlMode ? "rtl" : "ltr"}
    >
      <Dashboard />
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
