import React, { useState } from "react";
import addSvg from "../../assets/img/add.svg";
import axios from "axios";

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue("");
  };
  const addTask = async () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    await axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        console.log(data, list);
        onAddTask(list.id, obj);
        toggleFormVisible();
      })
      .catch(() => {
        alert("Ошиибка при добавлении задачи");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Текст задачи"
          ></input>
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Добавление.." : "Добавить задачу"}
          </button>
          <button onClick={toggleFormVisible} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
