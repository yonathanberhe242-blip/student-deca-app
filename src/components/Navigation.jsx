import { Link } from 'react-router-dom'
import { Home, BookOpen, CheckSquare, Calendar, BarChart3, Brain, FileText } from 'lucide-react'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">Student DECA</h1>
        <ul className="nav-links">
          <li><Link to="/"><Home size={20} /> Dashboard</Link></li>
          <li><Link to="/classes"><BookOpen size={20} /> Classes</Link></li>
          <li><Link to="/assignments"><CheckSquare size={20} /> Assignments</Link></li>
          <li><Link to="/calendar"><Calendar size={20} /> Calendar</Link></li>
          <li><Link to="/grades"><BarChart3 size={20} /> Grades</Link></li>
          <li><Link to="/quiz"><Brain size={20} /> DECA Quiz</Link></li>
          <li><Link to="/notes"><FileText size={20} /> Notes</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation