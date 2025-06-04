import React from "react";
import { Table } from "antd";

const AckTable = ({ columns, dataSource, loading }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      loading={loading}
      pagination={false}
      scroll={{ x: true }}
    />
  );
};

export default AckTable;
