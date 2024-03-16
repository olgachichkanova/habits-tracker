import React, { FC } from "react";
import { Modal, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../store/store";
import { addHabitApi, updateHabitApi } from "../../store/actions";
import { HabitAPI } from "../../types";

interface Props {
  isOpenModal: boolean;
  closeModal: () => any;
  habit?: HabitAPI | null;
}

interface HabitFormData {
  name: string;
}

export const HabitModal: FC<Props> = ({
  isOpenModal,
  closeModal,
  habit = null,
}) => {
  const dispatch = useDispatch<Dispatch>();
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    closeModal();
  };

  const onValid = () => {
    const formData = form.getFieldsValue() as HabitFormData;
    const data = {
      name: formData.name,
    };

    if (habit && habit.id) {
      const updatedData = {
        ...habit,
        name: formData.name,
      };

      dispatch(updateHabitApi(updatedData)).then(() => {
        onCancel();
      });
    } else {
      dispatch(addHabitApi(data)).then(() => {
        onCancel();
      });
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <Modal
      title={habit?.id ? `Edit habit` : `New habit`}
      open={isOpenModal}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      closable
    >
      <Form form={form} layout="vertical" onFinish={onValid} autoComplete="off">
        <Form.Item
          name="name"
          label="Habit"
          initialValue={habit?.name}
          rules={[{ required: true }]}
        >
          <Input placeholder="Drink water" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
