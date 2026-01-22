import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_TASKS } from '../utils/mockData';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Initialize from LocalStorage or use MOCK_TASKS
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('internship_tasks');
    return savedTasks ? JSON.parse(savedTasks) : MOCK_TASKS;
  });

  // Sync to LocalStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('internship_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Admin: Add a new task
  const addTask = (newTask) => {
    const taskWithId = { 
      ...newTask, 
      id: `t${Date.now()}`, 
      dateAdded: new Date().toISOString().split('T')[0] 
    };
    setTasks((prev) => [taskWithId, ...prev]);
  };

  // Admin: Delete a task
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter(task => task.id !== taskId));
  };

  // Intern: Submit/Complete a task
  const updateTaskStatus = (taskId, submissionLink) => {
    setTasks((prev) => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'Completed', submission: submissionLink } 
        : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);