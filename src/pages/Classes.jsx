import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import './Classes.css'

function Classes() {
  const [classes, setClasses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', teacher: '', period: '', classType: 'Regular' })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('classes')) || []
    setClasses(saved)
  }, [])

  const handleAddClass = () => {
    if (formData.name.trim()) {
      const newClass = {
        id: Date.now(),
        ...formData,
        grade: 'A'
      }
      const updated = [...classes, newClass]
      setClasses(updated)
      localStorage.setItem('classes', JSON.stringify(updated))
      setFormData({ name: '', teacher: '', period: '', classType: 'Regular' })
      setShowForm(false)
    }
  }

  const handleDeleteClass = (id) => {
    const updated = classes.filter(c => c.id !== id)
    setClasses(updated)
    localStorage.setItem('classes', JSON.stringify(updated))
  }

  return (
    <div className="classes-page">
      <div className="header">
        <h1>My Classes</h1>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} /> Add Class
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <input
            type="text"
            placeholder="Class Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Teacher Name"
            value={formData.teacher}
            onChange={(e) => setFormData({...formData, teacher: e.target.value})}
          />
          <input
            type="text"
            placeholder="Period/Time"
            value={formData.period}
            onChange={(e) => setFormData({...formData, period: e.target.value})}
          />
          <select
            value={formData.classType}
            onChange={(e) => setFormData({...formData, classType: e.target.value})}
          >
            <option value="Regular">Regular</option>
            <option value="Honors">Honors</option>
            <option value="AP">AP</option>
            <option value="Dual Enrollment">Dual Enrollment</option>
          </select>
          <button onClick={handleAddClass}>Add Class</button>
        </div>
      )}

      <div className="classes-grid">
        {classes.map(cls => (
          <div key={cls.id} className="class-card">
            <div className="card-header">
              <h2>{cls.name}</h2>
              <button className="btn-delete" onClick={() => handleDeleteClass(cls.id)}>
                <X size={18} />
              </button>
            </div>
            <p><strong>Teacher:</strong> {cls.teacher}</p>
            <p><strong>Period:</strong> {cls.period}</p>
            <p className="class-type"><strong>Type:</strong> <span className={`type-badge ${cls.classType.toLowerCase().replace(' ', '-')}`}>{cls.classType}</span></p>
            <p className="grade"><strong>Grade:</strong> {cls.grade}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Classes