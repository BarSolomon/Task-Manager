import {useEffect, useState} from 'react';
import TaskList from './TaskList';
import { fetchTasks, getTaskCount} from './Api'; 

const Home = () => {

    const[tasks, setTasks] = useState(null);
    const[isLoading, setIdLoading] = useState(true);
    const [sortBy, setSortBy] = useState('priority'); // ברירת מחדל - מיון לפי עדיפות
    const [sortOrder, setSortOrder] = useState('asc'); // ברירת מחדל - סדר עולה

    useEffect(() => {
        loadTasks(); 
        
    }, []);

    useEffect(() => {
        if (tasks) {
          const sortedTasks = sortTasks(tasks, sortBy, sortOrder);
          setTasks(sortedTasks);
        }
      }, [sortBy, sortOrder]);
    

     // פונקציה למיון המשימות
  const sortTasks = (tasks, sortBy, sortOrder) => {
    return [...tasks].sort((a, b) => {
      if (sortBy === 'priority') {
        return sortOrder === 'asc' ? a.priority - b.priority : b.priority - a.priority;
      }
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sortBy === 'status') {
        return sortOrder === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0; // Default if no valid sort option
    });
  };



    const loadTasks = async () => {
        console.log("loadTasks called");
        try {
            const response = await fetchTasks(); 
            setTasks(response.data); 
            setIdLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return ( 
        <div className="home">
            <div>
                <h2>All tasks</h2>
            </div>
             <div className="sort-options">
        <label>Sort by:</label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="priority">Priority</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
        </select>
        <label>Order:</label>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
            {isLoading && <div>Loading...</div>}
            {tasks && <TaskList tasks={tasks}/>}
        </div>

     );
}
 
export default Home;