import { createSlice } from "@reduxjs/toolkit";
import { HabitAPI } from "../types";
interface InitialState {
  habits: HabitAPI[];
  checkedHabits: string[];
}

const initialState: InitialState = {
  habits: [],
  checkedHabits: [],
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits(state, action) {
      state.habits = action.payload;
    },
    addHabit(state, action) {
      state.habits.unshift(action.payload);
    },
    updateHabit(state, action) {
      state.habits = state.habits.map((habit) =>
        action.payload.id === habit.id ? action.payload : habit
      );
    },
    deleteHabit(state, action) {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },
    setCompletedHabits(state, action) {
      state.checkedHabits = action.payload;
    },
  },
});

export const {
  setHabits,
  addHabit,
  updateHabit,
  deleteHabit,
  setCompletedHabits,
} = habitSlice.actions;
export default habitSlice.reducer;
