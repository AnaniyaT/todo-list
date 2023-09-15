import TaskListItem from "../components/common/taskListItem";
import DashboardCard from "../components/dashboard/dashboardCard";
import { useAppSelector } from "../store/hooks";
import { BiSad } from "react-icons/bi";

function Dashboard() {

    const tasks : Task[] = useAppSelector((state) => state.task.tasks);
    const completed : number = tasks.filter((task) => task.status === "done").length;
    const total : number = tasks.length;

    return (
        <div className="bg-white overflow-x-hidden appear-animation text-gray-600 sm:py-8 px-4 sm:px-8 h-full w-full">
            <h1 className="text-left text-2xl font-semibold">Dashboard</h1>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                <DashboardCard title="Total Tasks" value={total} color="blue"></DashboardCard>
                <DashboardCard title="Completed Tasks" value={completed} color="green"></DashboardCard>
                <DashboardCard title="Unfinished Tasks" value={total - completed} color="purple"></DashboardCard>
            </div>
            <h2 className="text-xl mt-8 text-left font-bold">Tasks</h2>
            <div className="py-8 mb-20 relative">
                {
                    tasks.length >0 ? tasks.map((task, index) => {
                        return <TaskListItem key={index} task={task}></TaskListItem>
                    })
                    : <div className="absolute flex gap-2 items-center text-2xl top-[3.5rem] sm:top-[7rem] left-1/2 -translate-x-[50%] text-gray-400">
                        <BiSad className="inline-block"></BiSad>
                        No tasks
                        </div>
                }
            </div>
        </div>
    );
}

export default Dashboard;