import { useState, useEffect } from 'react'
import './Quiz.css'

function Quiz() {
  const [quizzes, setQuizzes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    score: '',
    totalPoints: ''
  })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('quizzes')) || []
    setQuizzes(saved)
  }, [])

  const handleAddQuiz = () => {
    if (formData.title.trim() && formData.subject.trim() && formData.score && formData.totalPoints) {
      const newQuiz = {
        id: Date.now(),
        ...formData,
        percentage: Math.round((formData.score / formData.totalPoints) * 100),
        date: new Date().toISOString()
      }
      const updated = [...quizzes, newQuiz]
      setQuizzes(updated)
      localStorage.setItem('quizzes', JSON.stringify(updated))
      setFormData({ title: '', subject: '', score: '', totalPoints: '' })
      setShowForm(false)
    }
  }

  const handleDeleteQuiz = (id) => {
    const updated = quizzes.filter(q => q.id !== id)
    setQuizzes(updated)
    localStorage.setItem('quizzes', JSON.stringify(updated))
  }

  const averageScore = quizzes.length > 0
    ? Math.round(quizzes.reduce((sum, q) => sum + q.percentage, 0) / quizzes.length)
    : 0

  return (
    <div className="quiz-page">
      <div className="header">
        <h1>📝 DECA Quiz</h1>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          + Add Quiz
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <input
            type="text"
            placeholder="Quiz Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
          <input
            type="number"
            placeholder="Your Score"
            value={formData.score}
            onChange={(e) => setFormData({...formData, score: parseFloat(e.target.value)})}
          />
          <input
            type="number"
            placeholder="Total Points"
            value={formData.totalPoints}
            onChange={(e) => setFormData({...formData, totalPoints: parseFloat(e.target.value)})}
          />
          <button onClick={handleAddQuiz}>Add Quiz</button>
        </div>
      )}

      <div className="average-card">
        <h2>Average Score</h2>
        <p className="average-score">{averageScore}%</p>
      </div>

      <div className="quizzes-grid">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="quiz-card">
            <div className="quiz-header">
              <h3>{quiz.title}</h3>
              <button className="btn-delete" onClick={() => handleDeleteQuiz(quiz.id)}>×</button>
            </div>
            <p className="subject">{quiz.subject}</p>
            <div className="score-display">
              <span className="score">{quiz.score}/{quiz.totalPoints}</span>
              <span className="percentage">{quiz.percentage}%</span>
            </div>
            <p className="date">{new Date(quiz.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Quiz