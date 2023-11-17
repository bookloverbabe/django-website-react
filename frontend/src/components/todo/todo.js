import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

// Create a to do list that is connected via the backend database using axios. The list must be editable, whereby the user can read, update and delete items
const Todo = () => {
  // Each item in the list
  const [inputItem, setInputItem] = useState('');
  // The list itself, initialised to an empty array
  const [list, setList] = useState([]);
  
  // Fetch existing data from the backend when the component mounts, before the user updates the list
  // UseEffect is a React Hook that lets you synchronize a component with an external system.
  useEffect(() => {
    fetchData(); 
  }, []);

  // Reading items. The data for the list is obtained from the database using the axios API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/app');
      setList(response.data); // Update the list with data from the backend
      // A promise that catches an error if the promise is unfulfilled
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Adding items to the list via the database
  const handleAddTodo = async () => {
    if (inputItem.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8000/app', {
          id: Math.random(),
          item: inputItem,
        });
        // Update the list state by using the spread operator […list] to create a new array with the existing tasks in the list. 
        // Append the response.data to the end of the array. Reset the inputItem state to an empty string, clearing the input field when the user clicks the button.
        setList([...list, response.data]); // Update the list with the new item
        setInputItem(''); // Reset input field
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };
  
  // Delete items from the list, do the same in the backend
  const handleDeleteTodo = async (id) => {
    try {
      // Make a DELETE request to the backend API with the specific task ID
      await axios.delete(`http://localhost:8000/app/${id}`);
      // Delete the item from the list and the backend when the user presses the delete button for that item
      // Use filter to create a new list that filters out the item with the id that had been deleted
      const updatedList = list.filter((item) => item.id !== id);
      setList(updatedList); // Update the list by removing the deleted task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Event handler which handles all of the changes
  const handleInputChange = (event) => {
    setInputItem(event.target.value);
  };

  return (
    <div className="Todo">
      <h1>My To-Do List</h1>

      <div className="Top">
        <input
          className="input"
          type="text"
          value={inputItem}
          onChange={handleInputChange}
          placeholder="Enter a task"
        />
        <button className="btn" onClick={handleAddTodo}>
          Submit
        </button>
      </div>

      <ul>
        {list.map((item) => (
          <li className="task" key={item.id}>
            {item.item}
            <button onClick={() => handleDeleteTodo(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;