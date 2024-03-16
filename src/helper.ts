import { Timestamp } from "@firebase/firestore";
import { HabitAPI, IProgressData } from "./types";

export const convertTimestampToDate = (timestamp: Timestamp) => {
  return timestamp
    ? new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      ).toISOString()
    : "";
};
export const convertHabitTimestamps = (habit: HabitAPI) => {
  if (habit.createdAt instanceof Timestamp) {
    habit.createdAt = convertTimestampToDate(habit.createdAt);
  }
  const history = habit.completionHistory;
  if (history) {
    habit.completionHistory = habit.completionHistory.map((entry) => {
      if (entry instanceof Timestamp) {
        return convertTimestampToDate(entry);
      } else {
        return "";
      }
    });
  } else {
    habit.completionHistory = [];
  }

  return habit;
};

export const isTodayHabitComplete = (habit: HabitAPI) => {
  const today = new Date().toISOString().slice(0, 10);
  return habit.completionHistory
    .map((date) =>
      new Date((date as Timestamp).seconds * 1000).toISOString().slice(0, 10)
    )
    .includes(today);
};

export const getProgressData = (): IProgressData => {
  const weekDays = getWeekDays();
  const data: IProgressData = {};
  weekDays.forEach((day) => {
    data[day.name] = { completed: 5, total: 5 };
  });
  return data;
};

export const getComplitionIndex = (habit: HabitAPI) => {
  const todayDate = new Date().toISOString().slice(0, 10);
  return habit.completionHistory.findIndex((timestamp) => {
    const timestampDate = new Date((timestamp as Timestamp).seconds * 1000)
      .toISOString()
      .slice(0, 10);
    return timestampDate === todayDate;
  });
};

export const getTodayCompletion = (habits: HabitAPI[]): string[] => {
  const completedHabits: string[] = [];
  habits.forEach((habit: HabitAPI) => {
    const completionIndex = getComplitionIndex(habit);
    if (completionIndex !== -1) {
      completedHabits.push(habit.id);
    }
  });
  return completedHabits;
};

export const getHabitStreak = (habit: HabitAPI): number => {
  let streakDays = 0;

  const sortedCompletionHistory = (
    [...habit.completionHistory] as Timestamp[]
  ).sort((a: Timestamp, b: Timestamp) => {
    return a.seconds - b.seconds;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  for (let i = sortedCompletionHistory.length - 1; i >= 0; i--) {
    const completionDate = new Date(sortedCompletionHistory[i].seconds * 1000); // Convert Timestamp to Date object
    completionDate.setHours(0, 0, 0, 0);
    if (
      completionDate.getTime() === today.getTime() ||
      completionDate.getTime() === yesterday.getTime()
    ) {
      streakDays++;
      today.setDate(today.getDate() - 1);
      yesterday.setDate(yesterday.getDate() - 1);
    } else {
      break;
    }
  }

  return streakDays;
};

export const getStreakDescription = (streak: number): string => {
  if (streak === 1) {
    return `${streak} day streak`;
  } else if (streak > 1) {
    return `${streak} days streak`;
  } else {
    return "start your new streak today";
  }
};

export interface IDate {
  name: string;
  date: Date;
}

export const getWeekDays = (): IDate[] => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - currentDay); // Start of the current week (Sunday)

  const days: IDate[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dayName = date.toLocaleString("default", { weekday: "short" });
    days.push({ name: dayName, date: date });
  }
  return days;
};
