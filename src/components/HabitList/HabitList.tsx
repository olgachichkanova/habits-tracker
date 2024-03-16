import { List } from "antd";
import { useEffect, useState } from "react";
import { HabitCard } from "../HabitCard/HabitCard";
import { Dispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getHabits } from "../../store/selectors";
import { fetchHabits } from "../../store/actions";
import "./HabitList.css";
import { getTodayCompletion } from "../../helper";
import { setCompletedHabits } from "../../store/slice";
export const HabitList = () => {
  const dispatch = useDispatch<Dispatch>();
  const habits = useSelector(getHabits);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchHabits()).then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const completed = getTodayCompletion(habits);
    dispatch(setCompletedHabits(completed));
  }, [habits]);

  return (
    <div className="Habits__list">
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={habits}
        renderItem={(habit) => <HabitCard key={habit.id} habit={habit} />}
      />
    </div>
  );
};
