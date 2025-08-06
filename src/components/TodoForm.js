import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    addTodo(input, {
      priority,
      category,
      dueDate: dueDate || null
    });
    
    setInput('');
    setPriority('medium');
    setCategory('general');
    setDueDate('');
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="新しいタスクを入力..."
            className="todo-input"
          />
          <button type="submit" className="add-button">
            <span className="button-icon">+</span>
            <span className="button-text">追加</span>
          </button>
        </div>
        
        <div className="form-options">
          <div className="option-group">
            <label className="option-label">優先度:</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className="option-select"
            >
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </div>
          
          <div className="option-group">
            <label className="option-label">カテゴリ:</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="option-select"
            >
              <option value="general">一般</option>
              <option value="work">仕事</option>
              <option value="personal">プライベート</option>
              <option value="shopping">買い物</option>
              <option value="health">健康</option>
              <option value="study">学習</option>
            </select>
          </div>
          
          <div className="option-group">
            <label className="option-label">期限:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="option-date"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
