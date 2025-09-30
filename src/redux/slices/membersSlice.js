import { createSlice } from "@reduxjs/toolkit"

const initialMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    status: "Working",
    avatar: "/professional-male-avatar.png",
    tasks: [
      { id: 1, title: "Complete dashboard redesign", dueDate: "2024-01-15", progress: 60 },
      { id: 2, title: "Review API documentation", dueDate: "2024-01-12", progress: 100 },
    ],
    lastActive: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@company.com",
    status: "Meeting",
    avatar: "/professional-female-avatar.png",
    tasks: [
      { id: 3, title: "Client presentation prep", dueDate: "2024-01-14", progress: 80 },
      { id: 4, title: "Update user stories", dueDate: "2024-01-16", progress: 40 },
    ],
    lastActive: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@company.com",
    status: "Break",
    avatar: "/professional-asian-male-avatar.jpg",
    tasks: [{ id: 5, title: "Database optimization", dueDate: "2024-01-18", progress: 30 }],
    lastActive: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily@company.com",
    status: "Working",
    avatar: "/professional-latina-female-avatar.jpg",
    tasks: [
      { id: 6, title: "Mobile app testing", dueDate: "2024-01-13", progress: 90 },
      { id: 7, title: "Bug fixes deployment", dueDate: "2024-01-17", progress: 20 },
    ],
    lastActive: new Date().toISOString(),
  },
  {
    id: 5,
    name: "David Park",
    email: "david@company.com",
    status: "Offline",
    avatar: "/professional-korean-male-avatar.jpg",
    tasks: [{ id: 8, title: "Security audit review", dueDate: "2024-01-20", progress: 0 }],
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
]

const membersSlice = createSlice({
  name: "members",
  initialState: {
    members: initialMembers,
    statusFilter: "All",
    sortBy: "name",
  },
  reducers: {
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload
      const member = state.members.find((m) => m.id === memberId)
      if (member) {
        member.status = status
        member.lastActive = new Date().toISOString()
      }
    },
    addTask: (state, action) => {
      const { memberId, task } = action.payload
      const member = state.members.find((m) => m.id === memberId)
      if (member) {
        const newTask = {
          id: Date.now(),
          title: task.title,
          dueDate: task.dueDate,
          progress: 0,
        }
        member.tasks.push(newTask)
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, progress } = action.payload
      const member = state.members.find((m) => m.id === memberId)
      if (member) {
        const task = member.tasks.find((t) => t.id === taskId)
        if (task) {
          task.progress = Math.max(0, Math.min(100, progress))
        }
      }
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    resetInactiveUsers: (state) => {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
      state.members.forEach((member) => {
        if (new Date(member.lastActive) < tenMinutesAgo && member.status !== "Offline") {
          member.status = "Offline"
        }
      })
    },
  },
})

export const { updateMemberStatus, addTask, updateTaskProgress, setStatusFilter, setSortBy, resetInactiveUsers } =
  membersSlice.actions
export default membersSlice.reducer
