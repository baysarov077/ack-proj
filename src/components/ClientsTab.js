import React from "react";
import { Button, Modal } from "antd";
import ClientTable from "./ClientTable";
import ClientForm from "./ClientForm";
import { TEXTS } from "../constants/texts";

const ClientsTab = ({
  clients,
  clientModalVisible,
  setClientModalVisible,
  clientForm,
  handleClientSubmit,
}) => {
  return (
    <>
      <Button
        type="primary"
        onClick={() => setClientModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        {TEXTS.buttons.add}
      </Button>
      <ClientTable dataSource={clients} />
      <Modal
        title={TEXTS.modals.addClient}
        open={clientModalVisible}
        onCancel={() => setClientModalVisible(false)}
        footer={null}
      >
        <ClientForm form={clientForm} onFinish={handleClientSubmit} />
      </Modal>
    </>
  );
};

export default ClientsTab;
