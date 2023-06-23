import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from "./slices/inbox";
export const reduxStore = configureStore({
    reducer: {
        inbox: inboxReducer
    }
});
export type AppDispatch = typeof reduxStore.dispatch;
export type RootState = ReturnType<typeof reduxStore.getState>;