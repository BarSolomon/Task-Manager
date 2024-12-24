import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const fetchTasks = () => api.get('/tasks');
export const addTask = (taskData) => api.post('/tasks', taskData);
export const updateTaskStatus = (id, status) => api.put(`/tasks?id=${id}&status=${status}`);
export const deleteTask = (id) => api.delete(`/tasks?id=${id}`);
export const getTask = (id) => api.get(`/tasks/${id}`);
export const getTaskCount = () => api.get('/tasks/count');
