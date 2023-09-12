import './App.css'
import AddTaskButton from './components/common/addTaskButton'
import Navbar from './components/common/navbar'
import Dashboard from './pages/dashboard'

function App() {

  return (
    <>
      <div className='h-full bg-white py-8 w-full rounded-lg mx-auto relative max-w-7xl flex'>
        <Navbar></Navbar>
        <Dashboard></Dashboard>
        <AddTaskButton></AddTaskButton>
      </div>
    </>
  )
}

export default App
