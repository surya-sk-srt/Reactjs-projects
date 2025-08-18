import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/tasksSlice";

export default function Task({ task, fromCol }) {
  const dispatch = useDispatch();
  const ref = useRef();

  const handleDragStart = e => {
    e.dataTransfer.setData("text", JSON.stringify({ fromCol, taskId: task.id }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDelete = () => dispatch(deleteTask({ columnId: fromCol, taskId: task.id }));

  return (
    <div
      ref={ref}
      draggable
      onDragStart={handleDragStart}
      className="bg-gray-50 p-2 rounded shadow flex justify-between items-center"
    >
      <span>{task.content}</span>
      <button onClick={handleDelete} className="text-red-500 hover:text-red-700">✕</button>
    </div>
  );
}