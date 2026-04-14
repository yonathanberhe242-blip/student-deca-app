import { ArrowLeft } from 'lucide-react'
import './QuizSelector.css'

function QuizSelector({ event, onSelectEvent, onSelectQuiz, onBack }) {
  const events = [
    'Principles of Business Administration',
    'Digital Marketing',
    'Entrepreneurship',
    'Finance',
    'Hospitality Management',
    'Human Resources',
    'Marketing',
    'Management',
    'Business Law & Ethics'
  ]

  if (event) {
    return (
      <div className="quiz-selector">
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={20} /> Back
        </button>
        <h2>{event}</h2>
        <div className="quiz-types">
          <div className="quiz-type-card" onClick={() => onSelectQuiz('vocabulary')}>
            <h3>📚 Vocabulary</h3>
            <p>Test your knowledge of key terms</p>
          </div>
          <div className="quiz-type-card" onClick={() => onSelectQuiz('questions')}>
            <h3>❓ Questions</h3>
            <p>Answer scenario-based questions</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-selector">
      <h1>DECA Events</h1>
      <p>Select an event to start studying</p>
      <div className="events-grid">
        {events.map(evt => (
          <div 
            key={evt}
            className="event-card"
            onClick={() => onSelectEvent(evt)}
          >
            {evt}
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizSelector