import React from "react";
import axios from "axios";

import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";

import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty }) => {
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
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="Edit svg" />
      </h2>
      <div className="tasks__items">
        {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
