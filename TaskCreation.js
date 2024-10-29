import React, { useState } from 'react';
import axios from 'axios';
import './TaskCreation.js.css';

function TaskCreation({ refreshTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      dueDate,
      priority,
    };

    try {
      await axios.post('https://TaskCreation.js-backend.cloud-stacks.com/api/tasks', newTask, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
      refreshTasks();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  return (
    <div className="task-creation-container">
      <form onSubmit={handleSubmit} className="task-creation-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        ></textarea>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default TaskCreation;
