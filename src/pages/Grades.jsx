import { useState, useEffect } from 'react'
import Pomodoro from '../components/Pomodoro'
import SATPrep from '../components/SATPrep'
import StudyTools from '../components/StudyTools'
import CanvasFeed from '../components/CanvasFeed'
import './Grades.css'

function Grades() {
  const [classes, setClasses] = useState([])
  const [activeTool, setActiveTool] = useState(null)
  const [showTimer, setShowTimer] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [newGrade, setNewGrade] = useState(100)
  const [energy, setEnergy] = useState(100)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('classes')) || []
    setClasses(saved)
  }, [])

  const calculateTimeLeft = () => {
    const diff = +new Date("2026-05-04") - +new Date()
    if (diff <= 0) return "Exams are here!"
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))} Days until AP Exams`
  }

  const toggleTool = (tool) => setActiveTool(activeTool === tool ? null : tool)

  const handleUpdateGrade = () => {
    if (selectedClass) {
      const updated = classes.map(c => c.id === selectedClass.id ? {...c, grade: Number(newGrade)} : c)
      setClasses(updated)
      localStorage.setItem('classes', JSON.stringify(updated))
      setSelectedClass(null); setShowForm(false);
    }
  }

  const gradeValue = (s) => (s >= 90 ? 4.0 : s >= 80 ? 3.0 : s >= 70 ? 2.0 : s >= 60 ? 1.0 : 0.0)
  const getLetter = (s) => (s >= 90 ? 'A' : s >= 80 ? 'B' : s >= 70 ? 'C' : s >= 60 ? 'D' : 'F')
  const getWeighted = (s, type) => {
    const b = gradeValue(s)
    if (b === 0) return 0
    return (type === 'Honors') ? b + 0.5 : (type === 'AP' || type === 'Dual Enrollment' ? b + 1.0 : b)
  }

  const unweightedGPA = classes.length > 0 ? (classes.reduce((sum, c) => sum + gradeValue(c.grade), 0) / classes.length).toFixed(2) : "0.00"
  const weightedGPA = classes.length > 0 ? (classes.reduce((sum, c) => sum + getWeighted(c.grade, c.classType), 0) / classes.length).toFixed(2) : "0.00"

  return (
    <div className="grades-page">
      <div className="header-section no-print">
        <div className="title-group">
          <h1>Dashboard</h1>
          <span className="ap-countdown">{calculateTimeLeft()}</span>
        </div>
        <div className="nav-buttons">
          <button className={`nav-btn ${activeTool === 'SAT' ? 'active' : ''}`} onClick={() => toggleTool('SAT')}>🎯 SAT</button>
          <button className={`nav-btn ${activeTool === 'Cheat' ? 'active' : ''}`} onClick={() => toggleTool('Cheat')}>📜 APHG</button>
          <button className={`nav-btn ${activeTool === 'Cornell' ? 'active' : ''}`} onClick={() => toggleTool('Cornell')}>📝 Cornell</button>
          <button className={`nav-btn ${activeTool === 'Blurt' ? 'active' : ''}`} onClick={() => toggleTool('Blurt')}>🧠 Blurt</button>
          <button className={`nav-btn ${activeTool === 'Essay' ? 'active' : ''}`} onClick={() => toggleTool('Essay')}>✍️ FRQ</button>
          <button className={`nav-btn ${activeTool === 'Calc' ? 'active' : ''}`} onClick={() => toggleTool('Calc')}>📊 Calc</button>
        </div>
      </div>

      <CanvasFeed /> {/* Canvas Feed right under the navigation */}

      <div className="active-tool-area">
        {activeTool === 'SAT' && <SATPrep />}
        {activeTool === 'Cheat' && <StudyTools mode="cheat" />}
        {activeTool === 'Calc' && <StudyTools mode="calc" />}
        {activeTool === 'Cornell' && <StudyTools mode="cornell" />}
        {activeTool === 'Blurt' && <StudyTools mode="blurt" />}
        {activeTool === 'Essay' && <StudyTools mode="essay" />}
      </div>

      <div className="burnout-meter no-print">
        <h3>⚡ Energy Level: {energy}%</h3>
        <input type="range" min="0" max="100" value={energy} onChange={(e) => setEnergy(e.target.value)} />
      </div>

      <div className="gpa-cards no-print">
        <div className="gpa-card unweighted"><h2>Unweighted</h2><p className="gpa-value">{unweightedGPA}</p></div>
        <div className="gpa-card weighted"><h2>Weighted</h2><p className="gpa-value">{weightedGPA}</p></div>
      </div>

      <div className="grades-grid no-print">
        {classes.map(cls => (
          <div key={cls.id} className="grade-card">
            <h3>{cls.name}</h3><p className="class-type-small">{cls.classType}</p>
            <div className="grade-display">{cls.grade}% <span>({getLetter(cls.grade)})</span></div>
            <button className="btn-edit" onClick={() => { setSelectedClass(cls); setNewGrade(cls.grade); setShowForm(true); }}>Edit</button>
          </div>
        ))}
      </div>

      <div className="floating-timer-container no-print">
        {showTimer && <div className="timer-popup"><button className="close-timer" onClick={() => setShowTimer(false)}>×</button><Pomodoro /></div>}
        <button className="timer-toggle-btn" onClick={() => setShowTimer(!showTimer)}>⏱️ Timer</button>
      </div>

      {showForm && (
        <div className="modal no-print"><div className="modal-content">
          <h2>Update {selectedClass.name}</h2>
          <input type="number" value={newGrade} onChange={(e) => setNewGrade(e.target.value)} className="grade-number-input" />
          <div className="modal-buttons"><button className="btn-save" onClick={handleUpdateGrade}>Save</button><button onClick={() => setShowForm(false)}>Cancel</button></div>
        </div></div>
      )}
    </div>
  )
}
export default Grades
