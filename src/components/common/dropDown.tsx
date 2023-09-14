import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DropDownProps {
    values: string[];
    onChange: (value: string) => void;
    placeholder?: string;
    defaultValue?: string;
    className?: string;
}

function DropDown(props: DropDownProps) {
    const [current, setCurrent] = useState<string | null>(props.defaultValue ?? null);
    const [open, setOpen] = useState<boolean>(false);

    const myRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const blur = () => {
        const focusedElement = document.activeElement as HTMLElement;
        if (focusedElement && typeof focusedElement.blur === "function") {
            focusedElement.blur();
        }
    };

    const handleContainerClick = () => {
        if (open) {
            blur();
        }
        setOpen(!open);
    };

    function getLeft() : string {
        if (myRef.current) {
            const rect = myRef.current.getBoundingClientRect();
            const viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const leftSpace = rect.left;
            const rightSpace = viewWidth - rect.right;
            if (leftSpace > rightSpace) {
                return " right-0";
            }
            
            return " left-0";
        }
        return "";
    }

    function getTop() : string {
        if (myRef.current && containerRef.current) {
            const rect = myRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            const bottomSpace = viewHeight - rect.bottom;

            if (bottomSpace < containerRect.height + 64) {
                return " bottom-[calc(100%+2.5rem)]";
            }

            return " top-[calc(100%+0rem)]";
        }
        return "";
    }

    const handleOptionClick = (value: string) => {
        setCurrent(value);
        props.onChange(value);
        blur();
    };

    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target.hasAttribute("data-dropdown") == false) {
            setOpen(false);
        }
    });

    return (
        <div className={""}>
            <div
                tabIndex={0}
                data-dropdown="true"
                onClick={() => { handleContainerClick(); }}
                className={`pl-8 pr-4 py-2 bg-gray-100 group 
                        cursor-pointer text-left focus:outline
                        focus:outline-blue-300 
                    ` + props.className ?? " "}>

                <span data-dropdown="true" className="w-max">{current ?? props.placeholder ?? "Select an option"}</span>

                <FiChevronDown 
                    data-dropdown="true" 
                    className="
                        inline-block transition-all group-focus-within:rotate-180 
                        text-right w-8 float-right mt-[.15rem] text-xl font-bold
                        " 
                />

                <div className="relative z-10" ref={myRef}>
                    <div
                        ref={containerRef}
                        className={`
                        opacity-0 group-focus-within:opacity-100 rounded-xl shadow-full-lg
                        group-focus-within:translate-y-4 absolute transition-all bg-white
                        pointer-events-none group-focus-within:pointer-events-auto translate-y[-4rem]
                        overflow-hidden
                    ` + getLeft() + getTop()}>
                        {
                            props.values.map((value, index) => {
                                return (<div
                                            key={index}
                                            tabIndex={0}
                                            onClick={() => { handleOptionClick(value); }}
                                            className={`
                                                px-8 py-2 text-sm text-left hover:bg-gray-200
                                                cursor-pointer min-w-[10rem] font-semibold z-50
                                                ` + (value === current ? "border-l-[.5rem] pl-6 border-blue-400" : "")}
                                        >
                                            <span className="z-50">
                                                {value}
                                            </span>
                                            
                                        </div>);
                                    })
                        }
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default DropDown;