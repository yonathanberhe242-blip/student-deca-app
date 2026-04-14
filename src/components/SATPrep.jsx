import React, { useState } from 'react';
import './SATPrep.css';

const SATPrep = () => {
  const [activeTab, setActiveTab] = useState('Reading');
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const satQuestions = {
    Reading: [
      {
        id: 1,
        question: "In the late 19th century, the shift toward industrialization led to a rapid expansion of urban centers. This migration from rural areas fundamentally altered the social fabric of the nation. Which choice best describes the main idea?",
        options: [
          "Industrialization had a minimal impact on where people lived.",
          "Urban expansion was driven by agricultural innovation.",
          "The move to cities brought both benefits and difficulties.",
          "Housing shortages were the only significant challenge."
        ],
        correct: 2,
        hint: "Look for a balance of 'opportunities' and 'challenges'."
      },
      {
        id: 2,
        question: "The narrator characterizes the relationship between the two characters as one primarily defined by:",
        options: [
          "Mutual hostility and competition.",
          "Quiet admiration and unspoken respect.",
          "Superficial politeness covering deep-seated resentment.",
          "Indifference born of long-standing familiarity."
        ],
        correct: 1,
        hint: "Focus on textual evidence suggesting 'quiet' or 'unspoken' positive regard."
      },
      {
        id: 3,
        question: "Which choice completes the text with the most logical and precise word or phrase? 'The scientist's results were _______, leading the team to conduct further experiments to reach a definitive conclusion.'",
        options: ["Inconclusive", "Straightforward", "Unbiased", "Discernible"],
        correct: 0,
        hint: "The word must explain why 'further experiments' were needed to be 'definitive'."
      }
    ],
    Math: [
      {
        id: 4,
        question: "If 3x + 9 = 21, what is the value of 6x?",
        options: ["4", "8", "12", "24"],
        correct: 3,
        hint: "Solve for x first (3x = 12, so x = 4), then find 6x."
      },
      {
        id: 5,
        question: "A circle in the xy-plane has center (3, -4) and radius 5. Which of the following is an equation of the circle?",
        options: [
          "(x - 3)² + (y + 4)² = 5",
          "(x + 3)² + (y - 4)² = 25",
          "(x - 3)² + (y + 4)² = 25",
          "(x + 3)² + (y - 4)² = 5"
        ],
        correct: 2,
        hint: "Use the standard form: (x - h)² + (y - k)² = r²."
      },
      {
        id: 6,
        question: "The line y = 2x + 5 is graphed in the xy-plane. What is the y-intercept of the line?",
        options: ["(0, 2)", "(0, 5)", "(2, 0)", "(5, 0)"],
        correct: 1,
        hint: "In y = mx + b, 'b' is the y-coordinate of the y-intercept."
      }
    ]
  };

  const handleSelect = (questionId, optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIndex });
  };

  const calculateScore = () => {
    const currentQuestions = satQuestions[activeTab];
    const correctCount = currentQuestions.reduce((acc, q) => {
      return acc + (selectedAnswers[q.id] === q.correct ? 1 : 0);
    }, 0);
    return `${correctCount} / ${currentQuestions.length}`;
  };

  return (
    <div className="sat-container">
      <div className="sat-header">
        <h1>SAT Practice Hub</h1>
        <div className="score-badge">Current Score: {calculateScore()}</div>
        <div className="tab-buttons">
          <button className={activeTab === 'Reading' ? 'active' : ''} onClick={() => setActiveTab('Reading')}>Reading & Writing</button>
          <button className={activeTab === 'Math' ? 'active' : ''} onClick={() => setActiveTab('Math')}>Math</button>
        </div>
      </div>

      <div className="question-list">
        {satQuestions[activeTab].map((q) => (
          <div key={q.id} className="question-card">
            <p className="question-text">{q.question}</p>
            <div className="options-grid">
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                const isCorrect = idx === q.correct;
                const showResult = selectedAnswers[q.id] !== undefined;

                return (
                  <button 
                    key={idx} 
                    className={`option-btn ${isSelected ? 'selected' : ''} ${showResult && isCorrect ? 'correct' : ''} ${showResult && isSelected && !isCorrect ? 'wrong' : ''}`}
                    onClick={() => handleSelect(q.id, idx)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                );
              })}
            </div>
            {selectedAnswers[q.id] !== undefined && (
              <div className={`feedback ${selectedAnswers[q.id] === q.correct ? 'success' : 'error'}`}>
                {selectedAnswers[q.id] === q.correct ? '✅ Correct!' : '❌ Try Again'}
                <p className="hint-text"><strong>Tip:</strong> {q.hint}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SATPrep;
