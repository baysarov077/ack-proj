import React from "react";
import { Table } from "antd";

const ClientTable = ({ dataSource }) => {
  const columns = [
    { title: "Наименование", dataIndex: "name", key: "name" },
    { title: "ИНН", dataIndex: "inn", key: "inn" },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      pagination={false}
    />
  );
};

export default ClientTable;
