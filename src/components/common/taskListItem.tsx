import DropDown from "./dropDown";
import { useAppDispatch } from "../../store/hooks";
import { updateTask, deleteTask } from "../../features/tasks/taskSlice";
import { setCurrentTask, openTaskModal } from "../../features/createTaskModal/taskModalSlice";
import { SlOptionsVertical } from "react-icons/sl";

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

    const blur = () => {
        const focusedElement = document.activeElement as HTMLElement;
        if (focusedElement && typeof focusedElement.blur === "function") {
            focusedElement.blur();
        }
    };

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

    function handleEdit(task: Task) {
        blur();
        dispatch(setCurrentTask(task));
        dispatch(openTaskModal());
    }

    function handleDelete(taskId: number) {
        dispatch(deleteTask(taskId));
    }

    return (
        <div 
            tabIndex={0}
            className= {
                backgroundColor + `
                shadow-full transition-all flex select-none
                text-left rounded-lg px-6 py-6 my-2 cursor-pointer
                justify-between items-center hover:shadow-lg
                relative
                `
            }
        >
            <div className="truncate sm:max-w-[20rem] lg:max-w-[50rem]">
                <p className="text-lg flex gap-1 items-center font-semibold truncate">
                    {props.task.title}<span className="text-sm font-thin">({props.task.category})</span>
                </p>
                <p className="truncate">{props.task.description}</p>  
            </div>
            <DropDown
            key={props.task.id}
            className="bg-white whitespace-nowrap flex bg-opacity-50 h-min py-1 z-0 rounded-full"
            onChange={(value:string ) => {handleChangeStatus(value, props.task)}}
            defaultValue={props.task.status}
            values={["done", "todo", "in-progress"]}></DropDown>                
            <div 
                key = {"options" + props.task.id}
                tabIndex={0}
                className="absolute group right-2 top-2 p-1 rounded-full active:bg-gray-100 hover:bg-white">
                <SlOptionsVertical className="hover:text-gray-600  peer text-gray-400 text-xs"></SlOptionsVertical>
                <div className="absolute right-8 bg-white rounded-lg overflow-hidden shadow-full
                                transition-all opacity-0 pointer-events-none group-focus-within:opacity-100
                                group-focus-within:pointer-events-auto
                ">
                    <div tabIndex={0} onClick={() => (handleEdit(props.task))} className="py-2 px-5 hover:bg-gray-100">Edit</div>
                    <div tabIndex={0} onClick={() => {handleDelete(props.task.id)}} className="py-2 px-5 hover:bg-gray-100">Delete</div>
                </div>
            </div>
            
        </div>
    );
}

export default TaskListItem;