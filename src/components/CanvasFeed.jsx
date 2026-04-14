import React, { useState, useEffect } from 'react';
import './CanvasFeed.css';

const CanvasFeed = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('manualTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLinked, setIsLinked] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [courseName, setCourseName] = useState("");

  // Save tasks to your laptop whenever the list changes
  useEffect(() => {
    localStorage.setItem('manualTasks', JSON.stringify(items));
  }, [items]);

  const addTask = () => {
    if (!taskName || !courseName) return alert("Fill in the task and course!");
    const newTask = {
      id: Date.now(),
      context_name: courseName,
      title: taskName
    };
    setItems([newTask, ...items]);
    setTaskName("");
    setCourseName("");
  };

  return (
    <div className="tool-card canvas-container no-print">
      <div className="tool-header-flex">
        <h3>📋 School Task Manager</h3>
        {items.length > 0 && (
          <button className="del-card-btn" onClick={() => setItems([])}>Clear All</button>
        )}
      </div>

      <div className="manual-entry-row no-print">
        <input 
          type="text" 
          placeholder="Class (e.g. APHG)" 
          value={courseName} 
          onChange={(e) => setCourseName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="What's due?" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
        />
        <button className="add-task-btn" onClick={addTask}>Add</button>
      </div>

      <div className="canvas-list">
        {items.length === 0 ? (
          <p className="empty-msg">No tasks yet. Add one above to stay on track!</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="canvas-item">
              <div className="item-meta">
                <span className="course-name">{item.context_name}</span>
                <p className="task-title">{item.title}</p>
              </div>
              <button className="done-btn" onClick={() => setItems(items.filter(i => i.id !== item.id))}>Done</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CanvasFeed;
