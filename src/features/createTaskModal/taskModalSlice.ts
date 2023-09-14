import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface TaskModalSlice {
    isOpen: boolean;
    currentTask: Task | null;
}

const initialState: TaskModalSlice = {
    isOpen: false,
    currentTask: null
}

export const taskModalSlice = createSlice({
    name: 'taskModal',
    initialState,
    reducers: {
        openTaskModal: (state) => {
            state.isOpen = true;
        },
        closeTaskModal: (state) => {
            state.isOpen = false;
        },
        setCurrentTask: (state, action: PayloadAction<Task | null>) => {
            state.currentTask = action.payload;
        },
        removeCurrentTask: (state) => {
            state.currentTask = null;
        }
    }
});

export const { openTaskModal, closeTaskModal, setCurrentTask, removeCurrentTask } = taskModalSlice.actions;

export const selectTaskModal = (state: RootState) => state.taskModal;