import React, { useState, useEffect } from "react";

import {
  getUsers,
  getUserTodos,
  updateTaskStatus,
  deleteTodo,
} from "../services/JPHapi";
import { arrangeTodos } from "../utils/formatTodos";

import MainLayout from "../layout/MainLayout";
import Modal from "../components/Modal";
import showToast from "../utils/toast";

import TodoItem from "../components/Tables/Todos/TodoItem";

const Todo = () => {
  const [userList, setUserList] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [currentUserTodos, setCurrentUserTodos] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentTodoId, setCurrentTodoId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const res = await getUsers();
        setUserList(res.data);
      } catch (error) {
        showToast("error", "There was an error getting the user list");
        console.error(error.message);
      }
    };
    getUserList();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (currentUserId !== "" && currentUserId) {
      if (!userTodos.some((todo) => todo.userId === currentUserId)) {
        handleGetTodos(currentUserId);
      } else {
        setCurrentUserTodos(
          userTodos.filter((todo) => todo.userId === currentUserId)
        );
        setLoading(false);
      }
    }
  }, [currentUserId]);

  const handleGetTodos = async (userId) => {
    try {
      const res = await getUserTodos(userId);
      const currentData = arrangeTodos(res.data).map((todo) => ({
        ...todo,
        loading: false,
      }));
      setUserTodos((prev) => [...prev, ...currentData]);
      setCurrentUserTodos(currentData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast("error", "There was an error getting the user tasks");
      console.error(error.message);
    }
  };

  const handleUserChange = (e) => {
    setCurrentUserId(Number(e.target.value));
  };

  const handleStatusChange = async (id, status) => {
    setCurrentUserTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) return { ...todo, loading: true };
        return todo;
      })
    );

    const statusChange = await updateTaskStatus(id, status);

    if (statusChange.status === 200) {
      showToast("success", "You completed the task!");
      setUserTodos((prev) => {
        const newTodos = prev.map((todo) => {
          if (todo.id === id)
            return { ...todo, completed: status, loading: false };
          return todo;
        });

        return arrangeTodos(newTodos);
      });

      setCurrentUserTodos((prev) => {
        const newTodos = prev.map((todo) => {
          if (todo.id === id)
            return { ...todo, completed: status, loading: false };
          return todo;
        });

        return arrangeTodos(newTodos);
      });
    } else
      showToast("error", "There was an error while connecting to the server.");
  };

  const handleClickDelete = (todoId) => {
    document.querySelector("html").classList.add("stop-scrolling");
    setCurrentTodoId(todoId);
    setShowModal(true);
  };

  const handleChangeTitle = (todoId, newTitle) => {
    setCurrentUserTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) return { ...todo, title: newTitle };
        else return todo;
      })
    );
    setUserTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) return { ...todo, title: newTitle };
        else return todo;
      })
    );
    showToast("success", "You changed the task title successfully!");
  };

  const deleteTask = async (confirm) => {
    document.querySelector("html").classList.remove("stop-scrolling");
    if (confirm) {
      try {
        setCurrentUserTodos((prev) =>
          prev.map((todo) => {
            if (todo.id === currentTodoId)
              return {
                ...todo,
                loading: true,
              };
            else return todo;
          })
        );
        const response = await deleteTodo(currentTodoId);
        setCurrentUserTodos((prev) =>
          prev.filter((todo) => todo.id !== currentTodoId)
        );
        setUserTodos((prev) =>
          prev.filter((todo) => todo.id !== currentTodoId)
        );
        showToast("success", "You deleted the task!");
      } catch (error) {
        showToast("error", "Your action was cancelled.");
      }
    } else showToast("info", "There is no change to the task");
  };

  return (
    <MainLayout>
      <div className="p-8">
        <h2 className="font-semibold mb-4 overflow-hidden relative after:contents-[''] after:w-full after:h-[0.1px] after:bg-slate-500 dark:after:bg-slate-100 after:absolute after:left-10 after:top-1/2 after:-translate-y-1/2">
          User
        </h2>
        <select
          className="select select-info w-full max-w-xs"
          onChange={handleUserChange}
          defaultValue={"Default"}
        >
          <option hidden disabled value={"Default"}>
            Select user
          </option>
          {userList?.map((user) => (
            <option key={user.id} value={user.id} className="text-base">
              {user.name}
            </option>
          ))}
        </select>
        <h2 className="font-semibold my-4 overflow-hidden relative after:contents-[''] after:w-full after:h-[0.1px] after:bg-slate-500 dark:after:bg-slate-100 after:absolute after:left-[4.5rem] after:top-1/2 after:-translate-y-1/2">
          Task List
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center w-1/12">Status</th>
                <th>Task name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUserTodos?.length !== 0 ? (
                loading ? (
                  Array.from(Array(20).keys()).map((index) => (
                    <TodoItem key={index} type="skeleton" />
                  ))
                ) : (
                  currentUserTodos?.map((todo, index) => (
                    <TodoItem
                      key={index}
                      todo={todo}
                      handleStatusChange={handleStatusChange}
                      handleClickDelete={handleClickDelete}
                      handleChangeTitle={handleChangeTitle}
                    />
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <h3>
            Done{" "}
            {currentUserTodos.filter((todo) => todo.completed === true)
              .length || 0}
            /{currentUserTodos.length || 0} tasks
          </h3>
        </div>
      </div>
      {showModal && (
        <Modal
          type="delete"
          title="Delete todo task"
          message="Are you sure want to delete this task permantly? Your confirmation cannot be rolled back in the future"
          setShow={setShowModal}
          setConfirmation={deleteTask}
        />
      )}
    </MainLayout>
  );
};

export default Todo;
