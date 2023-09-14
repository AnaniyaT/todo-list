import { useState } from "react";
import DropDown from "../components/common/dropDown";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeTaskModal } from "../features/createTaskModal/taskModalSlice";
import { addTask } from "../features/tasks/taskSlice";

// interface CreateTaskDialogProps {
//     open?: boolean;
//     onClose?: () => void;
//     onSubmit?: (task: Task) => void;
// }

function CreateTaskDialog() {
    const [category, setCategory] = useState<string>("Personal");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const id = useAppSelector((state) => state.task.idCount);

    function num(bool: boolean) : number {
        return bool ? 1 : 0;
    }

    const styles : Record<number, string> = {
        1 : "opacity-100 pointer-events-auto",
        0 : "opacity-0 pointer-events-none -translate-y-[70]"
    };

    const isOpen = useAppSelector((state) => state.taskModal.isOpen);
    const dispatch = useAppDispatch();

    function clear() {
        setCategory("Personal");
        setTitle("");
        setDescription("");
    }

    function handleClose() {
        dispatch(closeTaskModal());
        clear();
    }

    function handlesubmit() {
        const task: Task = {
            id: id,
            title: title,
            description: description,
            category: category,
            status: "todo",
            createdAt: new Date(),
            updatedAt: new Date(),
            deadline: new Date()
        };

        dispatch(addTask(task));
        handleClose();
    }

    return (
        <div 
            className={`
                p-12 mx-auto  bg-white border rounded-3xl z-20 position fixed
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                px-12 transition-all duration-200 shadow-full-lg
        ` + styles[num(isOpen)]}>
            {/* close button */}
            <div 
            tabIndex={0}
            onClick={handleClose}
            className="rounded-full text-2xl text-gray-500 absolute top-4 right-4 bg-white">
                <MdClose></MdClose>
            </div>

            <h1 className="text-xl text-gray-600 font-semibold">Create a new Task</h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mb-2 mb-10 text-gray-500">
                <div className="flex flex-col gap-4">
                    <input className="
                    bg-gray-100 focus:outline-gray-200 rounded-full px-8 py-2 appearance-none
                    w-[15rem]
                    " 
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={(event) => {setTitle(event.target.value)}}
                    />

                    <DropDown
                    className="rounded-full w-[15rem] z-20"
                    values={["Work", "School", "Personal"]} onChange={(value) => {setCategory(value)}}></DropDown>
                    <div className="flex z-0 justify-between gap-4 absolute sm:static bottom-0 left-1/2 sm:translate-x-0 -translate-x-1/2 mb-8">
                        <button onClick={handlesubmit} className="bg-blue-300 rounded-full z-0 w-full">Save</button>
                        <button onClick={handleClose} className="bg-gray-200 rounded-full w-full">Cancel</button>
                    </div>
                </div> 

                <div>
                    <textarea 
                    placeholder="Description"
                    value={description}
                    className="
                        bg-gray-100 focus:outline-gray-200 rounded-xl px-6 py-2 
                        appearance-none resize-none w-[15rem]
                    "
                    onChange={(event) => {setDescription(event.target.value)}}
                    name="description" id="description" cols={20} rows={6}></textarea>
                </div>
            </div>
        </div>
    );
}

export default CreateTaskDialog;