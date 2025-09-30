"use client"
import { Provider } from "react-redux"
import { store } from "../src/redux/store"
import Dashboard from "../src/components/Dashboard"

export default function Page() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  )
}
