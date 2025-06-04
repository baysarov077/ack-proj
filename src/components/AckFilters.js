import React from "react";
import { Space, Select } from "antd";
import { contractTypes, statusTypes } from "../constants/index";
import { TEXTS } from "../constants/texts";

const AckFilters = ({ contractType, setContractType, status, setStatus }) => {
  return (
    <Space style={{ marginBottom: 16 }}>
      <span>{TEXTS.filters.contractType}:</span>
      <Select
        allowClear
        style={{ width: 180 }}
        options={contractTypes}
        value={contractType}
        onChange={setContractType}
        placeholder={TEXTS.filters.selectContractType}
      />
      <span>{TEXTS.filters.status}:</span>
      <Select
        allowClear
        style={{ width: 180 }}
        options={statusTypes}
        value={status}
        onChange={setStatus}
        placeholder={TEXTS.filters.selectStatus}
      />
    </Space>
  );
};

export default AckFilters;
