import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "../features/tasks/taskSlice";
import { taskModalSlice } from "../features/createTaskModal/taskModalSlice";

const store = configureStore({
    reducer: {
        task: taskSlice.reducer,
        taskModal: taskModalSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;