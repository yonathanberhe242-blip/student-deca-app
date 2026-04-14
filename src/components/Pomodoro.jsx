import React, { useState, useEffect } from 'react';
import './Pomodoro.css';

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('Work');

  const modes = { 'Work': 25 * 60, 'Short': 5 * 60, 'Long': 15 * 60 };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      alert(`${mode} session finished!`);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(modes[newMode]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`pomodoro-container ${mode.toLowerCase()}`}>
      <div className="mode-buttons">
        {Object.keys(modes).map((m) => (
          <button key={m} className={mode === m ? 'active' : ''} onClick={() => handleModeChange(m)}>
            {m === 'Work' ? 'Focus' : m}
          </button>
        ))}
      </div>
      <div className="timer-display">
        <h1>{formatTime(timeLeft)}</h1>
      </div>
      <div className="controls">
        <button className="btn-main" onClick={() => setIsActive(!isActive)}>
          {isActive ? 'PAUSE' : 'START'}
        </button>
        <button className="btn-reset" onClick={() => { setIsActive(false); setTimeLeft(modes[mode]); }}>RESET</button>
      </div>
    </div>
  );
};

export default Pomodoro;
