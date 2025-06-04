export const createAckColumns = (operators, clients) => [
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

export const createAck3Columns = (operators, clients) => [
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
