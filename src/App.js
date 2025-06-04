import React, { useState, useMemo } from "react";
import {
  Table,
  Typography,
  Select,
  Space,
  Tabs,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { useGetAcksQuery, useAddAckMutation } from "./services/ackApi";
import {
  useGetOperatorsQuery,
  useAddOperatorMutation,
} from "./services/operatorsApi";
import {
  useGetClientsQuery,
  useAddClientMutation,
} from "./services/clientsApi";

const contractTypes = [
  { label: "Межоператорский", value: "Межоператорский" },
  { label: "Прямой", value: "Прямой" },
];

const statusTypes = [
  { label: "Процесс инсталляции", value: "Процесс инсталляции" },
  { label: "Активен", value: "Активен" },
  { label: "Приостановлен", value: "Приостановлен" },
  { label: "Аннулирован", value: "Аннулирован" },
];

function App() {
  // АЦК
  const { data: acks = [], isLoading: isAcksLoading } = useGetAcksQuery();
  const { data: operators = [] } = useGetOperatorsQuery();
  const { data: clients = [] } = useGetClientsQuery();
  const [contractType, setContractType] = useState();
  const [status, setStatus] = useState();

  const filteredAcks = useMemo(
    () =>
      acks.filter((ack) => {
        return (
          (!contractType || ack.contractType === contractType) &&
          (!status || ack.status === status)
        );
      }),
    [acks, contractType, status]
  );

  const filteredL2Acks = useMemo(
    () => filteredAcks.filter((ack) => ack.connectionType === "L2"),
    [filteredAcks]
  );
  const filteredL3Acks = useMemo(
    () => filteredAcks.filter((ack) => ack.connectionType === "L3"),
    [filteredAcks]
  );

  const ackColumns = [
    { title: "Тип договора", dataIndex: "contractType", key: "contractType" },
    {
      title: "Оператор",
      dataIndex: "operatorId",
      key: "operatorId",
      render: (id) => operators.find((o) => o.id === id)?.name || id,
    },
    {
      title: "Клиент",
      dataIndex: "clientId",
      key: "clientId",
      render: (id) => clients.find((c) => c.id === id)?.name || id,
    },
    {
      title: "Номер договора",
      dataIndex: "contractNumber",
      key: "contractNumber",
    },
    { title: "Статус", dataIndex: "status", key: "status" },
    { title: "Проект", dataIndex: "project", key: "project" },
    {
      title: "Точка А",
      key: "pointA",
      render: (_, rec) =>
        `${rec.pointA.address}, ${rec.pointA.ip}, ${rec.pointA.port}`,
    },
    {
      title: "Точка Б",
      key: "pointB",
      render: (_, rec) =>
        `${rec.pointB.address}, ${rec.pointB.ip}, ${rec.pointB.port}`,
    },
    { title: "Скорость", dataIndex: "speed", key: "speed" },
    { title: "VLAN service", dataIndex: "vlanService", key: "vlanService" },
    { title: "VLAN client", dataIndex: "vlanClient", key: "vlanClient" },
    { title: "Дата инсталляции", dataIndex: "installDate", key: "installDate" },
    {
      title: "Дата активации",
      dataIndex: "activationDate",
      key: "activationDate",
    },
    {
      title: "Дата отключения",
      dataIndex: "deactivationDate",
      key: "deactivationDate",
    },
  ];

  const ack3Columns = [
    { title: "Тип договора", dataIndex: "contractType", key: "contractType" },
    {
      title: "Оператор",
      dataIndex: "operatorId",
      key: "operatorId",
      render: (id) => operators.find((o) => o.id === id)?.name || id,
    },
    {
      title: "Клиент",
      dataIndex: "clientId",
      key: "clientId",
      render: (id) => clients.find((c) => c.id === id)?.name || id,
    },
    {
      title: "Номер договора",
      dataIndex: "contractNumber",
      key: "contractNumber",
    },
    { title: "Статус", dataIndex: "status", key: "status" },
    { title: "Проект", dataIndex: "project", key: "project" },
    { title: "Скорость", dataIndex: "speed", key: "speed" },
    { title: "VLAN service", dataIndex: "vlanService", key: "vlanService" },
    { title: "VLAN client", dataIndex: "vlanClient", key: "vlanClient" },
    { title: "Дата инсталляции", dataIndex: "installDate", key: "installDate" },
    {
      title: "Дата активации",
      dataIndex: "activationDate",
      key: "activationDate",
    },
    {
      title: "Дата отключения",
      dataIndex: "deactivationDate",
      key: "deactivationDate",
    },
    { title: "VRF name", dataIndex: "vrfName", key: "vrfName" },
    { title: "VRF target", dataIndex: "vrfTarget", key: "vrfTarget" },
    { title: "IP коммутатора", dataIndex: "switchIp", key: "switchIp" },
    { title: "Порт", dataIndex: "port", key: "port" },
    { title: "IP network", dataIndex: "ipNetwork", key: "ipNetwork" },
    { title: "IP gateway", dataIndex: "ipGateway", key: "ipGateway" },
    { title: "IP client", dataIndex: "ipClient", key: "ipClient" },
    { title: "IP route", dataIndex: "ipRoute", key: "ipRoute" },
  ];

  // Операторы
  const operatorColumns = [
    { title: "Наименование", dataIndex: "name", key: "name" },
    { title: "ИНН", dataIndex: "inn", key: "inn" },
  ];

  // Клиенты
  const clientColumns = [
    { title: "Наименование", dataIndex: "name", key: "name" },
    { title: "ИНН", dataIndex: "inn", key: "inn" },
  ];

  // Модальные окна и формы
  const [ackModalVisible, setAckModalVisible] = useState(false);
  const [ack3ModalVisible, setAck3ModalVisible] = useState(false);
  const [operatorModalVisible, setOperatorModalVisible] = useState(false);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [ackForm] = Form.useForm();
  const [ack3Form] = Form.useForm();
  const [operatorForm] = Form.useForm();
  const [clientForm] = Form.useForm();

  const [addAck] = useAddAckMutation();
  const [addOperator] = useAddOperatorMutation();
  const [addClient] = useAddClientMutation();

  const handleAckSubmit = async (values) => {
    try {
      const newAck = {
        ...values,
        connectionType: "L2",
      };
      await addAck(newAck).unwrap();
      message.success("АЦК L2 добавлен");
      setAckModalVisible(false);
      ackForm.resetFields();
    } catch (error) {
      message.error("Ошибка при добавлении АЦК L2");
    }
  };

  const handleAck3Submit = async (values) => {
    try {
      const newAck = {
        ...values,
        connectionType: "L3",
      };
      await addAck(newAck).unwrap();
      message.success("АЦК L3 добавлен");
      setAck3ModalVisible(false);
      ack3Form.resetFields();
    } catch (error) {
      message.error("Ошибка при добавлении АЦК L3");
    }
  };

  const handleOperatorSubmit = async (values) => {
    try {
      await addOperator(values).unwrap();
      message.success("Оператор добавлен");
      setOperatorModalVisible(false);
      operatorForm.resetFields();
    } catch (error) {
      message.error("Ошибка при добавлении оператора");
    }
  };

  const handleClientSubmit = async (values) => {
    try {
      await addClient(values).unwrap();
      message.success("Клиент добавлен");
      setClientModalVisible(false);
      clientForm.resetFields();
    } catch (error) {
      message.error("Ошибка при добавлении клиента");
    }
  };

  return (
    <div className="App" style={{ padding: 24 }}>
      <Typography.Title level={2}>Управление АЦК</Typography.Title>
      <Tabs
        defaultActiveKey="ack"
        items={[
          {
            key: "ack",
            label: "АЦК",
            children: (
              <Tabs
                defaultActiveKey="ack2"
                items={[
                  {
                    key: "ack2",
                    label: "АЦК L2",
                    children: (
                      <>
                        <Button
                          type="primary"
                          onClick={() => setAckModalVisible(true)}
                          style={{ marginBottom: 16 }}
                        >
                          Добавить
                        </Button>
                        <Space style={{ marginBottom: 16 }}>
                          <span>Тип договора:</span>
                          <Select
                            allowClear
                            style={{ width: 180 }}
                            options={contractTypes}
                            value={contractType}
                            onChange={setContractType}
                            placeholder="Выберите тип договора"
                          />
                          <span>Статус:</span>
                          <Select
                            allowClear
                            style={{ width: 180 }}
                            options={statusTypes}
                            value={status}
                            onChange={setStatus}
                            placeholder="Выберите статус"
                          />
                        </Space>
                        <Table
                          columns={ackColumns}
                          dataSource={filteredL2Acks}
                          rowKey="id"
                          loading={isAcksLoading}
                          pagination={false}
                          scroll={{ x: true }}
                        />
                        <Modal
                          title="Добавить АЦК"
                          open={ackModalVisible}
                          onCancel={() => setAckModalVisible(false)}
                          footer={null}
                        >
                          <Form
                            form={ackForm}
                            onFinish={handleAckSubmit}
                            layout="vertical"
                          >
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
                            <Form.Item
                              name="clientId"
                              label="Клиент"
                              rules={[{ required: true }]}
                            >
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
                            <Form.Item
                              name="status"
                              label="Статус"
                              rules={[{ required: true }]}
                            >
                              <Select options={statusTypes} />
                            </Form.Item>
                            <Form.Item
                              name="project"
                              label="Проект"
                              rules={[{ required: true }]}
                            >
                              <Input />
                            </Form.Item>
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
                            <Form.Item
                              name="speed"
                              label="Скорость"
                              rules={[{ required: true }]}
                            >
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
                            <Form.Item
                              name="activationDate"
                              label="Дата активации"
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name="deactivationDate"
                              label="Дата отключения"
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                Добавить
                              </Button>
                            </Form.Item>
                          </Form>
                        </Modal>
                      </>
                    ),
                  },
                  {
                    key: "ack3",
                    label: "АЦК L3",
                    children: (
                      <>
                        <Button
                          type="primary"
                          onClick={() => setAck3ModalVisible(true)}
                          style={{ marginBottom: 16 }}
                        >
                          Добавить
                        </Button>
                        <Table
                          columns={ack3Columns}
                          dataSource={filteredL3Acks}
                          rowKey="id"
                          loading={isAcksLoading}
                          pagination={false}
                          scroll={{ x: true }}
                        />
                        <Modal
                          title="Добавить АЦК 3"
                          open={ack3ModalVisible}
                          onCancel={() => setAck3ModalVisible(false)}
                          footer={null}
                        >
                          <Form
                            form={ack3Form}
                            onFinish={handleAck3Submit}
                            layout="vertical"
                          >
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
                            <Form.Item
                              name="clientId"
                              label="Клиент"
                              rules={[{ required: true }]}
                            >
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
                            <Form.Item
                              name="status"
                              label="Статус"
                              rules={[{ required: true }]}
                            >
                              <Select options={statusTypes} />
                            </Form.Item>
                            <Form.Item
                              name="project"
                              label="Проект"
                              rules={[{ required: true }]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name="speed"
                              label="Скорость"
                              rules={[{ required: true }]}
                            >
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
                            <Form.Item
                              name="activationDate"
                              label="Дата активации"
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name="deactivationDate"
                              label="Дата отключения"
                            >
                              <Input />
                            </Form.Item>
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
                            <Form.Item
                              name="port"
                              label="Порт"
                              rules={[{ required: true }]}
                            >
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
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                Добавить
                              </Button>
                            </Form.Item>
                          </Form>
                        </Modal>
                      </>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            key: "operators",
            label: "Операторы",
            children: (
              <>
                <Button
                  type="primary"
                  onClick={() => setOperatorModalVisible(true)}
                  style={{ marginBottom: 16 }}
                >
                  Добавить
                </Button>
                <Table
                  columns={operatorColumns}
                  dataSource={operators}
                  rowKey="id"
                  pagination={false}
                />
                <Modal
                  title="Добавить оператора"
                  open={operatorModalVisible}
                  onCancel={() => setOperatorModalVisible(false)}
                  footer={null}
                >
                  <Form
                    form={operatorForm}
                    onFinish={handleOperatorSubmit}
                    layout="vertical"
                  >
                    <Form.Item
                      name="name"
                      label="Наименование"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="inn"
                      label="ИНН"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Добавить
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            ),
          },
          {
            key: "clients",
            label: "Клиенты",
            children: (
              <>
                <Button
                  type="primary"
                  onClick={() => setClientModalVisible(true)}
                  style={{ marginBottom: 16 }}
                >
                  Добавить
                </Button>
                <Table
                  columns={clientColumns}
                  dataSource={clients}
                  rowKey="id"
                  pagination={false}
                />
                <Modal
                  title="Добавить клиента"
                  open={clientModalVisible}
                  onCancel={() => setClientModalVisible(false)}
                  footer={null}
                >
                  <Form
                    form={clientForm}
                    onFinish={handleClientSubmit}
                    layout="vertical"
                  >
                    <Form.Item
                      name="name"
                      label="Наименование"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="inn"
                      label="ИНН"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Добавить
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            ),
          },
        ]}
      />
    </div>
  );
}

export default App;
