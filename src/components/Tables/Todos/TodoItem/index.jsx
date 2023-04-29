import React, { useState, useRef } from "react";

import { Indicator, DeleteBtn, ImageIllustration } from "../../../SVGs";

import Complete from "../../../../assets/images/Completed.png";
import Pending from "../../../../assets/images/Pending.gif";

const TodoItem = (props) => {
  const {
    type,
    todo,
    handleStatusChange,
    handleClickDelete,
    handleChangeTitle,
  } = props;

  return type !== "skeleton" ? (
    <tr key={todo.id}>
      <th className="text-center">{todo.id}</th>
      <td>
        {todo.completed ? (
          <img
            className="w-1/3 mx-auto"
            src={Complete}
            alt={`Complete + ${todo.id}`}
          />
        ) : (
          <img
            className="w-1/2 mx-auto"
            src={Pending}
            alt={`Pending + ${todo.id}`}
          />
        )}
      </td>

      <td>
        <div
          className="tooltip w-full h-full text-left"
          data-tip="Click to edit this task 📝"
        >
          {todo.title}
        </div>
      </td>
      <td className="flex">
        {!todo.completed ? (
          <button
            disabled={todo.loading}
            className="btn mr-2"
            onClick={() => handleStatusChange(todo.id, true)}
          >
            {todo.loading ? (
              <>
                <Indicator />
                Processing
              </>
            ) : (
              <>Mark completed</>
            )}
          </button>
        ) : (
          <button
            className="btn mr-2"
            onClick={() => handleStatusChange(todo.id, false)}
          >
            {todo.loading ? (
              <>
                <Indicator />
                Processing
              </>
            ) : (
              <>Mark incompleted</>
            )}
          </button>
        )}

        {todo.loading ? (
          <DeleteBtn className="fill-red-300 w-8 h-10 self-center transition-all duration-150 ease cursor-not-allowed" />
        ) : (
          <DeleteBtn
            onClick={() => handleClickDelete(todo.id)}
            className="fill-red-500 w-8 h-10 self-center hover:fill-red-400 transition-all duration-150 ease cursor-pointer"
          />
        )}
      </td>
    </tr>
  ) : (
    <tr className="max-w-sm animate-pulse">
      <th>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-300"></div>
      </th>
      <td>
        <div className="text-center">
          <ImageIllustration className="w-4 h-6" />
        </div>
      </td>
      <td>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-300"></div>
      </td>
      <td>
        <div className="w-10 h-4 bg-gray-200 rounded-full dark:bg-gray-300"></div>
      </td>
    </tr>
  );
};

export default TodoItem;
