import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks); // Set the tasks state to the loaded tasks
    }
  }, []); // This runs only once, when the component mounts

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]); // This updates localStorage whenever tasks are updated

  // Add or edit task function
  const addOrEditTask = () => {
    if (task) {
      if (isEditing) {
        const updatedTasks = tasks.map((item, index) =>
          index === editIndex ? { ...item, text: task } : item
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
      }
      setTask('');  // Clear the input field after adding/editing
    }
  };

  // Toggle task complete
  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Delete task function
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Enable editing mode for a specific task
  const editTask = (index) => {
    setTask(tasks[index].text); // Pre-fill input with the existing task
    setIsEditing(true); // Enable editing mode
    setEditIndex(index); // Store the index of the task being edited
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">To-Do List</h2>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={addOrEditTask}>
          {isEditing ? 'Edit Task' : 'Add Task'}
        </Button>
      </Form>
      <ListGroup>
        {tasks.map((task, index) => (
          <ListGroup.Item
            key={index}
            className={task.completed ? 'completed-task' : ''}
          >
            <div className="d-flex justify-content-between">
              <span
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                onClick={() => toggleComplete(index)}
              >
                {task.text}
              </span>
              <div>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => editTask(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TodoList;
