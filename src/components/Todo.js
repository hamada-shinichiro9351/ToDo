import React, { useState } from 'react';

function Todo({ 
  todos, 
  toggleTodo, 
  deleteTodo, 
  editTodo,
  updateTodoPriority,
  updateTodoCategory,
  updateTodoDueDate,
  deleteCompletedTodos,
  toggleAllTodos
}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [editCategory, setEditCategory] = useState('general');
  const [editDueDate, setEditDueDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate'); // デフォルトを期限順に変更

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditCategory(todo.category);
    setEditDueDate(todo.dueDate || '');
  };

  const saveEdit = (id) => {
    if (editText.trim() !== '') {
      editTodo(id, editText);
      updateTodoPriority(id, editPriority);
      updateTodoCategory(id, editCategory);
      updateTodoDueDate(id, editDueDate || null);
    }
    setEditingId(null);
    setEditText('');
    setEditPriority('medium');
    setEditCategory('general');
    setEditDueDate('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditPriority('medium');
    setEditCategory('general');
    setEditDueDate('');
  };

  // フィルタリングとソート
  const filteredTodos = todos
    .filter(todo => {
      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'completed' && todo.completed) ||
        (filterStatus === 'active' && !todo.completed);
      const matchesCategory = filterCategory === 'all' || todo.category === filterCategory;
      const matchesPriority = filterPriority === 'all' || todo.priority === filterPriority;
      
      return matchesStatus && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          // 期限があるタスクを優先、期限がないタスクは後ろに
          if (!a.dueDate && !b.dueDate) {
            // 両方とも期限がない場合は作成日順
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          if (!a.dueDate) return 1; // aに期限がない場合は後ろに
          if (!b.dueDate) return -1; // bに期限がない場合は後ろに
          // 期限がある場合は期限順（早い順）
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return '💼';
      case 'personal': return '👤';
      case 'shopping': return '🛒';
      case 'health': return '🏥';
      case 'study': return '📚';
      default: return '📝';
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP');
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
  const someCompleted = todos.some(todo => todo.completed);

  return (
    <div className="todo-list-container">
      {/* フィルター・ソート */}
      <div className="controls">
        <div className="filter-controls">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">すべて</option>
            <option value="active">未完了</option>
            <option value="completed">完了済み</option>
          </select>
          
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">すべてのカテゴリ</option>
            <option value="general">一般</option>
            <option value="work">仕事</option>
            <option value="personal">プライベート</option>
            <option value="shopping">買い物</option>
            <option value="health">健康</option>
            <option value="study">学習</option>
          </select>
          
          <select 
            value={filterPriority} 
            onChange={(e) => setFilterPriority(e.target.value)}
            className="filter-select"
          >
            <option value="all">すべての優先度</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="dueDate">期限順</option>
            <option value="priority">優先度順</option>
            <option value="createdAt">作成日順</option>
          </select>
        </div>
      </div>

      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}>
            <div className="todo-content">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="checkmark"></span>
              </label>
              
              <div className="todo-details">
                {editingId === todo.id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      placeholder="タスク名"
                    />
                    <div className="edit-options">
                      <select 
                        value={editPriority} 
                        onChange={(e) => setEditPriority(e.target.value)}
                        className="edit-select"
                      >
                        <option value="low">優先度: 低</option>
                        <option value="medium">優先度: 中</option>
                        <option value="high">優先度: 高</option>
                      </select>
                      
                      <select 
                        value={editCategory} 
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="edit-select"
                      >
                        <option value="general">カテゴリ: 一般</option>
                        <option value="work">カテゴリ: 仕事</option>
                        <option value="personal">カテゴリ: プライベート</option>
                        <option value="shopping">カテゴリ: 買い物</option>
                        <option value="health">カテゴリ: 健康</option>
                        <option value="study">カテゴリ: 学習</option>
                      </select>
                      
                      <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        className="edit-date"
                        placeholder="期限"
                      />
                    </div>
                    <div className="edit-actions">
                      <button 
                        onClick={() => saveEdit(todo.id)}
                        className="save-button"
                      >
                        💾 保存
                      </button>
                      <button 
                        onClick={cancelEdit}
                        className="cancel-button"
                      >
                        ❌ キャンセル
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span 
                      className={`todo-text ${todo.completed ? 'completed-text' : ''}`}
                      onDoubleClick={() => startEditing(todo)}
                    >
                      {todo.text}
                    </span>
                    
                    <div className="todo-meta">
                      <span className="category-tag">
                        {getCategoryIcon(todo.category)} {todo.category}
                      </span>
                      <span 
                        className="priority-tag"
                        style={{ backgroundColor: getPriorityColor(todo.priority) }}
                      >
                        {todo.priority}
                      </span>
                      {todo.dueDate && (
                        <span className={`due-date ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}>
                          📅 {formatDate(todo.dueDate)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="todo-actions">
              <button 
                onClick={() => startEditing(todo)} 
                className="action-button edit"
                title="編集"
              >
                ✏️
              </button>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="action-button delete"
                title="削除"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* 一括操作 - タスクリストの下に配置 */}
      {todos.length > 0 && (
        <div className="bulk-actions-bottom">
          <button 
            onClick={() => toggleAllTodos(!allCompleted)}
            className="bulk-button"
          >
            {allCompleted ? 'すべて解除' : 'すべて完了'}
          </button>
          {someCompleted && (
            <button 
              onClick={deleteCompletedTodos}
              className="bulk-button delete"
            >
              完了済みを削除
            </button>
          )}
        </div>
      )}
      
      {filteredTodos.length === 0 && todos.length > 0 && (
        <div className="no-results">
          <p>条件に一致するタスクがありません</p>
        </div>
      )}
    </div>
  );
}

export default Todo;
