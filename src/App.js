import React, { useState, useMemo } from "react";
import { Typography, Tabs, Form, message } from "antd";
import { useGetAcksQuery, useAddAckMutation } from "./services/ackApi";
import {
  useGetOperatorsQuery,
  useAddOperatorMutation,
} from "./services/operatorsApi";
import {
  useGetClientsQuery,
  useAddClientMutation,
} from "./services/clientsApi";
import AckL2Tab from "./components/AckL2Tab";
import AckL3Tab from "./components/AckL3Tab";
import OperatorsTab from "./components/OperatorsTab";
import ClientsTab from "./components/ClientsTab";
import { createAckColumns, createAck3Columns } from "./constants/tableColumns";
import { TEXTS } from "./constants/texts";

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

  const ackColumns = useMemo(
    () => createAckColumns(operators, clients),
    [operators, clients]
  );
  const ack3Columns = useMemo(
    () => createAck3Columns(operators, clients),
    [operators, clients]
  );

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
      message.success(TEXTS.messages.success.ackAdded);
      setAckModalVisible(false);
      ackForm.resetFields();
    } catch (error) {
      message.error(TEXTS.messages.error.ackAdd);
    }
  };

  const handleAck3Submit = async (values) => {
    try {
      const newAck = {
        ...values,
        connectionType: "L3",
      };
      await addAck(newAck).unwrap();
      message.success(TEXTS.messages.success.ack3Added);
      setAck3ModalVisible(false);
      ack3Form.resetFields();
    } catch (error) {
      message.error(TEXTS.messages.error.ack3Add);
    }
  };

  const handleOperatorSubmit = async (values) => {
    try {
      await addOperator(values).unwrap();
      message.success(TEXTS.messages.success.operatorAdded);
      setOperatorModalVisible(false);
      operatorForm.resetFields();
    } catch (error) {
      message.error(TEXTS.messages.error.operatorAdd);
    }
  };

  const handleClientSubmit = async (values) => {
    try {
      await addClient(values).unwrap();
      message.success(TEXTS.messages.success.clientAdded);
      setClientModalVisible(false);
      clientForm.resetFields();
    } catch (error) {
      message.error(TEXTS.messages.error.clientAdd);
    }
  };

  return (
    <div className="App" style={{ padding: 24 }}>
      <Typography.Title level={2}>{TEXTS.app.title}</Typography.Title>
      <Tabs
        defaultActiveKey="ack"
        items={[
          {
            key: "ack",
            label: TEXTS.tabs.ack,
            children: (
              <Tabs
                defaultActiveKey="ack2"
                items={[
                  {
                    key: "ack2",
                    label: TEXTS.tabs.ack2,
                    children: (
                      <AckL2Tab
                        contractType={contractType}
                        setContractType={setContractType}
                        status={status}
                        setStatus={setStatus}
                        filteredL2Acks={filteredL2Acks}
                        isAcksLoading={isAcksLoading}
                        ackColumns={ackColumns}
                        ackModalVisible={ackModalVisible}
                        setAckModalVisible={setAckModalVisible}
                        ackForm={ackForm}
                        handleAckSubmit={handleAckSubmit}
                        operators={operators}
                        clients={clients}
                      />
                    ),
                  },
                  {
                    key: "ack3",
                    label: TEXTS.tabs.ack3,
                    children: (
                      <AckL3Tab
                        filteredL3Acks={filteredL3Acks}
                        isAcksLoading={isAcksLoading}
                        ack3Columns={ack3Columns}
                        ack3ModalVisible={ack3ModalVisible}
                        setAck3ModalVisible={setAck3ModalVisible}
                        ack3Form={ack3Form}
                        handleAck3Submit={handleAck3Submit}
                        operators={operators}
                        clients={clients}
                      />
                    ),
                  },
                ]}
              />
            ),
          },
          {
            key: "operators",
            label: TEXTS.tabs.operators,
            children: (
              <OperatorsTab
                operators={operators}
                operatorModalVisible={operatorModalVisible}
                setOperatorModalVisible={setOperatorModalVisible}
                operatorForm={operatorForm}
                handleOperatorSubmit={handleOperatorSubmit}
              />
            ),
          },
          {
            key: "clients",
            label: TEXTS.tabs.clients,
            children: (
              <ClientsTab
                clients={clients}
                clientModalVisible={clientModalVisible}
                setClientModalVisible={setClientModalVisible}
                clientForm={clientForm}
                handleClientSubmit={handleClientSubmit}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

export default App;
