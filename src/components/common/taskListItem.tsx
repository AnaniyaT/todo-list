import DropDown from "./dropDown";
import { useAppDispatch } from "../../store/hooks";
import { updateTask } from "../../features/tasks/taskSlice";

interface TaskListItemProps {
    task: Task;
}

const backgroundColors : Record<string, string> = {
    "todo" : "bg-red-100 ",
    "done" : "bg-green-100 ",
    "in-progress" : "bg-yellow-100 ",
    "default" : "bg-gray-50 "
};

function TaskListItem(props: TaskListItemProps) {
    const backgroundColor : string = backgroundColors[props.task.status ?? "default"];
    const dispatch = useAppDispatch();

    function handleChangeStatus(status: string, task: Task) {
        if (status === task.status) return;
        if (status == "todo" || status == "done" || status == "in-progress")
        {
            const newTask : Task = {
                ...task,
                status: status
            };
            dispatch(updateTask(newTask));
        }
    }

    return (
        <div 
            tabIndex={0}
            className= {
                backgroundColor + `
                shadow-full transition-all flex hover:z-0
                text-left rounded-lg px-6 py-4 my-2 cursor-pointer
                justify-between z-10 items-center hover:shadow-lg
                `
            }
        >
            <div className="truncate sm:max-w-[20rem] lg:max-w-[50rem]">
                <p className="text-lg flex gap-1 items-center font-semibold">
                    {props.task.title}<span className="text-sm font-thin">({props.task.category})</span>
                </p>
                <p className="truncate">{props.task.description}</p>  
            </div>

            <div className="grid gap-2 text-gray-500">
                <DropDown
                className="bg-white whitespace-nowrap flex bg-opacity-50 h-min py-1 z-0 rounded-full"
                onChange={(value:string ) => {handleChangeStatus(value, props.task)}}
                defaultValue={props.task.status}
                values={["done", "todo", "in-progress"]}></DropDown>                
            </div>
            
        </div>
    );
}

export default TaskListItem;