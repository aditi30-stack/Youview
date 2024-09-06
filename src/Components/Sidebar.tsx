import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { BsFileMusicFill } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { PiDownloadSimple } from "react-icons/pi";
import { useContext } from "react";
import { ToggleContext, ToggleContextProps } from "../functionality/toggle";

export const Sidebar = () =>{
    const {toggle} = useContext(ToggleContext) as ToggleContextProps
    
    
    return (
        <div className={`border h-screen bg-blue-400 ${toggle ? 'w-[108px]': 'w-[250px]'} text-md flex flex-col space-y-8 font-bold fixed top-[80px] left-0 hidden md:block z-10 duration-300`}
            >
            <ul className="flex flex-col space-y-8 mt-4 ml-4">
                <Link to={"/"}>
                <div className="p-2">
                <FaHome />
                Home
                </div>
                </Link>
                
                <div className="p-2">
                <BsFileMusicFill />
                Music

                </div>

                <div className="p-2">
                <MdOutlineVideoLibrary />
                Library
                </div>

                <div className="p-2">
                <PiDownloadSimple />
                Download
                </div>


            </ul>
        </div>
    )
}