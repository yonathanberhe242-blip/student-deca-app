import React, { useState } from 'react';
import './StudyTools.css';

const StudyTools = ({ mode }) => {
  // --- CUSTOM FLASHCARD LOGIC ---
  const [flashcards, setFlashcards] = useState(() => {
    const saved = localStorage.getItem('customFlashcards');
    const initial = [
      { q: "Demographic Transition Model", a: "Stages of population growth based on birth/death rates." },
      { q: "Von Thünen Model", a: "Spatial model showing agricultural land use around a market." },
      { q: "Malthusian Theory", a: "Population grows faster than the food supply." }
    ];
    return saved ? JSON.parse(saved) : initial;
  });

  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");

  const addCard = () => {
    if (newQ.trim() && newA.trim()) {
      const updated = [...flashcards, { q: newQ.trim(), a: newA.trim() }];
      setFlashcards(updated);
      localStorage.setItem('customFlashcards', JSON.stringify(updated));
      setNewQ(""); 
      setNewA("");
    }
  };

  const deleteCard = (e) => {
    e.stopPropagation();
    const updated = flashcards.filter((_, i) => i !== cardIndex);
    const final = updated.length > 0 ? updated : [{ q: "Empty", a: "Add words!" }];
    setFlashcards(final);
    localStorage.setItem('customFlashcards', JSON.stringify(final));
    setCardIndex(0); 
    setFlipped(false);
  };

  // --- CALCULATOR LOGIC ---
  const [currentGrade, setCurrentGrade] = useState(90);
  const [goalGrade, setGoalGrade] = useState(90);
  const [finalWeight, setFinalWeight] = useState(20);
  const [needed, setNeeded] = useState(null);

  const calculateNeeded = () => {
    const weightDec = Number(finalWeight) / 100;
    const score = (Number(goalGrade) - (Number(currentGrade) * (1 - weightDec))) / weightDec;
    setNeeded(score.toFixed(1));
  };

  const currentCard = flashcards[cardIndex] || { q: "No Cards", a: "Add one!" };

  return (
    <div className="study-tools-wrapper">
      {/* 📜 CHEAT SHEETS */}
      {mode === 'cheat' && (
        <div className="tool-card cheat-sheet-grid">
          <div className="sheet">
            <h4>🗺️ APHG Models (Units 1-7)</h4>
            <ul>
              <li><strong>Unit 2:</strong> DTM (Stages 1-5), Malthus, Ravenstein's Laws.</li>
              <li><strong>Unit 5:</strong> Von Thünen (Market → Dairy → Forest → Grains).</li>
              <li><strong>Unit 7:</strong> Rostow's Stages & Wallerstein's World Systems.</li>
            </ul>
          </div>
          <div className="sheet">
            <h4>✍️ Core Essentials</h4>
            <ul>
              <li><strong>MLA Format:</strong> (Author Page Number).</li>
              <li><strong>Quadratic:</strong> x = [-b ± √(b² - 4ac)] / 2a</li>
              <li><strong>Thesis:</strong> Claim + Line of Reasoning.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 🧠 BLURT & FLASHCARDS */}
      {mode === 'blurt' && (
        <div className="tool-card blurt-split">
          <div className="blurt-side">
            <h3>🧠 Brain Dump</h3>
            <textarea placeholder="Blurt your notes here..." className="blurt-textarea" />
            <div className="card-manager">
              <h4>➕ New Card</h4>
              <input type="text" placeholder="Term" value={newQ} onChange={(e) => setNewQ(e.target.value)} />
              <input type="text" placeholder="Def" value={newA} onChange={(e) => setNewA(e.target.value)} />
              <button onClick={addCard}>Save Card</button>
            </div>
          </div>
          <div className="flash-side">
            <h3>🎴 Flip ({cardIndex + 1}/{flashcards.length})</h3>
            <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
              <div className="card-inner">
                <div className="card-front">{currentCard.q}</div>
                <div className="card-back">{currentCard.a}</div>
              </div>
            </div>
            <div className="flash-controls">
              <button className="next-btn" onClick={(e) => { e.stopPropagation(); setCardIndex((cardIndex + 1) % flashcards.length); setFlipped(false); }}>Next</button>
              <button className="del-card-btn" onClick={deleteCard}>🗑️</button>
            </div>
          </div>
        </div>
      )}

      {/* 📝 CORNELL NOTES */}
      {mode === 'cornell' && (
        <div className="tool-card cornell-container">
          <div className="tool-header-flex no-print">
            <h3>Cornell Paper</h3>
            <button className="download-pdf-btn" onClick={() => window.print()}>💾 PDF</button>
          </div>
          <div id="cornell-printable-area" className="cornell-paper">
            <div className="cornell-header">
              <input type="text" placeholder="Subject/Topic" />
            </div>
            <div className="cornell-body">
              <div className="cornell-cues-column"><label>Cues</label><textarea /></div>
              <div className="cornell-notes-column"><label>Notes</label><textarea /></div>
            </div>
            <div className="cornell-footer">
              <label>Summary</label>
              <textarea />
            </div>
          </div>
        </div>
      )}

      {/* ✍️ AP FRQ CHECKLIST */}
      {mode === 'essay' && (
        <div className="tool-card essay-checklist">
          <h3>✍️ AP Exam FRQ Checklist</h3>
          <div className="checklist-items">
            <label><input type="checkbox" /> Identify: Direct sentence answer.</label>
            <label><input type="checkbox" /> Define: Meaning + specific example.</label>
            <label><input type="checkbox" /> Describe: Qualitative details.</label>
            <label><input type="checkbox" /> Explain: 'Why' or 'How' logic.</label>
            <label><input type="checkbox" /> Compare: Similarities AND differences.</label>
          </div>
        </div>
      )}

      {/* 📊 GRADE CALC */}
      {mode === 'calc' && (
        <div className="tool-card calc-container">
          <h3>📊 Grade Calc</h3>
          <div className="calc-inputs">
            <label>Current (%)</label>
            <input type="number" value={currentGrade} onChange={(e) => setCurrentGrade(e.target.value)} />
            <label>Goal (%)</label>
            <input type="number" value={goalGrade} onChange={(e) => setGoalGrade(e.target.value)} />
            <label>Final Weight (%)</label>
            <input type="number" value={finalWeight} onChange={(e) => setFinalWeight(e.target.value)} />
            <button className="calc-btn" onClick={calculateNeeded}>Calculate</button>
          </div>
          {needed && <div className="result-box"><h2>{needed}%</h2><p>Needed on Final</p></div>}
        </div>
      )}
    </div>
  );
};

export default StudyTools;
