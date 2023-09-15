import { useState } from "react";
import DropDown from "../components/common/dropDown";
import TaskListItem from "../components/common/taskListItem";
import { BiSad } from "react-icons/bi";

interface GenericTaskListPageProps {
    title: string;
    tasks: Task[];
}

function GenericTaskListPage(props: GenericTaskListPageProps) {
    const [category, setCategory] = useState<string>("All");
    const [search, setSearch] = useState<string>("");

    const filteredTasks = props.tasks.filter((task) => {
        if (category === "All") {
            return task.title.toLowerCase().includes(search.toLowerCase());
        } else {
            return task.title.toLowerCase().includes(search.toLowerCase()) && task.category === category;
        }
    });
    
    return (
        <div className="bg-white appear-animation pb-12 sm:py-8 text-gray-600 overflow-x-hidden  px-4 sm:px-8 h-full w-full">
            <div className="flex flex-col flex-wrap sm:flex-row justify-between gap-6 items-center">
                <h1 className="sm:text-left text-2xl font-semibold">{props.title}</h1>
                <div className="flex gap-2">
                    <DropDown className="z-10 rounded-full w-[10rem]" values={["All", "School", "Work", "Personal"]} onChange={(value) => {setCategory(value)}} placeholder="Category"></DropDown>
                    <input className="bg-gray-100 max-w-[10rem] md:max-w-[10rem] lg:max-w-max sm:max-w-auto p-2 px-4 outline-none rounded-full" onChange={(event) => setSearch(event.target.value)} type="text" placeholder="Search"/>
                </div>
            </div>
            
            <div className="mt-8 mb-20">
                {
                    filteredTasks.length > 0 ? filteredTasks.map((task, index) => {
                        return <div className="z-10" key={index} style={{}}>
                            <TaskListItem task={task} key={index}></TaskListItem>
                        </div>
                        
                    })
                    : <div className="flex gap-2 justify-center h-[50vh] items-center text-2xl text-gray-400">
                        <BiSad className="inline-block"></BiSad>
                        No tasks
                    </div>
                }
            
            </div>
        </div>
    );
}

export default GenericTaskListPage;