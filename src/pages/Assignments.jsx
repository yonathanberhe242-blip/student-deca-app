import { useState, useEffect } from 'react'
import { Plus, X, Check } from 'lucide-react'
import './Assignments.css'

function Assignments() {
  const [assignments, setAssignments] = useState([])
  const [classes, setClasses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    className: '',
    dueDate: '',
    description: '',
    notes: ''
  })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('assignments')) || []
    const savedClasses = JSON.parse(localStorage.getItem('classes')) || []
    setAssignments(saved)
    setClasses(savedClasses)
  }, [])

  const handleAddAssignment = () => {
    if (formData.name.trim() && formData.className.trim() && formData.dueDate) {
      const newAssignment = {
        id: Date.now(),
        ...formData,
        completed: false
      }
      const updated = [...assignments, newAssignment]
      setAssignments(updated)
      localStorage.setItem('assignments', JSON.stringify(updated))
      setFormData({ name: '', className: '', dueDate: '', description: '', notes: '' })
      setShowForm(false)
    }
  }

  const handleToggleComplete = (id) => {
    const updated = assignments.map(a => 
      a.id === id ? {...a, completed: !a.completed} : a
    )
    setAssignments(updated)
    localStorage.setItem('assignments', JSON.stringify(updated))
  }

  const handleDeleteAssignment = (id) => {
    const updated = assignments.filter(a => a.id !== id)
    setAssignments(updated)
    localStorage.setItem('assignments', JSON.stringify(updated))
  }

  return (
    <div className="assignments-page">
      <div className="header">
        <h1>Assignments & Notes</h1>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} /> Add Assignment
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <input
            type="text"
            placeholder="Assignment Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <select
            value={formData.className}
            onChange={(e) => setFormData({...formData, className: e.target.value})}
          >
            <option value="">Select Class</option>
            {classes.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
          <button onClick={handleAddAssignment}>Add Assignment</button>
        </div>
      )}

      <div className="assignments-list">
        {assignments.length > 0 ? (
          assignments.map(assignment => (
            <div key={assignment.id} className={`assignment-item ${assignment.completed ? 'completed' : ''}`}>
              <div className="assignment-content">
                <div className="assignment-header">
                  <h3>{assignment.name}</h3>
                  <span className="class-badge">{assignment.className}</span>
                </div>
                <p className="due-date">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                {assignment.description && <p className="description">{assignment.description}</p>}
                {assignment.notes && <p className="notes"><strong>Notes:</strong> {assignment.notes}</p>}
              </div>
              <div className="assignment-actions">
                <button 
                  className="btn-complete"
                  onClick={() => handleToggleComplete(assignment.id)}
                >
                  <Check size={18} />
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteAssignment(assignment.id)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No assignments yet!</p>
        )}
      </div>
    </div>
  )
}

export default Assignments