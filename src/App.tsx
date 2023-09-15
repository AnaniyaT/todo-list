import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AddTaskButton from './components/common/addTaskButton'
import Navbar from './components/common/navbar'
import Dashboard from './pages/dashboard'
import GenericTaskListPage from './pages/genericTaskListPage'
import CreateTaskDialog from './pages/createTaskDialog'
import { useEffect } from 'react'
import { addTasks } from './features/tasks/taskSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Task Manager";
    const tasks: Task[] = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")!) : [];
    dispatch(addTasks(tasks));
  }, []);

  const completedTasks: Task[] = useAppSelector((state) => state.task.tasks.filter((task) => task.status === "done"));
  const ongoingTasks: Task[] = useAppSelector((state) => state.task.tasks.filter((task) => task.status === "in-progress"));
  const todoTasks: Task[] = useAppSelector((state) => state.task.tasks.filter((task) => task.status === "todo"));

  return (
    <>
      <div className='min-h-[100vh] bg-white py-8 w-full rounded-lg mx-auto  relative max-w-7xl flex'>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/completed' element={<GenericTaskListPage key={1} title='Completed' tasks={completedTasks} />}/>
            <Route path='/ongoing' element={<GenericTaskListPage key={2} title='Ongoing' tasks={ongoingTasks} />}/>
            <Route path='/todo' element={<GenericTaskListPage key={3} title='Todo' tasks={todoTasks} />}/>
          </Routes>
          <CreateTaskDialog/>
          <AddTaskButton></AddTaskButton>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
