import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import './Calendar.css'

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [assignments, setAssignments] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('assignments')) || []
    setAssignments(saved)
  }, [])

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getAssignmentsForDate = (day) => {
    return assignments.filter(a => {
      const assignDate = new Date(a.dueDate)
      return assignDate.getDate() === day &&
             assignDate.getMonth() === currentDate.getMonth() &&
             assignDate.getFullYear() === currentDate.getFullYear()
    })
  }

  const days = []
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  const selectedDayAssignments = selectedDay ? getAssignmentsForDate(selectedDay) : []

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
          ← Previous
        </button>
        <h1>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h1>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
          Next →
        </button>
      </div>

      <div className="calendar-container">
        <div className="weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>

        <div className="days-grid">
          {days.map((day, idx) => (
            <div 
              key={idx} 
              className={`day-cell ${selectedDay === day ? 'selected' : ''}`}
              onClick={() => day && setSelectedDay(day)}
            >
              {day && (
                <div>
                  <div className="day-number">{day}</div>
                  <div className="assignments-preview">
                    {getAssignmentsForDate(day).map((a, i) => (
                      <div key={i} className="assignment-dot" title={a.name}></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedDay && (
        <div className="day-detail">
          <div className="day-detail-header">
            <h2>Assignments for {monthNames[currentDate.getMonth()]} {selectedDay}, {currentDate.getFullYear()}</h2>
            <button onClick={() => setSelectedDay(null)}><X size={24} /></button>
          </div>
          {selectedDayAssignments.length > 0 ? (
            <div className="day-assignments">
              {selectedDayAssignments.map(a => (
                <div key={a.id} className={`assignment-card ${a.completed ? 'completed' : ''}`}>
                  <h3>{a.name}</h3>
                  <p className="class-name">{a.className}</p>
                  {a.description && <p className="description">{a.description}</p>}
                  {a.notes && <p className="notes"><strong>Notes:</strong> {a.notes}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-assignments">No assignments due on this day!</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Calendar