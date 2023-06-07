import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, AddList, Tasks } from "./components";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              icon: (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.96 8.10001H7.74C7.2432 8.10001 7.2 8.50231 7.2 9.00001C7.2 9.49771 7.2432 9.90001 7.74 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74C7.2432 12.6 7.2 13.0023 7.2 13.5C7.2 13.9977 7.2432 14.4 7.74 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74C7.2432 3.60001 7.2 4.00231 7.2 4.50001C7.2 4.99771 7.2432 5.40001 7.74 5.40001ZM4.86 8.10001H3.24C2.7432 8.10001 2.7 8.50231 2.7 9.00001C2.7 9.49771 2.7432 9.90001 3.24 9.90001H4.86C5.3568 9.90001 5.4 9.49771 5.4 9.00001C5.4 8.50231 5.3568 8.10001 4.86 8.10001ZM4.86 12.6H3.24C2.7432 12.6 2.7 13.0023 2.7 13.5C2.7 13.9977 2.7432 14.4 3.24 14.4H4.86C5.3568 14.4 5.4 13.9977 5.4 13.5C5.4 13.0023 5.3568 12.6 4.86 12.6ZM4.86 3.60001H3.24C2.7432 3.60001 2.7 4.00231 2.7 4.50001C2.7 4.99771 2.7432 5.40001 3.24 5.40001H4.86C5.3568 5.40001 5.4 4.99771 5.4 4.50001C5.4 4.00231 5.3568 3.60001 4.86 3.60001Z"
                    fill="#7C7C7C"
                  />
                </svg>
              ),
              name: "Все задачи",
              active: true,
            },
          ]}
        />
        <List
          items={lists}
          onRemove={(id) => {
            const newLists = lists.filter((item) => item.id !== id);
            setLists(newLists);
          }}
          isRemovable
        />
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">{lists && <Tasks List={lists[1]} />}</div>
    </div>
  );
}

export default App;
