import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  columns: {
    todo: { id: "todo", title: "To Do", taskIds: [] },
    doing: { id: "doing", title: "Doing", taskIds: [] },
    done: { id: "done", title: "Done", taskIds: [] },
  },
  tasks: {},
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { id, columnId, content } = action.payload;
        state.tasks[id] = { id, content };
        state.columns[columnId].taskIds.push(id);
      },
      prepare(columnId, content) {
        return { payload: { id: nanoid(), columnId, content } };
      }
    },
    moveTask(state, action) {
      const { fromCol, toCol, taskId, index } = action.payload;
      const fromArr = state.columns[fromCol].taskIds;
      fromArr.splice(fromArr.indexOf(taskId), 1);
      state.columns[toCol].taskIds.splice(index, 0, taskId);
    },
    deleteTask(state, action) {
      const { columnId, taskId } = action.payload;
      const arr = state.columns[columnId].taskIds;
      arr.splice(arr.indexOf(taskId), 1);
      delete state.tasks[taskId];
    }
  },
});

export const { addTask, moveTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;