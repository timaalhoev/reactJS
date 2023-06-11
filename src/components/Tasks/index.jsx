import React from "react";
import axios from "axios";

import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";

import AddTaskForm from "./AddTaskForm";

const Tasks = ({ list, onEditTitle, onAddTask }) => {
  const editTitle = async () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      await axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удвлось обновить название списка");
        });
    }
  };
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="Edit svg" />
      </h2>
      <div className="tasks__items">
        {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map((task, index) => (
          <div key={index} className="tasks__items-row">
            <div className="checkbox">
              <input id={`task-${index}`} type="checkbox" />
              <label htmlFor={`task-${index}`}>
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                    stroke="#000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            </div>
            <input readOnly value={task.text} />
          </div>
        ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
