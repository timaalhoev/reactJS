import React from "react";

import "./List.scss";
import classNames from "classnames";
import Badge from "../Badge";
import removeSvg from "../../assets/img/remove.svg";
import axios from "axios";

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items?.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.actiive })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}</span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="Remove svg"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
