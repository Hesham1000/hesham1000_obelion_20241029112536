import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.js.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://TaskList.js-backend.cloud-stacks.com/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const newTask = { title, description, dueDate, priority };
      const response = await axios.post('https://TaskList.js-backend.cloud-stacks.com/api/tasks/create', newTask, {
        headers: { 'Content-Type': 'application/json' }
      });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`https://TaskList.js-backend.cloud-stacks.com/api/tasks/update/${id}`, updatedTask, {
        headers: { 'Content-Type': 'application/json' }
      });
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://TaskList.js-backend.cloud-stacks.com/api/tasks/delete/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-creation-form">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Task Title" 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Task Description" 
        />
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => updateTask(task.id, task)}>Update</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
