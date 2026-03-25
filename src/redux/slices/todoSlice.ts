import { createSlice } from "@reduxjs/toolkit";
import type { Todo } from "../../Interface";
// import { getItems, setItems } from "../../utils/LocalStorage";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [] as Todo[],
  },
  reducers: {
    addTodo(state, action: { payload: Todo }) {
      state.todos = [...state.todos, action.payload];
      // state.todos.push(action.payload);
    },
    updateTodo(state, action: { payload: Todo }) {
      const idx = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      state.todos[idx] = { ...state.todos[idx], ...action.payload };
      // setItems(state.todos);
    },
    deleteTodo(state, action: { payload: string }) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      // setItems(state.todos);
    },
    completedTodo(state, action: { payload: string }) {
      const idx = state.todos.findIndex((todo) => todo.id === action.payload);
      // const todoWhichCompleted = state.todos.splice(idx, 1)[0];
      state.todos[idx].completed = !state.todos[idx].completed;
      // setItems(state.todos);
    },
  },
});

export const { addTodo, deleteTodo, completedTodo, updateTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
