import { HabitAPI } from "../types";
import { RootState } from "./store";

export const getHabits = (state: RootState): HabitAPI[] => state.habits.habits;
export const getCheckedHabits = (state: RootState): string[] =>
  state.habits.checkedHabits;
