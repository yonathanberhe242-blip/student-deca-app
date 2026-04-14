import { useEffect, useState } from 'react'
import './Dashboard.css'

function Dashboard() {
  const [classes, setClasses] = useState([])
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    const savedClasses = JSON.parse(localStorage.getItem('classes')) || []
    const savedAssignments = JSON.parse(localStorage.getItem('assignments')) || []
    setClasses(savedClasses)
    setAssignments(savedAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).slice(0, 5))
  }, [])

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="dashboard-grid">
        <div className="card">
          <h2>📊 Overview</h2>
          <p>Classes: {classes.length}</p>
          <p>Pending Assignments: {assignments.filter(a => !a.completed).length}</p>
        </div>

        <div className="card">
          <h2>⏰ Upcoming Assignments</h2>
          {assignments.length > 0 ? (
            <ul>
              {assignments.map((a, i) => (
                <li key={i}>{a.name} - Due: {new Date(a.dueDate).toLocaleDateString()}</li>
              ))}
            </ul>
          ) : (
            <p>No assignments yet!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard