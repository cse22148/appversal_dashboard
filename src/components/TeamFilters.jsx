"use client"
import { useSelector, useDispatch } from "react-redux"
import { setStatusFilter, setSortBy } from "../redux/slices/membersSlice"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, SortAsc } from "lucide-react"

const TeamFilters = () => {
  const dispatch = useDispatch()
  const { statusFilter, sortBy } = useSelector((state) => state.members)

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value))}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Working">Working</SelectItem>
            <SelectItem value="Meeting">Meeting</SelectItem>
            <SelectItem value="Break">Break</SelectItem>
            <SelectItem value="Offline">Offline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        <SortAsc className="h-4 w-4 text-muted-foreground" />
        <Select value={sortBy} onValueChange={(value) => dispatch(setSortBy(value))}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">By Name</SelectItem>
            <SelectItem value="tasks">By Tasks</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TeamFilters
