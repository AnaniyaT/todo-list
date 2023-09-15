import { useState } from "react";
import { BiSolidDashboard, BiCheckCircle } from "react-icons/bi";
import { LuClock3 } from "react-icons/lu";
import { TbProgressCheck } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";


function Navbar() {
    const [selected, setSelected] = useState<number>(0);

    const indices : Record<string, number> = {
        "/" : 0,
        "/completed" : 1,
        "/ongoing" : 2,
        "/todo" : 3,
    }

    const location = useLocation();
    const index = indices[location.pathname];
    if (index != undefined && index != selected) {
        setSelected(index);
    }

    function changeSelected(index: number) {
        setSelected(index);
    }

    const liStyles : string = `
        cursor-pointer 
        hover:text-blue-500 
        sm:px-8 lg:pr-10 px-2 py-4 sm:py-2
        flex gap-5 items-center
        lg:w-64
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
    <nav className="bg-white sm:px-0 sm:h-full px-6 w-full sm:w-min fixed sm:sticky sm:top-12 left-0 bottom-0 z-10">
      <ul className="flex h-full gap-8 text-4xl sm:flex-col justify-between sm:justify-start text-gray-500 sticky top-12">
        <Link to={"/"}>
          <li 
              tabIndex={1}
              className={(selected == 0 ? selectedLiStyles : "") + liStyles}
              onClick={() => changeSelected(0)}
          >
            
              <BiSolidDashboard />
              <span className={liTextStyles}>Dashboard</span>
          </li>
        </Link>
       
        <Link to={"/completed"}>
        <li
            tabIndex={1}
            className={(selected == 1 ? selectedLiStyles : "") + liStyles}
            onClick={() => changeSelected(1)}
        >
            <BiCheckCircle />
            <span className={liTextStyles}>Completed</span>
        </li>
        </Link>

        <Link to={"/ongoing"}>
          <li 
              tabIndex={1}
              className={(selected == 2 ? selectedLiStyles : "") + liStyles}
              onClick={() => changeSelected(2)}
          >

              <TbProgressCheck/>
              <span className={liTextStyles}>Ongoing</span>
          </li>
        </Link>

        <Link to={"/todo"}>
          <li 
              tabIndex={1}
              className={(selected == 3 ? selectedLiStyles : "") + liStyles}
              onClick={() => changeSelected(3)}
          >
              <LuClock3/>
              <span className={liTextStyles}>To-do</span>
          </li>
        </Link>
        
        {/* <li
            tabIndex={1}
            className={(selected == 4 ? selectedLiStyles : "") + liStyles}
            onClick={() => changeSelected(4)}
          >
          <CgProfile />
          <span className={liTextStyles}>Profile</span>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;