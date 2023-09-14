import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface TaskState {
    idCount: number;
    tasks: Task[]
}

const initialState: TaskState = {
    idCount: 2,
    tasks: [
        // { id: 1, title: 'Task A', description: 'This is task A', category: 'Purchases', status: 'todo', createdAt: new Date(), updatedAt: new Date() },
    ]
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            state.idCount++;
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            state.tasks[index] = action.payload;
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        addTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            const maxId = state.tasks.reduce((max, task) => {
                return task.id > max ? task.id : max;
            }, 0);

            state.idCount = maxId + 1;
        },
        setIdCount: (state, action: PayloadAction<number>) => {
            state.idCount = action.payload;
        }
    }
});

export const { addTask, updateTask, deleteTask, addTasks, setIdCount } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task;