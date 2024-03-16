import React, { FC, useState } from "react";
import "./Header.css";
import { Typography, Button } from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { HabitModal } from "../HabitModal/HabitModal";

export const Header: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="Header">
        <Typography.Title level={3}>My habits</Typography.Title>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={showModal}
        />
      </div>

      <HabitModal closeModal={closeModal} isOpenModal={isModalVisible} />
    </>
  );
};
