import { configureStore } from "@reduxjs/toolkit";
import { ackApi } from "./services/ackApi";
import { operatorsApi } from "./services/operatorsApi";
import { clientsApi } from "./services/clientsApi";

export const store = configureStore({
  reducer: {
    [ackApi.reducerPath]: ackApi.reducer,
    [operatorsApi.reducerPath]: operatorsApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ackApi.middleware,
      operatorsApi.middleware,
      clientsApi.middleware
    ),
});
