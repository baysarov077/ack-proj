# Система управления АЦК 

## Технологии

- React 18
- Redux Toolkit
- RTK Query
- Ant Design
- React Router
- Axios
- Json-server

## Требования

- Node.js 16+
- npm 7+ или yarn 1.22+

## Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/your-username/proj_ack.git
cd proj_ack
```

2. Установите зависимости:

```bash
npm install
# или
yarn install
```

## Запуск

```bash
npm run dev
# или
yarn dev
```

Приложение будет доступно по адресу [http://localhost:3002](http://localhost:3002)

### Сборка

```bash
npm run build
# или
yarn build
```

## Структура проекта

```
src/
├── components/         # React компоненты
│   ├── AckL2Tab.js    # Компонент вкладки АЦК L2
│   ├── AckL3Tab.js    # Компонент вкладки АЦК L3
│   ├── AckFilters.js  # Компонент фильтров
│   ├── AckTable.js    # Компонент таблицы
│   └── ...
├── constants/         # Константы и конфигурация
│   ├── texts.js      # Текстовые константы
│   ├── tableColumns.js # Конфигурация колонок таблиц
│   └── dbConstants.js # Константы для БД
├── services/         # API сервисы
│   ├── ackApi.js     # API для АЦК
│   ├── operatorsApi.js # API для операторов
│   └── clientsApi.js # API для клиентов
└── App.js           # Корневой компонент
```

