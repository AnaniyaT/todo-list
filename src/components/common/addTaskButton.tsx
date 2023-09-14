import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openTaskModal, closeTaskModal, removeCurrentTask } from "../../features/createTaskModal/taskModalSlice";

function AddTaskButton() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.taskModal.isOpen);

    function handleClick() {
        dispatch(removeCurrentTask());
        if (isOpen) {
            dispatch(closeTaskModal());
            return;
        }
        dispatch(openTaskModal());
    }

    return (
        <div className="add-task-button">
            <button 
            onClick={handleClick}
            className="
                rounded-xl w-16 h-16 flex justify-center items-center bg-blue-300
                 active:bg-blue-400 fixed bottom-24 sm:bottom-8 right-4 sm:right-8
                "
            >
                <AiOutlinePlus className="text-xl text-black font-bold"></AiOutlinePlus>
            </button>
        </div>
    );
}

export default AddTaskButton;