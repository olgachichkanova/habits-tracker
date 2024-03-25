import FloatButton from "antd/lib/float-button";
import List from "antd/lib/list";
import Spin from "antd/lib/spin";
import Typography from "antd/lib/typography";
import { useEffect, useState } from "react";
import { HabitCard } from "../HabitCard/HabitCard";
import { Dispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getHabits } from "../../store/selectors";
import { fetchHabits } from "../../store/actions";
import "./HabitList.css";
import { getTodayCompletion } from "../../helper";
import { setCompletedHabits } from "../../store/slice";
import { HabitModal } from "../HabitModal/HabitModal";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
export const HabitList = () => {
  const dispatch = useDispatch<Dispatch>();
  const habits = useSelector(getHabits);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchHabits()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    const completed = getTodayCompletion(habits);
    dispatch(setCompletedHabits(completed));
  }, [habits, dispatch]);

  return (
    <div className="Habits__list">
      <div className="Habits__list__header">
        <Typography.Title level={3}>My habits</Typography.Title>
      </div>
      {loading && <Spin />}
      {!loading && (
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={habits}
          renderItem={(habit) => <HabitCard key={habit.id} habit={habit} />}
        />
      )}
      <div style={{ width: "100%", display: "flex" }}>
        <FloatButton
          style={{ margin: "0 auto" }}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={showModal}
        />
      </div>
      <HabitModal closeModal={closeModal} isOpenModal={isModalVisible} />
    </div>
  );
};
