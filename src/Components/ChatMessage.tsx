


export const ChatMessage = ({name, message}: {
    name: string,
    message: string
}) =>{
    
    

    return (
        <div className="flex space-x-4 items-center">     
        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mt-2 ml-2 mb-2">
        <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>
        <div className="flex flex-row-reverse space-x-2 justify-center items-center dark:text-gray-800">
            <div className="flex space-x-4">
        <div className="font-semibold">
            {name}
        </div>
        <div className="dark:text-black">
            {message}
        </div>
        </div>
        </div> 
        </div>

    )
}