import React from "react";

const Task = ({ id, text }) => {
  return (
    <div key={id} className="tasks__items-row">
      <div className="checkbox">
        <input id={`task-${id}`} type="checkbox" />
        <label htmlFor={`task-${id}`}>
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
      <input readOnly value={text} />
    </div>
  );
};

export default Task;
