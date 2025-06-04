import React from "react";
import { Button, Modal } from "antd";
import AckTable from "./AckTable";
import AckForm from "./AckForm";
import { TEXTS } from "../constants/texts";

const AckL3Tab = ({
  filteredL3Acks,
  isAcksLoading,
  ack3Columns,
  ack3ModalVisible,
  setAck3ModalVisible,
  ack3Form,
  handleAck3Submit,
  operators,
  clients,
}) => {
  return (
    <>
      <Button
        type="primary"
        onClick={() => setAck3ModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        {TEXTS.buttons.add}
      </Button>
      <AckTable
        columns={ack3Columns}
        dataSource={filteredL3Acks}
        loading={isAcksLoading}
      />
      <Modal
        title={TEXTS.modals.addAck3}
        open={ack3ModalVisible}
        onCancel={() => setAck3ModalVisible(false)}
        footer={null}
      >
        <AckForm
          form={ack3Form}
          onFinish={handleAck3Submit}
          operators={operators}
          clients={clients}
          isL3={true}
        />
      </Modal>
    </>
  );
};

export default AckL3Tab;
