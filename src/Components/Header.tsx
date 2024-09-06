import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { ToggleContext, ToggleContextProps } from "../functionality/toggle";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { Query_URL } from "../utils/Constants";
import axios from "axios";
import {useSelector} from "react-redux";
import { RootState } from "../utils/store";
import { AppDispatch } from "../utils/store";
import { cacheResults } from "../utils/searchSlice";
import { useAppDispatch } from "../utils/store";
import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const { handleToggle, handleTheme, theme} = useContext(ToggleContext) as ToggleContextProps;
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResult, setSearchResult] = useState<string[]>([]);
    const searchCache = useSelector((state:RootState) => state.user)
    const [open, setOpen] = useState<boolean>(false)
    const searchRef = useRef<HTMLDivElement | null>(null)

    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchQuery === "") {
                setSearchResult([])
                return;
            }
            else if (searchCache[searchQuery]) {
                setSearchResult(searchCache[searchQuery])
                return;
            }
            
            axios.get(Query_URL + `&q=${searchQuery}`)
                .then((response) => {
                    const results = response.data[1]
                    setSearchResult(results);
                    
                    dispatch(cacheResults({
                        [searchQuery]: results
                    }))
                    
                    
                    
                })
                .catch((e) => {
                    console.log(e);
                });
        }, 200);
    

        return () => {
            clearTimeout(timeout);
        };
    }, [searchQuery]);


    useEffect(()=>{

        const handleClickOutside = (e:MouseEvent) =>{
            if(searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
       

        document.addEventListener('click', handleClickOutside)
        return () =>{
            document.removeEventListener('click', handleClickOutside)
        }
    }, [searchRef])

    const handleSearchClick = () =>{
        setOpen(true)
    }



    return (
        <div className="fixed left-0 right-0 w-[99vw] max-w-[100vw] flex justify-between items-center p-4 border shadow-md top-15 left-0 z-50 bg-white text-black
        dark:bg-black dark:border dark:border-black dark:text-white">
            <div className="flex justify-start items-center">
                <GiHamburgerMenu onClick={handleToggle} className="cursor-pointer" />
                <Link to={'/'}>
                    <img className="h-[48px] w-[48px] ml-8 rounded-full" src="https://buffer.com/resources/content/images/resources/wp-content/uploads/2017/02/video-stats@2x.png" alt="menuBar" />
                </Link>
            </div>

            <div className="items-center flex relative">
                <div ref ={searchRef} className="w-[25vw]">
                    <input
                    
                        value={searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className="w-full p-1 rounded-full border border-gray-600 focus:outline-none focus:border-hidden focus:ring-2 focus:ring-offset-2
                        dark:text-black"
                        placeholder="Search..."
                        type="text"
                        onFocus={handleSearchClick}
                        
                    />

                    {open && searchResult && searchResult.length > 0 && (
                        <ul className="absolute top-10 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 dark:text-black">
                            {searchResult.map((result, index) => (
                                <li onClick={()=>{
                                    navigate(`/${result}`)
                                }} key={"items" + index} className="p-2 hover:bg-gray-100 flex z-50 cursor-pointer">
                                    <CiSearch className="mt-1.5 mr-4 cursor-pointer" /> {result}
                                </li>
                                
                            ))}
                            
                        </ul>
                    )}
                </div>

                <div className="absolute right-8 cursor-pointer">
                    <CiSearch />
                </div>
            </div>

            <div className="flex items-center space-x-4 mr-10">
                <div className="text-lg">Create</div>
                <div>
                    <img className="h-[48px] w-[48px]" src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg" alt="profile" />
                </div>
                <div>
                    {theme === 'light' ? <FaRegMoon onClick={handleTheme} className="text-lg cursor-pointer"/>: 
                    <IoSunnyOutline onClick={handleTheme} className="text-lg cursor-pointer" />}
                
                </div>
            </div>
        </div>
    );
}
