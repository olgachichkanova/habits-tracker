import { List, Checkbox, Menu, Dropdown, Button, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined";
import { FC, useEffect, useState } from "react";
import "./HabitCard.css";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "../../store/store";
import { deleteHabitApi } from "../../store/actions";
import { HabitModal } from "../HabitModal/HabitModal";
import { apiUpdateHabitCompletion } from "../../api";
import { getCheckedHabits } from "../../store/selectors";
import { getHabitStreak, getStreakDescription } from "../../helper";
import { HabitAPI } from "../../types";

interface Props {
  habit: HabitAPI;
}

export const HabitCard: FC<Props> = ({ habit }) => {
  const dispatch = useDispatch<Dispatch>();
  const checkedHabits = useSelector(getCheckedHabits);
  const [checked, setChecked] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [description, setDescription] = useState("");

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleCheckboxChange = async (e: any) => {
    setChecked(e.target.checked);
    try {
      await apiUpdateHabitCompletion(habit.id, e.target.checked);
    } catch (error) {
      console.error("Error updating habit completion:", error);
    }
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: "Do you want to delete this habit?",
      content: "All of its data will be permanently deleted.",
      cancelText: "Cancel",
      okText: "Delete",
      onOk() {
        return dispatch(deleteHabitApi(habit.id));
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    if (checkedHabits.length > 0 && checkedHabits.includes(habit.id)) {
      setChecked(true);
    }
    const streak = getHabitStreak(habit);
    setDescription(getStreakDescription(streak));
  }, [checkedHabits]);

  const menu = (
    <Menu>
      <Menu.Item key="edit" icon={<EditOutlined />} onClick={showEditModal}>
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={showDeleteConfirm}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <List.Item>
        <Checkbox
          style={{ marginRight: "20px" }}
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <List.Item.Meta title={habit.name} description={description} />
        <div className="HabitsListItem__extra">
          <Dropdown overlay={menu}>
            <Button size="small" shape="circle" icon={<EllipsisOutlined />} />
          </Dropdown>
        </div>
      </List.Item>
      <HabitModal
        habit={habit}
        closeModal={closeEditModal}
        isOpenModal={isEditModalVisible}
      />
    </>
  );
};
