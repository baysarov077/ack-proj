import React from "react";
import { Form, Input, Button } from "antd";

const ClientForm = ({ form, onFinish }) => {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Наименование" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="inn" label="ИНН" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClientForm;
