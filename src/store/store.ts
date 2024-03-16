import {
  configureStore,
  ThunkDispatch,
  ThunkAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import habitReducer from "./slice";
export const store = configureStore({
  reducer: {
    habits: habitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = ThunkDispatch<RootState, unknown, PayloadAction>;
export type AppAction<R> = ThunkAction<R, RootState, unknown, PayloadAction>;
