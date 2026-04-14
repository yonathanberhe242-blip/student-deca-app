import { useState, useEffect } from 'react'
import { ArrowLeft, Check, X } from 'lucide-react'
import { getQuizData } from '../data/decaQuizzes'
import './QuizPlayer.css'

function QuizPlayer({ event, quizType, onBack }) {
  const [quizData, setQuizData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const data = getQuizData(event, quizType)
    setQuizData(data)
  }, [event, quizType])

  const handleAnswer = (index) => {
    if (!answered) {
      setSelectedAnswer(index)
      setAnswered(true)
      if (quizData[currentIndex].correct === index) {
        setScore(score + 1)
      }
    }
  }

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      setCompleted(true)
    }
  }

  if (quizData.length === 0) {
    return <p>Loading...</p>
  }

  if (completed) {
    const percentage = ((score / quizData.length) * 100).toFixed(1)
    return (
      <div className="quiz-result">
        <h1>Quiz Complete!</h1>
        <div className="result-score">
          <p>Score: {score}/{quizData.length}</p>
          <p className="percentage">{percentage}%</p>
        </div>
        <button className="btn-back" onClick={onBack}>← Back to Events</button>
      </div>
    )
  }

  const current = quizData[currentIndex]

  return (
    <div className="quiz-player">
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className="quiz-progress">
        <p>Question {currentIndex + 1} of {quizData.length}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / quizData.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="quiz-content">
        <h2>{current.question}</h2>
        <div className="options">
          {current.options.map((option, idx) => (
            <button
              key={idx}
              className={`option-btn ${selectedAnswer === idx ? 'selected' : ''} ${
                answered && idx === current.correct ? 'correct' : ''
              } ${answered && selectedAnswer === idx && idx !== current.correct ? 'wrong' : ''}`}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
            >
              {answered && idx === current.correct && <Check size={18} />}
              {answered && selectedAnswer === idx && idx !== current.correct && <X size={18} />}
              {option}
            </button>
          ))}
        </div>

        {answered && current.explanation && (
          <div className="explanation">
            <strong>Explanation:</strong> {current.explanation}
          </div>
        )}

        <button 
          className="btn-next"
          onClick={handleNext}
          disabled={!answered}
        >
          {currentIndex === quizData.length - 1 ? 'Finish' : 'Next Question'}
        </button>
      </div>
    </div>
  )
}

export default QuizPlayer