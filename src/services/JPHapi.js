import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = () => {
  return axios.get(`${BASE_URL}/users`);
};

export const getUserTodos = (userId) => {
  return axios.get(`${BASE_URL}/users/${userId}/todos`);
};

export const updateTaskStatus = (taskId, status) => {
  return axios.put(`${BASE_URL}/todos/${taskId}`, { completed: status });
};

export const deleteTodo = (todoId) => {
  return axios.delete(`${BASE_URL}/todos/${todoId}`);
};
