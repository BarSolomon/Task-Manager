import React, { useState } from 'react';
import { addTask } from './Api'; 
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null); // מצב שגיאה

    const history = useHistory(); // לשימוש לניווט לאחר שמירה

    const handleSubmit = async (e) => {
        e.preventDefault(); //מונע רענון של העמוד
        setError(null); // איפוס שגיאות
        const task = {title, priority, description};
        try{
            await addTask(task);
            history.push("/");
        }
        catch(err)
        {
            setError("Failed to add task. Please try again."); // טיפול בשגיאה
        }
    };

    return ( 
        <div className="create">
            <h2>Add a new Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Task title:</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Task priority: 1-10 </label>
                <input 
                  type="number" 
                  min="1"
                  max="10"
                  placeholder="Priority (1-10)"
                  required
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <label>Description:</label>
                <textarea 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                 <button type="submit">Add Task</button>
            </form>
        </div>
     );
}
 
export default Create;