import { Timestamp } from "@firebase/firestore";

export interface HabitAPI {
  id: string;
  name: string;
  createdAt: Timestamp | string;
  completionHistory: Timestamp[] | string[];
}

export interface ProgressItem {
  completed: number;
  total: number;
}

export interface IProgressData {
  [day: string]: ProgressItem;
}
