import List from "antd/lib/list";
import Checkbox from "antd/lib/checkbox";
import Menu from "antd/lib/menu";
import Dropdown from "antd/lib/dropdown";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import EllipsisOutlined from "@ant-design/icons/EllipsisOutlined";
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
  }, [checkedHabits, habit]);

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
