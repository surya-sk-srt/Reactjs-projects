import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import { addTask } from "../redux/tasksSlice";

export default function Board() {
  const { columns } = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");

  const handleAdd = (colId) => {
    if (!newTask.trim()) return;
    dispatch(addTask(colId, newTask));
    setNewTask("");
  };

  return (
    <div className="flex gap-4">
      {Object.values(columns).map(col => (
        <div key={col.id} className="bg-white p-4 rounded shadow w-1/3">
          <Column column={col} />
          <div className="mt-4 flex">
            <input
              type="text"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              className="border rounded-l px-2 py-1 flex-grow"
              placeholder="New task..."
            />
            <button
              onClick={() => handleAdd(col.id)}
              className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
            >Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}