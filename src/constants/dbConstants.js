// Эти константы должны быть перенесены в базу данных
export const DB_CONSTANTS = {
  // Типы договоров
  contractTypes: [
    { value: "type1", label: "Тип 1" },
    { value: "type2", label: "Тип 2" },
    // Добавьте другие типы договоров
  ],

  // Статусы
  statusTypes: [
    { value: "active", label: "Активный" },
    { value: "inactive", label: "Неактивный" },
    { value: "pending", label: "В ожидании" },
    // Добавьте другие статусы
  ],

  // Скорости
  speeds: [
    { value: "100", label: "100 Мбит/с" },
    { value: "1000", label: "1 Гбит/с" },
    { value: "10000", label: "10 Гбит/с" },
    // Добавьте другие скорости
  ],

  // VLAN диапазоны
  vlanRanges: {
    service: { min: 1, max: 4094 },
    client: { min: 1, max: 4094 },
  },

  // IP диапазоны
  ipRanges: {
    network: "10.0.0.0/8",
    gateway: "10.0.0.1/24",
    client: "10.0.0.2/24",
  },

  // VRF настройки
  vrfSettings: {
    name: "VRF_DEFAULT",
    target: "65000:1",
  },
};
