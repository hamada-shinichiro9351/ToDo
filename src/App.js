import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm.js';
import Todo from './components/Todo.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorageからデータを読み込み
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('LocalStorageからの読み込みエラー:', error);
      setIsLoaded(true);
    }
  }, []);

  // データが変更されたらLocalStorageに保存
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('LocalStorageへの保存エラー:', error);
      }
    }
  }, [todos, isLoaded]);

  const addTodo = (text, options = {}) => {
    const newTodo = { 
      text, 
      completed: false, 
      id: Date.now(),
      priority: options.priority || 'medium',
      category: options.category || 'general',
      dueDate: options.dueDate || null,
      createdAt: new Date().toISOString()
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const updateTodoPriority = (id, priority) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  };

  const updateTodoCategory = (id, category) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, category } : todo
      )
    );
  };

  const updateTodoDueDate = (id, dueDate) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, dueDate } : todo
      )
    );
  };

  const deleteCompletedTodos = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const toggleAllTodos = (completed) => {
    setTodos(prevTodos => prevTodos.map(todo => ({ ...todo, completed })));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-icon">🔥</span>
            Todo管理アプリ
          </h1>
          <p className="subtitle">タスクを整理して、生産性を向上させましょう</p>
        </header>
        
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{totalCount}</span>
            <span className="stat-label">総タスク数</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">完了済み</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalCount - completedCount}</span>
            <span className="stat-label">未完了</span>
          </div>
        </div>

        {/* 進捗バー */}
        {totalCount > 0 && (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="progress-text">{progressPercentage}% 完了</span>
          </div>
        )}

        <TodoForm addTodo={addTodo} />
        
        {todos.length > 0 ? (
          <Todo 
            todos={todos} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            updateTodoPriority={updateTodoPriority}
            updateTodoCategory={updateTodoCategory}
            updateTodoDueDate={updateTodoDueDate}
            deleteCompletedTodos={deleteCompletedTodos}
            toggleAllTodos={toggleAllTodos}
          />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">✨</div>
            <p className="empty-text">まだタスクがありません</p>
            <p className="empty-subtext">新しいタスクを追加して始めましょう！</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
