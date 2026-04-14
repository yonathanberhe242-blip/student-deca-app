import { useState, useEffect } from 'react'
import { Plus, X, Edit2 } from 'lucide-react'
import './Notes.css'

function Notes() {
  const [notes, setNotes] = useState([])
  const [classes, setClasses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    className: '',
    title: '',
    content: ''
  })

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || []
    const savedClasses = JSON.parse(localStorage.getItem('classes')) || []
    setNotes(savedNotes)
    setClasses(savedClasses)
  }, [])

  const handleSaveNote = () => {
    if (formData.className.trim() && formData.title.trim() && formData.content.trim()) {
      let updated
      if (editingId) {
        updated = notes.map(n =>
          n.id === editingId
            ? { ...n, ...formData, updatedAt: new Date().toISOString() }
            : n
        )
      } else {
        const newNote = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        updated = [...notes, newNote]
      }
      setNotes(updated)
      localStorage.setItem('notes', JSON.stringify(updated))
      setFormData({ className: '', title: '', content: '' })
      setShowForm(false)
      setEditingId(null)
    }
  }

  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id)
    setNotes(updated)
    localStorage.setItem('notes', JSON.stringify(updated))
  }

  const handleEditNote = (note) => {
    setFormData({
      className: note.className,
      title: note.title,
      content: note.content
    })
    setEditingId(note.id)
    setShowForm(true)
  }

  const notesByClass = {}
  notes.forEach(note => {
    if (!notesByClass[note.className]) {
      notesByClass[note.className] = []
    }
    notesByClass[note.className].push(note)
  })

  return (
    <div className="notes-page">
      <div className="header">
        <h1>📝 Class Notes</h1>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} /> New Note
        </button>
      </div>

      {showForm && (
        <div className="form-container">
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
            type="text"
            placeholder="Note Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <textarea
            placeholder="Write your note here..."
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            rows="8"
          />
          <div className="form-buttons">
            <button className="btn-save" onClick={handleSaveNote}>
              {editingId ? 'Update Note' : 'Save Note'}
            </button>
            <button 
              className="btn-cancel" 
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
                setFormData({ className: '', title: '', content: '' })
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="notes-container">
        {Object.keys(notesByClass).length > 0 ? (
          Object.keys(notesByClass).map(className => (
            <div key={className} className="class-notes-section">
              <h2 className="class-title">{className}</h2>
              <div className="notes-grid">
                {notesByClass[className].map(note => (
                  <div key={note.id} className="note-card">
                    <div className="note-header">
                      <h3>{note.title}</h3>
                      <div className="note-actions">
                        <button 
                          className="btn-edit-note"
                          onClick={() => handleEditNote(note)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          className="btn-delete-note"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="note-content">{note.content}</p>
                    <p className="note-date">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-notes">No notes yet! Create your first note.</p>
        )}
      </div>
    </div>
  )
}

export default Notes