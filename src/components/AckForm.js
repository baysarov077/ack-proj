import React from "react";
import { Form, Input, Select, Button } from "antd";
import { contractTypes, statusTypes } from "../constants/index";

const AckForm = ({ form, onFinish, operators, clients, isL3 = false }) => {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="contractType"
        label="Тип договора"
        rules={[{ required: true }]}
      >
        <Select options={contractTypes} />
      </Form.Item>
      <Form.Item
        name="operatorId"
        label="Оператор"
        rules={[{ required: true }]}
      >
        <Select>
          {operators.map((op) => (
            <Select.Option key={op.id} value={op.id}>
              {op.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="clientId" label="Клиент" rules={[{ required: true }]}>
        <Select>
          {clients.map((cl) => (
            <Select.Option key={cl.id} value={cl.id}>
              {cl.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="contractNumber"
        label="Номер договора"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="status" label="Статус" rules={[{ required: true }]}>
        <Select options={statusTypes} />
      </Form.Item>
      <Form.Item name="project" label="Проект" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {!isL3 && (
        <>
          <Form.Item
            name={["pointA", "address"]}
            label="Точка А: Адрес"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pointA", "ip"]}
            label="Точка А: IP"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pointA", "port"]}
            label="Точка А: Порт"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pointB", "address"]}
            label="Точка Б: Адрес"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pointB", "ip"]}
            label="Точка Б: IP"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["pointB", "port"]}
            label="Точка Б: Порт"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </>
      )}
      <Form.Item name="speed" label="Скорость" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="vlanService"
        label="VLAN service"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="vlanClient"
        label="VLAN client"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="installDate"
        label="Дата инсталляции"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="activationDate" label="Дата активации">
        <Input />
      </Form.Item>
      <Form.Item name="deactivationDate" label="Дата отключения">
        <Input />
      </Form.Item>
      {isL3 && (
        <>
          <Form.Item
            name="vrfName"
            label="VRF name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vrfTarget"
            label="VRF target"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="switchIp"
            label="IP коммутатора"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="port" label="Порт" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="ipNetwork"
            label="IP network"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ipGateway"
            label="IP gateway"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ipClient"
            label="IP client"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ipRoute"
            label="IP route"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AckForm;
