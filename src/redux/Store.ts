import { configureStore } from '@reduxjs/toolkit';
import jobManagerSlice from './slices/JobManager.slice';

const store = configureStore({
    reducer: {
        jobManager: jobManagerSlice,
    },
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
