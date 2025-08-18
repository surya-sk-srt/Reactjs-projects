import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import { moveTask } from "../redux/tasksSlice";

export default function Column({ column }) {
  const { tasks } = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleDrop = e => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text"));
    dispatch(moveTask({ fromCol: data.fromCol, toCol: column.id, taskId: data.taskId, index: column.taskIds.length }));
  };

  const handleDragOver = e => e.preventDefault();

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      <h2 className="font-bold mb-2">{column.title}</h2>
      <div className="space-y-2">
        {column.taskIds.map((taskId, idx) => (
          <Task key={taskId} task={tasks[taskId]} fromCol={column.id} />
        ))}
      </div>
    </div>
  );
}