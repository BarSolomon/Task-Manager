import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTask , deleteTask } from "./Api";
import { useHistory } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams(); // מקבלת את ה-id מה-URL
  const [task, setTask] = useState(null); // שומר את נתוני המשימה
  const [isLoading, setIsLoading] = useState(true); // מצב טעינה
  const [error, setError] = useState(null); // מצב שגיאה

   const history = useHistory();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true); // תחילת טעינה
        const response = await getTask(id); // שולחת בקשה לשרת
        setTask(response.data); // שומרת את נתוני המשימה
      } catch (error) {
        setError("Failed to fetch task. Please try again."); // הודעת שגיאה
      } finally {
        setIsLoading(false); // סיום טעינה
      }
    };

    if (id) fetchTask(); 
  }, [id]); 

  const handleClick = async () => {
        try{
            await deleteTask(id);
            history.push("/");
        }
        catch(err)
        {
            setError("Failed to Delete task. Please try again."); // טיפול בשגיאה
        }
  }


  return (
    <div className="task-details">
      <h2>Task Details</h2>

      {isLoading && <p>Loading...</p>} {/* מצב טעינה */}

      {error && <p>{error}</p>} {/* מצב שגיאה */}

      {!isLoading && task && ( // תצוגת המשימה אם היא קיימת
        <article>
          <h3>{task.title}</h3>
          <p>Id: {task._id}</p>
          <p>Create at: {task.createdAt}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <p>Description: {task.description}</p>
          <button onClick={handleClick}>Delete task</button>
        </article>
      )}

      {!isLoading && !task && !error && <p>Task not found.</p>} {/* אם אין משימה */}
    </div>
  );
};

export default TaskDetails;
