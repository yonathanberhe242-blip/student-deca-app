import { useState } from 'react'
import QuizSelector from '../components/QuizSelector'
import QuizPlayer from '../components/QuizPlayer'
import './DECAQuiz.css'

function DECAQuiz() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [quizType, setQuizType] = useState(null)

  if (selectedEvent && quizType) {
    return <QuizPlayer event={selectedEvent} quizType={quizType} onBack={() => { setSelectedEvent(null); setQuizType(null) }} />
  }

  if (selectedEvent) {
    return <QuizSelector event={selectedEvent} onSelectQuiz={setQuizType} onBack={() => setSelectedEvent(null)} />
  }

  return <QuizSelector onSelectEvent={setSelectedEvent} />
}

export default DECAQuiz