import React, { useReducer, useState } from 'react';
import './App.css';

// Action types
const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  EDIT_TASK: 'EDIT_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  CANCEL_EDIT: 'CANCEL_EDIT',
  COMPLETE_TASK: 'COMPLETE_TASK',
  DELETE_TASK: 'DELETE_TASK'
};

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      if (!action.payload.task.trim()) {
        return state;
      }
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            task: action.payload.task,
            completed: false,
            isEditing: false
          }
        ]
      };

    case ACTIONS.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, isEditing: true, editValue: task.task }
            : { ...task, isEditing: false }
        )
      };

    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, task: action.payload.updatedTask, isEditing: false, editValue: '' }
            : task
        )
      };

    case ACTIONS.CANCEL_EDIT:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, isEditing: false, editValue: '' }
            : task
        )
      };

    case ACTIONS.COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        )
      };

    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id)
      };

    default:
      return state;
  }
};

const App = () => {
  // Initial state
  const initialState = {
    tasks: []
  };

  // useReducer hook
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  // Local state for input
  const [inputTask, setInputTask] = useState('');
  const [editInput, setEditInput] = useState('');

  // Handle add task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputTask.trim()) {
      dispatch({ type: ACTIONS.ADD_TASK, payload: { task: inputTask } });
      setInputTask('');
    }
  };

  // Handle edit task
  const handleEditTask = (id, currentTask) => {
    dispatch({ type: ACTIONS.EDIT_TASK, payload: { id } });
    setEditInput(currentTask);
  };

  // Handle update task
  const handleUpdateTask = (id) => {
    if (editInput.trim()) {
      dispatch({ 
        type: ACTIONS.UPDATE_TASK, 
        payload: { id, updatedTask: editInput } 
      });
      setEditInput('');
    }
  };

  // Handle cancel edit
  const handleCancelEdit = (id) => {
    dispatch({ type: ACTIONS.CANCEL_EDIT, payload: { id } });
    setEditInput('');
  };

  // Handle complete task
  const handleCompleteTask = (id) => {
    dispatch({ type: ACTIONS.COMPLETE_TASK, payload: { id } });
  };

  // Handle delete task
  const handleDeleteTask = (id) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } });
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">ToDo List</h1>
        <p className="subtitle">Manage your tasks efficiently</p>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="add-task-form">
          <input
            type="text"
            className="task-input"
            placeholder="Enter your task..."
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
          />
          <button type="submit" className="add-btn">
            Add Task
          </button>
        </form>

        {/* Tasks Table */}
        {state.tasks.length > 0 ? (
          <div className="table-container">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Task</th>
                  <th>Edit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.tasks.map((task, index) => (
                  <tr 
                    key={task.id} 
                    className={task.completed ? 'completed' : ''}
                  >
                    <td className="serial-number">{index + 1}</td>
                    <td className="task-cell">
                      {task.isEditing ? (
                        <div className="edit-container">
                          <input
                            type="text"
                            className="edit-input"
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            autoFocus
                          />
                          <div className="edit-buttons">
                            <button
                              onClick={() => handleUpdateTask(task.id)}
                              className="save-btn"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => handleCancelEdit(task.id)}
                              className="cancel-btn"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className={task.completed ? 'task-completed' : ''}>
                          {task.task}
                        </span>
                      )}
                    </td>
                    <td className="edit-cell">
                      {!task.isEditing && (
                        <button
                          onClick={() => handleEditTask(task.id, task.task)}
                          className="edit-btn"
                          disabled={task.completed}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td className="actions-cell">
                      {!task.isEditing && (
                        <>
                          <button
                            onClick={() => handleCompleteTask(task.id)}
                            className={`complete-btn ${task.completed ? 'completed' : ''}`}
                          >
                            {task.completed ? 'Undo' : 'Complete'}
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No tasks yet. Add a task to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
