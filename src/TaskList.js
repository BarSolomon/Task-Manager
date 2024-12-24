import {Link} from "react-router-dom";
import { updateTaskStatus } from "./Api";
import { useState } from "react";

const TaskList = ({tasks , title}) => {

    const [tasksState, setTasksState] = useState(tasks);

    const getBorderColor = (status) => {
        switch (status) {
          case 'NEW':
            return '#F1F6F9'; // Yellow
          case 'IN_PROGRESS':
            return '#9DB2BF'; // Orange
          case 'COMPLETED':
            return '#212A3E'; // Green
          default:
            return '#f1356d'; // Default
        }
    };
    

    const handleStatusChange = async (id, currentStatus)=> {
        const newStatus =
        currentStatus === "NEW"
          ? "IN_PROGRESS"
          : currentStatus === "IN_PROGRESS"
          ? "COMPLETED"
          : "NEW";

          try{
            const updateTask = await updateTaskStatus(id, newStatus);

            setTasksState((prevTask) => 
                prevTask.map((task)=>
                task._id === id ? {...task, status:updateTask.status } : task));
          }
          catch (error) {
            console.error("Error updating task status:", error);
          }
    };


    return ( 
        <div className="task-list">
            <h2>{title}</h2>
            {tasks.map((task)=>(
                <div className="task-preview" 
                     key={task._id}
                     style={{
                        borderLeft: `10px solid ${getBorderColor(task.status)}`,
                      }}>
                    <Link to={`/tasks/${task._id}`}>
                      <h2>{task.title}</h2>
                      <p>Priority: {task.priority}</p>
                      <p> {task.status}</p>
                      <p>Description: {task.description}</p>
                    </Link>

                    {task.status !== "COMPLETED" && (
                     <button onClick={() => handleStatusChange(task._id, task.status)}>
                     {task.status === "NEW" ? "Start Task" : "Complete Task"}
                     </button>
                    )}
                    
                </div>
            ))}
        </div>
     );
}
 
export default TaskList;