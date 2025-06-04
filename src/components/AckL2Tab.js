import React from "react";
import { Button, Flex, Modal } from "antd";
import AckFilters from "./AckFilters";
import AckTable from "./AckTable";
import AckForm from "./AckForm";
import { TEXTS } from "../constants/texts";

const AckL2Tab = ({
  contractType,
  setContractType,
  status,
  setStatus,
  filteredL2Acks,
  isAcksLoading,
  ackColumns,
  ackModalVisible,
  setAckModalVisible,
  ackForm,
  handleAckSubmit,
  operators,
  clients,
}) => {
  return (
    <>
      <Flex justify="space-between" align="center">
        <Button
          type="primary"
          onClick={() => setAckModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          {TEXTS.buttons.add}
        </Button>
        <AckFilters
          contractType={contractType}
          setContractType={setContractType}
          status={status}
          setStatus={setStatus}
        />
      </Flex>
      <AckTable
        columns={ackColumns}
        dataSource={filteredL2Acks}
        loading={isAcksLoading}
      />
      <Modal
        title={TEXTS.modals.addAck}
        open={ackModalVisible}
        onCancel={() => setAckModalVisible(false)}
        footer={null}
      >
        <AckForm
          form={ackForm}
          onFinish={handleAckSubmit}
          operators={operators}
          clients={clients}
        />
      </Modal>
    </>
  );
};

export default AckL2Tab;
