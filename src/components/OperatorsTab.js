import React from "react";
import { Button, Modal } from "antd";
import OperatorTable from "./OperatorTable";
import OperatorForm from "./OperatorForm";
import { TEXTS } from "../constants/texts";

const OperatorsTab = ({
  operators,
  operatorModalVisible,
  setOperatorModalVisible,
  operatorForm,
  handleOperatorSubmit,
}) => {
  return (
    <>
      <Button
        type="primary"
        onClick={() => setOperatorModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        {TEXTS.buttons.add}
      </Button>
      <OperatorTable dataSource={operators} />
      <Modal
        title={TEXTS.modals.addOperator}
        open={operatorModalVisible}
        onCancel={() => setOperatorModalVisible(false)}
        footer={null}
      >
        <OperatorForm form={operatorForm} onFinish={handleOperatorSubmit} />
      </Modal>
    </>
  );
};

export default OperatorsTab;
