import React, { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import ProgressTracker from './components/ProgressTracker'
import './style.css'
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('task-dady-theme') === 'dark');

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }, [tasks]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('task-dady-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTask = (task)=>{
    setTasks([...tasks, task])
  }

  const updateTask = (updatedTask, index)=>{
    const newtask = [...tasks];
    newtask[index] = updatedTask;
    setTasks(newtask);
  }

  const deleteTask = (index)=>{
    setTasks(tasks.filter((_, i) => i !=index))
   }

   const clearTasks = ()=>{
    setTasks([]);
   }
  return (
    <div className='App'>
      <header>
        <div className='header-row'>
          <h1 className='title'>Task Dady</h1>
          <button
            className='theme-toggle'
            type='button'
            onClick={() => setDarkMode((isDark) => !isDark)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
        <p className='tagline'>Your friendly Task Manager</p>
      </header>
      <TaskForm addTask = {addTask}/>
      <TaskList tasks = {tasks}
      updateTask = {updateTask}
      deleteTask = {deleteTask} />
      <ProgressTracker tasks = {tasks} />

      {tasks.length>0 && (<button className='clear-btn' 
      onClick={clearTasks}>Clear All Tasks</button>)}
    </div>

  )
}