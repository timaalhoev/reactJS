import React from "react";
import "./List.scss";
import classNames from "classnames";
import Badge from "../Badge";
import removeSvg from "../../assets/img/remove.svg";

const List = ({ items, isRemovable, onClick, onRemove }) => {
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.actiive })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="Remove svg"
              onClick={onRemove}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
