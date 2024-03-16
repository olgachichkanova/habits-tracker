import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiDeleteHabit,
  apiGetHabits,
  apiSaveNewHabit,
  apiUpdateHabit,
  HabitSaveData,
} from "../api";
import { HabitAPI } from "../types";
import { addHabit, deleteHabit, setHabits, updateHabit } from "./slice";
export const fetchHabits = createAsyncThunk("api/fetchHabits", (_, thunk) => {
  return apiGetHabits().then((habits: any) => {
    thunk.dispatch(setHabits(habits));
  });
});

export const addHabitApi = createAsyncThunk(
  "api/addHabit",
  async (data: HabitSaveData, thunk) => {
    const newCard = await apiSaveNewHabit(data);

    if (newCard !== null) {
      thunk.dispatch(addHabit(newCard));
    }
  }
);

export const updateHabitApi = createAsyncThunk(
  "api/updateHabit",
  (data: HabitAPI, thunk) => {
    return apiUpdateHabit(data.id, data).then((updatedHabit) => {
      if (updatedHabit !== null) {
        thunk.dispatch(updateHabit(updatedHabit));
      }
    });
  }
);

export const deleteHabitApi = createAsyncThunk(
  "api/deleteHabit",
  (id: string, thunk) => {
    return apiDeleteHabit(id).then(() => {
      thunk.dispatch(deleteHabit(id));
    });
  }
);
