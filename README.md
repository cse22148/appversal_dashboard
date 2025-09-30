 # Team Pulse Dashboard

## Project Overview
Team Pulse Dashboard is a **productivity monitoring tool** designed for internal teams.  
It allows **Team Leads** to monitor member statuses and assign tasks, while **Team Members** can update their status and track task progress.  
The project uses **React** for UI rendering and **Redux Toolkit** for global state management. No backend integration is required, though a free API like [Random User API](https://randomuser.me/) can be used to simulate team member data.

---

## Tech Stack
- **Frontend:** React (with Hooks)  
- **State Management:** Redux Toolkit  
- **Styling:** Tailwind CSS or plain CSS  
- **Charts (Optional):** Recharts or Chart.js  
- **Other Tools:** Git, Netlify/Vercel for deployment  

---

## Features

### Role-Based Views
- **Role Switching:** Toggle between Team Lead and Team Member modes (tracked in Redux state).  

#### Team Lead View
- **Team Member Status Monitor:**  
  - View all members with current status badges (Working, Break, Meeting, Offline)  
  - Summary section (e.g., “2 Working · 1 Meeting · 1 Break”)  
- **Assign Tasks to Members:**  
  - Task form with member selection, task title, and due date  
  - Updates Redux state on submission  
- **Filtering & Sorting:**  
  - Filter members by status  
  - Sort members by number of active tasks  

#### Team Member View
- **Update Your Status:**  
  - Buttons to select Working, Break, Meeting, or Offline (only one active at a time)  
  - Updates global state  
- **View Your Tasks:**  
  - Displays assigned tasks with title and due date  
  - Progress bar (0–100%), increment/decrement in steps of 10%  
  - Marks task complete when progress reaches 100%  

---

## Redux Toolkit Usage
- All application state is managed using Redux Toolkit.  
- Example store setup:


 Setup Instructions

Clone the repository

git clone  


Navigate to the project folder

cd team-pulse-dashboard


Install dependencies

npm install


Start the development server

npm start
});


Open in browser
Visit http://localhost:3000


 

