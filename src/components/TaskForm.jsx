"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addTask } from "../redux/slices/membersSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"

const TaskForm = () => {
  const dispatch = useDispatch()
  const { members } = useSelector((state) => state.members)

  const [selectedMember, setSelectedMember] = useState("")
  const [taskTitle, setTaskTitle] = useState("")
  const [dueDate, setDueDate] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedMember || !taskTitle || !dueDate) {
      return
    }

    dispatch(
      addTask({
        memberId: Number.parseInt(selectedMember),
        task: {
          title: taskTitle,
          dueDate: format(dueDate, "yyyy-MM-dd"),
        },
      }),
    )

    // Reset form
    setSelectedMember("")
    setTaskTitle("")
    setDueDate(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Task Assignment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member">Assign to Member</Label>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          member.status === "Working"
                            ? "bg-green-500"
                            : member.status === "Meeting"
                              ? "bg-blue-500"
                              : member.status === "Break"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                        }`}
                      />
                      {member.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task description"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Select due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <Button type="submit" className="w-full" disabled={!selectedMember || !taskTitle || !dueDate}>
            Assign Task
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default TaskForm
