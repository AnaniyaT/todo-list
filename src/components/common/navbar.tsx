import { useState } from "react";
import { BiSolidDashboard, BiCheckCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { LuClock3 } from "react-icons/lu";



function Navbar() {
    const [selected, setSelected] = useState<number>(0);

    function changeSelected(index: number) {
        setSelected(index);
    }

    const liStyles : string = `
        cursor-pointer 
        hover:text-blue-500 
        sm:px-8 lg:pr-10 px-2 py-4 sm:py-2
        flex gap-5 items-center
        lg:w-60
        border-blue-400
    `;

    const selectedLiStyles : string = `
        text-blue-400 
        sm:border-r-4 sm:border-b-0 border-b-4
    `;

    const liTextStyles : string = `
        text-lg
        hidden lg:block
    `;

  return (
    <nav className="bg-white sm:py-4 sm:px-0 px-4 w-full sm:w-min sm:h-full fixed sm:sticky sm:top-4 bottom-1 z-0">
      <ul className="flex gap-8 text-4xl sm:flex-col justify-around text-gray-500 sticky top-4">
        <li 
            className={(selected == 0 ? selectedLiStyles : "") + liStyles}
            onClick={() => changeSelected(0)}
        >
          <BiSolidDashboard />
          <span className={liTextStyles}>Dashboard</span>
        </li>
        <li
            className={(selected == 1 ? selectedLiStyles : "") + liStyles}
            onClick={() => changeSelected(1)}
        >
            <BiCheckCircle />
            <span className={liTextStyles}>Completed</span>
        </li>
        <li 
            className={(selected == 2 ? selectedLiStyles : "") + liStyles}
            onClick={() => changeSelected(2)}
        >
            <LuClock3/>
            <span className={liTextStyles}>Unfinished</span>
        </li>
        <li
            className={(selected == 3 ? selectedLiStyles : "") + liStyles}
            onClick={() => changeSelected(3)}
          >
          <CgProfile />
          <span className={liTextStyles}>Profile</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;